import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import type { ScheduleItem } from '@/lib/event'
import styles from './schedule-section.module.css'

export function ScheduleSection({ items }: { items: readonly ScheduleItem[] }) {
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [lit, setLit] = useState(0)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const height = listRef.current?.offsetHeight ?? 0
    setLit(itemRefs.current.filter((item) => item && item.offsetTop + 16 <= progress * height + 4).length)
  })

  return (
    <Band tone="pink" innerClassName={styles.grid} aria-labelledby="schedule-heading">
      <div className={styles.head}>
        <Reveal>
          <Eyebrow>The afternoon</Eyebrow>
        </Reveal>
        <SplitHeading id="schedule-heading" lead="How the day" emphasis="unfolds" />
        <Reveal delay={0.15}>
          <p>Relaxed, unhurried and full of good company.</p>
        </Reveal>
      </div>
      <div ref={listRef} className={styles.timeline}>
        <motion.span className={styles.fill} style={{ scaleY: scrollYProgress }} aria-hidden="true" />
        <ol>
          {items.map((item, index) => (
            <li
              key={item.time}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className={index < lit ? styles.lit : undefined}
            >
              <Reveal>
                <time dateTime={item.time}>{item.label}</time>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  )
}
