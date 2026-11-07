import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Mail } from 'lucide-react'
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

Over 5+ years of engineering experience architecting high-scale native iOS and cross-platform mobile systems.

Specializing in Swift 6 strict concurrency, fluid 60 FPS architectures, and CoreData offline-first sync engines powering 10M+ events at Xoxoday (Giift).

Crafting resilient, zero data-race applications for millions of users worldwide.`

  const [displayedLength, setDisplayedLength] = useState(0)

  // Fluid continuous typewriter animation
  useEffect(() => {
    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1)
      }, 10)

      return () => clearTimeout(timer)
    }
  }, [displayedLength, fullText.length])

  const currentText = fullText.slice(0, displayedLength)

  return (
    <div className={className}>
      {/* Monospace Developer Intro Text with larger readable typography */}
      <div className="text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-[1.65] font-mono text-slate-800 dark:text-slate-200">
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
                        className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/40"
                      >
                        Vinod Kumar Singh
                      </span>
                    )
                  }
                  if (part === "IIT Kanpur (EE '19)") {
                    return (
                      <span key={idx} className="font-semibold text-amber-600 dark:text-amber-400">
                        IIT Kanpur (EE '19)
                      </span>
                    )
                  }
                  if (part === '5+ years') {
                    return (
                      <span key={idx} className="font-semibold text-slate-900 dark:text-white">
                        5+ years
                      </span>
                    )
                  }
                  if (part === 'Swift 6') {
                    return (
                      <span key={idx} className="font-semibold text-indigo-600 dark:text-indigo-300">
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
                        className="text-cyan-600 dark:text-cyan-400 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
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
          <span className="inline-block w-2 h-3.5 bg-indigo-600 dark:bg-cyan-400 ml-0.5 animate-pulse align-middle" />
        </div>
      </div>

      {/* Quick Action Navigation Pills */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-3.5 sm:mt-4 flex items-center gap-2 flex-wrap"
      >
        <button
          onClick={() => {
            playSound('click', soundEnabled)
            onNavigate('projects')
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium shadow-md shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles size={12} />
          <span>Explore 8 Projects</span>
          <ArrowRight size={11} />
        </button>

        <button
          onClick={() => {
            playSound('click', soundEnabled)
            onNavigate('contact')
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-medium shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Mail size={12} />
          <span>Say hi</span>
        </button>
      </motion.div>
    </div>
  )
}

export default TypewriterIntro
