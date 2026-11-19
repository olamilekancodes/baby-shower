import { useEffect } from 'react'
import { clamp } from '@/lib/maths'

type Ref<T> = { readonly current: T | null }

export function usePearlLight(hero: Ref<HTMLElement>, pearl: Ref<HTMLElement>, enabled: boolean) {
  useEffect(() => {
    const heroEl = hero.current
    if (!heroEl || !enabled) return
    const onMove = (event: PointerEvent) => {
      const rect = pearl.current?.getBoundingClientRect()
      if (!rect) return
      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 10, 90)
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 10, 90)
      heroEl.style.setProperty('--hx', `${36 + (x - 50) * 0.3}%`)
      heroEl.style.setProperty('--hy', `${30 + (y - 50) * 0.3}%`)
    }
    heroEl.addEventListener('pointermove', onMove)
    return () => heroEl.removeEventListener('pointermove', onMove)
  }, [hero, pearl, enabled])
}
