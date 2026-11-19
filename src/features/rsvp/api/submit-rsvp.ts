import type { RsvpValues } from '../types/rsvp'

const formId = import.meta.env.VITE_FORMSPREE_FORM_ID

export class RsvpConfigError extends Error {}

export async function submitRsvp(values: RsvpValues) {
  if (!formId) throw new RsvpConfigError('VITE_FORMSPREE_FORM_ID is not set')

  const attending = values.attendance === 'yes'
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `Baby shower RSVP from ${values.name}: ${attending ? 'joining' : 'not joining'}`,
      name: values.name,
      email: values.email || undefined,
      attending: attending ? 'Will join' : 'Cannot join',
      party: attending ? values.party : '0',
      note: values.note || undefined,
    }),
  })

  if (!response.ok) throw new Error(`Formspree responded with ${response.status}`)
}
