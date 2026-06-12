export type RoundLogEventType =
  | 'spin'
  | 'letter_correct'
  | 'letter_wrong'
  | 'letter_duplicate'
  | 'vowel_correct'
  | 'vowel_wrong'
  | 'bankrupt'
  | 'pass'
  | 'double'
  | 'free_letter'
  | 'spin_again'
  | 'steal_points'
  | 'solve_correct'
  | 'solve_wrong'
  | 'timeout'
  | 'turn_change'
  | 'score_adjustment'
  | 'host_action'

export type RoundLogEvent = {
  id: string
  type: RoundLogEventType
  playerId?: string
  playerName?: string
  targetPlayerId?: string
  targetPlayerName?: string
  letter?: string
  occurrences?: number
  wheelValue?: number
  pointsBefore?: number
  pointsChange?: number
  pointsAfter?: number
  roundScore?: number
  totalScore?: number
  answer?: string
  message: string
  createdAt: number
}

export function addRoundLogEvent(events: RoundLogEvent[], event: RoundLogEvent) {
  if (events.some((item) => item.id === event.id)) return events
  return [...events, event]
}

export function sortRoundLogEventsDesc(events: RoundLogEvent[]) {
  return [...events].sort((a, b) => {
    const timeDifference = b.createdAt - a.createdAt
    if (timeDifference !== 0) return timeDifference
    return b.id.localeCompare(a.id)
  })
}
