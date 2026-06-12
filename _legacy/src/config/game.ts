export const gameConfig = {
  maxContestants: 4,
  turnSeconds: 30,
  chaosTurnSeconds: 20,
  solveBonus: 500,
  chaosSolveBonus: 750,
  vowelCost: 200,
  wrongAnswerPenalty: 250,
  reconnectSeconds: 180,
  showPresetName: '2 Saatlik ÇARKIFELEK Yayını',
} as const

export const showTimeline = [
  ['00:00-00:10', 'INTRO AND LOBBY'],
  ['00:10-00:25', 'WARM-UP TOSS-UP'],
  ['00:25-00:50', 'ROUND 1: FUTBOL CAVOSU'],
  ['00:50-00:55', 'INTERMISSION'],
  ['00:55-01:20', 'ROUND 2: GENEL KÜLTÜR CAVOSU'],
  ['01:20-01:25', 'INTERMISSION'],
  ['01:25-01:45', 'ROUND 3: CAVO KAOSU'],
  ['01:45-01:55', 'TOP TWO FINAL'],
  ['01:55-02:00', 'WINNER AND CLOSING'],
] as const
