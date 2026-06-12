import type { MemeQuotePuzzle } from './types'

export type PuzzleHistoryItem = {
  id: string
  speaker: string
  category: string
  contentType: MemeQuotePuzzle['contentType']
  answer: string
}

export function isSelectablePuzzle(puzzle: MemeQuotePuzzle) {
  if (!puzzle.enabled || !puzzle.reviewed || !puzzle.verified) return false
  if (puzzle.contentType === 'proverb' || puzzle.contentType === 'anonymous_saying' || puzzle.contentType === 'idiom') return true
  return Boolean(puzzle.sourceUrl)
}

export function selectNextPuzzle(puzzles: MemeQuotePuzzle[], history: PuzzleHistoryItem[], random = Math.random) {
  const playedAnswers = new Set(history.map((item) => item.answer))
  const previous = history.at(-1)

  let pool = puzzles
    .filter(isSelectablePuzzle)
    .filter((puzzle) => !playedAnswers.has(puzzle.answer))
    .filter((puzzle) => !history.slice(-3).some((item) => item.answer === puzzle.answer))

  if (pool.length === 0) {
    pool = puzzles
      .filter(isSelectablePuzzle)
      .filter((puzzle) => !playedAnswers.has(puzzle.answer))
      .filter((puzzle) => !(previous && previous.answer === puzzle.answer))
  }

  if (pool.length === 0) return null
  return pool[Math.floor(random() * pool.length)]
}

export function splitBalancedLines(answer: string, maxLines = 4) {
  const words = answer.trim().split(/\s+/)
  if (words.length <= 1) return words
  const targetLength = Math.ceil(answer.length / Math.min(maxLines, Math.max(2, Math.ceil(answer.length / 45))))
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (current && next.length > targetLength && lines.length < maxLines - 1) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) lines.push(current)

  if (lines.length > 1 && lines.at(-1)!.length < 8) {
    const last = lines.pop()!
    lines[lines.length - 1] = `${lines.at(-1)} ${last}`
  }

  return lines
}
