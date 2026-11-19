import { useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { ConfettiCanvas } from '../components/confetti-canvas'
import { ConfettiContext, type ConfettiApi } from '../confetti-context'
import { ConfettiEngine } from '../utils/confetti-engine'

export function ConfettiProvider({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<ConfettiEngine | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!canvasRef.current) return
    const engine = new ConfettiEngine(canvasRef.current)
    engineRef.current = engine
    const onResize = () => engine.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      engine.destroy()
      engineRef.current = null
    }
  }, [])

  const api = useMemo<ConfettiApi>(
    () => ({
      shower: (x, y, count, power) => {
        if (!reduce) engineRef.current?.shower(x, y, count, power)
      },
    }),
    [reduce],
  )

  return (
    <ConfettiContext.Provider value={api}>
      {children}
      <ConfettiCanvas ref={canvasRef} />
    </ConfettiContext.Provider>
  )
}
