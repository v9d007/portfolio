import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { playSound } from '../utils/audio'
import type { NavTab } from './Notch'

interface TypewriterIntroProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const TypewriterIntro = ({ onNavigate, soundEnabled }: TypewriterIntroProps) => {
  // Full text paragraphs to type
  const fullText = `Hey there, I'm Vinod Kumar Singh!

I love crafting high-performance iOS engines and distributed mobile architectures. Always eager to optimize for 60 FPS fluidity and zero data-race concurrency.

Crafting enterprise mobile experiences at Xoxoday (Giift).

Originally hailing from IIT Kanpur (AIR 110), I now reside in Bengaluru with my laptop 🚀.`

  const [displayedLength, setDisplayedLength] = useState(0)

  // Character by character continuous typing animation
  useEffect(() => {
    if (displayedLength < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1)
      }, 16) // ~60 chars/second for fluid typewriter feel

      return () => clearTimeout(timeout)
    }
  }, [displayedLength, fullText.length])

  // Helper to format the displayed text with colored spans
  const currentText = fullText.slice(0, displayedLength)

  return (
    <div className="absolute left-6 sm:left-14 bottom-10 sm:bottom-12 z-20 max-w-sm sm:max-w-md select-none pointer-events-auto">
      {/* Monospace Typed Text */}
      <div className="text-xs sm:text-[13px] leading-relaxed font-mono text-[#3a404c] dark:text-slate-300">
        {/* Render formatted paragraphs */}
        <div className="whitespace-pre-wrap">
          {currentText.split('\n\n').map((paragraph, pIdx) => {
            return (
              <p key={pIdx} className="mb-3">
                {paragraph.includes('Vinod Kumar Singh') ? (
                  <>
                    Hey there, I'm{' '}
                    <span className="font-bold text-[#7c3aed] dark:text-[#a78bfa]">
                      Vinod Kumar Singh
                    </span>
                    {paragraph.slice(paragraph.indexOf('!') || paragraph.length)}
                  </>
                ) : paragraph.includes('Xoxoday (Giift)') ? (
                  <>
                    Crafting enterprise mobile experiences at{' '}
                    <button
                      onClick={() => onNavigate('experience')}
                      className="text-[#2563eb] dark:text-[#60a5fa] underline underline-offset-2 hover:opacity-80 transition-opacity"
                    >
                      Xoxoday (Giift)
                    </button>
                    .
                  </>
                ) : paragraph.includes('IIT Kanpur') ? (
                  <>
                    Originally hailing from{' '}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      IIT Kanpur
                    </span>{' '}
                    (AIR 110), I now reside in{' '}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Bengaluru
                    </span>{' '}
                    with my laptop 🚀.
                  </>
                ) : (
                  paragraph
                )}
              </p>
            )
          })}

          {/* Blinking Typewriter Cursor */}
          <span className="inline-block w-2 h-3.5 bg-slate-900 dark:bg-white ml-0.5 animate-pulse align-middle" />
        </div>
      </div>

      {/* Say Hi Pill Button */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-4"
      >
        <button
          onClick={() => {
            playSound('click', soundEnabled)
            onNavigate('contact')
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151922] dark:bg-white text-white dark:text-[#151922] text-xs font-mono font-medium shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Mail size={12} />
          <span>Say hi</span>
        </button>
      </motion.div>
    </div>
  )
}

export default TypewriterIntro