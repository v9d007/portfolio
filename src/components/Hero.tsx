import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  ChevronDown,
  Terminal
} from 'lucide-react'

const Hero = () => {
  const roles = [
    'Native iOS (Swift 6) Systems',
    'React Native Mobile Apps',
    'Enterprise Gamification Platforms',
    'Cross-Platform Architecture'
  ]

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [roles.length])

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const stats = [
    { label: 'Experience', value: '5+ Years', sub: 'Mobile & iOS Engineering' },
    { label: 'JEE Advanced', value: 'AIR 110', sub: 'IIT Kanpur Alumnus' },
    { label: 'Production Apps', value: '8+ Apps', sub: 'App Store & Google Play' },
    { label: 'Core Stack', value: 'Swift & RN', sub: 'Clean Architecture' },
  ]

  return (
    <section id="home" className="min-h-screen pt-32 pb-20 relative flex flex-col justify-center overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-8 hover:border-emerald-500/40 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-300">
              Open to Senior Mobile &amp; iOS Engineering Roles
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architecting Fluid <br />
              <span className="gradient-text-aurora">
                Mobile &amp; iOS Systems
              </span>
            </h1>

            {/* Dynamic Rotating Role Cycler */}
            <div className="h-10 sm:h-12 mt-4 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="font-mono text-base sm:text-xl text-indigo-400 font-semibold flex items-center gap-2"
                >
                  <Terminal size={18} className="text-cyan-400" />
                  <span>{roles[currentRoleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Biography Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Hi, I'm <strong className="text-white font-semibold">Vinod Kumar Singh</strong> — an IIT Kanpur graduate with 5+ years of experience engineering high-performance mobile apps. Specializing in Swift 6 strict concurrency, Clean Architecture, and enterprise React Native platforms.
          </motion.p>

          {/* Call to Actions & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => scrollToSection('#projects')}
              className="btn-primary w-full sm:w-auto flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Featured Work</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-secondary w-full sm:w-auto flex items-center gap-2 cursor-pointer"
            >
              <Mail size={16} className="text-indigo-400" />
              <span>Get in Touch</span>
            </button>

            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <a
                href="https://github.com/v9d007"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/[0.08] transition-all hover:scale-110 active:scale-95"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/vinod-kumar-singh200"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 hover:text-blue-400 border border-white/[0.08] transition-all hover:scale-110 active:scale-95"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* Interactive Bento Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card p-4 sm:p-5 rounded-2xl text-left relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 rounded-bl-full group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-400 font-medium">
                  {stat.sub}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Down Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 flex justify-center"
          >
            <button
              onClick={() => scrollToSection('#about')}
              className="text-gray-500 hover:text-indigo-400 transition-colors flex flex-col items-center gap-1 cursor-pointer"
              aria-label="Scroll to About section"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
