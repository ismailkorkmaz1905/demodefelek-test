import { describe, expect, it } from 'vitest'
import { addRoundLogEvent, sortRoundLogEventsDesc, type RoundLogEvent } from './roundLog'

const baseEvent: RoundLogEvent = {
  id: 'spin-1',
  type: 'spin',
  playerName: 'BERKE',
  message: 'BERKE çarkı çevirdi ve 400 geldi.',
  createdAt: 1,
}

describe('round log', () => {
  it('keeps events structured', () => {
    const event: RoundLogEvent = {
      ...baseEvent,
      id: 'letter-1',
      type: 'letter_correct',
      letter: 'R',
      occurrences: 3,
      wheelValue: 400,
      pointsChange: 1200,
      message: 'BERKE "R" harfini tahmin etti. Cevapta 3 tane "R" bulundu. BERKE, 400 x 3 = 1.200 puan kazandı.',
    }

    expect(event.letter).toBe('R')
    expect(event.occurrences).toBe(3)
    expect(event.pointsChange).toBe(1200)
  })

  it('does not add duplicate ids', () => {
    const events = addRoundLogEvent([], baseEvent)
    const nextEvents = addRoundLogEvent(events, { ...baseEvent, message: 'duplicate' })

    expect(nextEvents).toHaveLength(1)
    expect(nextEvents[0].message).toBe(baseEvent.message)
  })

  it('sorts events by createdAt descending', () => {
    const events: RoundLogEvent[] = [
      { ...baseEvent, id: 'old', createdAt: 10 },
      { ...baseEvent, id: 'new', createdAt: 30 },
      { ...baseEvent, id: 'middle', createdAt: 20 },
    ]

    expect(sortRoundLogEventsDesc(events).map((event) => event.id)).toEqual(['new', 'middle', 'old'])
  })

  it('puts the newest event first', () => {
    const events: RoundLogEvent[] = [
      { ...baseEvent, id: 'spin-1', createdAt: 100 },
      { ...baseEvent, id: 'letter-1', createdAt: 101 },
    ]

    expect(sortRoundLogEventsDesc(events)[0].id).toBe('letter-1')
  })

  it('does not mutate the original events array order', () => {
    const events: RoundLogEvent[] = [
      { ...baseEvent, id: 'first', createdAt: 1 },
      { ...baseEvent, id: 'second', createdAt: 2 },
    ]

    sortRoundLogEventsDesc(events)

    expect(events.map((event) => event.id)).toEqual(['first', 'second'])
  })

  it('sorts equal timestamps deterministically by id', () => {
    const events: RoundLogEvent[] = [
      { ...baseEvent, id: 'event-a', createdAt: 10 },
      { ...baseEvent, id: 'event-c', createdAt: 10 },
      { ...baseEvent, id: 'event-b', createdAt: 10 },
    ]

    expect(sortRoundLogEventsDesc(events).map((event) => event.id)).toEqual(['event-c', 'event-b', 'event-a'])
  })
})
