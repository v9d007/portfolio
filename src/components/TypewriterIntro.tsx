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
  className = 'absolute left-2 sm:left-4 bottom-4 sm:bottom-6 z-20 max-w-[300px] sm:max-w-[325px] select-none pointer-events-auto'
}: TypewriterIntroProps) => {
  const fullText = `Hey there, I'm Vinod Kumar Singh!

Senior Mobile & iOS Systems Engineer. Alumnus of IIT Kanpur.

Specializing in Swift 6 strict concurrency, fluid 60 FPS architectures, and distributed mobile systems at Xoxoday (Giift).

Crafting resilient, zero data-race applications for millions of users worldwide.`

  const [displayedLength, setDisplayedLength] = useState(0)

  // Fluid continuous typewriter animation
  useEffect(() => {
    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1)
      }, 15)

      return () => clearTimeout(timer)
    }
  }, [displayedLength, fullText.length])

  const currentText = fullText.slice(0, displayedLength)

  return (
    <div className={className}>
      {/* Monospace Developer Intro Text */}
      <div className="text-[11px] sm:text-xs leading-relaxed font-mono text-slate-700 dark:text-slate-300">
        <div className="whitespace-pre-wrap">
          {currentText.split('\n\n').map((paragraph, idx) => {
            return (
              <p key={idx} className="mb-2">
                {paragraph.includes('Vinod Kumar Singh') ? (
                  <>
                    Hey there, I'm{' '}
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/40">
                      Vinod Kumar Singh
                    </span>
                    !
                  </>
                ) : paragraph.includes('IIT Kanpur') ? (
                  <>
                    Senior Mobile &amp; iOS Systems Engineer. Alumnus of{' '}
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      IIT Kanpur
                    </span>
                    .
                  </>
                ) : paragraph.includes('Xoxoday (Giift)') ? (
                  <>
                    Specializing in Swift 6 strict concurrency, fluid 60 FPS architectures, and distributed mobile systems at{' '}
                    <button
                      onClick={() => onNavigate('experience')}
                      className="text-cyan-600 dark:text-cyan-400 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                    >
                      Xoxoday (Giift)
                    </button>
                    .
                  </>
                ) : (
                  paragraph
                )}
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
        transition={{ delay: 0.8 }}
        className="mt-4 flex items-center gap-2 flex-wrap"
      >
        <button
          onClick={() => {
            playSound('click', soundEnabled)
            onNavigate('projects')
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium shadow-md shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95"
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-medium shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <Mail size={12} />
          <span>Say hi</span>
        </button>
      </motion.div>
    </div>
  )
}

export default TypewriterIntro