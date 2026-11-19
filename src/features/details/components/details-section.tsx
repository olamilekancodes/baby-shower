import { Band } from '@/components/band'
import { Eyebrow } from '@/components/eyebrow'
import { MagneticButton } from '@/components/magnetic-button'
import { Reveal } from '@/components/reveal'
import { SplitHeading } from '@/components/split-heading'
import type { DetailRow as Row } from '@/lib/event'
import { DetailRow } from './detail-row'
import { Toast } from './toast'
import styles from './details-section.module.css'

type DetailsSectionProps = {
  rows: readonly Row[]
  mapUrl: string
  toast: string | null
  onCopyAddress: () => void
}

export function DetailsSection({ rows, mapUrl, toast, onCopyAddress }: DetailsSectionProps) {
  const venueActions = (
    <>
      <MagneticButton onClick={onCopyAddress}>Copy address</MagneticButton>
      <MagneticButton href={mapUrl}>Map</MagneticButton>
    </>
  )

  return (
    <Band tone="pink" aria-labelledby="details-heading">
      <Reveal>
        <Eyebrow>The details</Eyebrow>
      </Reveal>
      <SplitHeading id="details-heading" lead="When &" emphasis="where" />
      <dl className={styles.rows}>
        {rows.map((row) => (
          <DetailRow key={row.label} {...row} actions={row.withVenueActions ? venueActions : undefined} />
        ))}
      </dl>
      <Toast message={toast} />
    </Band>
  )
}
