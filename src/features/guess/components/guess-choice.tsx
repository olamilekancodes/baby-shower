import { motion } from 'motion/react'
import { useState, type MouseEvent } from 'react'
import { ease } from '@/lib/easing'
import styles from './guess-choice.module.css'

type GuessChoiceProps = {
  tone: 'blue' | 'pink'
  title: string
  caption: string
  selected: boolean
  onSelect: () => void
}

export function GuessChoice({ tone, title, caption, selected, onSelect }: GuessChoiceProps) {
  const [origin, setOrigin] = useState({ x: 50, y: 50 })

  const select = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX || event.clientY) {
      setOrigin({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 })
    }
    onSelect()
  }

  return (
    <motion.button
      type="button"
      className={`${styles.choice} ${styles[tone]}`}
      aria-pressed={selected}
      onClick={select}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -4 }}
    >
      <motion.span
        className={styles.fill}
        aria-hidden="true"
        initial={false}
        animate={{ clipPath: `circle(${selected ? 150 : 0}% at ${origin.x}% ${origin.y}%)` }}
        transition={{ duration: 0.9, ease: ease.out }}
      />
      <b>{title}</b>
      <span>{caption}</span>
    </motion.button>
  )
}
