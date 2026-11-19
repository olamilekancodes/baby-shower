import { useState } from 'react'

export type Team = 'blue' | 'pink'

const KEY = 'baby-guess'

const readGuess = (): Team | null => {
  try {
    const saved = window.localStorage.getItem(KEY)
    return saved === 'blue' || saved === 'pink' ? saved : null
  } catch {
    return null
  }
}

export function useGuess() {
  const [guess, setGuess] = useState<Team | null>(readGuess)

  const choose = (team: Team) => {
    setGuess(team)
    try {
      window.localStorage.setItem(KEY, team)
    } catch {
      return
    }
  }

  return { guess, choose }
}
