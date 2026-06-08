import { describe, expect, it } from 'vitest'
import {
  POINTER_ANGLE_DEG,
  SEGMENT_START_OFFSET_DEG,
  calculateFinalRotationDegrees,
  getSegmentIndexAtPointer,
} from './wheelGeometry'
import { wheelSegments } from '../config/wheel'

function finalRotationFor(segmentIndex: number, previousCompletedRotation = 0, segmentCount = 20) {
  return calculateFinalRotationDegrees({
    previousCompletedRotation,
    segmentIndex,
    segmentCount,
    extraFullTurns: 5,
    pointerAngleDegrees: POINTER_ANGLE_DEG,
    segmentStartOffset: SEGMENT_START_OFFSET_DEG,
  })
}

describe('wheel geometry', () => {
  it('aligns segment index 0 under the pointer', () => {
    const finalRotationDegrees = finalRotationFor(0)

    expect(
      getSegmentIndexAtPointer({
        wheelRotationDegrees: finalRotationDegrees,
        pointerAngleDegrees: POINTER_ANGLE_DEG,
        segmentStartOffset: SEGMENT_START_OFFSET_DEG,
        segmentCount: 20,
      }),
    ).toBe(0)
  })

  it('aligns segment index 5 under the pointer', () => {
    const finalRotationDegrees = finalRotationFor(5)

    expect(
      getSegmentIndexAtPointer({
        wheelRotationDegrees: finalRotationDegrees,
        pointerAngleDegrees: POINTER_ANGLE_DEG,
        segmentStartOffset: SEGMENT_START_OFFSET_DEG,
        segmentCount: 20,
      }),
    ).toBe(5)
  })

  it('aligns segment index 19 under the pointer', () => {
    const finalRotationDegrees = finalRotationFor(19)

    expect(
      getSegmentIndexAtPointer({
        wheelRotationDegrees: finalRotationDegrees,
        pointerAngleDegrees: POINTER_ANGLE_DEG,
        segmentStartOffset: SEGMENT_START_OFFSET_DEG,
        segmentCount: 20,
      }),
    ).toBe(19)
  })

  it('aligns every segment across many previous rotations', () => {
    for (let segmentIndex = 0; segmentIndex < 20; segmentIndex += 1) {
      for (let rotationIndex = 0; rotationIndex < 100; rotationIndex += 1) {
        const previousCompletedRotation = rotationIndex * 37 - 720
        const finalRotationDegrees = finalRotationFor(segmentIndex, previousCompletedRotation)
        const visualIndex = getSegmentIndexAtPointer({
          wheelRotationDegrees: finalRotationDegrees,
          pointerAngleDegrees: POINTER_ANGLE_DEG,
          segmentStartOffset: SEGMENT_START_OFFSET_DEG,
          segmentCount: 20,
        })

        expect(visualIndex).toBe(segmentIndex)
      }
    }
  })

  it('uses segment index instead of duplicate labels', () => {
    const duplicateIndexes = wheelSegments.map((segment, index) => (segment.label === '100' ? index : -1)).filter((index) => index >= 0)
    const segmentIndex = duplicateIndexes[duplicateIndexes.length - 1]
    const finalRotationDegrees = calculateFinalRotationDegrees({
      previousCompletedRotation: 0,
      segmentIndex,
      segmentCount: wheelSegments.length,
      extraFullTurns: 5,
    })
    const visualIndex = getSegmentIndexAtPointer({
      wheelRotationDegrees: finalRotationDegrees,
      segmentCount: wheelSegments.length,
    })

    expect(wheelSegments[visualIndex].id).toBe(wheelSegments[segmentIndex].id)
    expect(wheelSegments[visualIndex].label).toBe('100')
  })

  it('keeps visual, center, event, and control panel ids identical after completion', () => {
    const segments = [
      { id: 'point-100-a', label: '100' },
      { id: 'pass', label: 'PAS' },
      { id: 'point-100-b', label: '100' },
    ]
    const segmentIndex = 2
    const finalRotationDegrees = calculateFinalRotationDegrees({
      previousCompletedRotation: 130,
      segmentIndex,
      segmentCount: segments.length,
      extraFullTurns: 5,
    })
    const visualSegmentId = segments[getSegmentIndexAtPointer({ wheelRotationDegrees: finalRotationDegrees, segmentCount: segments.length })].id
    const centerSegmentId = segments[segmentIndex].id
    const eventSegmentId = segments[segmentIndex].id
    const controlPanelSegmentId = segments[segmentIndex].id

    expect(visualSegmentId).toBe(centerSegmentId)
    expect(visualSegmentId).toBe(eventSegmentId)
    expect(visualSegmentId).toBe(controlPanelSegmentId)
  })
})
