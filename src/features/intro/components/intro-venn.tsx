import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef } from 'react'
import { ease } from '@/lib/easing'
import styles from './intro-venn.module.css'

const word = 'baby'

const letters: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: ease.out, delay: 0.2 + i * 0.12 },
  }),
}

export function IntroVenn() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 35%'] })
  const pinkX = useTransform(scrollYProgress, [0, 1], ['-18%', '0%'])
  const blueX = useTransform(scrollYProgress, [0, 1], ['18%', '0%'])
  const glow = useTransform(scrollYProgress, [0.6, 1], [0, 1])

  return (
    <div ref={ref} className={styles.venn} aria-hidden="true">
      <motion.i className={styles.pink} style={{ x: pinkX }} />
      <motion.i className={styles.blue} style={{ x: blueX }} />
      <motion.div className={styles.heart} style={{ opacity: glow }}>
        <b className={styles.glow} />
        <b className={styles.ripple} />
        <b className={styles.ripple} />
        {[0, 1, 2, 3, 4].map((n) => (
          <b key={n} className={styles.mote} />
        ))}
      </motion.div>
      <motion.span className={styles.word} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 1 }}>
        {[...word].map((letter, i) => (
          <motion.span key={i} custom={i} variants={letters}>
            {letter}
          </motion.span>
        ))}
      </motion.span>
    </div>
  )
}
