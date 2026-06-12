import { create } from 'zustand'
import { brand } from '../config/brand'
import { pickCavoMessage } from '../config/cavoMessages'
import { wheelSegments } from '../config/wheel'
import { samplePuzzles } from '../data/puzzles'
import { countLetter, isGuessableLetter, isPuzzleFullyRevealed, isSolved, isVowel, toTurkishUpper } from '../domain/puzzle'
import { applyBankruptcy, applyLetterScore, applyVowelCost, applyWrongAnswerPenalty, finishRound, transferRoundScore } from '../domain/scoring'
import type { DemoRoom } from '../domain/types'

type DemoActions = {
  createRoom: () => void
  joinPlayer: (nickname: string) => void
  renameContestant: (id: string, nickname: string) => string | null
  startGame: () => void
  spin: () => void
  guessLetter: (letter: string) => void
  solve: (attempt: string) => void
  nextTurn: () => void
  toggleSlang: () => void
}

const contestantNameStorageKey = 'carkifelek-react-contestant-names-v2'

const defaultContestantNames = ['BERKE', 'RONVISLY', 'YALÇIN', 'MATAR']

const defaultContestants = Array.from({ length: 4 }, (_, index) => ({
  id: `seat-${index + 1}`,
  nickname: defaultContestantNames[index],
  seat: index + 1,
  color: brand.contestantColors[index],
  connectionStatus: 'online' as const,
  roundScore: 0,
  totalScore: 0,
}))

function loadContestants() {
  if (typeof window === 'undefined') return defaultContestants
  try {
    const saved = JSON.parse(window.localStorage.getItem(contestantNameStorageKey) || '{}')
    return defaultContestants.map((player) => ({
      ...player,
      nickname: typeof saved[player.id] === 'string' && saved[player.id].trim() ? saved[player.id].trim().slice(0, 24) : player.nickname,
    }))
  } catch {
    return defaultContestants
  }
}

function persistContestantNames(contestants: DemoRoom['contestants']) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    contestantNameStorageKey,
    JSON.stringify(Object.fromEntries(contestants.map((player) => [player.id, player.nickname]))),
  )
}

function createInitialRoom(): DemoRoom {
  return {
    roomCode: 'K7M4PX',
    state: 'LOBBY',
    activeSeat: 1,
    contestants: loadContestants(),
    puzzle: samplePuzzles[0],
    guessedLetters: [],
    wheelLabel: 'Hazır',
    eventMessage: pickCavoMessage('roomCreated'),
    slangMode: true,
    cavoFrequency: 'normal',
  }
}

export const useDemoGameStore = create<DemoRoom & DemoActions>((set, get) => ({
  ...createInitialRoom(),
  createRoom: () => set({ ...createInitialRoom(), eventMessage: pickCavoMessage('roomCreated') }),
  joinPlayer: (nickname) =>
    set((state) => {
      const index = state.contestants.findIndex((player) => player.nickname.startsWith('Yarışmacı'))
      if (index < 0) return { eventMessage: 'Oda dolu' }
      const contestants = [...state.contestants]
      contestants[index] = { ...contestants[index], nickname: nickname.trim().slice(0, 24) || `Yarışmacı ${index + 1}` }
      persistContestantNames(contestants)
      return { contestants, eventMessage: pickCavoMessage('playerJoin', index, state.slangMode) }
    }),
  renameContestant: (id, nickname) => {
    const nextName = nickname.trim()
    if (!nextName) return 'Boş isim kaydedilemez.'
    if (nextName.length > 24) return 'İsim en fazla 24 karakter olabilir.'
    const normalizedName = nextName.toLocaleUpperCase('tr-TR')
    const state = get()
    if (state.contestants.some((player) => player.id !== id && player.nickname.trim().toLocaleUpperCase('tr-TR') === normalizedName)) {
      return 'Bu isim zaten kullanılıyor.'
    }
    const contestants = state.contestants.map((player) => (player.id === id ? { ...player, nickname: nextName } : player))
    persistContestantNames(contestants)
    set({ contestants })
    return null
  },
  startGame: () => set((state) => ({ state: 'AWAITING_SPIN', eventMessage: pickCavoMessage('gameStart', 0, state.slangMode) })),
  spin: () =>
    set((state) => {
      if (state.state !== 'AWAITING_SPIN') return {}
      const segment = wheelSegments[Math.floor(Math.random() * wheelSegments.length)]
      if (segment.kind === 'BANKRUPT') {
        return {
          state: 'AWAITING_SPIN',
          wheelLabel: segment.label,
          contestants: state.contestants.map((player) =>
            player.seat === state.activeSeat ? { ...player, roundScore: applyBankruptcy() } : player,
          ),
          eventMessage: pickCavoMessage('bankruptcy', 0, state.slangMode),
          activeSeat: (state.activeSeat % 4) + 1,
        }
      }
      if (segment.kind === 'PASS') {
        return {
          state: 'AWAITING_SPIN',
          wheelLabel: segment.label,
          eventMessage: pickCavoMessage('pass', 0, state.slangMode),
          activeSeat: (state.activeSeat % 4) + 1,
        }
      }
      if (segment.kind === 'STEAL') {
        const activePlayer = state.contestants.find((player) => player.seat === state.activeSeat)
        const target = state.contestants
          .filter((player) => player.seat !== state.activeSeat)
          .sort((a, b) => b.roundScore - a.roundScore)[0]
        if (!activePlayer || !target || target.roundScore <= 0) {
          return {
            state: 'AWAITING_SPIN',
            wheelLabel: segment.label,
            eventMessage: 'Rakiplerde alınabilecek tur puanı yok.',
          }
        }
        const result = transferRoundScore(activePlayer.roundScore, target.roundScore, segment.value ?? 250)
        return {
          state: 'AWAITING_SPIN',
          wheelLabel: segment.label,
          contestants: state.contestants.map((player) => {
            if (player.id === activePlayer.id) return { ...player, roundScore: result.activeRoundScore }
            if (player.id === target.id) return { ...player, roundScore: result.opponentRoundScore }
            return player
          }),
          eventMessage: `${activePlayer.nickname}, ${target.nickname}'den ${result.transferAmount} tur puanı aldı.`,
        }
      }
      return {
        state: segment.kind === 'SPIN_AGAIN' ? 'AWAITING_SPIN' : 'AWAITING_LETTER',
        wheelLabel: segment.label,
        eventMessage: pickCavoMessage('wheelResult', 0, state.slangMode),
      }
    }),
  guessLetter: (letter) =>
    set((state) => {
      if (state.state !== 'AWAITING_LETTER') return {}
      const normalizedLetter = toTurkishUpper(letter)
      if (state.guessedLetters.includes(normalizedLetter)) {
        return { eventMessage: pickCavoMessage('duplicateLetter', 0, state.slangMode) }
      }
      const occurrenceCount = countLetter(state.puzzle.answer, normalizedLetter)
      const segment = wheelSegments.find((item) => item.label === state.wheelLabel) ?? wheelSegments[0]
      const nextGuessedLetters = [...state.guessedLetters, normalizedLetter]
      const fullyRevealed = occurrenceCount > 0 && isPuzzleFullyRevealed(state.puzzle.answer, nextGuessedLetters)
      const contestants = state.contestants.map((player) => {
        if (player.seat !== state.activeSeat) return player
        const nextScore = isVowel(normalizedLetter)
          ? applyVowelCost(player.roundScore, segment.kind === 'FREE_LETTER')
          : applyLetterScore(player.roundScore, segment, occurrenceCount, segment.kind === 'DOUBLE' ? 2 : 1)
        const roundScore = Math.max(0, nextScore)
        return fullyRevealed ? { ...player, totalScore: finishRound(player.totalScore, roundScore), roundScore: 0 } : { ...player, roundScore }
      })
      return {
        contestants,
        guessedLetters: nextGuessedLetters,
        state: fullyRevealed ? 'ROUND_REVEAL' : 'AWAITING_SPIN',
        activeSeat: occurrenceCount > 0 ? state.activeSeat : (state.activeSeat % 4) + 1,
        eventMessage: pickCavoMessage(fullyRevealed ? 'correctAnswer' : occurrenceCount > 0 ? 'correctLetter' : 'incorrectLetter', 0, state.slangMode),
      }
    }),
  solve: (attempt) =>
    set((state) => {
      if (state.state !== 'AWAITING_LETTER') return {}
      const correct = isSolved(state.puzzle.answer, attempt)
      const contestants = state.contestants.map((player) => {
        if (player.seat !== state.activeSeat) return correct ? { ...player, roundScore: 0 } : player
        return correct
          ? { ...player, totalScore: finishRound(player.totalScore, player.roundScore), roundScore: 0 }
          : { ...player, roundScore: applyWrongAnswerPenalty(player.roundScore) }
      })
      return {
        contestants,
        state: correct ? 'ROUND_REVEAL' : 'AWAITING_SPIN',
        activeSeat: correct ? state.activeSeat : (state.activeSeat % 4) + 1,
        guessedLetters: correct ? Array.from(new Set([...toTurkishUpper(state.puzzle.answer)].filter(isGuessableLetter))) : state.guessedLetters,
        eventMessage: pickCavoMessage(correct ? 'correctAnswer' : 'incorrectAnswer', 0, state.slangMode),
      }
    }),
  nextTurn: () =>
    set((state) => {
      if (state.state === 'ROUND_REVEAL') return {}
      return { activeSeat: (state.activeSeat % 4) + 1, eventMessage: pickCavoMessage('yourTurn', 0, state.slangMode) }
    }),
  toggleSlang: () => set((state) => ({ slangMode: !state.slangMode })),
}))
