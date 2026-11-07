// Web Audio API Procedural Sound Synthesizer
// Zero external audio files required - generates clean haptic clicks and chimes

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export const playSound = (type: 'click' | 'pop' | 'chime' | 'toggle' | 'hover', enabled: boolean = true) => {
  if (!enabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    if (type === 'click') {
      // Soft mechanical tactile click
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(650, now)
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } else if (type === 'hover') {
      // Very gentle micro-tick
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(800, now)

      gain.gain.setValueAtTime(0.015, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.02)
    } else if (type === 'pop') {
      // Tactile sticker pop
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.07)

      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } else if (type === 'chime' || type === 'toggle') {
      // Two-tone harmonic chime for Blueprint mode
      const notes = [523.25, 783.99] // C5 and G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)

        gain.gain.setValueAtTime(0.07, now + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.2)
      })
    }
  } catch {
    // Ignore audio autoplay restrictions gracefully
  }
}
