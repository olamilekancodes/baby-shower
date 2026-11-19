import { event } from '@/lib/event'
import { CountdownSection } from '../components/countdown-section'
import { useCountdown } from '../hooks/use-countdown'

export function Countdown() {
  const left = useCountdown(event.startsAt)
  return <CountdownSection left={left} />
}
