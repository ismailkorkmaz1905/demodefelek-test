import { describe, expect, it } from 'vitest'
import { activePuzzles, samplePuzzles } from '../data/puzzles'
import { isSelectablePuzzle, selectNextPuzzle, splitBalancedLines } from './memePuzzleSelection'
import { isGuessableLetter, toTurkishUpper } from './puzzle'
import type { MemeQuotePuzzle } from './types'

const bannedAnswers = [
  'Sabır acıdır meyvesi tatlıdır, acıya dayanmayan tatlıya kavuşamaz',
  'Atı alan Üsküdarı geçti, geçmişe bakıp ah çekmek onu geri getirmez',
  'Futbol basit bir oyundur ama basit oynamak zordur',
]

describe('clean puzzle seed', () => {
  it('contains exactly 15 active proverbs and 15 active idioms', () => {
    expect(activePuzzles.filter((puzzle) => puzzle.category === 'Atasözü').length).toBe(15)
    expect(activePuzzles.filter((puzzle) => puzzle.category === 'Deyim').length).toBe(15)
  })

  it('keeps approved modern candidates disabled until source verification', () => {
    const candidates = samplePuzzles.filter((puzzle) => puzzle.id.startsWith('candidate-'))

    expect(candidates).toHaveLength(9)
    expect(candidates.every((puzzle) => puzzle.reviewed && !puzzle.verified && !puzzle.enabled && !puzzle.sourceUrl)).toBe(true)
    expect(candidates.every((puzzle) => !isSelectablePuzzle(puzzle))).toBe(true)
  })

  it('does not keep banned legacy content active', () => {
    const activeAnswers = activePuzzles.map((puzzle) => puzzle.answer)
    const activeSpeakers = new Set(activePuzzles.map((puzzle) => puzzle.speaker))

    expect(bannedAnswers.every((answer) => !activeAnswers.includes(answer))).toBe(true)
    expect(activeSpeakers.has('Mustafa Kemal Atatürk')).toBe(false)
    expect(activeSpeakers.has('Yılmaz Güney')).toBe(false)
    expect(activeSpeakers.has('Jose Mourinho')).toBe(false)
    expect(activeSpeakers.has('Gary Lineker')).toBe(false)
    expect(activeSpeakers.has('Bill Shankly')).toBe(false)
  })

  it('keeps Turkish characters in required records', () => {
    const answers = samplePuzzles.map((puzzle) => puzzle.answer)

    expect(answers).toContain('Ağzında bakla ıslanmamak')
    expect(answers).toContain('Ayağını yorganına göre uzat')
    expect(answers).toContain('Doğruların kaderidir yalnızlık')
    expect(answers).toContain('Kargalar sürüyle, kartal yalnız uçar')
  })

  it('has no duplicate active answers and no active answer over 70 Turkish letters', () => {
    const answers = activePuzzles.map((puzzle) => puzzle.normalizedAnswer)

    expect(new Set(answers).size).toBe(answers.length)
    expect(activePuzzles.every((puzzle) => [...toTurkishUpper(puzzle.answer)].filter(isGuessableLetter).length <= 70)).toBe(true)
  })

  it('selects only enabled, reviewed and verified records', () => {
    const base = samplePuzzles[0]
    const invalidRecords: MemeQuotePuzzle[] = [
      { ...base, id: 'invalid-unverified', verified: false },
      { ...base, id: 'invalid-unreviewed', reviewed: false },
      { ...base, id: 'invalid-disabled', enabled: false },
    ]

    expect(invalidRecords.every((puzzle) => !isSelectablePuzzle(puzzle))).toBe(true)
  })
})

describe('clean puzzle selection', () => {
  it('does not repeat an answer in the same session', () => {
    const history = activePuzzles.slice(0, 10).map((puzzle) => ({
      id: puzzle.id,
      speaker: puzzle.speaker,
      category: puzzle.category,
      contentType: puzzle.contentType,
      answer: puzzle.answer,
    }))
    const next = selectNextPuzzle(activePuzzles, history, () => 0)

    expect(next).not.toBeNull()
    expect(history.map((item) => item.answer)).not.toContain(next!.answer)
  })

  it('splits active answers into at most four lines without breaking words', () => {
    expect(activePuzzles.every((puzzle) => {
      const lines = splitBalancedLines(puzzle.answer)
      return lines.length <= 4 && lines.join(' ') === puzzle.answer
    })).toBe(true)
  })
})
