import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ease } from '@/lib/easing'
import styles from './closed-panel.module.css'

type ClosedPanelProps = {
  hidden: boolean
  pearl: ReactNode
}

const lines = [
  <>
    Something <em>sweet</em>
  </>,
  <>is on its way</>,
]

export function ClosedPanel({ hidden, pearl }: ClosedPanelProps) {
  return (
    <motion.div
      className={styles.panel}
      initial={false}
      animate={hidden ? { opacity: 0, scale: 0.97, filter: 'blur(8px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: ease.out }}
      inert={hidden}
    >
      <motion.span
        className={styles.eyebrow}
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: ease.out, delay: 0.2 }}
      >
        You’re invited to a baby shower
      </motion.span>
      <h1 className={styles.headline}>
        {lines.map((line, index) => (
          <span key={index} className={styles.line}>
            <motion.span initial={{ y: '105%' }} animate={{ y: '0%' }} transition={{ duration: 1.4, ease: ease.out, delay: 0.35 + index * 0.14 }}>
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div
        className={styles.pearlWrap}
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: ease.out, delay: 0.9 }}
      >
        {pearl}
        <span className={styles.hint}>
          Touch the pearl to open · <a href="#welcome">skip to details</a>
        </span>
      </motion.div>
    </motion.div>
  )
}
