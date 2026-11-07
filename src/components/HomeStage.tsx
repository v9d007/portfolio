import { useState } from 'react'
import { motion } from 'framer-motion'
import BotFace from './BotFace'
import StickerRing from './StickerRing'
import PolaroidWithCoffee from './PolaroidWithCoffee'
import TypewriterIntro from './TypewriterIntro'
import RightSidebarStacks from './RightSidebarStacks'
import type { NavTab } from './Notch'

interface HomeStageProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const HomeStage = ({ onNavigate, soundEnabled }: HomeStageProps) => {
  const [botMood, setBotMood] = useState<string>('shy')

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* 1. Top Right Status Pill (Exact match to yl0.me "Bot: shy") */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 sm:top-5 right-6 sm:right-12 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-mono shadow-sm"
      >
        <span className="opacity-70">Bot:</span>
        <span className="font-semibold text-cyan-400 dark:text-indigo-600 capitalize">
          {botMood}
        </span>
      </motion.div>

      {/* 2. Top Left Polaroid Photo & Coffee Cup */}
      <PolaroidWithCoffee soundEnabled={soundEnabled} />

      {/* 3. Central Interactive Core: Eyes + Orbiting Sticker Ring */}
      <div className="relative flex items-center justify-center w-full max-w-4xl h-full">
        {/* Die-cut circular tech stickers ring with "Drag the stickers" arrow */}
        <StickerRing soundEnabled={soundEnabled} />

        {/* Minimalist Cute Bot Eyes in Center */}
        <div className="relative z-10">
          <BotFace soundEnabled={soundEnabled} onStatusChange={setBotMood} />
        </div>
      </div>

      {/* 4. Bottom Left: Continuous Typewriter Terminal Intro */}
      <TypewriterIntro onNavigate={onNavigate} soundEnabled={soundEnabled} />

      {/* 5. Right Side Interactive Stacks (Experiences, Projects, Socials) */}
      <RightSidebarStacks onNavigate={onNavigate} soundEnabled={soundEnabled} />

      {/* 6. Bottom Center Discreet Footer */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-center font-mono text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 pointer-events-none">
        <p>Created with React + Framer Motion</p>
        <p>© 2026 Vinod Kumar Singh. All rights reserved.</p>
      </div>
    </div>
  )
}

export default HomeStage