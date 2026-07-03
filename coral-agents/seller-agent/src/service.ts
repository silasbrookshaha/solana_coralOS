/**
 * Bounty due-diligence seller service.
 *
 * The agent sells one thing: a compact, decision-ready bounty brief for autonomous earning agents.
 * The buyer pays because every weak bounty attempt wastes review time, GitHub reputation, and agent
 * runtime. The seller returns a deterministic report that ranks opportunities by payout clarity,
 * autonomy fit, competition, delivery effort, and payout risk.
 */

export async function deliverService(request: string): Promise<string> {
  const [first, ...rest] = request.trim().split(/\s+/).filter(Boolean)
  const service = (first ?? 'bounty-brief').toLowerCase()
  if (!['bounty-brief', 'bounty'].includes(service)) {
    return JSON.stringify({ error: 'unsupported service', service, supported: ['bounty-brief'] })
  }
  return JSON.stringify(buildBountyBrief(rest.join(' ')))
}

type Candidate = {
  id: string
  title: string
  rewardUsd: number
  autonomyFit: number
  payoutClarity: number
  competitionRisk: number
  deliveryEffort: number
  notes: string[]
}

const CANDIDATES: Candidate[] = [
  {
    id: 'nostr-sync-tree',
    title: 'nostr.ts sync tree helper',
    rewardUsd: 100,
    autonomyFit: 9,
    payoutClarity: 7,
    competitionRisk: 3,
    deliveryEffort: 4,
    notes: ['direct GitHub PR path', 'issue is labeled paid', 'maintainer review still required'],
  },
  {
    id: 'superteam-agent-economy',
    title: 'Superteam agent economy hackathon',
    rewardUsd: 500,
    autonomyFit: 8,
    payoutClarity: 8,
    competitionRisk: 7,
    deliveryEffort: 9,
    notes: ['agent submissions allowed', 'requires repo, deck, demo video, devnet proof', 'upside is large'],
  },
  {
    id: 'crowded-api-helpers',
    title: 'crowded API helper bounties',
    rewardUsd: 50,
    autonomyFit: 10,
    payoutClarity: 5,
    competitionRisk: 9,
    deliveryEffort: 2,
    notes: ['simple code tasks', 'many duplicate PRs', 'low review priority'],
  },
  {
    id: 'frantic-small-skills',
    title: 'Frantic funded skill tasks',
    rewardUsd: 11,
    autonomyFit: 7,
    payoutClarity: 9,
    competitionRisk: 5,
    deliveryEffort: 5,
    notes: ['visible paid receipts', 'low payout', 'payout method needed after acceptance'],
  },
]

function score(candidate: Candidate): number {
  return Math.round(
    candidate.rewardUsd / 20 +
    candidate.autonomyFit * 1.5 +
    candidate.payoutClarity * 1.4 -
    candidate.competitionRisk * 1.1 -
    candidate.deliveryEffort * 0.8,
  )
}

function buildBountyBrief(request: string) {
  const ranked = CANDIDATES
    .map((candidate) => ({ ...candidate, score: score(candidate) }))
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]

  return {
    service: 'bounty-brief',
    buyerRequest: request || 'autonomous path to earn at least 100 USD without personal participation',
    recommendation: {
      pursueNow: best.id,
      rationale: `${best.title} has the best mix of payout, autonomy, and review path.`,
      nextAction: best.id === 'nostr-sync-tree'
        ? 'Monitor review and prepare a second autonomous submission in parallel.'
        : 'Ship a minimal demo with public repo, deck, demo video, and devnet settlement proof.',
    },
    ranked,
    guardrails: [
      'Skip tasks requiring surveys, interviews, KYC, wallet claim, or personal social posting.',
      'Treat crowded open-race tasks as backup unless the contribution is unique.',
      'Only claim payout after acceptance; do not spend mainnet or existing user assets.',
    ],
    settlementValue: 'The buyer pays for a reusable due-diligence report that prevents low-EV bounty attempts.',
    timestamp: new Date().toISOString(),
  }
}
