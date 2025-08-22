// Smart Contract Addresses for Mantle Sepolia Testnet
// Update these addresses after deployment

// Attempt to load addresses from on-chain broadcast file, fallback to static
type Addresses = {
  USER_REGISTRY: `0x${string}`
  SMART_WALLET: `0x${string}`
  WALLET_FACTORY: `0x${string}`
  SMART_WALLET_IMPLEMENTATION: `0x${string}`
  PAYMENT_PROCESSOR: `0x${string}`
}

// TODO: Uncomment this section after deploying contracts to Mantle Sepolia Testnet
// let DYNAMIC_ADDRESSES: Partial<Addresses> | undefined
// try {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const broadcast = require('../../../../contracts/broadcast/Deploy.s.sol/5003/run-latest.json')
//   const txs: Array<{ contractName?: string; contractAddress?: string }> = broadcast?.transactions || []
//   const map = new Map<string, string>()
//   for (const tx of txs) {
//     if (tx.contractName && tx.contractAddress) {
//       map.set(tx.contractName, tx.contractAddress)
//     }
//   }
//   DYNAMIC_ADDRESSES = {
//     USER_REGISTRY: map.get('UserRegistry') as `0x${string}` | undefined,
//     SMART_WALLET: map.get('SmartWallet') as `0x${string}` | undefined,
//     WALLET_FACTORY: map.get('WalletFactory') as `0x${string}` | undefined,
//     SMART_WALLET_IMPLEMENTATION: map.get('SmartWallet') as `0x${string}` | undefined,
//     PAYMENT_PROCESSOR: map.get('PaymentProcessor') as `0x${string}` | undefined,
//   }
// } catch (_e) {
//   // ignore; fall back to static
// }

const STATIC_ADDRESSES: Addresses = {
  USER_REGISTRY: '0xF02DDa491A91C3De2686C33f5e04bcE906981cdF' as `0x${string}`,
  SMART_WALLET: '0x18ab621F671e5c4943365A5eF5B5f1bDE24F9CBf' as `0x${string}`,
  WALLET_FACTORY: '0xb3c60d75d0528D223E32772035Bf9cB1ac48A263' as `0x${string}`,
  SMART_WALLET_IMPLEMENTATION: '0x72F8d4d7Dd9A4274a8b7Bf436C20b66D3a104b37' as `0x${string}`,
  PAYMENT_PROCESSOR: '0x0B82c9b2c8E9F513E18B4F12318d6FA3a3ee7864' as `0x${string}`,
}

export const CONTRACT_ADDRESSES: Addresses = STATIC_ADDRESSES
  
  // Network configuration
  export const MANTLE_TESTNET_CONFIG = {
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
  
  // Token addresses on Mantle Sepolia
  // TODO: Populate with verified bridged token addresses once confirmed on Mantle Sepolia explorer
  // Example:
  // USDC: '0x...' as `0x${string}`,
  // USDT: '0x...' as `0x${string}`,
  // DAI:  '0x...' as `0x${string}`,
  export const TOKEN_ADDRESSES = {
    USDC: '0xAcab8129E2cE587fD203FD770ec9ECAFA2C88080' as `0x${string}`, // Official USDC on Mantle Sepolia
    USDT: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE' as `0x${string}`, // Official USDT on Mantle Sepolia
  } as const
  
  // Contract deployment info
  export const DEPLOYMENT_INFO = {
    network: 'mantle-sepolia-testnet',
    deployedAt: '2025-08-15T12:14:00Z',
    deployer: '0x8B54d7BAB53a61F4923E00C9f1CCfd999CC92d33',
    version: '1.0.0',
  } as const
  
  // Utility function to get contract address with type safety
  export function getContractAddress(contractName: keyof Addresses): `0x${string}` {
    const address = CONTRACT_ADDRESSES[contractName]
    if (!address) {
      throw new Error(`Contract address not found for ${String(contractName)}`)
    }
    return address
  }
  
  // Utility function to get token address
  export function getTokenAddress(tokenSymbol: keyof typeof TOKEN_ADDRESSES): `0x${string}` {
    const address = TOKEN_ADDRESSES[tokenSymbol]
    if (!address) {
      throw new Error(`Token address not found for ${String(tokenSymbol)}`)
    }
    return address
  }
  
  // Utility function to get explorer URL for a given chain ID
  export function getExplorerUrl(chainId: number): string {
    if (chainId === MANTLE_TESTNET_CONFIG.id) {
      return MANTLE_TESTNET_CONFIG.blockExplorers.default.url
    }
    return 'https://etherscan.io'
  }
  
  // Utility function to get explorer URL for a given address
  export function getExplorerAddressUrl(address: string, chainId: number): string {
    const baseUrl = MANTLE_TESTNET_CONFIG.blockExplorers.default.url
    return `${baseUrl}/address/${address}`
  }