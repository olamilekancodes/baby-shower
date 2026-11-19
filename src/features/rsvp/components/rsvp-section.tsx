import type { ReactNode } from 'react'
import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import styles from './rsvp-section.module.css'

type RsvpSectionProps = {
  replyBy: string
  children: ReactNode
}

export function RsvpSection({ replyBy, children }: RsvpSectionProps) {
  return (
    <Band tone="blue" innerClassName={styles.grid} aria-labelledby="rsvp-heading">
      <div>
        <Reveal>
          <Eyebrow>RSVP</Eyebrow>
        </Reveal>
        <SplitHeading id="rsvp-heading" lead="Kindly reply by" emphasis={replyBy} />
        <Reveal delay={0.12}>
          <p className={styles.copy}>Let us know if you can make it. Your reply goes straight to the parents-to-be.</p>
        </Reveal>
      </div>
      <Reveal delay={0.12} className={styles.card}>
        {children}
      </Reveal>
    </Band>
  )
}
