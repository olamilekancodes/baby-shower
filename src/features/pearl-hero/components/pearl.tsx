import type { Ref } from 'react'
import type { Fracture } from '../utils/fault-lines'
import styles from './pearl.module.css'

type PearlProps = {
  ref: Ref<HTMLButtonElement>
  fracture: Fracture
  breaking: boolean
  disabled: boolean
  onBreak: () => void
}

export function Pearl({ ref, fracture, breaking, disabled, onBreak }: PearlProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={breaking ? `${styles.pearl} ${styles.breaking}` : styles.pearl}
      aria-label="Break the pearl to open the invitation"
      tabIndex={disabled ? -1 : 0}
      onClick={onBreak}
    >
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.halo} aria-hidden="true" />
      <span className={`${styles.halo} ${styles.late}`} aria-hidden="true" />
      <span className={styles.shards} aria-hidden="true">
        {fracture.shards.map((shard) => (
          <span key={shard.clipPath} className={styles.shard} style={{ clipPath: shard.clipPath }} data-shard data-angle={shard.angle}>
            <span className={styles.surface} />
          </span>
        ))}
        <svg className={styles.cracks} viewBox="0 0 100 100">
          {fracture.cracks.map((d) => (
            <path key={d} d={d} pathLength={1} />
          ))}
        </svg>
      </span>
      <span className={styles.ring} data-ring aria-hidden="true" />
      <span className={styles.flash} data-flash aria-hidden="true" />
    </button>
  )
}
