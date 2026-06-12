export const MIN_SPIN_DURATION_MS = 5000
export const MAX_SPIN_DURATION_MS = 10000

export type SpinWithDuration = {
  spinId: number | string
  spinDurationMs: number
}

export function createSpinDurationMs(random = Math.random) {
  return MIN_SPIN_DURATION_MS + Math.floor(random() * (MAX_SPIN_DURATION_MS - MIN_SPIN_DURATION_MS + 1))
}

export function getSpinDurationMsForSpin(existingSpin: SpinWithDuration | null | undefined, random = Math.random) {
  return existingSpin?.spinDurationMs ?? createSpinDurationMs(random)
}
