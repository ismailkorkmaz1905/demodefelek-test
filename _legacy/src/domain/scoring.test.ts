import { describe, expect, it } from 'vitest'
import { wheelSegments } from '../config/wheel'
import {
  applyBankruptcy,
  applyLetterScore,
  applyVowelCost,
  applyWrongAnswerPenalty,
  displayedTotalScore,
  finishRound,
  rankFinalists,
  transferRoundScore,
} from './scoring'

describe('scoring', () => {
  it('adds point segment value for each occurrence', () => {
    expect(applyLetterScore(100, wheelSegments[0], 3)).toBe(400)
  })

  it('applies 2x multiplier when provided', () => {
    expect(applyLetterScore(0, wheelSegments[0], 2, 2)).toBe(400)
  })

  it('keeps PAS score unchanged through non-point segment', () => {
    const pass = wheelSegments.find((segment) => segment.kind === 'PASS')!
    expect(applyLetterScore(300, pass, 1)).toBe(300)
  })

  it('resets round score on bankruptcy', () => {
    expect(applyBankruptcy()).toBe(0)
  })

  it('charges vowels unless free letter is active', () => {
    expect(applyVowelCost(300)).toBe(100)
    expect(applyVowelCost(300, true)).toBe(300)
  })

  it('does not let wrong-answer penalty go below zero', () => {
    expect(applyWrongAnswerPenalty(100)).toBe(0)
  })

  it('adds solve bonus when finishing a round', () => {
    expect(finishRound(1000, 300)).toBe(1800)
  })

  it('transfers RAKİPTEN 250 between current round scores only', () => {
    const matarBanked = 0
    const ronvislyBanked = 0
    const result = transferRoundScore(3600, 3450, 250)

    expect(result).toEqual({
      activeRoundScore: 3850,
      opponentRoundScore: 3200,
      transferAmount: 250,
    })
    expect(displayedTotalScore(matarBanked, result.activeRoundScore)).toBe(3850)
    expect(displayedTotalScore(ronvislyBanked, result.opponentRoundScore)).toBe(3200)
  })

  it('keeps banked scores unchanged during RAKİPTEN 250', () => {
    const matarBanked = 1000
    const ronvislyBanked = 2000
    const result = transferRoundScore(3600, 3450, 250)

    expect(displayedTotalScore(matarBanked, result.activeRoundScore)).toBe(4850)
    expect(displayedTotalScore(ronvislyBanked, result.opponentRoundScore)).toBe(5200)
  })

  it('banks a completed round once without double counting displayed total', () => {
    const bankedAfterRound = finishRound(1000, 3850, 0)

    expect(bankedAfterRound).toBe(4850)
    expect(displayedTotalScore(bankedAfterRound, 0)).toBe(4850)
  })

  it('keeps banked score after bankruptcy and removes only round score from displayed total', () => {
    const bankedScore = 4000
    const roundScore = applyBankruptcy()

    expect(roundScore).toBe(0)
    expect(displayedTotalScore(bankedScore, roundScore)).toBe(4000)
  })

  it('selects top two finalists', () => {
    expect(rankFinalists([{ id: 'a', totalScore: 1 }, { id: 'b', totalScore: 9 }, { id: 'c', totalScore: 5 }])).toEqual([
      { id: 'b', totalScore: 9 },
      { id: 'c', totalScore: 5 },
    ])
  })
})
