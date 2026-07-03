# Bounty Brief Market

This fork turns the Solana x CoralOS starter kit into a paid due-diligence market for autonomous earning agents.

## What It Sells

The seller agent sells a `bounty-brief`: a ranked opportunity report that helps an autonomous agent decide which paid task to pursue without requiring human participation. The report scores each candidate by payout clarity, autonomy fit, competition risk, delivery effort, and expected value.

## Customer

The customer is an autonomous coding or research agent trying to earn money from public bounties. It pays because weak bounty attempts waste runtime, review attention, GitHub reputation, and submission windows.

## Economy Loop

```text
WANT bounty-brief
  -> sellers BID on price and quality
  -> buyer AWARDs best value
  -> buyer DEPOSITs devnet SOL into escrow
  -> seller DELIVERs a ranked bounty brief
  -> arbiter RELEASEs escrow to the winning seller
```

The settlement reference is bound to the round, service, argument, seller wallet, and price so the on-chain order maps to the delivered artifact.

## One-Command Demo

After `.env` has devnet wallets and the buyer wallet has devnet SOL:

```sh
bash build-agents.sh
docker compose up -d coral
TRACE=1 CORAL_SERVER_URL=http://127.0.0.1:5555 npm run demo:bounty-brief
```

Set `TRACE=1` in `.env` to print Solana Explorer links for the deposit and release transactions.

## Current Local Validation

Validated locally on 2026-07-03:

- `bash build-agents.sh` builds both Docker images.
- `npm run demo:bounty-brief` creates a CoralOS market session.
- The buyer broadcasts `WANT bounty-brief`.
- Two seller personas receive the WANT; `seller-cheap` bids from a 0.0003 SOL floor and `seller-premium` from a 0.0008 SOL floor.
- The buyer awards best value before attempting escrow deposit.

Current environment blocker for live settlement proof:

- The local network times out against `https://api.devnet.solana.com`.
- `https://devnet.helius-rpc.com` responds but requires an API key for account/transaction methods, so escrow deposit fails before a Solana Explorer transaction can be produced.
- The official Solana web faucet should not be used by AI agents; use a programmatic devnet RPC/faucet route or an approved devnet RPC API key to complete the final `DEPOSITED -> DELIVERED -> RELEASED` proof.

## Files Changed

- `coral-agents/seller-agent/src/service.ts` implements the paid bounty-brief artifact.
- `coral-agents/seller-agent/src/bidder.ts` defaults the seller inventory/persona to `bounty-brief`.
- `coral-agents/buyer-agent/src/index.ts` and `src/goal.ts` default the buyer to autonomous earning due diligence.
- `examples/marketplace/start.ts` launches two bounty-brief seller personas without requiring TxLINE credentials.
- `.dockerignore` keeps generated dependencies, local wallets, logs, and build artifacts out of Docker context.

## Submission Checklist

- Public GitHub repo link
- 5-slide pitch deck
- 3-minute demo video
- Solana Explorer deposit/release link from a live devnet run
- No `.env`, private keys, API keys, payout addresses, or user-owned assets committed
