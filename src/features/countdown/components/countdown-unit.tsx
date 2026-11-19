import { motion } from 'motion/react'
import { useState } from 'react'
import { ease } from '@/lib/easing'
import styles from './countdown-unit.module.css'

type CountdownUnitProps = {
  value: number
  max: number
  label: string
  pad?: boolean
}

const RING = 2 * Math.PI * 47

export function CountdownUnit({ value, max, label, pad = true }: CountdownUnitProps) {
  const [tracked, setTracked] = useState({ value, wrapped: false })
  if (tracked.value !== value) setTracked({ value, wrapped: value > tracked.value })

  const text = pad ? String(value).padStart(2, '0') : String(value)

  return (
    <div className={styles.unit} role="img" aria-label={`${value} ${label}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <linearGradient id={`mix-${label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--pink-deep)" />
            <stop offset=".5" stopColor="var(--lilac-deep)" />
            <stop offset="1" stopColor="var(--blue-deep)" />
          </linearGradient>
        </defs>
        <circle className={styles.track} cx="50" cy="50" r="47" />
        <motion.circle
          className={styles.arc}
          cx="50"
          cy="50"
          r="47"
          stroke={`url(#mix-${label})`}
          style={{ strokeDasharray: RING }}
          initial={false}
          animate={{ strokeDashoffset: RING * (1 - Math.min(1, value / max)) }}
          transition={tracked.wrapped ? { duration: 0 } : { duration: 0.9, ease: ease.out }}
        />
      </svg>
      <div>
        <motion.b
          key={text}
          initial={{ opacity: 0.2, y: -10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: ease.out }}
        >
          {text}
        </motion.b>
        <small>{label}</small>
      </div>
    </div>
  )
}
