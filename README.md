# dSOC: Decentralized SOC-as-a-Service

A fully static Web dApp built for the IOTA hackathon that demonstrates a decentralized Security Operations Center platform with complete Trust Framework integration.

## 🎯 Overview

dSOC enables:
- **Clients** to open incident tickets and stake funds (gas-free)
- **Analysts** to claim tickets, upload evidence, and receive bounties + CLT rewards
- **Certifiers** to validate evidence and trigger on-chain payout/refund

All contract calls and Trust Framework actions happen directly in the browser—no backend server, no secret keys.

## 🏗️ Architecture

### Smart Contract Layer (Move on IOTA L1)

**SOCService.move**
- `create_ticket(stake: u64, evidence_hash: vector<u8>)` - IOTA Identity verification, Gas Station wrapped
- `assign_analyst(ticket_id: u64)` - Analyst VC verification
- `submit_evidence(ticket_id: u64, evidence_hash: vector<u8>)` - IOTA Notarization anchoring
- `validate_and_payout(ticket_id: u64, approved: bool)` - Certifier VC verification, CLT minting

**CLTReward.move**
- AnalystBonus CLT (non-transferable, purpose-bound)
- `mint_bonus(analyst: address, amount: u64)` - Called by SOCService only

### Trust Framework Integration

✅ **IOTA Identity** - DID-based role verification (Client, Analyst, Certifier VCs)  
✅ **IOTA Notarization** - SHA-256 evidence hash anchoring  
✅ **IOTA Gas Station** - Zero-fee transactions for all users  
✅ **IOTA CLTs** - AnalystBonus tokens with utility benefits  

### Frontend Stack

- **Framework**: Next.js with static export
- **UI**: Tailwind CSS + shadcn/ui
- **Wallet**: @iota/firefly-connect
- **Ledger**: @iota/sdk-wasm (client-side Move TX building)
- **Identity**: @iota/identity-wasm (browser VC verification)
- **Storage**: Web3.Storage (IPFS) + IndexedDB (local cache)

## 🚀 Features

### Client Portal (`/client`)
- Firefly wallet connection with Client VC verification
- Create incident tickets with evidence upload
- Stake funds in smart contract escrow
- Real-time ticket status tracking
- IPFS evidence storage with SHA-256 hashing

### Analyst Portal (`/analyst`)
- Analyst VC verification and reputation display
- Browse and claim available tickets
- Evidence submission with IPFS upload
- IOTA Notarization anchoring
- CLT balance tracking and rewards

### Certifier Portal (`/certifier`)
- Certifier VC verification
- Review analyst evidence via IPFS gateway
- Approve/reject with automated payout/refund
- CLT minting for successful validations
- Validation performance metrics

## 🛠️ Development

### Prerequisites
```bash
# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Update with your IOTA node, contract addresses, and Web3.Storage token
```

### Build & Deploy
```bash
# Development
npm run dev

# Static build
npm run build
# Outputs to ./out/ directory

# Deploy to any static host (Vercel, Netlify, IPFS, etc.)
```

### Smart Contract Deployment
1. Deploy Move contracts to IOTA testnet
2. Update contract addresses in `.env.local`
3. Fund Gas Station address for sponsored transactions

## 🎮 Demo Flow

1. **Client**: Connect Firefly → Create incident → Upload evidence → Stake funds
2. **Analyst**: Connect Firefly → Claim ticket → Submit resolution → Evidence anchored
3. **Certifier**: Connect Firefly → Review evidence → Approve → Payout + CLT mint

## 🏆 Hackathon Highlights

- **Technical**: Formal Move modules with full Trust Framework coverage
- **Innovation**: First DeFi-style SOC marketplace with CLT incentives
- **Viability**: Lowers barrier for SMEs to access professional security
- **UX**: Role-tailored, gas-free, modern static web app
- **Presentation**: Complete end-to-end flow in under 2 minutes

## 📁 Project Structure

```
├── app/
│   ├── client/          # Client portal
│   ├── analyst/         # Analyst portal  
│   ├── certifier/       # Certifier portal
│   └── page.tsx         # Landing page
├── lib/
│   ├── iota.ts          # IOTA SDK utilities
│   ├── firefly.ts       # Wallet integration
│   └── storage.ts       # IPFS + IndexedDB
├── hooks/
│   ├── useFirefly.ts    # Wallet connection
│   ├── useContract.ts   # Smart contract calls
│   └── usePolling.ts    # Real-time updates
└── components/ui/       # shadcn/ui components
```

## 🔗 Links

- **Live Demo**: [Deployed static site URL]
- **Smart Contracts**: [IOTA Explorer links]
- **Video Demo**: [2-minute demonstration]
- **Pitch Deck**: [PDF presentation]

## 📄 License

MIT License - Built for IOTA Hackathon 2024