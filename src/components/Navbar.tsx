import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav
        className={`w-full max-w-5xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-panel bg-[#0b0c14]/85 shadow-2xl shadow-black/60 border border-white/10'
            : 'bg-[#0b0c14]/50 backdrop-blur-md border border-white/[0.07]'
        } px-4 py-2.5 sm:px-6`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow-indigo/50">
              <div className="w-full h-full bg-[#090a10] rounded-[11px] flex items-center justify-center font-mono text-sm font-bold text-white group-hover:bg-transparent transition-colors duration-300">
                VS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                Vinod Singh
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider">
                Mobile &amp; iOS Eng
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-lg ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 bg-white/10 rounded-lg border border-white/15"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              )
            })}
          </div>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contact')
              }}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md shadow-indigo-500/25 flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white bg-white/[0.05] border border-white/[0.08]"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-white/[0.08] mt-3 pt-3 pb-2"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className="px-3.5 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors font-medium flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight size={14} className="text-gray-500" />
                  </a>
                ))}
                <div className="pt-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection('#contact')
                    }}
                    className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Let's Connect</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Navbar
