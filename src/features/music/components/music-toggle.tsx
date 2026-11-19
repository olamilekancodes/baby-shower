import { motion } from 'motion/react'
import { ease } from '@/lib/easing'
import styles from './music-toggle.module.css'

type MusicToggleProps = {
  playing: boolean
  onToggle: () => void
}

export function MusicToggle({ playing, onToggle }: MusicToggleProps) {
  return (
    <motion.button
      type="button"
      className={styles.toggle}
      data-playing={playing}
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
      onClick={onToggle}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: ease.out, delay: 0.6 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className={styles.halo} aria-hidden="true" />
      <span className={styles.icon} aria-hidden="true">
        {playing ? (
          <span className={styles.bars}>
            <i />
            <i />
            <i />
          </span>
        ) : (
          <svg viewBox="0 0 16 16" className={styles.play}>
            <path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5Z" />
          </svg>
        )}
      </span>
      <span className={styles.label}>{playing ? 'Lullaby on' : 'Play lullaby'}</span>
    </motion.button>
  )
}
