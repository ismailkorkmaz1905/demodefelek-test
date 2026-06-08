export const POINTER_ANGLE_DEG = -90
export const SEGMENT_START_OFFSET_DEG = -90

export function normalizeDegrees(degrees: number) {
  return ((degrees % 360) + 360) % 360
}

export function positiveRotationDelta(degrees: number) {
  return normalizeDegrees(degrees)
}

export function getSegmentCenterAngle(segmentIndex: number, segmentCount: number, segmentStartOffset = SEGMENT_START_OFFSET_DEG) {
  const segmentAngle = 360 / segmentCount
  return segmentStartOffset + segmentIndex * segmentAngle + segmentAngle / 2
}

export function calculateFinalRotationDegrees({
  previousCompletedRotation,
  segmentIndex,
  segmentCount,
  extraFullTurns,
  pointerAngleDegrees = POINTER_ANGLE_DEG,
  segmentStartOffset = SEGMENT_START_OFFSET_DEG,
}: {
  previousCompletedRotation: number
  segmentIndex: number
  segmentCount: number
  extraFullTurns: number
  pointerAngleDegrees?: number
  segmentStartOffset?: number
}) {
  const targetCenter = getSegmentCenterAngle(segmentIndex, segmentCount, segmentStartOffset)
  const alignmentRotation = pointerAngleDegrees - targetCenter
  const delta = positiveRotationDelta(alignmentRotation - normalizeDegrees(previousCompletedRotation))
  return previousCompletedRotation + extraFullTurns * 360 + delta
}

export function getSegmentIndexAtPointer({
  wheelRotationDegrees,
  pointerAngleDegrees = POINTER_ANGLE_DEG,
  segmentStartOffset = SEGMENT_START_OFFSET_DEG,
  segmentCount,
}: {
  wheelRotationDegrees: number
  pointerAngleDegrees?: number
  segmentStartOffset?: number
  segmentCount: number
}) {
  const segmentAngle = 360 / segmentCount
  const wheelLocalPointerAngle = normalizeDegrees(pointerAngleDegrees - wheelRotationDegrees - segmentStartOffset)
  return Math.floor(wheelLocalPointerAngle / segmentAngle) % segmentCount
}
