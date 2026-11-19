import { pick, rand } from '@/lib/maths'

type Bit = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  color: string
  rotation: number
  spin: number
  seed: number
  round: boolean
}

const colors = ['#cf6f97', '#5a8ccc', '#8f78c6', '#f4c6d6', '#b9d4ef', '#ffffff']
const FRAME = 16.667

export class ConfettiEngine {
  private readonly canvas: HTMLCanvasElement
  private readonly context: CanvasRenderingContext2D
  private bits: Bit[] = []
  private width = 0
  private height = 0
  private frame = 0
  private last = 0
  private running = false

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Canvas 2D is not supported')
    this.canvas = canvas
    this.context = context
    this.resize()
  }

  resize() {
    const ratio = Math.min(2, window.devicePixelRatio || 1)
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width * ratio
    this.canvas.height = this.height * ratio
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }

  shower(x: number, y: number, count = 80, power = 1) {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + rand(-1.3, 1.3)
      const speed = rand(3, 10) * power
      this.bits.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: rand(110, 170),
        size: rand(2.5, 5),
        color: pick(colors),
        rotation: rand(0, 6),
        spin: rand(-0.15, 0.15),
        seed: rand(0, 10),
        round: Math.random() < 0.4,
      })
    }
    if (this.running) return
    this.running = true
    this.frame = requestAnimationFrame(this.step)
  }

  destroy() {
    cancelAnimationFrame(this.frame)
    this.running = false
    this.bits = []
  }

  private readonly step = (now: number) => {
    const f = this.last ? Math.min(3, (now - this.last) / FRAME) : 1
    this.last = now
    const ctx = this.context
    ctx.clearRect(0, 0, this.width, this.height)
    this.bits = this.bits.filter((bit) => bit.life < bit.max)

    for (const bit of this.bits) {
      bit.life += f
      bit.vx *= Math.pow(0.97, f)
      bit.vy = bit.vy * Math.pow(0.97, f) + 0.06 * f
      bit.x += (bit.vx + Math.sin(bit.life * 0.06 + bit.seed) * 0.5) * f
      bit.y += bit.vy * f
      bit.rotation += bit.spin * f
      ctx.globalAlpha = Math.max(0, 1 - Math.pow(bit.life / bit.max, 2))
      ctx.fillStyle = bit.color
      ctx.save()
      ctx.translate(bit.x, bit.y)
      ctx.rotate(bit.rotation)
      ctx.scale(1, Math.cos(bit.life * 0.15 + bit.seed))
      if (bit.round) {
        ctx.beginPath()
        ctx.arc(0, 0, bit.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-bit.size, -bit.size * 0.3, bit.size * 2, bit.size * 0.6)
      }
      ctx.restore()
    }
    ctx.globalAlpha = 1

    if (this.bits.length) {
      this.frame = requestAnimationFrame(this.step)
    } else {
      this.running = false
      this.last = 0
      ctx.clearRect(0, 0, this.width, this.height)
    }
  }
}
