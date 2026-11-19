import type { Ref } from 'react'
import styles from './confetti-canvas.module.css'

export function ConfettiCanvas({ ref }: { ref: Ref<HTMLCanvasElement> }) {
  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />
}
