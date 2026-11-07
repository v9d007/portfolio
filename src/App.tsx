import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Wall from './components/Wall'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isBlueprint, setIsBlueprint] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    // Set data-theme and class on html element
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [theme])

  return (
    <div className="w-full h-full min-h-screen">
      {/* Booting Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#ffffff] dark:bg-[#07070b] flex flex-col items-center justify-center select-none"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-slate-800 dark:border-slate-800 dark:border-t-white animate-spin" />
              <div className="absolute font-mono font-bold text-xs text-slate-800 dark:text-white">
                V9D
              </div>
            </div>
            <div className="mt-3 font-mono text-[11px] text-slate-500 tracking-wider">
              waking up the bot
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Full-Viewport Wall Canvas */}
      <Wall
        isBlueprint={isBlueprint}
        setIsBlueprint={setIsBlueprint}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  )
}

export default App