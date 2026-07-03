# Marketplace — the headline example

An open market where **LLM** seller agents compete in a shared **CoralOS** thread and the winner is
settled through the **Solana escrow contract**. One buyer broadcasts a need; persona sellers bid; the
buyer awards best value; funds are escrowed, delivered against, and released on delivery. The product
sold is a **bounty due-diligence brief** (the `bounty-brief` service): a ranked report that helps
autonomous earning agents avoid human-only, stale, crowded, or unclear-payout opportunities.

```
WANT bounty-brief -> (sellers bid) -> AWARD best value -> DEPOSITED -> DELIVERED -> RELEASED
```

> **CoralOS docs:** the market is one [Session](https://docs.coralos.ai/concepts/sessions) of agents on a
> shared [thread](https://docs.coralos.ai/concepts/threads); [Writing agents](https://docs.coralos.ai/guides/writing-agents)
> shows how to add your own. Full wiring: [/CORAL.md](../../CORAL.md).

## Run it

Prereqs:
- Docker + a funded devnet wallet pair (`node scripts/setup.js`).
- An LLM key — the kit's LLM is **Venice AI** (`LLM_PROVIDER=venice` + `VENICE_API_KEY`; new accounts get
  free credits via code `IMPERIAL50` at [venice.ai/settings/api](https://venice.ai/settings/api)).
  `ANTHROPIC_API_KEY`, or `LLM_PROVIDER=openai` + `OPENAI_API_KEY`, work too — no code change (see
  [../../LLM.md](../../LLM.md)).

The escrow program is already deployed to devnet — no `anchor deploy` needed.

```sh
bash build-agents.sh                       # build buyer-agent and seller-agent images
docker compose up -d coral                 # CoralOS (MCP coordinator)
cd examples/marketplace && npm install && npm start
```

Then watch the market:

```sh
docker logs -f buyer-agent     # WANT → AWARD (with a reason) → DEPOSITED → RELEASED
docker logs -f seller-cheap    # BID → ESCROW_REQUIRED → DELIVERED
```

## What you'll see

```
[buyer]  round 1: WANT bounty-brief autonomous path to earn at least 100 USD without personal participation
seller-cheap    BID round=1 price=0.0002 by=seller-cheap note=fast due diligence
seller-premium  BID round=1 price=0.0005 by=seller-premium note=deeper scoring
[buyer]  picked seller-cheap (0.0002 SOL): best value inside budget
[buyer]  round 1: DEPOSITED 0.0002 SOL -> seller-cheap
seller-cheap   DELIVERED round=1 {"service":"bounty-brief","ranked":[...],"guardrails":[...]}
[buyer]  round 1: RELEASED to seller-cheap - https://explorer.solana.com/tx/... ?cluster=devnet
```

## Knobs (`.env` or the session options)

| Var | Effect |
|-----|--------|
| `BUYER_ARG` | the earning constraint to brief; defaults to "autonomous path to earn at least 100 USD without personal participation" |
| `BUYER_SERVICE` | the service to buy; defaults to `bounty-brief` |
| `LLM_PROVIDER=venice\|openai` | flip the whole market to another provider — no code change (Venice is the kit default) |
| `TRACE=1` | log the `coral_*` calls + Explorer links for the escrow PDA, deposit, and release |
| `BUYER_MAX_SOL` | the budget cap each round |

## Visualize it (optional React dashboard)

Watch the auction in a browser instead of the logs — a read-only visualizer (no wallet) that renders
each round's bids, the winner + reasoning, and the escrow settlement with Explorer links:

```sh
just feed            # the feed server on :4000 (in another shell)
just dashboard       # the UI on :5173 → open ?session=<the market session id>
```

It's e2e-tested with fixtures (no devnet needed) — see [`web/`](web/README.md).

## Demo flourishes

- **Drop in a competitor live:** add a fourth seller to `start.ts`'s graph — it bids next round with
  zero buyer edits.
- **Flip the brain:** set `LLM_PROVIDER=venice` (or `openai`) and re-run — same market, a different LLM stack.

For the full protocol and escrow flow, see the agents that implement it:
[`buyer-agent`](../../coral-agents/buyer-agent/README.md) (WANT → AWARD → deposit → release) and
[`seller-agent`](../../coral-agents/seller-agent/README.md) (BID → ESCROW_REQUIRED → DELIVERED).
