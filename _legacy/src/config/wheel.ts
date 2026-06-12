export type WheelSegmentKind = 'POINTS' | 'BANKRUPT' | 'PASS' | 'DOUBLE' | 'STEAL' | 'FREE_LETTER' | 'SPIN_AGAIN'

export type WheelSegment = {
  id: string
  label: string
  kind: WheelSegmentKind
  value: number | null
  color: string
}

export const wheelSegments: WheelSegment[] = [
  { id: 'p100-a', label: '100', kind: 'POINTS', value: 100, color: '#F4C430' },
  { id: 'p150', label: '150', kind: 'POINTS', value: 150, color: '#26D07C' },
  { id: 'p200-a', label: '200', kind: 'POINTS', value: 200, color: '#60A5FA' },
  { id: 'p250-a', label: '250', kind: 'POINTS', value: 250, color: '#F05A28' },
  { id: 'bankrupt-a', label: 'İFLAS', kind: 'BANKRUPT', value: null, color: '#EF4444' },
  { id: 'p300-a', label: '300', kind: 'POINTS', value: 300, color: '#A78BFA' },
  { id: 'pass-a', label: 'PAS', kind: 'PASS', value: null, color: '#64748B' },
  { id: 'p350', label: '350', kind: 'POINTS', value: 350, color: '#22C55E' },
  { id: 'double', label: '2X', kind: 'DOUBLE', value: null, color: '#F59E0B' },
  { id: 'p400-a', label: '400', kind: 'POINTS', value: 400, color: '#38BDF8' },
  { id: 'steal250', label: 'RAKİPTEN 250', kind: 'STEAL', value: 250, color: '#FB7185' },
  { id: 'p500-a', label: '500', kind: 'POINTS', value: 500, color: '#F4C430' },
  { id: 'free-letter', label: 'SERBEST HARF', kind: 'FREE_LETTER', value: null, color: '#26D07C' },
  { id: 'p100-b', label: '100', kind: 'POINTS', value: 100, color: '#F05A28' },
  { id: 'spin-again', label: 'TEKRAR ÇEVİR', kind: 'SPIN_AGAIN', value: null, color: '#60A5FA' },
  { id: 'p250-b', label: '250', kind: 'POINTS', value: 250, color: '#A78BFA' },
  { id: 'bankrupt-b', label: 'İFLAS', kind: 'BANKRUPT', value: null, color: '#EF4444' },
  { id: 'p400-b', label: '400', kind: 'POINTS', value: 400, color: '#22C55E' },
]
