import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../utils/audio'

interface BotFaceProps {
  soundEnabled: boolean
  onStatusChange?: (status: string) => void
}

const BotFace = ({ soundEnabled, onStatusChange }: BotFaceProps) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [showSpeech, setShowSpeech] = useState(false)
  const faceRef = useRef<HTMLDivElement>(null)

  const dialogues = [
    'Hey! ⚔️',
    'Swift 6 & 60 FPS ⚡',
    'Drag my stickers around! 🛸',
    'IIT Kanpur EE \'19 🎓',
    'Try Blueprint Mode above! 📐',
    'Watching your cursor 👀'
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

      const maxDistance = 10
      const angle = Math.atan2(deltaY, deltaX)
      const clampedDist = Math.min(distance / 24, maxDistance)

      setPupilOffset({
        x: Math.cos(angle) * clampedDist,
        y: Math.sin(angle) * clampedDist
      })

      if (onStatusChange) {
        if (distance < 160) {
          onStatusChange('shy')
        } else if (distance < 380) {
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
      className="relative flex flex-col items-center justify-center cursor-pointer select-none py-6 px-8 group"
    >
      {/* Speech Dialogue Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -35, scale: 0.9 }}
            className="absolute z-30 whitespace-nowrap px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-mono shadow-xl pointer-events-none"
          >
            <span>{dialogues[dialogueIndex]}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eyes & Cheeks Container */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="flex items-center gap-10 sm:gap-14"
      >
        {/* Left Eye Assembly */}
        <div className="flex flex-col items-center">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#151922] dark:bg-white shadow-md flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {isBlinking ? (
              <div className="w-7 h-[2.5px] bg-[#151922] dark:bg-white rounded-full" />
            ) : isHovered ? (
              /* Smiling squint arc */
              <div className="w-6 h-6 border-t-4 border-white dark:border-[#151922] rounded-full mt-3" />
            ) : (
              /* Eyeball with tracking pupil highlight */
              <motion.div
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white dark:bg-[#151922] shadow-inner"
                animate={{ x: pupilOffset.x, y: pupilOffset.y }}
                transition={{ type: 'spring', damping: 20, stiffness: 240 }}
              />
            )}
          </div>

          {/* Left Blush Mark (Pink oval with \\\ tick marks) */}
          <div className="mt-2.5 px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800/40 flex items-center gap-0.5 opacity-90">
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[-18deg] rounded-full" />
          </div>
        </div>

        {/* Right Eye Assembly */}
        <div className="flex flex-col items-center">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#151922] dark:bg-white shadow-md flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {isBlinking ? (
              <div className="w-7 h-[2.5px] bg-[#151922] dark:bg-white rounded-full" />
            ) : isHovered ? (
              /* Smiling squint arc */
              <div className="w-6 h-6 border-t-4 border-white dark:border-[#151922] rounded-full mt-3" />
            ) : (
              /* Eyeball with tracking pupil highlight */
              <motion.div
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white dark:bg-[#151922] shadow-inner"
                animate={{ x: pupilOffset.x, y: pupilOffset.y }}
                transition={{ type: 'spring', damping: 20, stiffness: 240 }}
              />
            )}
          </div>

          {/* Right Blush Mark (Pink oval with /// tick marks) */}
          <div className="mt-2.5 px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800/40 flex items-center gap-0.5 opacity-90">
            <span className="w-0.5 h-2 bg-pink-400 rotate-[18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[18deg] rounded-full" />
            <span className="w-0.5 h-2 bg-pink-400 rotate-[18deg] rounded-full" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default BotFace