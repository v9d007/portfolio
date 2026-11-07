import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Notch, { type NavTab } from './Notch'
import HomeStage from './HomeStage'
import ProjectRoll from './ProjectRoll'
import ExperienceView from './ExperienceView'
import SkillsView from './SkillsView'
import ContactView from './ContactView'
import BlueprintOverlay from './BlueprintOverlay'
import { ArrowLeft } from 'lucide-react'
import { playSound } from '../utils/audio'

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

  const handleBackToHome = () => {
    playSound('click', soundEnabled)
    setActiveTab('home')
  }

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-500 ${
        isBlueprint
          ? 'blueprint-mode bg-[#021324] text-[#c9f0ff]'
          : theme === 'dark'
          ? 'bg-[#09090b] text-slate-100'
          : 'bg-[#ffffff] text-slate-900'
      }`}
    >
      {/* Background Dot Grid (Matches Image 1 dots) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Floating Notch Pill */}
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

      {/* Back to Home Button when in secondary view */}
      {activeTab !== 'home' && (
        <button
          onClick={handleBackToHome}
          className="fixed top-4 left-6 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </button>
      )}

      {/* Stage Views */}
      <main className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <HomeStage onNavigate={setActiveTab} soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <ProjectRoll soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <ExperienceView soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <SkillsView soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <ContactView soundEnabled={soundEnabled} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Blueprint CAD Overlay */}
      <BlueprintOverlay isBlueprint={isBlueprint} />
    </div>
  )
}

export default Wall