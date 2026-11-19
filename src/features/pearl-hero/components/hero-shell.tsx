import type { ReactNode, Ref } from 'react'
import { Watermark } from '@/components/watermark'
import styles from './hero-shell.module.css'

type HeroShellProps = {
  ref: Ref<HTMLElement>
  canvasRef: Ref<HTMLCanvasElement>
  revealed: boolean
  children: ReactNode
}

export function HeroShell({ ref, canvasRef, revealed, children }: HeroShellProps) {
  return (
    <header ref={ref} className={styles.hero} data-revealed={revealed}>
      <div className={styles.aura} aria-hidden="true">
        <i className={styles.pink} />
        <i className={styles.blue} />
        <i className={styles.lilac} />
      </div>
      <Watermark />
      <div className={styles.grain} aria-hidden="true" />
      <canvas ref={canvasRef} className={styles.flames} aria-hidden="true" />
      <div className={styles.stage} aria-live="polite">
        {children}
      </div>
    </header>
  )
}
