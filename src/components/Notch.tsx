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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tabs: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'home' },
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'experience' },
    { id: 'skills', label: 'skills' },
    { id: 'contact', label: 'contact' }
  ]

  const handleTabClick = (tab: NavTab) => {
    playSound('click', soundEnabled)
    setActiveTab(tab)
    setMobileMenuOpen(false)
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
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className={`relative flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-b-2xl border-x border-b shadow-2xl transition-all duration-300 ${
          isBlueprint
            ? 'bg-[#031c38]/95 border-[#00f0ff]/50 shadow-[#00f0ff]/20 text-[#00f0ff]'
            : 'bg-[#090a10]/90 backdrop-blur-xl border-white/10 shadow-black/60 text-white'
        }`}
      >
        {/* Notch Status Dot */}
        <div className="hidden sm:flex items-center gap-1.5 mr-1 pl-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
          <span className="text-[10px] font-mono tracking-wider opacity-70">V9D</span>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onMouseEnter={() => playSound('hover', soundEnabled)}
                className={`relative px-3 py-1 text-xs font-mono tracking-wide rounded-lg transition-colors capitalize ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className={`absolute inset-0 rounded-lg -z-10 ${
                      isBlueprint
                        ? 'bg-[#00f0ff]/20 border border-[#00f0ff]/60'
                        : 'bg-white/10 border border-white/15'
                    }`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Mobile active indicator text */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase bg-white/5 rounded-lg border border-white/10"
          >
            <span>{activeTab}</span>
            {mobileMenuOpen ? <X size={12} /> : <Menu size={12} />}
          </button>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-white/15 mx-1"></div>

        {/* Functional Control Buttons */}
        <div className="flex items-center gap-1">
          {/* Blueprint Mode Toggle */}
          <button
            onClick={handleBlueprintToggle}
            title={isBlueprint ? 'Exit Blueprint CAD' : 'Enter Blueprint CAD Mode'}
            className={`p-1.5 rounded-lg text-xs transition-all relative group ${
              isBlueprint
                ? 'bg-[#00f0ff] text-black shadow-[0_0_12px_#00f0ff]'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass size={14} className={isBlueprint ? 'animate-spin' : ''} />
            <span className="sr-only">Blueprint Mode</span>
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/90 text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-cyan-500/30">
              CAD Blueprint
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            title="Toggle Dark / Light Theme"
            className="p-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute Sound' : 'Enable Tactile Sound'}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              soundEnabled
                ? 'text-cyan-400 hover:bg-cyan-500/10'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/10'
            }`}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 p-2 rounded-2xl bg-[#090a10]/95 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col gap-1 w-48 mx-auto"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full text-left px-3 py-1.5 text-xs font-mono rounded-lg capitalize ${
                  activeTab === tab.id
                    ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/30'
                    : 'text-gray-300 hover:bg-white/5'
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