const turkishLetters = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'
const vowels = 'AEIİOÖUÜ'
const turkishLetterRegex = /^[A-ZÇĞIİÖŞÜ]$/
const turkishAnswerLetterRegex = /[A-ZÇĞIİÖŞÜ]/g

export const turkishKeyboard = turkishLetters.split('')

export function toTurkishUpper(value: string) {
  return value.normalize('NFC').toLocaleUpperCase('tr-TR')
}

export function normalizeAnswer(value: string) {
  return toTurkishUpper(value).match(turkishAnswerLetterRegex)?.join('') || ''
}

export function isGuessableLetter(value: string) {
  return turkishLetterRegex.test(toTurkishUpper(value))
}

export function isVowel(letter: string) {
  return vowels.includes(toTurkishUpper(letter))
}

export function maskPuzzle(answer: string, guessedLetters: string[]) {
  const guessed = new Set(guessedLetters.map(toTurkishUpper))
  return [...toTurkishUpper(answer)].map((char, index) => {
    const guessable = isGuessableLetter(char)
    return {
      char,
      index,
      guessable,
      revealed: !guessable || guessed.has(char),
    }
  })
}

export function countLetter(answer: string, letter: string) {
  const target = toTurkishUpper(letter)
  return [...toTurkishUpper(answer)].filter((char) => isGuessableLetter(char) && char === target).length
}

export function isPuzzleFullyRevealed(answer: string, revealedLetters: Iterable<string>) {
  const revealed = new Set(Array.from(revealedLetters, toTurkishUpper))
  return [...toTurkishUpper(answer)].every((char) => !isGuessableLetter(char) || revealed.has(char))
}

export function isSolved(answer: string, attempt: string) {
  return normalizeAnswer(answer) === normalizeAnswer(attempt)
}
