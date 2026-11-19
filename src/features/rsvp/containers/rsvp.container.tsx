import { event } from '@/lib/event'
import { useConfetti } from '@/features/confetti'
import { RsvpForm } from '../components/rsvp-form'
import { RsvpSection } from '../components/rsvp-section'
import { RsvpThanks } from '../components/rsvp-thanks'
import { useRsvp } from '../hooks/use-rsvp'

export function Rsvp() {
  const rsvp = useRsvp()
  const { shower } = useConfetti()
  const attending = rsvp.values.attendance === 'yes'

  const handleSubmit = async (submitter: HTMLElement | null) => {
    const sent = await rsvp.submit()
    if (!sent || !attending || !submitter) return
    const rect = submitter.getBoundingClientRect()
    shower(rect.left + rect.width / 2, rect.top, 70, 0.8)
  }

  return (
    <RsvpSection replyBy={event.rsvpBy}>
      {rsvp.status === 'sent' ? (
        <RsvpThanks name={rsvp.values.name.trim()} attending={attending} onReset={rsvp.reset} />
      ) : (
        <RsvpForm
          values={rsvp.values}
          sending={rsvp.status === 'sending'}
          error={rsvp.error}
          onChange={rsvp.update}
          onSubmit={handleSubmit}
        />
      )}
    </RsvpSection>
  )
}
