import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deliverService } from './service.js'

describe('deliverService bounty-brief routing', () => {
  const realFetch = global.fetch

  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY
    delete process.env.OPENAI_API_KEY
    delete process.env.VENICE_API_KEY
    delete process.env.LLM_PROVIDER
  })

  afterEach(() => {
    global.fetch = realFetch
    vi.restoreAllMocks()
  })

  it('rejects unsupported services', async () => {
    const out = JSON.parse(await deliverService('coingecko eth'))
    expect(out).toEqual({ error: 'unsupported service', service: 'coingecko', supported: ['bounty-brief'] })
  })

  it('returns a ranked bounty due-diligence brief', async () => {
    const out = JSON.parse(await deliverService('bounty-brief agent autonomous USD100'))
    expect(out).toMatchObject({
      service: 'bounty-brief',
      buyerRequest: 'agent autonomous USD100',
      settlementValue: expect.stringContaining('due-diligence report'),
    })
    expect(out.recommendation.pursueNow).toBeTruthy()
    expect(out.ranked[0].score).toBeGreaterThanOrEqual(out.ranked[1].score)
  })

  it('includes user-participation guardrails', async () => {
    const out = JSON.parse(await deliverService('bounty no personal participation'))
    expect(out.guardrails.join(' ')).toContain('surveys')
    expect(out.guardrails.join(' ')).toContain('KYC')
    expect(out.guardrails.join(' ')).toContain('mainnet')
  })
})
