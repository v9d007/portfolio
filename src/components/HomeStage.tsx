import { useState } from 'react'
import { motion } from 'framer-motion'
import CompanionBot from './CompanionBot'
import PolaroidCard from './PolaroidCard'
import StickerOrbit from './StickerOrbit'
import TerminalIntro from './TerminalIntro'
import type { NavTab } from './Notch'

interface HomeStageProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const HomeStage = ({ onNavigate, soundEnabled }: HomeStageProps) => {
  const [botStatus, setBotStatus] = useState<string>('idle')

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Bot Status Chip (Top-left, below Notch) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-14 left-4 sm:left-8 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0d16]/80 backdrop-blur-md border border-white/10 text-xs font-mono"
      >
        <span className="text-gray-400">Bot:</span>
        <span
          className={`font-semibold capitalize ${
            botStatus === 'amused'
              ? 'text-pink-400'
              : botStatus === 'happy'
              ? 'text-amber-400'
              : botStatus === 'observing'
              ? 'text-cyan-400'
              : 'text-emerald-400'
          }`}
        >
          {botStatus}
        </span>
      </motion.div>

      {/* Central Visual Assembly */}
      <div className="relative flex items-center justify-center w-full max-w-4xl h-full">
        {/* Orbital Stickers Ring */}
        <StickerOrbit soundEnabled={soundEnabled} />

        {/* Center Group: Polaroid Card + Companion Bot */}
        <div className="relative flex items-center justify-center z-20 gap-4 sm:gap-8">
          {/* Polaroid Photo Card (Pinned with washi tape at top-left) */}
          <div className="absolute -left-20 sm:-left-36 -top-16 sm:-top-20 z-20">
            <PolaroidCard soundEnabled={soundEnabled} />
          </div>

          {/* Central Animated Mascot Bot */}
          <div className="relative z-10">
            <CompanionBot soundEnabled={soundEnabled} onStatusChange={setBotStatus} />
          </div>
        </div>
      </div>

      {/* Terminal Introduction Speech Card (Bottom Left) */}
      <TerminalIntro onNavigate={onNavigate} soundEnabled={soundEnabled} />

      {/* Subtle Hint Pill at Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-gray-500 pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
        <span>Interactive Canvas • Drag stickers • Click bot • Toggle CAD in notch</span>
      </motion.div>
    </div>
  )
}

export default HomeStage