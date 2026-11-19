import { MusicToggle } from '../components/music-toggle'
import { useLullaby } from '../hooks/use-lullaby'

export function Music() {
  const { playing, toggle } = useLullaby()
  return <MusicToggle playing={playing} onToggle={toggle} />
}
