export type NoteEvent = {
  beat: number
  midi: number
  length: number
  gain: number
  voice: 'bell' | 'pad'
}

export const tempo = 64
export const loopBeats = 24

const melody: [number, number][] = [
  [69, 2], [72, 1],
  [74, 2], [72, 1],
  [70, 1], [69, 1], [67, 1],
  [67, 3],
  [69, 2], [65, 1],
  [69, 1], [74, 1], [72, 1],
  [70, 1], [67, 1], [64, 1],
  [65, 3],
]

const chords: number[][] = [
  [53, 60, 65],
  [50, 57, 62],
  [46, 53, 58],
  [48, 55, 60],
  [53, 60, 65],
  [50, 57, 62],
  [46, 53, 58],
  [53, 60, 65],
]

function buildScore(): NoteEvent[] {
  const events: NoteEvent[] = []
  let beat = 0
  for (const [midi, length] of melody) {
    events.push({ beat, midi, length, gain: 0.22, voice: 'bell' })
    beat += length
  }
  chords.forEach((chord, bar) => {
    chord.forEach((midi, step) => {
      events.push({ beat: bar * 3 + step, midi, length: 3 - step, gain: step === 0 ? 0.16 : 0.1, voice: 'pad' })
    })
  })
  return events.sort((a, b) => a.beat - b.beat)
}

export const score = buildScore()
