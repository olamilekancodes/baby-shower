import { motion } from 'motion/react'
import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import type { Gift } from '@/lib/event'
import { GiftIcon } from './gift-icon'
import styles from './gifts-section.module.css'

export function GiftsSection({ gifts }: { gifts: readonly Gift[] }) {
  return (
    <Band innerClassName={styles.inner} aria-labelledby="gifts-heading">
      <Reveal>
        <Eyebrow>A gentle note on gifts</Eyebrow>
      </Reveal>
      <SplitHeading id="gifts-heading" lead="Your company is" emphasis="enough" />
      <Reveal delay={0.12}>
        <p className={styles.lead}>If you would like to bring something, these are close to our hearts.</p>
      </Reveal>
      <div className={styles.grid}>
        {gifts.map((gift, index) => (
          <Reveal key={gift.title} delay={index * 0.12}>
            <motion.article className={styles.card} whileHover={{ y: -6 }} transition={{ duration: 0.6 }}>
              <GiftIcon name={gift.icon} className={styles.icon} />
              <h3>{gift.title}</h3>
              <p>{gift.detail}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Band>
  )
}
