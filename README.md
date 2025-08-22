# PayFlow — Smart Wallet + Identifier Payments

A full-stack web3 application that lets users deploy a smart-contract wallet and send/receive crypto using human-friendly identifiers (phone numbers or usernames) instead of raw addresses.

- Frontend: Next.js (App Router) + TypeScript + Tailwind + framer-motion, Wallet via RainbowKit/Wagmi/Viem.
- Contracts: Solidity (Foundry), proxy execution pattern for secure payments routed through each user's smart wallet.
- Network: Mantle Sepolia Testnet (configurable).

Demo: https://www.loom.com/share/aca09b6274554307b2e6c24824059a3d


## Key Features
- Human-readable payments using phone numbers or usernames
- Personal smart wallet deployment per user
- Proxy execution for secure value transfer (owner-validated)
- ETH and ERC-20 token support (extensible)
- Batch payment UX scaffolding
- Modern, animated UI with reusable components


## Repository Structure
```
smartwallet-hackathon/
├─ contracts/                     # Solidity codebase (Foundry)
│  ├─ src/                        # Core contracts
│  ├─ script/                     # Deployment scripts
│  ├─ test/                       # Foundry tests
│  ├─ deployments/                # Saved deployment artifacts
│  ├─ foundry.toml                # Foundry configuration
│  ├─ DEPLOYMENT_GUIDE.md         # Contract deployment guide
│  ├─ PROXY_PATTERN_IMPLEMENTATION.md
│  ├─ README.md                   # Foundry usage reference
│  └─ deploy.md                   # Additional deployment notes
├─ frontend/                      # Next.js app
│  ├─ app/                        # App Router pages and UI
│  ├─ src/                        # Shared libs (hooks, contracts, etc.)
│  ├─ package.json                # Frontend dependencies/scripts
│  └─ ...
├─ FINAL_IMPLEMENTATION_STATUS.md # Summary of proxy pattern changes
└─ IMPLEMENTATION_STATUS.md       # Progress tracking
```


## Deployed Contracts (Mantle Testnet)

- Network: `mantle-testnet`
- Chain ID: `5001`
- Deployer: `0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38`
- Deployed At (Unix): `1754125712`

| Contract              | Address                                      |
| --------------------- | -------------------------------------------- |
| UserRegistry          | `0xe4EaD55d3a66D33346d673F0462D1c1c56Ce823B` |
| WalletFactory         | `0x19d4394Fd05576C0D5DE1b46ebE171D794Bf1B03` |
| SmartWallet Impl.     | `0xf898fb31c7Dc1E6ab08B95f051f6d60cf9d4CcA9` |
| Sample SmartWallet    | `0x76b012353964f95BF01c76Df6Ae8659bf2F92B05` |
| PaymentProcessor      | `0x4Df8049D6ef34fF94a5eb86030a0D6d2c1FD6050` |

Artifacts/addresses are also saved under `contracts/deployments/` (see `contracts/deploy.md`).


## Architecture Overview
- Smart Wallet (Solidity): Users interact via a wallet address that owns a dedicated smart wallet contract. All payments are executed through the smart wallet (not the EOA directly), enforcing owner verification and correct balance routing.
- Identifier Registry: Maps phone numbers/usernames to the recipient's smart wallet. Senders specify an identifier; the contract resolves and routes funds.
- Frontend (Next.js): Connects wallet, deploys smart wallet, registers identifiers, and performs payments via Wagmi/Viem and custom hooks.

See `FINAL_IMPLEMENTATION_STATUS.md` for the proxy pattern design and migration notes.


## Prerequisites
- Node.js 18+ and pnpm/npm/yarn
- Foundry (forge, cast, anvil): https://book.getfoundry.sh/getting-started/installation
- A Mantle Sepolia RPC URL + funded test wallet for deployments


## Contracts: Setup & Commands
1) Install deps and build
```
cd contracts
forge build
```

2) Run tests
```
forge test
```

3) Configure environment
- Copy `.env.example` to `.env` and fill values:
```
RPC_URL="https://rpc.mantle.xyz/sepolia"   # example
PRIVATE_KEY="0x..."                        # deployer key (test only)
```

4) Deploy (example)
```
forge script script/Deploy.s.sol \
  --rpc-url $RPC_URL \
  --broadcast \
  --verify
```

More details in `contracts/DEPLOYMENT_GUIDE.md` and `PROXY_PATTERN_IMPLEMENTATION.md`.


## Frontend: Setup & Commands
1) Install deps
```
cd frontend
npm install
```

2) Development
```
npm run dev
```
The app runs at http://localhost:3000

3) Production build
```
npm run build
npm start
```

### Frontend Environment
Create `frontend/.env.local` as needed. Typical variables:
```
# Example placeholders (adjust to your app conventions)
NEXT_PUBLIC_NETWORK_NAME="mantle-sepolia"
NEXT_PUBLIC_RPC_URL="https://rpc.mantle.xyz/sepolia"
# Contract addresses after deployment
NEXT_PUBLIC_SMART_WALLET_ADDRESS="0x..."
NEXT_PUBLIC_IDENTIFIER_REGISTRY_ADDRESS="0x..."
```
Refer to `FINAL_IMPLEMENTATION_STATUS.md` for where to update addresses in code (e.g., `frontend/app/lib/contracts/...`).


## Important Pages & Components
- `frontend/app/how-it-works/page.tsx` — product tour + embedded demo video
- `frontend/app/dashboard/SendPaymentModal.tsx` — single payment flow
- `frontend/app/dashboard/BatchPaymentModal.tsx` — batch payment UI scaffold
- `frontend/app/components/ui/Button.tsx` — shared button with loading state


## Payments Flow (Proxy Pattern)
- Frontend calls proxy methods on the user’s Smart Wallet contract:
  - `executePayment(identifier, amount, ownerAddress)`
  - `executeTokenPayment(identifier, token, amount, ownerAddress)`
- The smart wallet verifies `msg.sender == ownerAddress && owner == ownerAddress`.
- The wallet resolves the identifier to the recipient wallet and transfers funds.

Why: Prevents direct EOA-to-contract calls that previously misrouted balances. See `FINAL_IMPLEMENTATION_STATUS.md` for full context.


## Network & Tokens
- Default network: Mantle Sepolia Testnet (adjust via env).
- ETH and common ERC-20 (e.g., USDC, USDT) supported on the frontend; contracts are extensible.


## Troubleshooting
- Contracts
  - Check compiler version and remappings if `forge build` fails.
  - Verify your RPC and private key in `.env` when deploying.
- Frontend
  - Ensure contract addresses/ABIs match deployed contracts.
  - Confirm RPC URL and chain config are correct.
  - Open devtools console for hook/ABI mismatch errors.


## Contributing
- Use feature branches and conventional commits where possible.
- Add tests for contract changes (`contracts/test/`).
- Keep UI components reusable and typed (TypeScript + Tailwind).


## License
MIT (or your preferred license). Update this section if different.


## Acknowledgements
- Foundry, OpenZeppelin Contracts
- RainbowKit, Wagmi, Viem
- Mantle Network (Sepolia testnet)
