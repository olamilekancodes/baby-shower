import { animate } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ease } from '@/lib/easing'
import { rand } from '@/lib/maths'
import { FlameEngine } from '../utils/flame-engine'

const CRACK_MS = 340
const FLAME_MS = 2600
const CONFETTI_DELAY_MS = 1100
const shardEase: [number, number, number, number] = [0.2, 0.8, 0.3, 1]

type Options = {
  reduce: boolean
  onBloom: (centre: { x: number; y: number }) => void
}

export function useBreakSequence({ reduce, onBloom }: Options) {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pearlRef = useRef<HTMLButtonElement>(null)
  const engineRef = useRef<FlameEngine | null>(null)
  const timers = useRef<number[]>([])
  const [breaking, setBreaking] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = heroRef.current
    if (!canvas || !hero) return
    const engine = new FlameEngine(canvas, hero)
    engineRef.current = engine
    const onResize = () => engine.resize()
    window.addEventListener('resize', onResize)
    const pending = timers.current
    return () => {
      window.removeEventListener('resize', onResize)
      pending.forEach((id) => window.clearTimeout(id))
      engine.destroy()
      engineRef.current = null
    }
  }, [])

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const shatter = (pearl: HTMLButtonElement) => {
    const flash = pearl.querySelector('[data-flash]')
    const ring = pearl.querySelector('[data-ring]')
    if (flash) animate(flash, { opacity: [0, 1, 0], scale: [0.6, 1, 1.3] }, { duration: 0.9, times: [0, 0.25, 1], ease: ease.out })
    if (ring) animate(ring, { opacity: [0.9, 0], scale: [1, 3.2] }, { duration: 1.1, ease: ease.out })
    pearl.querySelectorAll<HTMLElement>('[data-shard]').forEach((shard) => {
      const angle = Number(shard.dataset.angle)
      const distance = rand(120, 240)
      animate(
        shard,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance + 60,
          rotate: rand(-70, 70),
          scale: rand(0.5, 0.8),
          opacity: 0,
          filter: 'blur(3px)',
        },
        { duration: rand(0.9, 1.3), ease: shardEase },
      )
    })
  }

  const breakPearl = () => {
    const pearl = pearlRef.current
    if (breaking || revealed || !pearl) return
    if (reduce) {
      setRevealed(true)
      return
    }
    setBreaking(true)
    later(() => {
      shatter(pearl)
      engineRef.current?.ignite(FLAME_MS)
      setRevealed(true)
      const rect = pearl.getBoundingClientRect()
      later(() => onBloom({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 - 40 }), CONFETTI_DELAY_MS)
    }, CRACK_MS)
  }

  return { heroRef, canvasRef, pearlRef, breaking, revealed, breakPearl }
}
