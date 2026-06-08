import type { GameState } from './types'

const transitions: Record<GameState, GameState[]> = {
  LOBBY: ['INTRO', 'PAUSED'],
  INTRO: ['TOSS_UP', 'ROUND_SETUP', 'PAUSED'],
  TOSS_UP: ['ROUND_SETUP', 'INTERMISSION', 'PAUSED'],
  ROUND_SETUP: ['AWAITING_SPIN', 'PAUSED'],
  AWAITING_SPIN: ['SPINNING', 'AWAITING_SOLVE', 'ROUND_REVEAL', 'PAUSED'],
  SPINNING: ['AWAITING_LETTER', 'AWAITING_SPIN', 'PAUSED'],
  AWAITING_LETTER: ['AWAITING_SPIN', 'AWAITING_SOLVE', 'ROUND_REVEAL', 'PAUSED'],
  AWAITING_SOLVE: ['ROUND_REVEAL', 'AWAITING_SPIN', 'PAUSED'],
  ROUND_REVEAL: ['ROUND_SETUP', 'INTERMISSION', 'FINAL_SETUP', 'FINISHED'],
  INTERMISSION: ['ROUND_SETUP', 'FINAL_SETUP', 'PAUSED'],
  FINAL_SETUP: ['FINAL_PLAY', 'PAUSED'],
  FINAL_PLAY: ['FINISHED', 'PAUSED'],
  FINISHED: ['LOBBY'],
  PAUSED: [
    'LOBBY',
    'INTRO',
    'TOSS_UP',
    'ROUND_SETUP',
    'AWAITING_SPIN',
    'AWAITING_LETTER',
    'AWAITING_SOLVE',
    'INTERMISSION',
    'FINAL_PLAY',
  ],
}

export function canTransition(from: GameState, to: GameState) {
  return transitions[from].includes(to)
}

export function assertTransition(from: GameState, to: GameState) {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid transition: ${from} -> ${to}`)
  }
  return to
}
