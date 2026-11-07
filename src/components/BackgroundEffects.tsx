import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BackgroundEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

      {/* Interactive Cursor Spotlight (Desktop) */}
      <motion.div
        className="hidden md:block absolute w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)',
        }}
      />

      {/* Floating Ambient Aurora Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[160px] animate-float-slow"></div>
      <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/12 blur-[170px] animate-float-reverse"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[150px] animate-float-slow"></div>

      {/* Top Edge Ambient Highlight Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
    </div>
  )
}

export default BackgroundEffects
