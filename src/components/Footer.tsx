import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [bangaloreTime, setBangaloreTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      setBangaloreTime(timeStr)
    }

    updateTime()
    const timer = setInterval(updateTime, 10000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/v9d007',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vinod-kumar-singh200',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:v9d200@gmail.com',
      icon: Mail,
    }
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative pt-16 pb-12 overflow-hidden border-t border-white/[0.08]">
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>

      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-white/[0.06]">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#090a10] rounded-[7px] flex items-center justify-center font-mono text-xs font-bold text-white">
                  VS
                </div>
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                Vinod Kumar Singh
              </span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed mb-3">
              Senior Mobile Engineer specializing in Swift 6, SwiftUI, React Native, and Clean Architecture. Alumnus of IIT Kanpur.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Bangalore, IN — {bangaloreTime || 'IST (UTC+5:30)'}</span>
            </div>
          </div>

          {/* Quick Nav Links (4 cols) */}
          <div className="md:col-span-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-400">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-indigo-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials & Back to Top (3 cols) */}
          <div className="md:col-span-3 flex items-center justify-center md:justify-end gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 hover:text-white border border-white/[0.08] transition-all hover:scale-110 active:scale-95"
              >
                <s.icon size={16} />
              </a>
            ))}

            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 transition-all hover:scale-110 active:scale-95 cursor-pointer ml-2"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-2 text-center sm:text-left">
          <div>
            &copy; {currentYear} Vinod Kumar Singh. All rights reserved.
          </div>
          <div className="text-[11px] text-gray-500">
            Crafted with React 18, Vite, TypeScript, Tailwind CSS &amp; Framer Motion
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
