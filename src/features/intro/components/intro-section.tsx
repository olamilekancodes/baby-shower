import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import { IntroVenn } from './intro-venn'
import styles from './intro-section.module.css'

export function IntroSection() {
  return (
    <Band id="welcome" innerClassName={styles.grid} aria-labelledby="welcome-heading">
      <div>
        <Reveal>
          <Eyebrow>Two become three</Eyebrow>
        </Reveal>
        <SplitHeading id="welcome-heading" lead="A little of" emphasis="each" tail="of us" />
        <Reveal delay={0.15}>
          <p className={styles.lead}>
            Soon there will be someone new at the table. Before they arrive, we would love to gather the people who
            will help raise them with laughter, wisdom and very soft blankets.
          </p>
        </Reveal>
      </div>
      <IntroVenn />
    </Band>
  )
}
