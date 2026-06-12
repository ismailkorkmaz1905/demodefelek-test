import { describe, expect, it } from 'vitest'
import {
  MAX_SPIN_DURATION_MS,
  MIN_SPIN_DURATION_MS,
  createSpinDurationMs,
  getSpinDurationMsForSpin,
} from './spinDuration'

describe('spin duration', () => {
  it('keeps 1000 generated spin durations between 5000 and 10000 ms', () => {
    for (let index = 0; index < 1000; index += 1) {
      const duration = createSpinDurationMs()

      expect(duration).toBeGreaterThanOrEqual(MIN_SPIN_DURATION_MS)
      expect(duration).toBeLessThanOrEqual(MAX_SPIN_DURATION_MS)
    }
  })

  it('uses the same spinDurationMs from the authoritative spin object', () => {
    const spin = { spinId: 'spin-1', spinDurationMs: 6810 }

    expect(getSpinDurationMsForSpin(spin, () => 0)).toBe(6810)
    expect(getSpinDurationMsForSpin(spin, () => 1)).toBe(6810)
  })

  it('keeps the result hidden before animation complete regardless of duration', () => {
    const spin = { spinId: 'spin-1', spinDurationMs: 9730, segmentLabel: '400' }
    const visibleWheelResult = spin.spinDurationMs > 0 ? 'Dönüyor...' : spin.segmentLabel

    expect(visibleWheelResult).toBe('Dönüyor...')
    expect(visibleWheelResult).not.toBe('400')
  })

  it('supports 5000 ms and 10000 ms boundary values', () => {
    expect(createSpinDurationMs(() => 0)).toBe(5000)
    expect(createSpinDurationMs(() => 0.999999)).toBe(10000)
  })

  it('does not generate a new duration when the same spinId is replayed', () => {
    const spin = { spinId: 'spin-2', spinDurationMs: 7420 }

    expect(getSpinDurationMsForSpin(spin, () => 0.2)).toBe(7420)
    expect(getSpinDurationMsForSpin(spin, () => 0.8)).toBe(7420)
  })
})
