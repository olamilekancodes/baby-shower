import { event } from '@/lib/event'
import { DetailsSection } from '../components/details-section'
import { useToast } from '../hooks/use-toast'

export function Details() {
  const toast = useToast()

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${event.venue.name}, ${event.venue.address}`)
      toast.show('Address copied')
    } catch {
      toast.show('Copy isn’t available here. Select the address instead')
    }
  }

  return <DetailsSection rows={event.details} mapUrl={event.venue.mapUrl} toast={toast.message} onCopyAddress={copyAddress} />
}
