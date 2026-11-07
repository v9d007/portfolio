import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../utils/audio'

interface BotFaceProps {
  soundEnabled: boolean
  onStatusChange?: (status: string) => void
  className?: string
}

const BotFace = ({ soundEnabled, onStatusChange, className = '' }: BotFaceProps) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [showSpeech, setShowSpeech] = useState(false)
  const faceRef = useRef<HTMLDivElement>(null)

  const dialogues = [
    'Hey there! 👋',
    'Swift 6 & 60 FPS ⚡',
    'Drag the stickers around! 🛸',
    'Zero data races guaranteed 🛡️',
    'IIT Kanpur EE \'19 🎓',
    'Try the theme switch in the notch! 🌓'
  ]

  // Track cursor position relative to the bot center
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!faceRef.current) return
      const rect = faceRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.hypot(deltaX, deltaY)

      const maxDistance = 9
      const angle = Math.atan2(deltaY, deltaX)
      const clampedDist = Math.min(distance / 25, maxDistance)

      setPupilOffset({
        x: Math.cos(angle) * clampedDist,
        y: Math.sin(angle) * clampedDist
      })

      if (onStatusChange) {
        if (distance < 140) {
          onStatusChange('focused')
        } else if (distance < 360) {
          onStatusChange('observing')
        } else {
          onStatusChange('idle')
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [onStatusChange])

  // Spontaneous natural blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 140)
    }, 4200)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    playSound('pop', soundEnabled)
    setDialogueIndex((prev) => (prev + 1) % dialogues.length)
    setShowSpeech(true)
    if (onStatusChange) onStatusChange('happy')
    setTimeout(() => setShowSpeech(false), 2400)
  }

  return (
    <div
      ref={faceRef}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true)
        playSound('hover', soundEnabled)
        if (onStatusChange) onStatusChange('curious')
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        if (onStatusChange) onStatusChange('idle')
      }}
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
            <span>{dialogues[dialogueIndex]}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#09090B] dark:bg-[#F1F3F8] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expressive Bobbing Eyes Container matching yl0.me */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="flex items-center gap-12 sm:gap-16"
      >
        {/* Left Eye */}
        <div className="flex flex-col items-center">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#151922] dark:bg-[#E9EDF5] shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {isBlinking ? (
              <div className="w-8 h-[2.5px] bg-white dark:bg-[#12151B] rounded-full" />
            ) : isHovered ? (
              /* Squinting smiling arch */
              <div className="w-7 h-7 border-t-[3.5px] border-white dark:border-[#12151B] rounded-full mt-3.5" />
            ) : (
              /* Eyeball with tracked pupil */
              <motion.div
                className="w-4 h-4 rounded-full bg-white dark:bg-[#12151B] shadow-inner relative"
                animate={{ x: pupilOffset.x, y: pupilOffset.y }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
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
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#151922] dark:bg-[#E9EDF5] shadow-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {isBlinking ? (
              <div className="w-8 h-[2.5px] bg-white dark:bg-[#12151B] rounded-full" />
            ) : isHovered ? (
              /* Squinting smiling arch */
              <div className="w-7 h-7 border-t-[3.5px] border-white dark:border-[#12151B] rounded-full mt-3.5" />
            ) : (
              /* Eyeball with tracked pupil */
              <motion.div
                className="w-4 h-4 rounded-full bg-white dark:bg-[#12151B] shadow-inner relative"
                animate={{ x: pupilOffset.x, y: pupilOffset.y }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
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

export default BotFace
