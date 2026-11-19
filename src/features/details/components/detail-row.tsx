import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { ease } from '@/lib/easing'
import type { DetailRow as Row } from '@/lib/event'
import styles from './detail-row.module.css'

type DetailRowProps = Row & {
  actions?: ReactNode
}

export function DetailRow({ label, value, note, actions }: DetailRowProps) {
  return (
    <motion.div
      className={styles.row}
      initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.2, ease: ease.out }}
    >
      <dt>{label}</dt>
      <dd>
        <span className={styles.value}>{value}</span>
        <span className={styles.note}>{note}</span>
      </dd>
      {actions && <div className={styles.actions}>{actions}</div>}
      <motion.span
        className={styles.rule}
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: ease.out }}
      />
    </motion.div>
  )
}
