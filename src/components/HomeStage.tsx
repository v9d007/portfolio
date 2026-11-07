import { useState } from 'react'
import { motion } from 'framer-motion'
import DynamicCore from './DynamicCore'
import TechTokensOrbit from './TechTokensOrbit'
import DeveloperPass from './DeveloperPass'
import TypewriterIntro from './TypewriterIntro'
import RightSidebarStacks from './RightSidebarStacks'
import { ChevronDown } from 'lucide-react'
import { playSound } from '../utils/audio'
import type { NavTab } from './Notch'

interface HomeStageProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const HomeStage = ({ onNavigate, soundEnabled }: HomeStageProps) => {
  const [coreStatus, setCoreStatus] = useState<string>('observing')

  const handleScrollToProjects = () => {
    playSound('click', soundEnabled)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden select-none pt-16 pb-20"
    >
      {/* 1. Top Right Telemetry Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 sm:top-5 right-6 sm:right-12 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] sm:text-[11px] font-mono shadow-sm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="opacity-70">CORE:</span>
        <span className="font-semibold text-cyan-400 dark:text-indigo-600 uppercase">
          {coreStatus}
        </span>
      </motion.div>

      {/* Centered Stage Cockpit HUD (Anchored tightly around the center Dynamic Core) */}
      <div className="relative w-full max-w-[1020px] h-full min-h-[660px] max-h-[860px] mx-auto flex items-center justify-center px-4 sm:px-6">
        {/* 2. Top Left: Holographic 3D Developer Pass Credential */}
        <DeveloperPass
          soundEnabled={soundEnabled}
          className="absolute top-6 sm:top-10 left-2 sm:left-4 lg:left-6 z-20 flex flex-col items-center select-none perspective-1000 scale-90 sm:scale-100 origin-top-left"
        />

        {/* 3. Center Assembly: Dynamic Island Core + Floating Tech Tokens Orbit */}
        <div className="relative flex items-center justify-center w-[440px] h-[440px] my-auto pointer-events-none">
          {/* Floating Spatial Tech Tokens Orbit */}
          <TechTokensOrbit soundEnabled={soundEnabled} />

          {/* Interactive Dynamic Island Core */}
          <div className="relative z-10 pointer-events-auto">
            <DynamicCore soundEnabled={soundEnabled} onStatusChange={setCoreStatus} />
          </div>
        </div>

        {/* 4. Bottom Left: Continuous Typewriter Bio & Quick Actions */}
        <TypewriterIntro
          onNavigate={onNavigate}
          soundEnabled={soundEnabled}
          className="absolute left-2 sm:left-4 lg:left-6 bottom-4 sm:bottom-8 z-20 max-w-xs sm:max-w-sm lg:max-w-md select-none pointer-events-auto scale-90 sm:scale-100 origin-bottom-left"
        />

        {/* 5. Right Side Interactive Stacks (Experience Accordion, Projects Fan, Socials) */}
        <RightSidebarStacks
          onNavigate={onNavigate}
          soundEnabled={soundEnabled}
          className="absolute right-2 sm:right-4 lg:right-6 top-8 sm:top-10 bottom-4 sm:bottom-8 z-20"
        />
      </div>

      {/* 6. Animated Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollToProjects}
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-mono shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        <span>Scroll to explore</span>
        <ChevronDown size={13} className="animate-bounce" />
      </motion.button>
    </section>
  )
}

export default HomeStage