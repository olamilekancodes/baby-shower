import { motion, type Variants } from 'motion/react'
import { ease } from '@/lib/easing'
import styles from './split-heading.module.css'

type SplitHeadingProps = {
  id?: string
  lead: string
  emphasis?: string
  tail?: string
}

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
}

const word: Variants = {
  hidden: { y: '108%' },
  shown: { y: '0%', transition: { duration: 1.3, ease: ease.out } },
}

const toWords = (text: string | undefined, emphasised: boolean) =>
  (text ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .map((value) => ({ value, emphasised }))

export function SplitHeading({ id, lead, emphasis, tail }: SplitHeadingProps) {
  const words = [...toWords(lead, false), ...toWords(emphasis, true), ...toWords(tail, false)]

  return (
    <motion.h2
      id={id}
      className={styles.heading}
      aria-label={[lead, emphasis, tail].filter(Boolean).join(' ')}
      variants={container}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {words.map((item, index) => (
        <span key={`${item.value}-${index}`} className={styles.word} aria-hidden="true">
          <motion.span variants={word} className={item.emphasised ? styles.emphasis : undefined}>
            {item.value}
          </motion.span>{' '}
        </span>
      ))}
    </motion.h2>
  )
}
