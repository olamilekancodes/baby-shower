import { useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useFinePointer } from '@/hooks/use-fine-pointer'
import { event } from '@/lib/event'
import { useConfetti } from '@/features/confetti'
import { ClosedPanel } from '../components/closed-panel'
import { HeroShell } from '../components/hero-shell'
import { OpenPanel } from '../components/open-panel'
import { Pearl } from '../components/pearl'
import { useBreakSequence } from '../hooks/use-break-sequence'
import { usePearlLight } from '../hooks/use-pearl-light'
import { createFracture } from '../utils/fault-lines'

const FOCUS_CUE_MS = 3200

export function PearlHero() {
  const reduce = useReducedMotion() ?? false
  const finePointer = useFinePointer()
  const { shower } = useConfetti()
  const cueRef = useRef<HTMLAnchorElement>(null)
  const [fracture] = useState(() => createFracture())

  const onBloom = useCallback(({ x, y }: { x: number; y: number }) => shower(x, y, 70, 0.9), [shower])
  const { heroRef, canvasRef, pearlRef, breaking, revealed, breakPearl } = useBreakSequence({ reduce, onBloom })

  usePearlLight(heroRef, pearlRef, finePointer && !reduce)

  useEffect(() => {
    if (!revealed) return
    const id = window.setTimeout(() => cueRef.current?.focus({ preventScroll: true }), FOCUS_CUE_MS)
    return () => window.clearTimeout(id)
  }, [revealed])

  return (
    <HeroShell ref={heroRef} canvasRef={canvasRef} revealed={revealed}>
      <ClosedPanel
        hidden={revealed}
        pearl={
          <Pearl
            ref={pearlRef}
            fracture={fracture}
            breaking={breaking}
            disabled={revealed}
            onBreak={breakPearl}
          />
        }
      />
      <OpenPanel shown={revealed} facts={event.facts} cueRef={cueRef} />
    </HeroShell>
  )
}
