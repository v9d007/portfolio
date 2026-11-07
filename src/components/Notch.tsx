import { useState, useEffect } from 'react'
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

  // ScrollSpy: update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds: NavTab[] = ['home', 'projects', 'experience', 'skills', 'contact']
      const viewportHeight = window.innerHeight

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // If the section top is above 40% of viewport height
          if (rect.top <= viewportHeight * 0.4) {
            setActiveTab(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setActiveTab])

  const handleTabClick = (tab: NavTab) => {
    playSound('click', soundEnabled)
    setActiveTab(tab)
    setMenuOpen(false)

    const el = document.getElementById(tab)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
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
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className={`flex items-center gap-1.5 sm:gap-2.5 px-3 py-1.5 rounded-b-2xl border-x border-b shadow-xl backdrop-blur-xl transition-all duration-300 ${
          isBlueprint
            ? 'bg-[#031c38]/95 border-[#00f0ff]/50 text-[#00f0ff] shadow-[#00f0ff]/20'
            : 'bg-[#09090b]/90 border-white/10 text-white shadow-black/40'
        }`}
      >
        {/* Notch Status Pill */}
        <div className="flex items-center gap-1.5 pr-1 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider opacity-70 font-bold hidden sm:inline">
            V9D
          </span>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center gap-0.5">
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
                        : 'bg-white/15 border border-white/20'
                    }`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Mobile active indicator text with drawer toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 px-2 py-0.5 text-xs font-mono uppercase bg-white/10 rounded-lg"
          >
            <span>{activeTab}</span>
            {menuOpen ? <X size={12} /> : <Menu size={12} />}
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-3.5 bg-white/20 mx-0.5" />

        {/* Quick Action Controls */}
        <div className="flex items-center gap-1">
          {/* 1. CAD Blueprint Mode Toggle */}
          <button
            onClick={handleBlueprintToggle}
            title={isBlueprint ? 'Exit Blueprint CAD' : 'Enter Blueprint CAD Mode'}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              isBlueprint
                ? 'bg-[#00f0ff] text-black shadow-[0_0_10px_#00f0ff]'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass size={14} className={isBlueprint ? 'animate-spin' : ''} />
          </button>

          {/* 2. Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            title="Toggle Theme"
            className="p-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* 3. Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundEnabled ? 'Mute Sounds' : 'Enable Tactile Sounds'}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              soundEnabled ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden mt-1 p-2 rounded-2xl bg-[#09090b]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-1 w-44 mx-auto"
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