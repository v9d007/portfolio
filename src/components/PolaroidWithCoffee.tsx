import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSound } from '../utils/audio'
import { WashiTape } from './WashiTape'
import { X, ArrowRight } from 'lucide-react'

interface PolaroidWithCoffeeProps {
  soundEnabled: boolean
  className?: string
}

const PolaroidWithCoffee = ({ soundEnabled, className = '' }: PolaroidWithCoffeeProps) => {
  const [isCupOpen, setIsCupOpen] = useState(false)

  const handleCupClick = () => {
    playSound('pop', soundEnabled)
    setIsCupOpen(!isCupOpen)
  }

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 1. Authentic Paper White Polaroid Card */}
      <motion.figure
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: -3.4 }}
        whileHover={{
          scale: 1.04,
          rotate: -1.5,
          y: -3,
          transition: { type: 'spring', stiffness: 350, damping: 18 }
        }}
        onClick={() => playSound('pop', soundEnabled)}
        className="relative cursor-pointer group"
      >
        {/* Washi Tape Strip Left */}
        <div
          className="absolute -top-3.5 -left-4 w-12 sm:w-14 h-4 z-20 pointer-events-none"
          style={{ transform: 'rotate(-38.6deg)' }}
        >
          <WashiTape />
        </div>

        {/* Washi Tape Strip Right */}
        <div
          className="absolute -top-3.5 -right-4 w-12 sm:w-14 h-4 z-20 pointer-events-none"
          style={{ transform: 'rotate(45.4deg)' }}
        >
          <WashiTape />
        </div>

        {/* Physical Paper White Frame (remains #FBFBF9 in both light & dark mode for wall contrast) */}
        <div
          className="relative rounded-[3px] bg-[#FBFBF9] text-[#151922] p-2 pb-3.5 sm:pb-4 w-28 sm:w-32 transition-shadow"
          style={{
            boxShadow:
              '0 0 0 1px rgba(21,25,34,.06), 0 1px 2px rgba(21,25,34,.12), 0 8px 12px -5px rgba(21,25,34,.3), 0 16px 24px -14px rgba(21,25,34,.35)'
          }}
        >
          {/* Photo Window */}
          <div className="relative aspect-square w-full rounded-[2px] overflow-hidden bg-[#ECEEF2] shadow-inner flex items-center justify-center">
            <img
              src="./avatar.png"
              alt="Vinod Kumar Singh"
              draggable={false}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                target.src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
              }}
            />
            {/* Subtle photographic reflection sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Polaroid Handwritten Caption */}
          <div className="mt-2 text-center">
            <p
              className="text-xs sm:text-[13px] font-bold text-[#151922] leading-tight"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Vinod Kumar Singh
            </p>
            <p className="text-[8px] sm:text-[8.5px] font-mono text-[#5A6272] tracking-wider font-semibold mt-0.5">
              IIT Kanpur • EE '19
            </p>
          </div>
        </div>
      </motion.figure>

      {/* 2. Steaming Coffee Cup below the card (exact match to yl0.me) */}
      <div className="relative mt-2.5 sm:mt-3 flex flex-col items-center">
        <button
          onClick={handleCupClick}
          aria-label="Buy me a cappuccino"
          type="button"
          className="group relative cursor-pointer outline-none transition-transform hover:scale-110 active:scale-95"
        >
          <svg viewBox="0 0 46 58" className="w-8 sm:w-9 h-10 sm:h-11 overflow-visible" aria-hidden="true">
            {/* Animated Rising Steam */}
            <g className="stroke-[#94A3B8] dark:stroke-[#64748B] fill-none stroke-[1.8] stroke-linecap-round">
              <motion.path
                d="M14 21c-3.2-3.6 3.2-6.6 0-10.4"
                animate={{ y: [0, -3, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              />
              <motion.path
                d="M21 21c3.4-4 -3.4-7.4 0-11.8"
                animate={{ y: [0, -4, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.3 }}
              />
              <motion.path
                d="M28 21c-3-3.4 3-6.2 0-9.8"
                animate={{ y: [0, -3, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.6 }}
              />
            </g>

            {/* Saucer */}
            <ellipse cx="20" cy="52.4" rx="17.5" ry="2.7" fill="#D9DCE3" className="dark:fill-[#2B303C]" />

            {/* Cup Handle */}
            <path
              d="M33 30.5h3.4a4.7 4.7 0 0 1 0 9.4H32"
              fill="none"
              stroke="#09090B"
              className="dark:stroke-[#E5E7EB]"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Ceramic Cup Body */}
            <path
              d="M7 26h26v11c0 8.4-5.8 13.4-13 13.4S7 45.4 7 37z"
              fill="#09090B"
              className="dark:fill-[#E5E7EB]"
            />

            {/* Coffee Liquid & Crema */}
            <ellipse cx="20" cy="26" rx="13" ry="2.6" fill="#2B2F3A" className="dark:fill-[#383C48]" />
            <ellipse cx="20" cy="26.5" rx="10.8" ry="1.8" fill="#8A5A3B" />

            {/* Cup Highlight */}
            <path
              d="M11.2 31.5V37c0 2.8 1.4 5.2 3.8 6.8"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.3"
              className="dark:stroke-[#09090B] dark:stroke-opacity-40"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Coffee Interactive Dialogue Popover */}
        <AnimatePresence>
          {isCupOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              className="absolute left-1/2 -translate-x-1/2 top-12 z-50 w-56 p-2.5 rounded-xl bg-[#09090B] text-white dark:bg-[#F1F3F8] dark:text-[#12151B] shadow-2xl border border-white/10 dark:border-black/10 font-mono text-center"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 dark:border-black/10 mb-2">
                <span className="text-[10px] font-bold text-amber-400 dark:text-amber-600">
                  COFFEE FUEL
                </span>
                <button
                  onClick={() => setIsCupOpen(false)}
                  className="p-0.5 rounded hover:bg-white/10 dark:hover:bg-black/10 text-slate-400 hover:text-white dark:text-slate-600 dark:hover:text-black"
                >
                  <X size={12} />
                </button>
              </div>

              <p className="text-[11px] leading-tight mb-2.5 text-slate-300 dark:text-slate-700">
                Wanna sponsor a cappuccino for late-night Swift builds?
              </p>

              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('chime', soundEnabled)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-all shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight size={11} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PolaroidWithCoffee
