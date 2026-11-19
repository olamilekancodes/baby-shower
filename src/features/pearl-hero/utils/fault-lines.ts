import { rand } from '@/lib/maths'

type Point = [number, number]

export type Shard = {
  clipPath: string
  angle: number
}

export type Fracture = {
  shards: Shard[]
  cracks: string[]
}

const CENTRE: Point = [50, 47]
const RADII = [0.16, 0.38, 0.62, 0.86, 1.45]

const toPercent = ([x, y]: Point) => `${x.toFixed(2)}% ${y.toFixed(2)}%`

export const createFracture = (count = 7): Fracture => {
  const [cx, cy] = CENTRE
  const faults: Point[][] = Array.from({ length: count }, (_, k) => {
    const base = (k / count) * Math.PI * 2 + rand(-0.18, 0.18)
    return RADII.map((radius, j) => {
      const angle = base + (j === 0 ? 0 : rand(-0.12, 0.12))
      return [cx + Math.cos(angle) * 50 * radius, cy + Math.sin(angle) * 50 * radius]
    })
  })

  const shards = faults.map((line, k) => {
    const next = faults[(k + 1) % count]
    const polygon = [CENTRE, ...line, ...[...next].reverse()].map(toPercent).join(', ')
    const from = Math.atan2(line[4][1] - cy, line[4][0] - cx)
    const to = Math.atan2(next[4][1] - cy, next[4][0] - cx)
    const angle = (from + to) / 2 + (Math.abs(to - from) > Math.PI ? Math.PI : 0)
    return { clipPath: `polygon(${polygon})`, angle }
  })

  const cracks = faults.map(
    (line) => `M${cx} ${cy} ${line
      .slice(0, 4)
      .map(([x, y]) => `L${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(' ')}`,
  )

  return { shards, cracks }
}
