import { useState, useEffect, useRef, memo } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { playSound } from '../utils/audio'

interface BotFaceProps {
  soundEnabled: boolean
  onStatusChange?: (status: string) => void
  className?: string
}

const DIALOGUES = [
  'Hey there! 👋',
  'Swift 6 & 60 FPS ⚡',
  'Drag the stickers around! 🛸',
  'Zero data races guaranteed 🛡️',
  'IIT Kanpur EE \'19 🎓',
  'Try the theme switch in the notch! 🌓'
]

const BotFace = ({ soundEnabled, onStatusChange, className = '' }: BotFaceProps) => {
  const pupilX = useSpring(0, { damping: 25, stiffness: 260 })
  const pupilY = useSpring(0, { damping: 25, stiffness: 260 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [showSpeech, setShowSpeech] = useState(false)

  const faceRef = useRef<HTMLDivElement>(null)
  const currentStatusRef = useRef<string>('idle')
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track cursor position relative to the bot center with RAF throttle & cached bounds
  useEffect(() => {
    let cachedRect: DOMRect | null = null
    const updateRect = () => {
      if (faceRef.current) {
        cachedRect = faceRef.current.getBoundingClientRect()
      }
    }
    updateRect()

    let rafId: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        if (!cachedRect && faceRef.current) {
          cachedRect = faceRef.current.getBoundingClientRect()
        }
        if (!cachedRect) return

        const centerX = cachedRect.left + cachedRect.width / 2
        const centerY = cachedRect.top + cachedRect.height / 2

        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.hypot(deltaX, deltaY)

        const maxDistance = 9
        const angle = Math.atan2(deltaY, deltaX)
        const clampedDist = Math.min(distance / 25, maxDistance)

        pupilX.set(Math.cos(angle) * clampedDist)
        pupilY.set(Math.sin(angle) * clampedDist)

        if (onStatusChange) {
          let nextStatus = 'idle'
          if (distance < 140) {
            nextStatus = 'focused'
          } else if (distance < 360) {
            nextStatus = 'observing'
          }
          if (currentStatusRef.current !== nextStatus) {
            currentStatusRef.current = nextStatus
            onStatusChange(nextStatus)
          }
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', updateRect, { passive: true })
    window.addEventListener('scroll', updateRect, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect)
    }
  }, [onStatusChange, pupilX, pupilY])

  // Spontaneous natural blinking with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true)
      blinkTimerRef.current = setTimeout(() => setIsBlinking(false), 140)
    }, 4200)

    return () => {
      clearInterval(interval)
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current)
    }
  }, [])

  // Clean up speech timer on unmount
  useEffect(() => {
    return () => {
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current)
    }
  }, [])

  const handleClick = () => {
    playSound('pop', soundEnabled)
    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length)
    setShowSpeech(true)
    if (onStatusChange && currentStatusRef.current !== 'happy') {
      currentStatusRef.current = 'happy'
      onStatusChange('happy')
    }
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current)
    speechTimerRef.current = setTimeout(() => setShowSpeech(false), 2400)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    playSound('hover', soundEnabled)
    if (onStatusChange && currentStatusRef.current !== 'curious') {
      currentStatusRef.current = 'curious'
      onStatusChange('curious')
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (onStatusChange && currentStatusRef.current !== 'idle') {
      currentStatusRef.current = 'idle'
      onStatusChange('idle')
    }
  }

  return (
    <div
      ref={faceRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center cursor-pointer select-none py-4 px-6 group ${className}`}
    >
      {/* Speech Dialogue Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -48, scale: 1 }}
            exit={{ opacity: 0, y: -38, scale: 0.9 }}
            className="absolute z-40 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#09090B] text-white dark:bg-[#F1F3F8] dark:text-[#12151B] text-xs font-mono shadow-2xl pointer-events-none border border-white/10 dark:border-black/10"
          >
            <span>{DIALOGUES[dialogueIndex]}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#09090B] dark:bg-[#F1F3F8] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expressive Bobbing Eyes Container matching yl0.me */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="flex items-center gap-14 sm:gap-18"
      >
        {/* Left Eye */}
        <div className="flex flex-col items-center">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#151922] dark:bg-[#E9EDF5] shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {isBlinking ? (
              <div className="w-9 h-[2.5px] bg-white dark:bg-[#12151B] rounded-full" />
            ) : isHovered ? (
              /* Squinting smiling arch */
              <div className="w-8 h-8 border-t-[3.5px] border-white dark:border-[#12151B] rounded-full mt-4" />
            ) : (
              /* Eyeball with tracked pupil */
              <motion.div
                className="w-4.5 h-4.5 rounded-full bg-white dark:bg-[#12151B] shadow-inner relative"
                style={{ x: pupilX, y: pupilY }}
              >
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-[#151922] dark:bg-white" />
              </motion.div>
            )}
          </div>

          {/* Left Blush Mark */}
          <div className="mt-2 px-2 py-0.5 rounded-full bg-pink-100/90 dark:bg-pink-950/60 border border-pink-200/60 dark:border-pink-800/40 flex items-center gap-0.5 opacity-80">
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
          </div>
        </div>

        {/* Right Eye */}
        <div className="flex flex-col items-center">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#151922] dark:bg-[#E9EDF5] shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {isBlinking ? (
              <div className="w-9 h-[2.5px] bg-white dark:bg-[#12151B] rounded-full" />
            ) : isHovered ? (
              /* Squinting smiling arch */
              <div className="w-8 h-8 border-t-[3.5px] border-white dark:border-[#12151B] rounded-full mt-4" />
            ) : (
              /* Eyeball with tracked pupil */
              <motion.div
                className="w-4.5 h-4.5 rounded-full bg-white dark:bg-[#12151B] shadow-inner relative"
                style={{ x: pupilX, y: pupilY }}
              >
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-[#151922] dark:bg-white" />
              </motion.div>
            )}
          </div>

          {/* Right Blush Mark */}
          <div className="mt-2 px-2 py-0.5 rounded-full bg-pink-100/90 dark:bg-pink-950/60 border border-pink-200/60 dark:border-pink-800/40 flex items-center gap-0.5 opacity-80">
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default memo(BotFace)
