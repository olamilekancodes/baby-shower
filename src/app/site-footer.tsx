import { event } from '@/lib/event'
import { Watermark } from '@/components/watermark'
import styles from './site-footer.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Watermark />
      <div className={styles.mark} aria-hidden="true">
        <i />
        <i />
      </div>
      <div className={styles.with}>With love, the parents-to-be</div>
      <p className={styles.meta}>{event.footerDate}</p>
    </footer>
  )
}
