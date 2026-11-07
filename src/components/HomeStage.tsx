import { useState } from 'react'
import { motion } from 'framer-motion'
import DynamicCore from './DynamicCore'
import TechTokensOrbit from './TechTokensOrbit'
import DeveloperPass from './DeveloperPass'
import TypewriterIntro from './TypewriterIntro'
import RightSidebarStacks from './RightSidebarStacks'
import type { NavTab } from './Notch'

interface HomeStageProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const HomeStage = ({ onNavigate, soundEnabled }: HomeStageProps) => {
  const [coreStatus, setCoreStatus] = useState<string>('observing')

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
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

      {/* 2. Top Left: Holographic 3D Developer Pass Credential */}
      <DeveloperPass soundEnabled={soundEnabled} />

      {/* 3. Center Assembly: Dynamic Island Core + Floating Tech Tokens */}
      <div className="relative flex items-center justify-center w-full max-w-4xl h-full">
        {/* Floating Spatial Tech Tokens Orbit */}
        <TechTokensOrbit soundEnabled={soundEnabled} />

        {/* Interactive Dynamic Island Core */}
        <div className="relative z-10">
          <DynamicCore soundEnabled={soundEnabled} onStatusChange={setCoreStatus} />
        </div>
      </div>

      {/* 4. Bottom Left: Continuous Typewriter Bio & Quick Actions */}
      <TypewriterIntro onNavigate={onNavigate} soundEnabled={soundEnabled} />

      {/* 5. Right Side Interactive Stacks (Experience, Projects, Socials) */}
      <RightSidebarStacks onNavigate={onNavigate} soundEnabled={soundEnabled} />

      {/* 6. Bottom Center Engineering Credit */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-center font-mono text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 pointer-events-none">
        <p>Vinod Kumar Singh // Senior Mobile Architect // IIT Kanpur '19</p>
      </div>
    </div>
  )
}

export default HomeStage