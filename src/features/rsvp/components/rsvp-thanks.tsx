import { motion } from 'motion/react'
import { MagneticButton } from '@/components/magnetic-button'
import { ease } from '@/lib/easing'
import styles from './rsvp-thanks.module.css'

type RsvpThanksProps = {
  name: string
  attending: boolean
  onReset: () => void
}

export function RsvpThanks({ name, attending, onReset }: RsvpThanksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.9, ease: ease.out }}
    >
      <h3 className={styles.title}>
        {attending ? (
          <>
            We can’t wait to <em>see you</em>
          </>
        ) : (
          <>
            You’ll be <em>missed</em>
          </>
        )}
      </h3>
      <p className={styles.copy}>Thank you, {name}. Your reply has been sent to the parents-to-be.</p>
      <MagneticButton onClick={onReset}>Send another reply</MagneticButton>
    </motion.div>
  )
}
