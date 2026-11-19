import type { ComponentProps } from 'react'
import { Watermark } from './watermark'
import styles from './band.module.css'

type BandProps = ComponentProps<'section'> & {
  tone?: 'paper' | 'pink' | 'blue'
  innerClassName?: string
}

export function Band({ tone = 'paper', innerClassName, className, children, ...rest }: BandProps) {
  return (
    <section className={[styles.band, styles[tone], className].filter(Boolean).join(' ')} {...rest}>
      <Watermark />
      <div className={[styles.inner, innerClassName].filter(Boolean).join(' ')}>{children}</div>
    </section>
  )
}
