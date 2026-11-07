import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { playSound } from '../utils/audio'
import type { NavTab } from './Notch'

interface TypewriterIntroProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
  className?: string
}

const TypewriterIntro = ({
  onNavigate,
  soundEnabled,
  className = 'w-full select-none pointer-events-auto'
}: TypewriterIntroProps) => {
  const fullText = `Hey there, I'm Vinod Kumar Singh!

Senior Mobile & iOS Systems Architect • Alumnus of IIT Kanpur (EE '19).

5+ years architecting high-scale native iOS and cross-platform mobile systems.

Specializing in Swift 6 strict concurrency, fluid 60 FPS architectures, and CoreData offline-first sync engines powering 10M+ events at Xoxoday (Giift).

Crafting resilient, zero data-race applications for millions of users worldwide.`

  const [displayedLength, setDisplayedLength] = useState(0)

  // Fluid typewriter progression
  useEffect(() => {
    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1)
      }, 10)

      return () => clearTimeout(timer)
    }
  }, [displayedLength, fullText.length])

  const currentText = fullText.slice(0, displayedLength)
  const isComplete = displayedLength >= fullText.length

  return (
    <div className={className}>
      {/* Monospace Developer Intro Text matching yl0.me typography exactly */}
      <div className="text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.85] sm:leading-[1.95] font-mono text-[#3A404C] dark:text-[#C5CBD8]">
        <div className="whitespace-pre-wrap">
          {currentText.split('\n\n').map((para, pIdx) => {
            const parts = para.split(
              /(Vinod Kumar Singh|IIT Kanpur \(EE '19\)|5\+ years|Swift 6|60 FPS|Xoxoday \(Giift\)|zero data-race)/g
            )
            return (
              <p key={pIdx} className="mb-2 sm:mb-2.5">
                {parts.map((part, idx) => {
                  if (part === 'Vinod Kumar Singh') {
                    return (
                      <span
                        key={idx}
                        className="font-extrabold text-[#7C3AED] dark:text-[#A78BFA] transition-colors"
                      >
                        Vinod Kumar Singh
                      </span>
                    )
                  }
                  if (part === "IIT Kanpur (EE '19)") {
                    return (
                      <span key={idx} className="font-semibold text-[#151922] dark:text-[#ECEFF5]">
                        IIT Kanpur (EE '19)
                      </span>
                    )
                  }
                  if (part === '5+ years') {
                    return (
                      <span key={idx} className="font-semibold text-[#151922] dark:text-[#ECEFF5]">
                        5+ years
                      </span>
                    )
                  }
                  if (part === 'Swift 6') {
                    return (
                      <span key={idx} className="font-bold text-[#7C3AED] dark:text-[#A78BFA]">
                        Swift 6
                      </span>
                    )
                  }
                  if (part === '60 FPS') {
                    return (
                      <span key={idx} className="font-semibold text-emerald-600 dark:text-emerald-400">
                        60 FPS
                      </span>
                    )
                  }
                  if (part === 'Xoxoday (Giift)') {
                    return (
                      <button
                        key={idx}
                        onClick={() => onNavigate('experience')}
                        className="text-[#1D4ED8] dark:text-[#8AB0FF] font-semibold underline decoration-dashed underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        Xoxoday (Giift)
                      </button>
                    )
                  }
                  if (part === 'zero data-race') {
                    return (
                      <span key={idx} className="font-semibold text-emerald-600 dark:text-emerald-400">
                        zero data-race
                      </span>
                    )
                  }
                  return <span key={idx}>{part}</span>
                })}
              </p>
            )
          })}

          {/* Active Blinking Cursor */}
          <span className="inline-block w-1.5 h-3.5 bg-[#151922] dark:bg-[#ECEFF5] ml-0.5 animate-pulse align-middle" />
        </div>
      </div>

      {/* Tactile CTA Pill Buttons matching yl0.me ("Say hi" & "Explore Projects") */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isComplete ? 1 : 0.85, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3.5 sm:mt-4 flex items-center gap-2.5 flex-wrap"
      >
        <button
          onClick={() => {
            playSound('click', soundEnabled)
            onNavigate('contact')
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#09090B] text-white hover:bg-[#1E1E24] dark:bg-[#F1F3F8] dark:text-[#12151B] dark:hover:bg-white text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
        >
          <Mail size={13} className="text-[#A78BFA] dark:text-[#7C3AED]" />
          <span>Say hi</span>
        </button>

        <button
          onClick={() => {
            playSound('click', soundEnabled)
            onNavigate('projects')
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#181D26] text-[#151922] dark:text-[#ECEFF5] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
        >
          <span>Explore 8 Projects</span>
          <ArrowRight size={12} className="text-[#7C3AED] dark:text-[#A78BFA]" />
        </button>
      </motion.div>
    </div>
  )
}

export default TypewriterIntro
