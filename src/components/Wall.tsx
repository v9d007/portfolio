import { useState, useEffect, useCallback, memo } from 'react'
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

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setActiveTab(hash as NavTab)
      document.getElementById(hash)?.scrollIntoView()
    }
  }, [])

  const handleNavigate = useCallback((tab: NavTab) => {
    setActiveTab(tab)
    const el = document.getElementById(tab)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div
      className={`relative w-full min-h-screen select-none transition-colors duration-500 overflow-x-hidden ${
        isBlueprint
          ? 'blueprint-mode bg-[#021324] text-[#c9f0ff]'
          : theme === 'dark'
          ? 'bg-[#12151B] text-[#ECEFF5]'
          : 'bg-[#FFFFFF] text-[#151922]'
      }`}
    >
      {/* yl0.me Authentic Ripple Dot Grids (Top Right & Bottom Right) */}
      <div className="dots-bottom-right z-0" aria-hidden="true" />
      <div className="dots-top-right z-0" aria-hidden="true" />

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
      <footer className="relative z-10 w-full py-10 border-t border-slate-200/90 dark:border-white/10 text-center font-mono text-[11px] sm:text-xs text-[#0F172A] dark:text-[#E2E8F0] font-medium">
        <p>Engineered by Vinod Kumar Singh • Senior Mobile &amp; iOS Systems Architect</p>
        <p className="mt-1.5 opacity-80">IIT Kanpur '19 • Built with React, Tailwind &amp; Framer Motion</p>
      </footer>

      {/* Blueprint CAD Overlay */}
      <BlueprintOverlay isBlueprint={isBlueprint} />
    </div>
  )
}

export default memo(Wall)
