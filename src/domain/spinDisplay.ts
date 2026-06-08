export type WheelDisplayState = 'idle' | 'requesting' | 'spinning' | 'settled' | 'completed'

export type SpinDisplayResult = {
  lastEvent: string
  expectedAction: string
  wheelResult: string
}

type SpinDisplayInput = {
  wheelState: WheelDisplayState
  activePlayerName: string
  settledLastEvent: string
  displayedSpinResult: string | null
  awaitingLetter?: boolean
  needsRespin?: boolean
}

export function resolveSpinDisplay({
  wheelState,
  activePlayerName,
  settledLastEvent,
  displayedSpinResult,
  awaitingLetter = false,
  needsRespin = false,
}: SpinDisplayInput): SpinDisplayResult {
  if (wheelState === 'spinning') {
    return {
      lastEvent: `${activePlayerName} çarkı çeviriyor...`,
      expectedAction: 'Çark dönüyor.',
      wheelResult: 'Dönüyor...',
    }
  }

  if (wheelState === 'requesting') {
    return {
      lastEvent: settledLastEvent,
      expectedAction: 'Hazırlanıyor...',
      wheelResult: 'Hazırlanıyor...',
    }
  }

  return {
    lastEvent: settledLastEvent,
    expectedAction: awaitingLetter ? 'Host harf seçmeli.' : needsRespin ? 'Tekrar çevir.' : 'Çark çevrilmeye hazır.',
    wheelResult: displayedSpinResult || 'Hazır',
  }
}
