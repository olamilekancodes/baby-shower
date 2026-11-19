import { loopBeats, score, tempo, type NoteEvent } from './lullaby-score'

const volume = 0.55
const lookahead = 0.25
const tickMs = 50
const fadeIn = 2
const fadeOut = 0.8

export type Lullaby = {
  play: () => Promise<void>
  pause: () => void
  dispose: () => void
}

const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

function createReverb(ctx: AudioContext) {
  const seconds = 3.2
  const length = Math.floor(ctx.sampleRate * seconds)
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3
  }
  const convolver = ctx.createConvolver()
  convolver.buffer = impulse
  return convolver
}

function playNote(ctx: AudioContext, out: AudioNode, note: NoteEvent, start: number, beatSeconds: number) {
  const bell = note.voice === 'bell'
  const ring = bell ? 2.6 : note.length * beatSeconds + 1.2
  const attack = bell ? 0.012 : 0.25
  const partials = bell ? [[1, 1], [2, 0.28], [3.01, 0.07]] : [[1, 1], [2, 0.12]]

  const envelope = ctx.createGain()
  envelope.gain.setValueAtTime(0.0001, start)
  envelope.gain.exponentialRampToValueAtTime(note.gain, start + attack)
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + ring)
  envelope.connect(out)

  for (const [ratio, level] of partials) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = frequency(note.midi) * ratio
    gain.gain.value = level
    osc.connect(gain).connect(envelope)
    osc.start(start)
    osc.stop(start + ring + 0.05)
  }
}

function createGraph() {
  const ctx = new AudioContext()
  const output = ctx.createGain()
  output.gain.value = 0
  const tone = ctx.createBiquadFilter()
  tone.type = 'lowpass'
  tone.frequency.value = 3200
  const wet = ctx.createGain()
  wet.gain.value = 0.45
  tone.connect(output)
  tone.connect(createReverb(ctx)).connect(wet).connect(output)
  output.connect(ctx.destination)
  return { ctx, input: tone, output }
}

export function createLullaby(): Lullaby {
  let ctx: AudioContext | null = null
  let input: AudioNode | null = null
  let output: GainNode | null = null
  let timer: number | undefined
  let suspendTimer: number | undefined
  let loopStart = 0
  let index = 0
  const beatSeconds = 60 / tempo
  const loopSeconds = loopBeats * beatSeconds

  const schedule = () => {
    if (!ctx || !input) return
    const horizon = ctx.currentTime + lookahead
    while (true) {
      const note = score[index]
      const at = loopStart + note.beat * beatSeconds
      if (at > horizon) break
      if (at >= ctx.currentTime - 0.05) playNote(ctx, input, note, Math.max(at, ctx.currentTime), beatSeconds)
      index++
      if (index === score.length) {
        index = 0
        loopStart += loopSeconds
      }
    }
  }

  const stopScheduler = () => {
    window.clearInterval(timer)
    timer = undefined
  }

  return {
    async play() {
      window.clearTimeout(suspendTimer)
      if (!ctx) ({ ctx, input, output } = createGraph())
      if (!output) return
      await ctx.resume()
      const now = ctx.currentTime
      output.gain.cancelScheduledValues(now)
      output.gain.setValueAtTime(output.gain.value, now)
      output.gain.linearRampToValueAtTime(volume, now + fadeIn)
      if (timer === undefined) {
        loopStart = now + 0.1
        index = 0
        schedule()
        timer = window.setInterval(schedule, tickMs)
      }
    },
    pause() {
      if (!ctx || !output) return
      const now = ctx.currentTime
      output.gain.cancelScheduledValues(now)
      output.gain.setValueAtTime(output.gain.value, now)
      output.gain.linearRampToValueAtTime(0, now + fadeOut)
      window.clearTimeout(suspendTimer)
      suspendTimer = window.setTimeout(() => {
        stopScheduler()
        void ctx?.suspend()
      }, fadeOut * 1000 + 50)
    },
    dispose() {
      stopScheduler()
      window.clearTimeout(suspendTimer)
      void ctx?.close()
      ctx = null
      input = null
      output = null
    },
  }
}
