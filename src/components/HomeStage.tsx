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
      className="relative w-full h-screen min-h-[520px] max-h-[950px] overflow-hidden select-none bg-white dark:bg-[#0D1017]"
    >
      {/* 1. Top Right Telemetry Status Pill matching yl0.me */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 sm:top-5 right-6 sm:right-10 z-30 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#09090B] text-white dark:bg-[#F1F3F8] dark:text-[#12151B] text-[10px] sm:text-[11px] font-mono shadow-md border border-white/10 dark:border-black/10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="opacity-70">BOT:</span>
        <span className="font-bold text-[#7C3AED] dark:text-[#7C3AED] uppercase">
          {botStatus}
        </span>
      </motion.div>

      {/* 2. Photo Card + Steaming Coffee Setup matching yl0.me (Centered above Bio) */}
      <div
        className="absolute z-20 pointer-events-auto select-none"
        style={{
          left: 'clamp(145px, 17.5vw, 195px)',
          top: 'clamp(95px, 18vh, 135px)',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <PolaroidWithCoffee soundEnabled={soundEnabled} />
      </div>

      {/* 3. Monospace Terminal Bio matching yl0.me */}
      <div
        className="absolute z-20 pointer-events-auto select-none"
        style={{
          left: 'clamp(20px, 3vw, 40px)',
          bottom: 'clamp(18px, 4vh, 38px)',
          width: 'min(295px, calc(100vw - 40px))'
        }}
      >
        <TypewriterIntro
          onNavigate={onNavigate}
          soundEnabled={soundEnabled}
          className="w-full select-none pointer-events-auto"
        />
      </div>

      {/* 4. Center Assembly: Expressive Character Bot Face + Circular Tech Orbit (Strictly centered, lifted ~20px) */}
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none z-10 flex items-center justify-center w-[350px] h-[350px]"
        style={{
          transform: 'translate(-50%, calc(-50% - clamp(14px, 3vh, 24px)))'
        }}
      >
        {/* Floating Spatial Die-Cut Tech Tokens Orbit (True circle R = 146px) */}
        <TechTokensOrbit soundEnabled={soundEnabled} />

        {/* Interactive Bot Face (Blinking eyes tracking cursor) */}
        <div className="relative z-10 pointer-events-auto">
          <BotFace soundEnabled={soundEnabled} onStatusChange={setBotStatus} />
        </div>
      </div>

      {/* 5. Right Side Interactive Stacks (Experience Accordion, Projects Fan, Socials) */}
      <RightSidebarStacks
        onNavigate={onNavigate}
        soundEnabled={soundEnabled}
        className="absolute z-20"
        style={{
          right: 'clamp(20px, 3.5vw, 56px)',
          top: 'clamp(24px, 5vh, 44px)',
          bottom: 'clamp(18px, 4vh, 38px)'
        }}
      />

      {/* 6. Animated Scroll Down Indicator matching yl0.me (Guaranteed horizontal center alignment) */}
      <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20">
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
