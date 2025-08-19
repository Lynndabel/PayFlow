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
  USER_REGISTRY: '0xb35DafC1FddA3Abe74786151318b5F5441b213D1' as `0x${string}`,
  SMART_WALLET: '0xC54fa7206d77886E41F600AFadF5bF01DC8caCe8' as `0x${string}`,
  WALLET_FACTORY: '0x7E4Ea4F7D4fA6F71cAb1425518Fd8031C7893EA4' as `0x${string}`,
  SMART_WALLET_IMPLEMENTATION: '0xeC4483A748c9E391CaaB9E5fFBd455A839Bc09c6' as `0x${string}`,
  PAYMENT_PROCESSOR: '0x9C2D297672c909Bac8eC5FBf343DB5AeF2209203' as `0x${string}`,
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
  
  // Token addresses (add as needed)
  export const TOKEN_ADDRESSES = {
    USDC: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F' as `0x${string}`,
    USDT: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9' as `0x${string}`,
    DAI: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844' as `0x${string}`,
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