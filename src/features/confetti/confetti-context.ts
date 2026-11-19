import { createContext } from 'react'

export type ConfettiApi = {
  shower: (x: number, y: number, count?: number, power?: number) => void
}

export const ConfettiContext = createContext<ConfettiApi | null>(null)
