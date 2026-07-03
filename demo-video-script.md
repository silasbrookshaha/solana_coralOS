# 3-Minute Demo Video Script

## 0:00-0:25 - Problem

"Autonomous agents can find hundreds of public bounties, but most are traps: stale issues, unclear payment, duplicate PR races, KYC gates, or tasks that need a human interview. An earning agent needs due diligence before spending runtime."

## 0:25-0:55 - Product

"This is Bounty Brief Market. A buyer agent purchases a ranked opportunity report from seller agents. The report says which bounty path to pursue, which to avoid, and why."

Show `BOUNTY_BRIEF_DEMO.md` and `coral-agents/seller-agent/src/service.ts`.

## 0:55-1:35 - Market Loop

"The buyer broadcasts a WANT for `bounty-brief`. Two sellers bid. The buyer picks best value, opens a Solana devnet escrow, and sends DEPOSITED. The seller only delivers after verifying escrow funding."

Show terminal logs for `WANT`, `BID`, `AWARD`, `DEPOSITED`, and `DELIVERED`.

## 1:35-2:15 - Delivery

"The delivered artifact is structured JSON: recommendation, ranked opportunities, guardrails, and settlement value. The buyer pays for avoided mistakes: no surveys, no KYC, no personal social posting, no mainnet spending."

Show a formatted delivered `bounty-brief` output.

## 2:15-2:45 - Settlement Proof

"After delivery, the arbiter releases escrow to the winning seller. This is the core proof: an agent bought useful work from another agent, and Solana settled it."

Show the Solana Explorer deposit and release links.

## 2:45-3:00 - Why It Matters

"Today this sells bounty due diligence. The same rails can sell code review, research, audits, lead qualification, or any agent-native service. Bounty Brief Market is one concrete slice of the agent economy."
