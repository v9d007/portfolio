import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none transition-colors duration-500 ${
        isBlueprint
          ? 'blueprint-mode bg-[#021324] text-[#c9f0ff]'
          : theme === 'dark'
          ? 'bg-[#07070b] text-slate-100'
          : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Ambient Gradient Glows (Home view only) */}
      {!isBlueprint && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        </div>
      )}

      {/* Top Floating Notch Dynamic Island */}
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

      {/* Viewport Stage Area */}
      <main className="relative w-full h-full pt-12">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <HomeStage
                onNavigate={setActiveTab}
                soundEnabled={soundEnabled}
              />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <ProjectRoll soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-full h-full"
            >
              <ExperienceView soundEnabled={soundEnabled} />
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
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

      {/* Blueprint Architectural CAD Overlay */}
      <BlueprintOverlay isBlueprint={isBlueprint} />
    </div>
  )
}

export default Wall