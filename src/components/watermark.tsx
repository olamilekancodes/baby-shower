import styles from './watermark.module.css'

export function Watermark() {
  return (
    <div className={styles.watermark} aria-hidden="true">
      <div className={styles.plane} />
    </div>
  )
}
