import type { FormEvent } from 'react'
import { MagneticButton } from '@/components/magnetic-button'
import type { RsvpValues } from '../types/rsvp'
import styles from './rsvp-form.module.css'

type RsvpFormProps = {
  values: RsvpValues
  sending: boolean
  error: string | null
  onChange: <K extends keyof RsvpValues>(key: K, value: RsvpValues[K]) => void
  onSubmit: (submitter: HTMLElement | null) => void
}

export function RsvpForm({ values, sending, error, onChange, onSubmit }: RsvpFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const native = event.nativeEvent as SubmitEvent
    onSubmit(native.submitter instanceof HTMLElement ? native.submitter : null)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="rsvp-name">Your name</label>
        <input
          id="rsvp-name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          onChange={(event) => onChange('name', event.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="rsvp-email">Your email (optional)</label>
        <input
          id="rsvp-email"
          type="email"
          autoComplete="email"
          placeholder="So we can reply to you"
          value={values.email}
          onChange={(event) => onChange('email', event.target.value)}
        />
      </div>
      <fieldset className={styles.fieldset}>
        <legend>Will you join us?</legend>
        <div className={styles.pills}>
          <input
            type="radio"
            id="rsvp-yes"
            name="attendance"
            checked={values.attendance === 'yes'}
            onChange={() => onChange('attendance', 'yes')}
          />
          <label htmlFor="rsvp-yes">With pleasure</label>
          <input
            type="radio"
            id="rsvp-no"
            name="attendance"
            checked={values.attendance === 'no'}
            onChange={() => onChange('attendance', 'no')}
          />
          <label htmlFor="rsvp-no">Sadly, I can’t</label>
        </div>
      </fieldset>
      {values.attendance === 'yes' && (
        <div className={styles.field}>
          <label htmlFor="rsvp-party">Number of guests</label>
          <select id="rsvp-party" value={values.party} onChange={(event) => onChange('party', event.target.value === '2' ? '2' : '1')}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      )}
      <div className={styles.field}>
        <label htmlFor="rsvp-note">A note for the parents-to-be</label>
        <textarea id="rsvp-note" placeholder="Optional" value={values.note} onChange={(event) => onChange('note', event.target.value)} />
      </div>
      <p className={styles.error} role="alert">
        {error}
      </p>
      <div>
        <MagneticButton variant="ink" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send my reply'}
        </MagneticButton>
      </div>
    </form>
  )
}
