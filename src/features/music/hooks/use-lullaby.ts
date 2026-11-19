import { useCallback, useEffect, useRef, useState } from 'react'
import { createLullaby, type Lullaby } from '../utils/lullaby-engine'

export function useLullaby() {
  const engine = useRef<Lullaby | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => () => engine.current?.dispose(), [])

  // Background tabs throttle timers, which would leave gaps in the schedule, so rest while hidden.
  useEffect(() => {
    if (!playing) return
    const onVisibility = () => {
      if (document.hidden) engine.current?.pause()
      else void engine.current?.play()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [playing])

  const toggle = useCallback(() => {
    engine.current ??= createLullaby()
    if (playing) {
      engine.current.pause()
      setPlaying(false)
    } else {
      void engine.current.play()
      setPlaying(true)
    }
  }, [playing])

  return { playing, toggle }
}
