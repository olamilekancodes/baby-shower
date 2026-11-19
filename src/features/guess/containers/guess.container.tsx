import { GuessSection } from '../components/guess-section'
import { useGuess } from '../hooks/use-guess'

export function Guess() {
  const { guess, choose } = useGuess()
  return <GuessSection guess={guess} onChoose={choose} />
}
