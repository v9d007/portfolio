import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Skills from './components/Skills.tsx'
import Projects from './components/Projects.tsx'
import Experience from './components/Experience.tsx'
import Contact from './components/Contact.tsx'
import Footer from './components/Footer.tsx'
import BackgroundEffects from './components/BackgroundEffects.tsx'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isBlueprint, setIsBlueprint] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 700)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`min-h-screen ${
        isBlueprint ? 'blueprint-mode' : 'bg-[#07070b]'
      } text-slate-100 relative selection:bg-indigo-500/30 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-500`}
    >
      {/* Background Ambience & Canvas Spotlights */}
      <BackgroundEffects />

      {/* Screen Entry Transition */}
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#07070b] flex flex-col items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] animate-spin">
                <div className="w-full h-full bg-[#07070b] rounded-[14px]"></div>
              </div>
              <div className="absolute font-mono font-bold text-sm text-white">
                VS
              </div>
            </div>
            <div className="mt-4 font-mono text-xs text-gray-400 tracking-wider">
              INITIALIZING SYSTEM BOT...
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          isBlueprint={isBlueprint}
          setIsBlueprint={setIsBlueprint}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />
        <main className="flex-1">
          <Hero soundEnabled={soundEnabled} />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
