import { describe, expect, it } from 'vitest'
import { cavoMessages, pickCavoMessage } from './cavoMessages'

describe('cavo messages', () => {
  it('has at least four variations in each group', () => {
    expect(Object.values(cavoMessages).every((messages) => messages.length >= 4)).toBe(true)
  })

  it('removes slang when disabled', () => {
    expect(pickCavoMessage('roomCreated', 0, false).toLowerCase()).not.toContain('cavo')
  })
})
