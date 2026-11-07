import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../utils/audio'
import { Sparkles, Terminal } from 'lucide-react'

interface CompanionBotProps {
  soundEnabled: boolean
  onStatusChange?: (status: string) => void
}

const CompanionBot = ({ soundEnabled, onStatusChange }: CompanionBotProps) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [showSpeech, setShowSpeech] = useState(true)
  const botRef = useRef<HTMLDivElement>(null)

  const dialogues = [
    'System: Awakening online! ⚔️',
    'Swift 6 & Strict Concurrency ⚡',
    'Drag any sticker around! 🛸',
    'IIT Kanpur EE \'19 checking in 🎓',
    'Toggle Blueprint Mode in the notch! 📐',
    '60 FPS zero-jank mobile engines 🚀',
    'Watching your cursor coordinates 👀'
  ]

  // Track cursor position anywhere across the viewport
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return
      const rect = botRef.current.getBoundingClientRect()
      const botCenterX = rect.left + rect.width / 2
      const botCenterY = rect.top + rect.height / 2

      const deltaX = e.clientX - botCenterX
      const deltaY = e.clientY - botCenterY
      const distance = Math.hypot(deltaX, deltaY)

      // Clamp pupil travel distance to 9px max
      const maxDistance = 9
      const angle = Math.atan2(deltaY, deltaX)
      const clampedDist = Math.min(distance / 20, maxDistance)

      setPupilOffset({
        x: Math.cos(angle) * clampedDist,
        y: Math.sin(angle) * clampedDist
      })

      if (onStatusChange) {
        if (distance < 200) {
          onStatusChange('observing')
        } else {
          onStatusChange('tracking')
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [onStatusChange])

  // Spontaneous blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 170)
    }, 4200)

    return () => clearInterval(blinkInterval)
  }, [])

  const handleBotClick = () => {
    playSound('pop', soundEnabled)
    setDialogueIndex((prev) => (prev + 1) % dialogues.length)
    setShowSpeech(true)
    if (onStatusChange) onStatusChange('amused')
  }

  return (
    <div className="relative inline-flex flex-col items-center select-none" ref={botRef}>
      {/* Speech Dialogue Bubble */}
      <AnimatePresence mode="wait">
        {showSpeech && (
          <motion.div
            key={dialogueIndex}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-12 sm:-top-14 z-20 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#0d0f18]/95 backdrop-blur-md border border-indigo-500/40 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-500/20 flex items-center gap-1.5 pointer-events-none"
          >
            <Sparkles size={12} className="text-cyan-400 animate-spin" />
            <span>{dialogues[dialogueIndex]}</span>
            {/* Pointer arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0d0f18] border-r border-b border-indigo-500/40 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot Robot Chassis */}
      <motion.div
        onClick={handleBotClick}
        onMouseEnter={() => {
          setIsHovered(true)
          playSound('hover', soundEnabled)
          if (onStatusChange) onStatusChange('happy')
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          if (onStatusChange) onStatusChange('idle')
        }}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-36 h-24 sm:w-44 sm:h-28 rounded-[32px] p-[2.5px] bg-gradient-to-b from-indigo-500/80 via-purple-500/40 to-cyan-400/70 shadow-2xl shadow-indigo-500/30 cursor-pointer group"
      >
        {/* Antenna / Status Beacon on Top */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse"></div>
          <div className="w-0.5 h-2.5 bg-gradient-to-b from-cyan-400 to-indigo-500"></div>
        </div>

        {/* Inner Dark Glass Screen */}
        <div className="w-full h-full rounded-[30px] bg-[#07080e] p-2 flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
          {/* Subtle Screen Scanline Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>

          {/* OLED Eyes Container */}
          <div className="flex items-center justify-center gap-5 sm:gap-6 relative z-10">
            {/* Left Eye */}
            <div className="relative w-9 h-11 sm:w-10 sm:h-13 rounded-full bg-[#0a0c16] border border-cyan-500/50 flex items-center justify-center overflow-hidden shadow-inner shadow-black">
              {isBlinking ? (
                <div className="w-6 h-[2.5px] bg-cyan-400 rounded-full"></div>
              ) : isHovered ? (
                /* Happy Squint Eye Arc */
                <div className="w-6 h-6 border-t-3 border-cyan-400 rounded-full mt-3"></div>
              ) : (
                /* Dynamic Pupil tracking cursor */
                <motion.div
                  className="w-5 h-6 sm:w-6 sm:h-7 rounded-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.9)] relative"
                  animate={{
                    x: pupilOffset.x,
                    y: pupilOffset.y
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                >
                  {/* Eye highlight glint */}
                  <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white"></div>
                </motion.div>
              )}
            </div>

            {/* Right Eye */}
            <div className="relative w-9 h-11 sm:w-10 sm:h-13 rounded-full bg-[#0a0c16] border border-cyan-500/50 flex items-center justify-center overflow-hidden shadow-inner shadow-black">
              {isBlinking ? (
                <div className="w-6 h-[2.5px] bg-cyan-400 rounded-full"></div>
              ) : isHovered ? (
                /* Happy Squint Eye Arc */
                <div className="w-6 h-6 border-t-3 border-cyan-400 rounded-full mt-3"></div>
              ) : (
                /* Dynamic Pupil tracking cursor */
                <motion.div
                  className="w-5 h-6 sm:w-6 sm:h-7 rounded-full bg-gradient-to-b from-cyan-300 via-cyan-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.9)] relative"
                  animate={{
                    x: pupilOffset.x,
                    y: pupilOffset.y
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                >
                  {/* Eye highlight glint */}
                  <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white"></div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Cheek Micro-LEDs */}
          <div className="flex items-center gap-10 mt-1 opacity-80">
            <div className="w-2 h-1 rounded-full bg-rose-400/90 shadow-[0_0_6px_#fb7185]"></div>
            <div className="w-2 h-1 rounded-full bg-rose-400/90 shadow-[0_0_6px_#fb7185]"></div>
          </div>
        </div>
      </motion.div>

      {/* Small Bot Badge */}
      <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
        <Terminal size={10} className="text-indigo-400" />
        <span>V9D-CORE // ONLINE</span>
      </div>
    </div>
  )
}

export default CompanionBot