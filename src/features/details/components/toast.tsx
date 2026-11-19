import { AnimatePresence, motion } from 'motion/react'
import { ease } from '@/lib/easing'
import styles from './toast.module.css'

export function Toast({ message }: { message: string | null }) {
  return (
    <div className={styles.region} role="status" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            className={styles.toast}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: ease.out }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
