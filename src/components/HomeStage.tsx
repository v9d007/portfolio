import { useState } from 'react'
import { motion } from 'framer-motion'
import BotFace from './BotFace'
import TechTokensOrbit from './TechTokensOrbit'
import PolaroidWithCoffee from './PolaroidWithCoffee'
import TypewriterIntro from './TypewriterIntro'
import RightSidebarStacks from './RightSidebarStacks'
import { ChevronDown } from 'lucide-react'
import type { NavTab } from './Notch'

interface HomeStageProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const HomeStage = ({ onNavigate, soundEnabled }: HomeStageProps) => {
  const [botStatus, setBotStatus] = useState<string>('observing')

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[660px] max-h-[950px] flex items-center justify-center overflow-hidden select-none"
    >
      {/* 1. Top Right Telemetry Status Pill matching yl0.me */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 sm:top-5 right-6 sm:right-12 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#09090B] text-white dark:bg-[#F1F3F8] dark:text-[#12151B] text-[10px] sm:text-[11px] font-mono shadow-md border border-white/10 dark:border-black/10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="opacity-70">BOT:</span>
        <span className="font-bold text-[#7C3AED] dark:text-[#7C3AED] uppercase">
          {botStatus}
        </span>
      </motion.div>

      {/* Centered Stage Cockpit HUD (Wider container shifted left, balanced layout) */}
      <div className="relative w-full max-w-[1240px] xl:max-w-[1300px] h-[680px] sm:h-[720px] lg:h-[740px] mx-auto flex items-center justify-center px-4 sm:px-6">
        {/* 2. Unified Left Profile Identity Entity matching yl0.me */}
        <div className="absolute left-3 sm:left-6 lg:left-8 bottom-2 sm:bottom-4 lg:bottom-5 z-20 flex flex-col items-center max-w-[340px] sm:max-w-[370px] lg:max-w-[390px] select-none pointer-events-auto">
          {/* Top: Polaroid Card + Steaming Coffee Cup directly under it, centered on same axis */}
          <div className="w-full flex justify-center mb-5 sm:mb-7">
            <PolaroidWithCoffee soundEnabled={soundEnabled} />
          </div>

          {/* Bottom: Monospace Terminal Bio with Say hi Action */}
          <TypewriterIntro
            onNavigate={onNavigate}
            soundEnabled={soundEnabled}
            className="w-full select-none pointer-events-auto"
          />
        </div>

        {/* 3. Center Assembly: Expressive Character Bot Face + Floating Die-Cut Tech Tokens Orbit (Shifted up & strictly centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] sm:-translate-y-[62%] flex items-center justify-center w-[440px] h-[380px] pointer-events-none z-10">
          {/* Floating Spatial Die-Cut Tech Tokens Orbit */}
          <TechTokensOrbit soundEnabled={soundEnabled} />

          {/* Interactive Bot Face (Blinking eyes tracking cursor) */}
          <div className="relative z-10 pointer-events-auto">
            <BotFace soundEnabled={soundEnabled} onStatusChange={setBotStatus} />
          </div>
        </div>

        {/* 4. Right Side Interactive Stacks (Experience Accordion, Projects Fan, Socials) */}
        <RightSidebarStacks
          onNavigate={onNavigate}
          soundEnabled={soundEnabled}
          className="absolute right-2 sm:right-4 lg:right-6 top-6 sm:top-8 bottom-4 sm:bottom-6 z-20"
        />
      </div>

      {/* 5. Animated Scroll Down Indicator matching yl0.me (Guaranteed horizontal center alignment) */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
        <motion.button
          onClick={handleScrollToProjects}
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#09090B] text-white dark:bg-[#F1F3F8] dark:text-[#12151B] text-[11px] font-mono shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10 dark:border-black/10"
        >
          <span>Scroll to explore</span>
          <ChevronDown size={13} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  )
}

export default HomeStage
