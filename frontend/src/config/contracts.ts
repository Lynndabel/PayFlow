// Contract addresses deployed on Mantle Sepolia Testnet
export const CONTRACT_ADDRESSES = {
  // Add your deployed contract addresses here
  USER_REGISTRY: "0x...", // Replace with actual address
  SMART_WALLET_FACTORY: "0x...", // Replace with actual address
  SMART_WALLET_IMPLEMENTATION: "0x...", // Replace with actual address
  PAYMENT_PROCESSOR: "0x...", // Replace with actual address
}

export const NETWORK_CONFIG = {
  name: "Mantle Sepolia Testnet",
  rpcUrl: "https://rpc.sepolia.mantle.xyz",
  blockExplorer: "https://explorer.sepolia.mantle.xyz",
  chainId: 5003,
}

// Deployment info
export const DEPLOYMENT_INFO = {
  deployerAddress: "0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38",
  deployedAt: 1754125712,
  deploymentFee: "1000000000000000", // wei
  reservedUsernames: 8,
} as const;
