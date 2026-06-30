import { describe, it, expect } from 'vitest'
import { analyzeEdge, deterministicCall } from './edge.js'

const odds = [{ SuperOddsType: '1X2 (de-margined)', PriceNames: ['part1', 'draw', 'part2'], Pct: [62.4, 22.1, 15.5] }]
const fixtures = [{ FixtureId: 9001, Competition: 'World Cup', Participant1: 'Brazil', Participant2: 'Serbia' }]

describe('deterministicCall — favourite by implied %', () => {
  it('picks the highest-probability outcome with a confidence', () => {
    const a = deterministicCall({ names: ['part1', 'draw', 'part2'], pct: [62.4, 22.1, 15.5] }, { home: 'Brazil', away: 'Serbia' })
    expect(a.call).toMatch(/Brazil/)
    expect(a.confidence).toBeCloseTo(0.62, 2)
  })
  it('handles an empty market', () => {
    expect(deterministicCall(undefined, undefined).call).toBe('odds unavailable')
  })
})

describe('analyzeEdge — verified snapshots → call', () => {
  it('resolves teams + market and falls back to deterministic when the LLM throws', async () => {
    const edge = await analyzeEdge({ fixtureId: 9001, odds, fixtures }, async () => { throw new Error('no key') })
    expect(edge.teams?.home).toBe('Brazil')
    expect(edge.market?.pct).toEqual([62.4, 22.1, 15.5])
    expect(edge.analysis.call).toMatch(/Brazil/)
  })
  it('uses the LLM call when one is returned', async () => {
    const edge = await analyzeEdge({ fixtureId: 9001, odds, fixtures }, async () => JSON.stringify({ call: 'Back Brazil -1', confidence: 0.7 }))
    expect(edge.analysis.call).toBe('Back Brazil -1')
    expect(edge.analysis.confidence).toBe(0.7)
  })
})
