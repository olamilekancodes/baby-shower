import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import styles from './intro-section.module.css'

export function IntroSection() {
  const vennRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: vennRef, offset: ['start 90%', 'start 35%'] })
  const pinkX = useTransform(scrollYProgress, [0, 1], ['-18%', '0%'])
  const blueX = useTransform(scrollYProgress, [0, 1], ['18%', '0%'])

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
      <div ref={vennRef} className={styles.venn} aria-hidden="true">
        <motion.i className={styles.pink} style={{ x: pinkX }} />
        <motion.i className={styles.blue} style={{ x: blueX }} />
        <motion.span style={{ opacity: scrollYProgress }}>baby</motion.span>
      </div>
    </Band>
  )
}
