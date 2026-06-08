import { describe, expect, it } from 'vitest'
import { countLetter, isGuessableLetter, isPuzzleFullyRevealed, isSolved, maskPuzzle, normalizeAnswer, toTurkishUpper } from './puzzle'

describe('Turkish puzzle helpers', () => {
  it('uppercases Turkish letters with tr-TR rules', () => {
    expect(toTurkishUpper('ışık çöl iğne')).toBe('IŞIK ÇÖL İĞNE')
  })

  it('normalizes answers without punctuation differences', () => {
    expect(normalizeAnswer('  Fenerbahçe!!  ')).toBe('FENERBAHÇE')
  })

  it('masks hidden letters and keeps spaces visible', () => {
    const board = maskPuzzle('Türk Kahvesi', ['T', 'K'])
    expect(board.some((cell) => cell.char === ' ' && cell.revealed)).toBe(true)
    expect(board.filter((cell) => cell.char === 'K' && cell.revealed)).toHaveLength(2)
  })

  it('keeps punctuation and numbers revealed without making them guessable tiles', () => {
    const board = maskPuzzle('VAR, YOK. 2-1!', ['V', 'A', 'R'])
    const punctuation = board.filter((cell) => [',', '.', '2', '-', '1', '!'].includes(cell.char))

    expect(punctuation.every((cell) => cell.revealed && !cell.guessable)).toBe(true)
    expect(board.find((cell) => cell.char === 'Y')?.revealed).toBe(false)
  })

  it('checks fully revealed state using only Turkish guessable letters', () => {
    const answer = 'FİYASKO OYUNLAR VAR, BUNUN ÜZERİNİ KAPATMAYA ÇALIŞIYORLAR. ORTADA FUTBOL YOK'
    const letters = new Set([...toTurkishUpper(answer)].filter(isGuessableLetter))
    letters.delete('K')

    expect(isPuzzleFullyRevealed(answer, letters)).toBe(false)
    letters.add('K')
    expect(isPuzzleFullyRevealed(answer, letters)).toBe(true)
  })

  it('counts repeated letters without counting punctuation', () => {
    expect(countLetter('Galatasaray, 1905!', 'a')).toBe(5)
  })

  it('compares full answers by normalized value', () => {
    expect(isSolved('İstanbul Boğazı', 'istanbul bogazı')).toBe(false)
    expect(isSolved('İstanbul Boğazı', 'İstanbul Boğazı')).toBe(true)
    expect(isSolved('Ne ekersen onu biçersin', 'Ne ekersen onu biçersin')).toBe(true)
    expect(normalizeAnswer('Ne ekersen onu biçersin')).toBe('NEEKERSENONUBİÇERSİN')
  })
})
