import type { ReactNode } from 'react'
import styles from './eyebrow.module.css'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className={styles.eyebrow}>{children}</span>
}
