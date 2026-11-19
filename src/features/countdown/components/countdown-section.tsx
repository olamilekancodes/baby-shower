import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import type { TimeLeft } from '../hooks/use-countdown'
import { CountdownUnit } from './countdown-unit'
import styles from './countdown-section.module.css'

export function CountdownSection({ left }: { left: TimeLeft }) {
  const units = [
    { label: 'Days', value: left.days, max: 365, pad: false },
    { label: 'Hours', value: left.hours, max: 24 },
    { label: 'Minutes', value: left.minutes, max: 60 },
    { label: 'Seconds', value: left.seconds, max: 60 },
  ]

  return (
    <Band tone="blue" innerClassName={styles.inner} aria-labelledby="countdown-heading">
      <Reveal>
        <Eyebrow>Counting down</Eyebrow>
      </Reveal>
      <SplitHeading id="countdown-heading" lead="Until we" emphasis="celebrate" />
      <div className={styles.grid} role="timer" aria-label="Time until the baby shower">
        {units.map((unit, index) => (
          <Reveal key={unit.label} delay={index * 0.11}>
            <CountdownUnit {...unit} />
          </Reveal>
        ))}
      </div>
    </Band>
  )
}
