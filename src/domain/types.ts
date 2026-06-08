export type Role = 'host' | 'contestant' | 'stage'
export type ConnectionStatus = 'online' | 'reconnecting' | 'disconnected'
export type GameState =
  | 'LOBBY'
  | 'INTRO'
  | 'TOSS_UP'
  | 'ROUND_SETUP'
  | 'AWAITING_SPIN'
  | 'SPINNING'
  | 'AWAITING_LETTER'
  | 'AWAITING_SOLVE'
  | 'ROUND_REVEAL'
  | 'INTERMISSION'
  | 'FINAL_SETUP'
  | 'FINAL_PLAY'
  | 'FINISHED'
  | 'PAUSED'

export type MemeQuotePuzzle = {
  id: string
  theme: 'FUTBOL MEMELERİ, EFSANE SÖZLER VE ATASÖZLERİ'
  category: string
  contentType: 'football_quote' | 'viral_clip' | 'social_media_meme' | 'proverb' | 'anonymous_saying' | 'idiom'
  speaker: string
  answer: string
  normalizedAnswer: string
  clue: string
  context?: string
  difficulty: 1 | 2 | 3 | 4 | 5
  sourceTitle: string
  sourcePublisher: string
  sourceUrl?: string
  sourceDate?: string
  originalSourceUrl?: string
  viralPlatforms?: string[]
  viralityEvidence?: string[]
  memeNote?: string
  verified: boolean
  reviewed: boolean
  enabled: boolean
  isParaphrase: boolean
  characterCount: number
  wordCount: number
  popularityScore: number
  lastPlayedAt?: string
  playCount: number
  notes?: string
}

export type Puzzle = MemeQuotePuzzle

export type Contestant = {
  id: string
  nickname: string
  seat: number
  color: string
  connectionStatus: ConnectionStatus
  roundScore: number
  totalScore: number
}

export type DemoRoom = {
  roomCode: string
  state: GameState
  activeSeat: number
  contestants: Contestant[]
  puzzle: Puzzle
  guessedLetters: string[]
  wheelLabel: string
  eventMessage: string
  slangMode: boolean
  cavoFrequency: 'low' | 'normal' | 'high'
}
