import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'
import type { NavTab } from './Notch'

interface TypewriterIntroProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled?: boolean
  className?: string
}

const FULL_TEXT = `Hey there, I'm Vinod Kumar Singh!

Senior Mobile & iOS Systems Architect • Alumnus of IIT Kanpur (EE '19). Passionate about crafting fluid 60 FPS mobile systems and zero data-race concurrency.

Architected offline-first sync engines powering 10M+ events at Xoxoday (Giift). Focused on Swift 6 and distributed mobile resilience.`

const HIGHLIGHT_REGEX = /(Vinod Kumar Singh|IIT Kanpur \(EE '19\)|Swift 6|60 FPS|Xoxoday \(Giift\)|zero data-race)/g

const TypewriterIntro = ({
  onNavigate,
  className = 'w-full select-none pointer-events-auto'
}: TypewriterIntroProps) => {
  const [displayedLength, setDisplayedLength] = useState(0)

  // Fluid 60 FPS continuous typewriter progression using a single interval
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLength((prev) => {
        if (prev >= FULL_TEXT.length) {
          clearInterval(interval)
          return prev
        }
        return Math.min(prev + 2, FULL_TEXT.length)
      })
    }, 16)

    return () => clearInterval(interval)
  }, [])

  const currentText = FULL_TEXT.slice(0, displayedLength)
  const isComplete = displayedLength >= FULL_TEXT.length

  const renderHighlightedPart = (part: string, idx: number) => {
    switch (part) {
      case 'Vinod Kumar Singh':
        return (
          <span
            key={idx}
            className="font-extrabold text-[#6D28D9] dark:text-[#A78BFA] transition-colors"
          >
            Vinod Kumar Singh
          </span>
        )
      case "IIT Kanpur (EE '19)":
        return (
          <span key={idx} className="font-extrabold text-[#000000] dark:text-[#FFFFFF]">
            IIT Kanpur (EE '19)
          </span>
        )
      case 'Swift 6':
        return (
          <span key={idx} className="font-bold text-[#7C3AED] dark:text-[#A78BFA]">
            Swift 6
          </span>
        )
      case '60 FPS':
        return (
          <span key={idx} className="font-semibold text-emerald-600 dark:text-emerald-400">
            60 FPS
          </span>
        )
      case 'Xoxoday (Giift)':
        return (
          <button
            key={idx}
            onClick={() => onNavigate('experience')}
            className="text-[#1D4ED8] dark:text-[#8AB0FF] font-semibold underline decoration-dashed underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Xoxoday (Giift)
          </button>
        )
      case 'zero data-race':
        return (
          <span key={idx} className="font-semibold text-emerald-600 dark:text-emerald-400">
            zero data-race
          </span>
        )
      default:
        return <span key={idx}>{part}</span>
    }
  }

  return (
    <div className={className}>
      {/* Monospace Developer Intro Text matching yl0.me */}
      <div className="text-[11px] sm:text-[11.5px] lg:text-[12px] leading-[1.75] sm:leading-[1.8] font-mono text-[#09090B] dark:text-[#E2E8F0]">
        <div className="whitespace-pre-wrap">
          {currentText.split('\n\n').map((para, pIdx) => {
            const parts = para.split(HIGHLIGHT_REGEX)
            const isFirst = pIdx === 0
            return (
              <div
                key={pIdx}
                className={`relative pb-1 mb-2 border-b border-dashed border-slate-300/80 dark:border-white/15 ${
                  isFirst ? 'font-bold text-[12px] sm:text-[12.5px] lg:text-[13px] text-[#09090B] dark:text-[#F8FAFC]' : ''
                }`}
              >
                <p>{parts.map(renderHighlightedPart)}</p>
              </div>
            )
          })}

          {/* Active Blinking Monospace Cursor */}
          <span className="inline-block w-2 h-4 bg-[#09090B] dark:bg-[#ECEFF5] ml-0.5 animate-pulse align-middle" />
        </div>
      </div>

      {/* Tactile "Say hi" Pill Button matching yl0.me - ONLY rendered after typing completes */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-2.5 sm:mt-3 flex items-center"
          >
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#09090B] text-white hover:bg-[#1E1E24] dark:bg-[#F1F3F8] dark:text-[#12151B] dark:hover:bg-white text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer border border-white/10 dark:border-black/10"
            >
              <Mail size={13} className="text-[#A78BFA] dark:text-[#7C3AED]" />
              <span>Say hi</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default memo(TypewriterIntro)
