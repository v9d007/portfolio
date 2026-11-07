import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../utils/audio'
import { Cpu, Activity, Zap } from 'lucide-react'

interface DynamicCoreProps {
  soundEnabled: boolean
  onStatusChange?: (status: string) => void
}

const DynamicCore = ({ soundEnabled, onStatusChange }: DynamicCoreProps) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [telemetryIndex, setTelemetryIndex] = useState(0)
  const coreRef = useRef<HTMLDivElement>(null)

  const telemetryLines = [
    { title: 'SWIFT 6 CONCURRENCY', sub: 'Zero Data Races • 60 FPS', tag: 'STABLE' },
    { title: 'ENTERPRISE SCALE', sub: '10M+ Events @ Xoxoday', tag: 'ACTIVE' },
    { title: 'SYSTEM: AWAKENING', sub: 'Solo Leveling Engine', tag: 'SYNC' },
    { title: 'IIT KANPUR EE \'19', sub: 'Electrical Engineering Alumnus', tag: 'ALUMNI' }
  ]

  // Track cursor position anywhere across the viewport
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!coreRef.current) return
      const rect = coreRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.hypot(deltaX, deltaY)

      const maxDistance = 7
      const angle = Math.atan2(deltaY, deltaX)
      const clampedDist = Math.min(distance / 28, maxDistance)

      setPupilOffset({
        x: Math.cos(angle) * clampedDist,
        y: Math.sin(angle) * clampedDist
      })

      if (onStatusChange) {
        if (distance < 180) {
          onStatusChange('focused')
        } else if (distance < 400) {
          onStatusChange('observing')
        } else {
          onStatusChange('active')
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [onStatusChange])

  // Spontaneous eye blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 4500)

    return () => clearInterval(blinkInterval)
  }, [])

  // Rotate telemetry stats automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % telemetryLines.length)
    }, 3800)

    return () => clearInterval(timer)
  }, [telemetryLines.length])

  const handleClick = () => {
    playSound('pop', soundEnabled)
    setIsExpanded(!isExpanded)
    setTelemetryIndex((prev) => (prev + 1) % telemetryLines.length)
  }

  const currentTel = telemetryLines[telemetryIndex]

  return (
    <div className="relative flex flex-col items-center select-none" ref={coreRef}>
      {/* Apple-Inspired Dynamic Island Core */}
      <motion.div
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true)
          playSound('hover', soundEnabled)
        }}
        onMouseLeave={() => setIsHovered(false)}
        layout
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
        className={`relative cursor-pointer group rounded-full p-[2px] transition-all duration-300 ${
          isExpanded
            ? 'w-80 sm:w-96 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-2xl shadow-indigo-500/30'
            : 'w-64 sm:w-72 rounded-full bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 shadow-xl'
        }`}
      >
        <div
          className={`w-full h-full bg-[#090a12] border border-white/10 flex items-center justify-between px-4 py-2.5 transition-all ${
            isExpanded ? 'rounded-[22px] flex-col py-4 gap-3' : 'rounded-full h-14'
          }`}
        >
          {/* Main Row: OLED Eyes + Live Telemetry */}
          <div className="w-full flex items-center justify-between gap-3">
            {/* Left: Expressive OLED Eyes */}
            <div className="flex items-center gap-3 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
              {/* Left Eye */}
              <div className="relative w-6 h-6 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center overflow-hidden">
                {isBlinking ? (
                  <div className="w-4 h-[2px] bg-cyan-400 rounded-full" />
                ) : isHovered ? (
                  <div className="w-3.5 h-3.5 border-t-2 border-cyan-400 rounded-full mt-1.5" />
                ) : (
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] relative"
                    animate={{ x: pupilOffset.x, y: pupilOffset.y }}
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>

              {/* Right Eye */}
              <div className="relative w-6 h-6 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center overflow-hidden">
                {isBlinking ? (
                  <div className="w-4 h-[2px] bg-cyan-400 rounded-full" />
                ) : isHovered ? (
                  <div className="w-3.5 h-3.5 border-t-2 border-cyan-400 rounded-full mt-1.5" />
                ) : (
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] relative"
                    animate={{ x: pupilOffset.x, y: pupilOffset.y }}
                    transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right: Dynamic Telemetry Pill */}
            <div className="flex-1 min-w-0 text-left pl-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={telemetryIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="truncate"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-tight text-white uppercase truncate">
                      {currentTel.title}
                    </span>
                  </div>
                  <p className="text-[9px] font-mono text-cyan-300/80 truncate">
                    {currentTel.sub}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pulse Indicator */}
            <div className="p-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 shrink-0">
              <Activity size={12} className="animate-pulse" />
            </div>
          </div>

          {/* Expanded Drawer (Revealed on click) */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-300"
            >
              <div className="flex items-center gap-1.5">
                <Cpu size={12} className="text-indigo-400" />
                <span>Architecture: Clean / VIPER</span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 font-semibold">
                <Zap size={11} />
                <span>60 FPS Active</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Subtle Hint Pill */}
      <span className="mt-2 text-[9px] font-mono text-slate-400 dark:text-slate-500 tracking-wider">
        CORE // TAP ISLAND TO EXPAND
      </span>
    </div>
  )
}

export default DynamicCore