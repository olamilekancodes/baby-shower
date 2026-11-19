import { useEffect, useState } from 'react'

export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

const timeUntil = (target: number): TimeLeft => {
  let remaining = Math.max(0, target - Date.now()) / 1000
  const days = Math.floor(remaining / 86400)
  remaining -= days * 86400
  const hours = Math.floor(remaining / 3600)
  remaining -= hours * 3600
  const minutes = Math.floor(remaining / 60)
  const seconds = Math.floor(remaining - minutes * 60)
  return { days, hours, minutes, seconds }
}

export function useCountdown(isoDate: string) {
  const target = new Date(isoDate).getTime()
  const [left, setLeft] = useState(() => timeUntil(target))

  useEffect(() => {
    const id = window.setInterval(() => setLeft(timeUntil(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return left
}
