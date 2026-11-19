export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export const rand = (min: number, max: number) => min + Math.random() * (max - min)

export const pick = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)]
