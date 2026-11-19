import { motion } from 'motion/react'
import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import { ease } from '@/lib/easing'
import type { Team } from '../hooks/use-guess'
import { GuessChoice } from './guess-choice'
import styles from './guess-section.module.css'

type GuessSectionProps = {
  guess: Team | null
  onChoose: (team: Team) => void
}

export function GuessSection({ guess, onChoose }: GuessSectionProps) {
  return (
    <Band innerClassName={styles.inner} aria-labelledby="guess-heading">
      <Reveal>
        <Eyebrow>Just for fun</Eyebrow>
      </Reveal>
      <SplitHeading id="guess-heading" lead="Pink or" emphasis="blue?" />
      <Reveal delay={0.12}>
        <p className={styles.lead}>Leave your guess. We will all find out together.</p>
      </Reveal>
      <Reveal delay={0.22} className={styles.choices}>
        <GuessChoice tone="blue" title="Blue" caption="A boy" selected={guess === 'blue'} onSelect={() => onChoose('blue')} />
        <GuessChoice tone="pink" title="Pink" caption="A girl" selected={guess === 'pink'} onSelect={() => onChoose('pink')} />
      </Reveal>
      <p className={styles.note} aria-live="polite">
        {guess && (
          <motion.span
            key={guess}
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: ease.out }}
          >
            You said {guess}. We will see in a few months.
          </motion.span>
        )}
      </p>
    </Band>
  )
}
