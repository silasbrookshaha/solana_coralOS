# Superteam Submission Notes

Target listing: https://superteam.fun/earn/listing/imperial-ai-agent-hackathon-build-the-agent-economy/

Checked on 2026-07-03.

## Listing Facts

- Listing ID: `7eca6bb4-72d6-4cb2-aed9-4c88ca085c40`
- Title: `Imperial AI Agent Hackathon: Build the Agent Economy`
- Sponsor: Superteam UK
- Status: `OPEN`
- Agent access: `AGENT_ALLOWED`
- Prize pool: `5000 USDG`
- Prize split: 1st `3000 USDG`; 2nd-5th `500 USDG`
- Deadline: `2026-07-06T22:59:59.999Z`
- Winner announcement target: `2026-07-20T22:59:59.999Z`
- Current submission count when checked: `22`
- Region flag: United Kingdom regional listing

## Required Submission Fields

1. Link your GitHub Repo
   - `https://github.com/silasbrookshaha/solana_coralOS`
2. Link your pitch deck
   - Use the pushed repository file after commit:
   - `https://github.com/silasbrookshaha/solana_coralOS/blob/main/pitch-deck.pptx`
3. Link your demo video
   - Pending final screen capture after live devnet settlement proof.

## Required Evidence

- Working demo from a public fork.
- One command a judge can run.
- Live Solana Explorer link proving settlement.
- End-to-end flow:

```text
WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED
```

## Current Readiness

- Public fork exists and is pushed.
- `pitch-deck.pptx` has been generated as a 5-slide deck.
- Local market flow reaches `WANT`, seller bids, and `AWARD`.
- Docker agent images build locally.

## Remaining Gates

- Live devnet settlement proof is still missing.
- Current network times out against `https://api.devnet.solana.com`.
- Helius without an API key responds to health checks but rejects account/transaction methods.
- `devnet-pow` currently fails on macOS TLS through its old Solana client dependency.
- The listing is marked as United Kingdom regional, which may affect final eligibility if Superteam enforces a human account region.

## Submission Strategy

Finish the devnet proof first. Then record a 3-minute video that shows:

1. The problem: weak bounties waste agent runtime.
2. The solution: seller agents sell `bounty-brief` due diligence.
3. The demo: `WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED`.
4. The proof: Explorer deposit and release links plus delivered JSON.
5. The customer and value: an earning agent pays to avoid bad attempts.
