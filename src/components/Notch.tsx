import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Volume2, VolumeX, Compass, Menu, X } from 'lucide-react'
import { playSound } from '../utils/audio'

export type NavTab = 'home' | 'projects' | 'experience' | 'skills' | 'contact'

interface NotchProps {
  activeTab: NavTab
  setActiveTab: (tab: NavTab) => void
  isBlueprint: boolean
  setIsBlueprint: (val: boolean) => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  soundEnabled: boolean
  setSoundEnabled: (val: boolean) => void
}

const Notch = ({
  activeTab,
  setActiveTab,
  isBlueprint,
  setIsBlueprint,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled
}: NotchProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const tabs: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleTabClick = (tab: NavTab) => {
    playSound('click', soundEnabled)
    setActiveTab(tab)
    setMenuOpen(false)
  }

  const handleBlueprintToggle = () => {
    playSound('chime', soundEnabled)
    setIsBlueprint(!isBlueprint)
  }

  const handleThemeToggle = () => {
    playSound('pop', soundEnabled)
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const handleSoundToggle = () => {
    const nextSound = !soundEnabled
    setSoundEnabled(nextSound)
    if (nextSound) playSound('click', true)
  }

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 select-none">
      {/* Sleek Minimalist Notch Pill (Matching yl0.me) */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className={`flex items-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-b-xl border-x border-b shadow-xl transition-all duration-300 ${
          isBlueprint
            ? 'bg-[#031c38]/95 border-[#00f0ff]/50 text-[#00f0ff] shadow-[#00f0ff]/20'
            : 'bg-[#09090b] border-black/40 text-white shadow-black/40'
        }`}
      >
        {/* 1. Blueprint CAD Mode Button */}
        <button
          onClick={handleBlueprintToggle}
          title={isBlueprint ? 'Exit CAD Blueprint' : 'Enter CAD Blueprint'}
          className={`p-1 rounded-md transition-colors ${
            isBlueprint
              ? 'text-[#00f0ff] shadow-[0_0_10px_#00f0ff]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Compass size={15} className={isBlueprint ? 'animate-spin' : ''} />
        </button>

        {/* 2. Menu Navigation Toggle Button (==) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          title="Toggle Navigation Menu"
          className="p-1 rounded-md text-gray-300 hover:text-white transition-colors flex items-center justify-center"
        >
          {menuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>

        {/* 3. Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          title="Toggle Theme"
          className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* 4. Sound Toggle Button */}
        <button
          onClick={handleSoundToggle}
          title={soundEnabled ? 'Mute Sounds' : 'Enable Tactile Sounds'}
          className={`p-1 rounded-md transition-colors ${
            soundEnabled ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
      </motion.nav>

      {/* Floating Dropdown Navigation Pill */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="mt-1 p-2 rounded-2xl bg-[#09090b]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1 w-44 mx-auto"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left px-3 py-1.5 text-xs font-mono rounded-lg transition-colors capitalize ${
                  activeTab === tab.id
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Notch