import { useContext } from 'react'
import { ConfettiContext } from '../confetti-context'

export function useConfetti() {
  const api = useContext(ConfettiContext)
  if (!api) throw new Error('useConfetti must be used inside ConfettiProvider')
  return api
}
