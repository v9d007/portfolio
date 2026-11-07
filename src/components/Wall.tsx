import { useState } from 'react'
import Notch, { type NavTab } from './Notch'
import HomeStage from './HomeStage'
import ProjectRoll from './ProjectRoll'
import ExperienceView from './ExperienceView'
import SkillsView from './SkillsView'
import ContactView from './ContactView'
import BlueprintOverlay from './BlueprintOverlay'

interface WallProps {
  isBlueprint: boolean
  setIsBlueprint: (val: boolean) => void
  soundEnabled: boolean
  setSoundEnabled: (val: boolean) => void
  theme: 'dark' | 'light'
  setTheme: (val: 'dark' | 'light') => void
}

const Wall = ({
  isBlueprint,
  setIsBlueprint,
  soundEnabled,
  setSoundEnabled,
  theme,
  setTheme
}: WallProps) => {
  const [activeTab, setActiveTab] = useState<NavTab>('home')

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab)
    const el = document.getElementById(tab)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={`relative w-full min-h-screen select-none transition-colors duration-500 overflow-x-hidden ${
        isBlueprint
          ? 'blueprint-mode bg-[#021324] text-[#c9f0ff]'
          : theme === 'dark'
          ? 'bg-[#09090b] text-slate-100'
          : 'bg-[#ffffff] text-slate-900'
      }`}
    >
      {/* Fixed Background Dot Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating Top Dynamic Notch with ScrollSpy */}
      <Notch
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBlueprint={isBlueprint}
        setIsBlueprint={setIsBlueprint}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Fluid Continuous Scroll Sections */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 1. Hero Dynamic Island & Core Canvas (#home) */}
        <HomeStage onNavigate={handleNavigate} soundEnabled={soundEnabled} />

        {/* 2. Featured Projects Grid (#projects) */}
        <ProjectRoll soundEnabled={soundEnabled} />

        {/* 3. Career Scale & Experience (#experience) */}
        <ExperienceView soundEnabled={soundEnabled} />

        {/* 4. Engineering Matrix & Skills (#skills) */}
        <SkillsView soundEnabled={soundEnabled} />

        {/* 5. Terminal Transmission Contact (#contact) */}
        <ContactView soundEnabled={soundEnabled} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 border-t border-slate-200 dark:border-white/10 text-center font-mono text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
        <p>Engineered by Vinod Kumar Singh • Senior Mobile &amp; iOS Systems Architect</p>
        <p className="mt-1 opacity-70">IIT Kanpur '19 • Built with React, Tailwind &amp; Framer Motion</p>
      </footer>

      {/* Blueprint CAD Overlay */}
      <BlueprintOverlay isBlueprint={isBlueprint} />
    </div>
  )
}

export default Wall