import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Wall from './components/Wall'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isBlueprint, setIsBlueprint] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full min-h-screen bg-[#07070b]">
      {/* Booting Loader (yl0.me style boot) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#07070b] flex flex-col items-center justify-center select-none"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] animate-spin">
                <div className="w-full h-full bg-[#07070b] rounded-[14px]"></div>
              </div>
              <div className="absolute font-mono font-bold text-sm text-white">
                V9D
              </div>
            </div>
            <div className="mt-4 font-mono text-xs text-gray-400 tracking-wider">
              WAKING UP THE BOT...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main yl0.me Inspired Full-Viewport Wall */}
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