import { describe, expect, it } from 'vitest'
import { assertTransition, canTransition } from './stateMachine'

describe('state machine', () => {
  it('allows valid transitions', () => {
    expect(canTransition('LOBBY', 'INTRO')).toBe(true)
  })

  it('rejects invalid transitions', () => {
    expect(() => assertTransition('LOBBY', 'FINISHED')).toThrow('Invalid transition')
  })
})
