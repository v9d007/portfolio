import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../utils/audio'
import { Sparkles } from 'lucide-react'

interface CompanionBotProps {
  soundEnabled: boolean
}

const CompanionBot = ({ soundEnabled }: CompanionBotProps) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [showSpeech, setShowSpeech] = useState(true)
  const botRef = useRef<HTMLDivElement>(null)

  const dialogues = [
    'System: Awakening online! ⚔️',
    'Swift 6 & Strict Concurrency ⚡',
    'Try dragging the tech stickers below! 🛸',
    'IIT Kanpur EE \'19 checking in 🎓',
    'Toggle Blueprint Mode in the navbar! 📐',
    '60 FPS zero-jank mobile interfaces 🚀',
    'Watching your cursor 👀'
  ]

  // Track cursor position relative to the bot
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!botRef.current) return
      const rect = botRef.current.getBoundingClientRect()
      const botCenterX = rect.left + rect.width / 2
      const botCenterY = rect.top + rect.height / 2

      const deltaX = e.clientX - botCenterX
      const deltaY = e.clientY - botCenterY
      const distance = Math.hypot(deltaX, deltaY)

      // Clamp pupil travel distance to 7px max
      const maxDistance = 7
      const angle = Math.atan2(deltaY, deltaX)
      const clampedDist = Math.min(distance / 25, maxDistance)

      setPupilOffset({
        x: Math.cos(angle) * clampedDist,
        y: Math.sin(angle) * clampedDist
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Spontaneous blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 160)
    }, 4000)

    return () => clearInterval(blinkInterval)
  }, [])

  const handleBotClick = () => {
    playSound('pop', soundEnabled)
    setDialogueIndex((prev) => (prev + 1) % dialogues.length)
    setShowSpeech(true)
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
            className="absolute -top-12 z-20 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#0d0f18]/90 backdrop-blur-md border border-indigo-500/30 text-xs font-mono text-indigo-300 shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 pointer-events-none"
          >
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            <span>{dialogues[dialogueIndex]}</span>
            {/* Pointer arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0d0f18] border-r border-b border-indigo-500/30 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot Robot Chassis */}
      <motion.div
        onClick={handleBotClick}
        onMouseEnter={() => {
          setIsHovered(true)
          playSound('hover', soundEnabled)
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-28 h-20 sm:w-32 sm:h-22 rounded-[28px] p-[2px] bg-gradient-to-b from-indigo-500/60 via-purple-500/30 to-cyan-400/50 shadow-2xl shadow-indigo-500/25 cursor-pointer group"
      >
        {/* Antenna / Status Beacon on Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-cyan animate-pulse"></div>
          <div className="w-0.5 h-2 bg-gradient-to-b from-cyan-400 to-indigo-500"></div>
        </div>

        {/* Inner Dark Glass Screen */}
        <div className="w-full h-full rounded-[26px] bg-[#07080e] p-2 flex flex-col items-center justify-center relative overflow-hidden border border-white/10">
          {/* Subtle Screen Scanline Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>

          {/* OLED Eyes Container */}
          <div className="flex items-center justify-center gap-4 relative z-10">
            {/* Left Eye */}
            <div className="relative w-7 h-9 rounded-full bg-[#0a0c16] border border-cyan-500/40 flex items-center justify-center overflow-hidden shadow-inner shadow-black">
              {isBlinking ? (
                <div className="w-5 h-[2px] bg-cyan-400 rounded-full"></div>
              ) : isHovered ? (
                /* Happy Squint Eye Arc */
                <div className="w-5 h-5 border-t-2 border-cyan-400 rounded-full mt-2 animate-bounce"></div>
              ) : (
                /* Dynamic Pupil tracking cursor */
                <motion.div
                  className="w-4 h-5 rounded-full bg-gradient-to-b from-cyan-300 to-indigo-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] relative"
                  animate={{
                    x: pupilOffset.x,
                    y: pupilOffset.y
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                >
                  {/* Eye highlight glint */}
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white"></div>
                </motion.div>
              )}
            </div>

            {/* Right Eye */}
            <div className="relative w-7 h-9 rounded-full bg-[#0a0c16] border border-cyan-500/40 flex items-center justify-center overflow-hidden shadow-inner shadow-black">
              {isBlinking ? (
                <div className="w-5 h-[2px] bg-cyan-400 rounded-full"></div>
              ) : isHovered ? (
                /* Happy Squint Eye Arc */
                <div className="w-5 h-5 border-t-2 border-cyan-400 rounded-full mt-2 animate-bounce"></div>
              ) : (
                /* Dynamic Pupil tracking cursor */
                <motion.div
                  className="w-4 h-5 rounded-full bg-gradient-to-b from-cyan-300 to-indigo-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] relative"
                  animate={{
                    x: pupilOffset.x,
                    y: pupilOffset.y
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                >
                  {/* Eye highlight glint */}
                  <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white"></div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom Cheek Micro-LEDs */}
          <div className="flex items-center gap-8 mt-1 opacity-70">
            <div className="w-1.5 h-1 rounded-full bg-rose-400/80"></div>
            <div className="w-1.5 h-1 rounded-full bg-rose-400/80"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CompanionBot
