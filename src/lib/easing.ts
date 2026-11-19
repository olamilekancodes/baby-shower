type Bezier = [number, number, number, number]

export const ease = {
  out: [0.23, 1, 0.32, 1] as Bezier,
  inOut: [0.65, 0, 0.35, 1] as Bezier,
  fall: [0.55, 0, 1, 0.45] as Bezier,
  drawer: [0.32, 0.72, 0, 1] as Bezier,
}

export const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))
