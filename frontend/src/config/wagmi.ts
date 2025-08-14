import { createConfig, configureChains } from 'wagmi'
import { mainnet, sepolia, localhost } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

// Define Mantle Sepolia Testnet
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

// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia, localhost, mantleSepoliaTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === 5003) {
          return {
            http: 'https://rpc.sepolia.mantle.xyz',
            webSocket: 'wss://ws.sepolia.mantle.xyz',
          }
        }
        return null
      },
    }),
    publicProvider(),
  ]
)

// Get project ID from environment
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id'

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
        metadata: {
          name: 'Smart Wallet Hackathon',
          description: 'Smart Wallet DApp',
          url: 'https://localhost:3000',
          icons: ['https://avatars.githubusercontent.com/u/37784886']
        }
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}