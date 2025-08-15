'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'

// Mantle Sepolia Testnet configuration
const mantleSepoliaTestnet = {
  id: 5003,
  name: 'Mantle Sepolia Testnet',
  network: 'mantle-sepolia-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Mantle',
    symbol: 'MNT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.mantle.xyz'],
      webSocket: ['wss://ws.sepolia.mantle.xyz'],
    },
    public: {
      http: ['https://rpc.sepolia.mantle.xyz'],
      webSocket: ['wss://ws.sepolia.mantle.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Mantle Sepolia Explorer',
      url: 'https://explorer.sepolia.mantle.xyz',
    },
  },
  testnet: true,
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mantleSepoliaTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
        webSocket: chain.rpcUrls.default.webSocket?.[0],
      }),
    }),
    publicProvider(),
  ]
)

const { wallets } = getDefaultWallets({
  appName: 'PayFlow',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'default-project-id',
  chains,
})

const connectors = connectorsForWallets([
  ...wallets,
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const queryClient = new QueryClient()

// Custom RainbowKit theme with gold colors
const customTheme = darkTheme({
  accentColor: '#eab308', // gold-500
  accentColorForeground: '#ffffff',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small',
  colors: {
    accentColor: '#eab308', // gold-500
    accentColorForeground: '#ffffff',
    actionButtonBorder: '#ca8a04', // gold-600
    actionButtonBorderMobile: '#ca8a04', // gold-600
    actionButtonSecondaryBackground: '#1e293b', // dark-800
    connectButtonBackground: '#eab308', // gold-500
    connectButtonBackgroundError: '#ef4444', // red-500
    connectButtonInnerBackground: '#eab308', // gold-500
    connectButtonText: '#ffffff',
    connectButtonTextError: '#ffffff',
    connectionIndicator: '#10b981', // green-500
    downloadBottomCardBackground: '#1e293b', // dark-800
    downloadTopCardBackground: '#334155', // dark-700
    error: '#ef4444', // red-500
    modalBackground: '#0f172a', // dark-900
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBorder: '#334155', // dark-700
    modalText: '#ffffff',
    modalTextSecondary: '#94a3b8', // dark-400
    profileAction: '#334155', // dark-700
    profileActionHover: '#475569', // dark-600
    profileForeground: '#ffffff',
    selectedOptionBorder: '#eab308', // gold-500
    standby: '#f59e0b', // amber-500
  },
})

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={customTheme}
        >
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}