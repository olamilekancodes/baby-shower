import { clamp, rand } from '@/lib/maths'

type Side = -1 | 1

type Particle = {
  side: Side
  x: number
  y: number
  vx: number
  vy: number
  r: number
  life: number
  max: number
  seed: number
  ember: boolean
}

const FRAME = 16.667
const DRAG = 0.965

const sprite = (rgb: string, edge: string) => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const glow = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    glow.addColorStop(0, `rgba(${rgb},.9)`)
    glow.addColorStop(0.35, `rgba(${rgb},.55)`)
    glow.addColorStop(0.7, `rgba(${edge},.18)`)
    glow.addColorStop(1, `rgba(${edge},0)`)
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, 128, 128)
  }
  return canvas
}

export class FlameEngine {
  private readonly canvas: HTMLCanvasElement
  private readonly host: HTMLElement
  private readonly context: CanvasRenderingContext2D
  private readonly sprites = {
    blue: sprite('78,134,210', '150,192,240'),
    pink: sprite('222,104,154', '244,170,200'),
    lilac: sprite('150,118,212', '200,180,240'),
  }
  private particles: Particle[] = []
  private width = 0
  private height = 0
  private budget = 0
  private time = 0
  private last = 0
  private frame = 0
  private running = false

  constructor(canvas: HTMLCanvasElement, host: HTMLElement) {
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvas 2D is not supported')
    this.canvas = canvas
    this.host = host
    this.context = context
    this.resize()
  }

  resize() {
    const ratio = Math.min(2, window.devicePixelRatio || 1)
    const rect = this.host.getBoundingClientRect()
    this.width = rect.width
    this.height = rect.height
    this.canvas.width = this.width * ratio
    this.canvas.height = this.height * ratio
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  ignite(ms: number) {
    this.resize()
    this.budget = ms / FRAME
    if (this.running) return
    this.running = true
    this.frame = requestAnimationFrame(this.step)
  }

  destroy() {
    cancelAnimationFrame(this.frame)
    this.running = false
    this.particles = []
  }

  private emit(side: Side, f: number) {
    const cy = this.height * 0.5
    const count = Math.round(12 * f)
    const speed = this.width * 0.5 * (1 - DRAG)
    for (let i = 0; i < count; i++) {
      const spread = (Math.random() + Math.random() + Math.random() - 1.5) * this.height * 0.05
      const vx = -side * speed * rand(1.05, 1.4)
      const ahead = Math.random() * Math.abs(vx) * (f - 1)
      const x = (side < 0 ? -30 : this.width + 30) - side * ahead
      this.particles.push({ side, x, y: cy + spread, vx, vy: rand(-0.5, 0.25), r: rand(10, 22), life: 0, max: rand(70, 110), seed: rand(0, 10), ember: false })
      if (Math.random() < 0.12) {
        this.particles.push({ side, x, y: cy + spread * 0.6, vx: vx * 1.15, vy: rand(-1.2, 0.4), r: rand(1.2, 2.6), life: 0, max: rand(60, 100), seed: rand(0, 10), ember: true })
      }
    }
  }

  private readonly step = (now: number) => {
    const f = this.last ? Math.min(3, (now - this.last) / FRAME) : 1
    this.last = now
    this.time += f
    const ctx = this.context
    ctx.clearRect(0, 0, this.width, this.height)

    if (this.budget > 0) {
      this.budget -= f
      this.emit(-1, f)
      this.emit(1, f)
    }

    const cx = this.width / 2
    this.particles = this.particles.filter((p) => p.life < p.max)
    for (const p of this.particles) {
      p.life += f
      const near = 1 - clamp(Math.abs(p.x - cx) / (this.width * 0.22), 0, 1)
      p.vx *= Math.pow(DRAG - near * 0.02, f)
      p.vy = p.vy * Math.pow(0.985, f) - (0.05 + near * 0.16) * f
      p.vy += Math.sin(this.time * 0.09 + p.seed + p.y * 0.02) * 0.12 * f
      p.x += p.vx * f
      p.y += p.vy * f
      if (!p.ember) p.r += (near * 0.9 + 0.15) * f
      const k = p.life / p.max
      const fade = Math.min(1, p.life / 6) * (1 - k * k)
      if (p.ember) this.drawEmber(p, fade, near)
      else this.drawTongue(p, fade, near, k)
    }
    ctx.globalAlpha = 1

    if (this.particles.length || this.budget > 0) {
      this.frame = requestAnimationFrame(this.step)
    } else {
      this.running = false
      this.last = 0
      ctx.clearRect(0, 0, this.width, this.height)
    }
  }

  private drawEmber(p: Particle, fade: number, near: number) {
    const ctx = this.context
    ctx.globalAlpha = fade
    ctx.fillStyle = near > 0.5 ? '#ffffff' : p.side < 0 ? '#dbe9fb' : '#fde3ee'
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }

  private drawTongue(p: Particle, fade: number, near: number, k: number) {
    const ctx = this.context
    const own = p.side < 0 ? this.sprites.blue : this.sprites.pink
    const r = p.r * (1 - k * 0.3)
    const stretch = 1 + Math.min(3.2, Math.hypot(p.vx, p.vy) * 0.22)
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(Math.atan2(p.vy, p.vx))
    ctx.globalAlpha = fade * 0.32 * (1 - near * 0.75)
    ctx.drawImage(own, -r * stretch, -r, r * 2 * stretch, r * 2)
    if (near > 0) {
      ctx.globalAlpha = fade * 0.34 * near
      ctx.drawImage(this.sprites.lilac, -r * stretch, -r, r * 2 * stretch, r * 2)
    }
    ctx.restore()
  }
}
