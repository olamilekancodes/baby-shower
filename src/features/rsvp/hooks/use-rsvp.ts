import { useState } from 'react'
import { RsvpConfigError, submitRsvp } from '../api/submit-rsvp'
import { emptyRsvp, type RsvpStatus, type RsvpValues } from '../types/rsvp'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (values: RsvpValues) => {
  if (!values.name.trim()) return 'Add your name so we know who is replying.'
  if (values.email && !emailPattern.test(values.email)) return 'Check your email address, or leave it empty.'
  return null
}

export function useRsvp() {
  const [values, setValues] = useState<RsvpValues>(emptyRsvp)
  const [status, setStatus] = useState<RsvpStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const update = <K extends keyof RsvpValues>(key: K, value: RsvpValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const submit = async () => {
    const problem = validate(values)
    setError(problem)
    if (problem) return false

    setStatus('sending')
    try {
      await submitRsvp({ ...values, name: values.name.trim(), email: values.email.trim() })
      setStatus('sent')
      return true
    } catch (cause) {
      setStatus('error')
      setError(
        cause instanceof RsvpConfigError
          ? 'Replies aren’t switched on yet. Please contact the couple directly.'
          : 'Your reply didn’t send. Check your connection and try again.',
      )
      return false
    }
  }

  const reset = () => {
    setStatus('idle')
    setError(null)
  }

  return { values, status, error, update, submit, reset }
}
