# Deployment Guide for Mantle Sepolia Testnet

## Prerequisites

1. **Wallet Setup**: You need a wallet with some testnet ETH on Mantle Sepolia
2. **Private Key**: Your wallet's private key (without 0x prefix)
3. **RPC URL**: Mantle Sepolia testnet RPC endpoint
4. **Etherscan API Key**: For contract verification (optional but recommended)

## Step 1: Create Environment File

Create a `.env` file in your contracts directory with the following content:

```bash
# Your wallet's private key (without 0x prefix)
PRIVATE_KEY=your_actual_private_key_here

# Mantle Sepolia RPC URL
RPC_URL=https://rpc.sepolia.mantle.xyz

# Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Optional: Gas settings
GAS_LIMIT=30000000
GAS_PRICE=1000000000
```

## Step 2: Get Testnet ETH

1. Visit [Mantle Sepolia Faucet](https://faucet.sepolia.mantle.xyz/)
2. Connect your wallet
3. Request testnet ETH (usually 0.1 ETH)

## Step 3: Deploy Contracts

Run the deployment script:

```bash
forge script script/Deploy.s.sol --rpc-url mantle-sepolia-testnet --broadcast --verify --ffi
```

## Step 4: Verify Deployment

Check the deployment status:

```bash
forge script script/Deploy.s.sol --rpc-url mantle-sepolia-testnet --dry-run
```

## Step 5: Update Frontend Configuration

After deployment, update your frontend configuration files with the new contract addresses:

1. Update `frontend/app/lib/contracts/address.ts`
2. Update `frontend/src/config/contracts.ts`

## Troubleshooting

### Common Issues:

1. **Insufficient Balance**: Make sure you have enough testnet ETH
2. **Gas Limit**: Increase GAS_LIMIT if transactions fail
3. **Private Key**: Ensure your private key is correct and has no 0x prefix
4. **RPC Issues**: Try alternative RPC endpoints if the main one fails

### Alternative RPC URLs:
- `https://rpc.sepolia.mantle.xyz`
- `https://sepolia.mantle.xyz`

## Network Information

- **Network Name**: Mantle Sepolia Testnet
- **Chain ID**: 5001
- **Currency**: MNT (testnet)
- **Block Explorer**: https://explorer.sepolia.mantle.xyz


