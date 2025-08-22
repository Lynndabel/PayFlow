// lib/prices/priceService.ts
// Lightweight price fetcher using DefiLlama (no API key required)
// Fetches current USD prices for specified assets and derives cross quotes.

export type SupportedAsset = 'mantle' | 'ethereum'

export interface PriceMap {
  usd: Record<SupportedAsset, number>
}

export interface PriceWithChange {
  usd: Record<SupportedAsset, number>
  change24hPct: Record<SupportedAsset, number>
}

const DEFILLAMA_ENDPOINT = 'https://coins.llama.fi/prices/current'
const COINGECKO_PREFIX = 'coingecko'

// Simple in-memory cache to reduce requests
let cache: { data: PriceMap; ts: number } | null = null
const CACHE_TTL_MS = 60_000 // 60s

export async function getPrices(): Promise<PriceMap> {
  const now = Date.now()
  if (cache && now - cache.ts < CACHE_TTL_MS) return cache.data

  const ids = [`${COINGECKO_PREFIX}:mantle`, `${COINGECKO_PREFIX}:ethereum`]
  const url = `${DEFILLAMA_ENDPOINT}/${ids.join(',')}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Price API error: ${res.status}`)
  const json = await res.json() as any

  const mantleKey = `${COINGECKO_PREFIX}:mantle`
  const ethKey = `${COINGECKO_PREFIX}:ethereum`

  const mantleUsd = json?.coins?.[mantleKey]?.price
  const ethUsd = json?.coins?.[ethKey]?.price

  if (typeof mantleUsd !== 'number' || typeof ethUsd !== 'number') {
    throw new Error('Invalid price data from API')
  }

  const data: PriceMap = {
    usd: {
      mantle: mantleUsd,
      ethereum: ethUsd,
    },
  }
  cache = { data, ts: now }
  return data
}

export function formatFiat(value: number): string {
  if (!isFinite(value)) return '0.00'
  return value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
}

// Returns current USD prices and 24h percentage change for supported assets
export async function getPricesWithChange(): Promise<PriceWithChange> {
  const ids = [`${COINGECKO_PREFIX}:mantle`, `${COINGECKO_PREFIX}:ethereum`]
  const nowUrl = `${DEFILLAMA_ENDPOINT}/${ids.join(',')}`
  const ts24h = Math.floor((Date.now() - 86_400_000) / 1000)
  const histUrl = `https://coins.llama.fi/prices/historical/${ts24h}/${ids.join(',')}`

  const [nowRes, histRes] = await Promise.all([fetch(nowUrl), fetch(histUrl)])
  if (!nowRes.ok) throw new Error(`Price API error: ${nowRes.status}`)
  if (!histRes.ok) throw new Error(`Price API error: ${histRes.status}`)
  const nowJson = await nowRes.json() as any
  const histJson = await histRes.json() as any

  const mantleKey = `${COINGECKO_PREFIX}:mantle`
  const ethKey = `${COINGECKO_PREFIX}:ethereum`

  const mNow = nowJson?.coins?.[mantleKey]?.price
  const eNow = nowJson?.coins?.[ethKey]?.price
  const mOld = histJson?.coins?.[mantleKey]?.price
  const eOld = histJson?.coins?.[ethKey]?.price

  if ([mNow, eNow, mOld, eOld].some(v => typeof v !== 'number' || !isFinite(v))) {
    throw new Error('Invalid price data from API')
  }

  const pct = (cur: number, prev: number) => prev === 0 ? 0 : ((cur - prev) / prev) * 100

  return {
    usd: {
      mantle: mNow,
      ethereum: eNow,
    },
    change24hPct: {
      mantle: pct(mNow, mOld),
      ethereum: pct(eNow, eOld),
    },
  }
}
