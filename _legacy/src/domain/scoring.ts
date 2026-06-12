import { gameConfig } from '../config/game'
import type { WheelSegment } from '../config/wheel'

export function applyLetterScore(roundScore: number, segment: WheelSegment, occurrenceCount: number, multiplier = 1) {
  if (segment.kind !== 'POINTS' || !segment.value) return roundScore
  return roundScore + segment.value * occurrenceCount * multiplier
}

export function applyVowelCost(roundScore: number, freeLetter = false) {
  return freeLetter ? roundScore : roundScore - gameConfig.vowelCost
}

export function applyWrongAnswerPenalty(roundScore: number) {
  return Math.max(0, roundScore - gameConfig.wrongAnswerPenalty)
}

export function applyBankruptcy() {
  return 0
}

export function finishRound(totalScore: number, roundScore: number, solveBonus: number = gameConfig.solveBonus) {
  return totalScore + roundScore + solveBonus
}

export function displayedTotalScore(totalScore: number, roundScore: number) {
  return totalScore + roundScore
}

export function transferRoundScore(activeRoundScore: number, opponentRoundScore: number, amount: number) {
  const transferAmount = Math.min(amount, opponentRoundScore)
  return {
    activeRoundScore: activeRoundScore + transferAmount,
    opponentRoundScore: opponentRoundScore - transferAmount,
    transferAmount,
  }
}

export function rankFinalists(players: Array<{ id: string; totalScore: number }>) {
  return [...players].sort((a, b) => b.totalScore - a.totalScore).slice(0, 2)
}
