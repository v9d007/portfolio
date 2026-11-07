import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Award, ShieldCheck, Sparkles } from 'lucide-react'
import { playSound } from '../utils/audio'

interface DeveloperPassProps {
  soundEnabled: boolean
}

const DeveloperPass = ({ soundEnabled }: DeveloperPassProps) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // 3D tilt calculation
    const rY = ((x - centerX) / centerX) * 12
    const rX = -((y - centerY) / centerY) * 12

    setRotateX(rX)
    setRotateY(rY)
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div className="absolute top-16 sm:top-20 left-6 sm:left-14 z-20 flex flex-col items-center select-none perspective-1000">
      {/* Lanyard Clip */}
      <div className="flex flex-col items-center z-30 mb-[-6px]">
        <div className="w-10 h-2 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-full shadow-md" />
        <div className="w-3.5 h-4 bg-slate-500 rounded-b-sm border-t border-slate-600 shadow-inner" />
      </div>

      {/* 3D Holographic Credential Badge */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => playSound('pop', soundEnabled)}
        animate={{
          rotateX,
          rotateY,
          rotateZ: -2.5
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        whileHover={{ scale: 1.04, y: -4 }}
        className="relative w-36 sm:w-44 rounded-2xl p-2.5 sm:p-3 bg-white/90 dark:bg-[#0c0e18]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/15 shadow-2xl cursor-pointer group overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Holographic Sheen Layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8), rgba(99,102,241,0.2) 40%, transparent 70%)`
          }}
        />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-1.5 mb-2">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300">
              DEV PASS // 2026
            </span>
          </div>
          <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800/40">
            PRO
          </span>
        </div>

        {/* Photo Container with subtle rim */}
        <div className="relative aspect-[4/4.2] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner mb-2 border border-black/5 dark:border-white/10">
          <img
            src="./avatar.png"
            alt="Vinod Kumar Singh"
            draggable={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
            }}
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-1.5 left-2 flex items-center gap-1 text-[9px] font-mono text-white font-semibold">
            <ShieldCheck size={11} className="text-cyan-400" />
            <span>Verified Engineer</span>
          </div>
        </div>

        {/* Identity Information */}
        <div className="text-left space-y-0.5">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            Vinod Kumar Singh
          </h4>
          <p className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
            Senior Mobile Architect
          </p>
          <div className="flex items-center gap-1 text-[9px] font-mono text-amber-600 dark:text-amber-400 pt-0.5">
            <Award size={10} />
            <span>IIT Kanpur • B.Tech EE '19</span>
          </div>
        </div>

        {/* Bottom Barcode Strip */}
        <div className="mt-2.5 pt-1.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[8px] font-mono text-slate-400 dark:text-slate-500">
          <span>UID: V9D-007</span>
          <span className="flex items-center gap-0.5 text-emerald-500 font-semibold">
            <Sparkles size={8} /> ACTIVE
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default DeveloperPass