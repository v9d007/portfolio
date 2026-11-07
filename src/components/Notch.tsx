import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu } from 'lucide-react'
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
  soundEnabled
}: NotchProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const tabs: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'home' },
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'experience' },
    { id: 'skills', label: 'skills' },
    { id: 'contact', label: 'contact' }
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
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    try {
      localStorage.setItem('theme', nextTheme)
    } catch (e) {}
  }

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 select-none">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-b-2xl shadow-xl transition-all duration-300 ${
          isBlueprint
            ? 'bg-[#031c38]/95 border-b border-x border-[#00f0ff]/50 text-[#00f0ff] shadow-[#00f0ff]/20'
            : theme === 'dark'
            ? 'bg-[#F1F3F8] text-[#12151B] shadow-black/60'
            : 'bg-[#09090B] text-white shadow-black/25'
        }`}
      >
        {/* Notch Status Pill */}
        <div className="flex items-center gap-1.5 pr-1 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider font-bold hidden sm:inline opacity-80">
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
                className={`relative px-2.5 py-1 text-xs font-mono tracking-wide rounded-lg transition-colors lowercase ${
                  isActive
                    ? theme === 'dark'
                      ? 'text-[#09090B] font-bold'
                      : 'text-white font-bold'
                    : theme === 'dark'
                    ? 'text-slate-500 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className={`absolute inset-0 rounded-lg -z-10 ${
                      isBlueprint
                        ? 'bg-[#00f0ff]/20 border border-[#00f0ff]/60'
                        : theme === 'dark'
                        ? 'bg-black/10'
                        : 'bg-white/15'
                    }`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-1 px-2 py-0.5 text-xs font-mono lowercase rounded-lg ${
              theme === 'dark' ? 'bg-black/10' : 'bg-white/10'
            }`}
          >
            <span>{activeTab}</span>
            <Menu size={11} />
          </button>
        </div>

        {/* Divider */}
        <div
          className={`h-4 w-[1px] mx-1 ${
            theme === 'dark' ? 'bg-black/15' : 'bg-white/15'
          }`}
        />

        {/* Action Controls */}
        <div className="flex items-center gap-0.5">
          {/* Blueprint Mode Toggle */}
          <button
            onClick={handleBlueprintToggle}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBlueprint
                ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                : theme === 'dark'
                ? 'hover:bg-black/10 text-slate-700'
                : 'hover:bg-white/10 text-slate-300'
            }`}
            title="Blueprint CAD Mode"
            aria-label="Blueprint CAD Mode"
          >
            <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 stroke-currentColor fill-none stroke-[1.8] stroke-linecap-round">
              <path d="M3 7V4.5A1.5 1.5 0 0 1 4.5 3H7M13 3h2.5A1.5 1.5 0 0 1 17 4.5V7M17 13v2.5a1.5 1.5 0 0 1-1.5 1.5H13M7 17H4.5A1.5 1.5 0 0 1 3 15.5V13M3 10h14" />
            </svg>
          </button>

          {/* Theme Switch (Sun / Moon) */}
          <button
            onClick={handleThemeToggle}
            className={`p-1.5 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'hover:bg-black/10 text-slate-800'
                : 'hover:bg-white/10 text-slate-300'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Moon size={13} className="text-[#7C3AED]" />
            ) : (
              <Sun size={13} className="text-amber-400" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 w-48 py-2 rounded-2xl shadow-2xl border font-mono text-xs ${
              theme === 'dark'
                ? 'bg-[#F1F3F8] text-[#12151B] border-black/10'
                : 'bg-[#09090B] text-white border-white/10'
            }`}
          >
            <div className="flex flex-col gap-0.5 px-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-left capitalize transition-colors ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? 'bg-black/10 font-bold'
                        : 'bg-white/15 font-bold'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Notch
