import { motion } from 'motion/react'
import type { Ref } from 'react'
import { ease } from '@/lib/easing'
import styles from './open-panel.module.css'

type OpenPanelProps = {
  shown: boolean
  facts: readonly string[]
  cueRef: Ref<HTMLAnchorElement>
}

export function OpenPanel({ shown, facts, cueRef }: OpenPanelProps) {
  return (
    <motion.div
      className={styles.panel}
      initial={false}
      animate={shown ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 16, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: ease.out, delay: shown ? 1.5 : 0 }}
      style={{ visibility: shown ? 'visible' : 'hidden' }}
      inert={!shown}
    >
      <span className={styles.eyebrow}>A baby shower</span>
      <h2 className={styles.big}>
        Little one, <em className={styles.mix}>we can’t wait</em> to meet you
      </h2>
      <p className={styles.honour}>Join us for an afternoon of tea, stories and love for the parents-to-be.</p>
      <ul className={styles.facts}>
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <a ref={cueRef} className={styles.cue} href="#welcome">
        The details
        <i aria-hidden="true" />
      </a>
    </motion.div>
  )
}
