import { describe, expect, it } from 'vitest'
import { resolveSpinDisplay } from './spinDisplay'

describe('resolveSpinDisplay', () => {
  it('hides the real result while the spin is running', () => {
    const display = resolveSpinDisplay({
      wheelState: 'spinning',
      activePlayerName: 'MATAR',
      settledLastEvent: 'MATAR çarkı çevirdi: 400',
      displayedSpinResult: null,
    })

    expect(display.lastEvent).toBe('MATAR çarkı çeviriyor...')
    expect(display.expectedAction).toBe('Çark dönüyor.')
    expect(display.wheelResult).toBe('Dönüyor...')
    expect(Object.values(display).join(' ')).not.toContain('400')
  })

  it('shows the result after animation complete', () => {
    const display = resolveSpinDisplay({
      wheelState: 'settled',
      activePlayerName: 'MATAR',
      settledLastEvent: 'MATAR çarkı çevirdi: 400',
      displayedSpinResult: '400',
      awaitingLetter: true,
    })

    expect(display.lastEvent).toBe('MATAR çarkı çevirdi: 400')
    expect(display.expectedAction).toBe('Host harf seçmeli.')
    expect(display.wheelResult).toBe('400')
  })

  it.each(['İFLAS', 'PAS'])('hides %s before animation complete', (segment) => {
    const display = resolveSpinDisplay({
      wheelState: 'spinning',
      activePlayerName: 'MATAR',
      settledLastEvent: `MATAR çarkı çevirdi: ${segment}`,
      displayedSpinResult: null,
    })

    expect(Object.values(display).join(' ')).not.toContain(segment)
    expect(display.wheelResult).toBe('Dönüyor...')
  })

  it('clears the previous spin result when a new spin starts', () => {
    const display = resolveSpinDisplay({
      wheelState: 'spinning',
      activePlayerName: 'MATAR',
      settledLastEvent: 'MATAR çarkı çevirdi: PAS',
      displayedSpinResult: null,
    })

    expect(display.wheelResult).toBe('Dönüyor...')
    expect(Object.values(display).join(' ')).not.toContain('PAS')
  })
})
