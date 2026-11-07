import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'
import {
  Smartphone,
  Cpu,
  GraduationCap,
  Sparkles,
  Layers,
  Award
} from 'lucide-react'

interface StickerBoardProps {
  soundEnabled: boolean
}

const StickerBoard = ({ soundEnabled }: StickerBoardProps) => {
  const stickers = [
    {
      id: 'swift6',
      title: 'Swift 6',
      sub: 'Strict Concurrency',
      icon: Cpu,
      color: 'from-orange-500/20 via-amber-500/20 to-red-500/20 text-orange-400 border-orange-500/40',
      tapeColor: 'bg-orange-400/20',
      initialRotate: -5,
      type: 'stamp'
    },
    {
      id: 'swiftui',
      title: 'SwiftUI & UIKit',
      sub: 'Native iOS • 60 FPS',
      icon: Smartphone,
      color: 'from-blue-500/20 via-indigo-500/20 to-cyan-500/20 text-cyan-300 border-cyan-500/40',
      tapeColor: 'bg-cyan-400/20',
      initialRotate: 4,
      type: 'badge'
    },
    {
      id: 'react-native',
      title: 'React Native',
      sub: 'Expo & EAS Build',
      icon: Layers,
      color: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/40',
      tapeColor: 'bg-blue-400/20',
      initialRotate: -3,
      type: 'badge'
    },
    {
      id: 'iit-kanpur',
      title: 'IIT Kanpur',
      sub: 'B.Tech EE \'19',
      icon: GraduationCap,
      color: 'from-amber-500/25 via-yellow-500/20 to-orange-500/20 text-amber-300 border-amber-500/40',
      tapeColor: 'bg-amber-400/25',
      initialRotate: 6,
      type: 'seal'
    },
    {
      id: 'system-awakening',
      title: 'System: Awakening',
      sub: 'Solo Leveling Engine',
      icon: Sparkles,
      color: 'from-purple-500/25 via-violet-500/20 to-indigo-500/20 text-purple-300 border-purple-500/40',
      tapeColor: 'bg-purple-400/20',
      initialRotate: -4,
      type: 'stamp'
    },
    {
      id: 'shipped',
      title: 'Store Certified',
      sub: 'App Store & Play Store',
      icon: Award,
      color: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/40',
      tapeColor: 'bg-emerald-400/20',
      initialRotate: 3,
      type: 'badge'
    }
  ]

  return (
    <div className="relative py-8 select-none">
      {/* Playful Instruction Badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
          Interactive Physics: Click &amp; drag stickers anywhere on screen!
        </span>
      </div>

      {/* Floating Sticker Grid / Playground */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
        {stickers.map((st) => (
          <motion.div
            key={st.id}
            drag
            dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
            dragElastic={0.2}
            initial={{ rotate: st.initialRotate }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            whileDrag={{ scale: 1.15, rotate: st.initialRotate * 1.5, zIndex: 50 }}
            onDragStart={() => playSound('pop', soundEnabled)}
            onDragEnd={() => playSound('click', soundEnabled)}
            className="relative cursor-grab active:cursor-grabbing group touch-none"
          >
            {/* Frosted Tape Strip on Top */}
            <div
              className={`absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 ${st.tapeColor} backdrop-blur-sm border border-white/20 -rotate-2 rounded-[2px] z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity`}
            ></div>

            {/* Sticker Body */}
            <div
              className={`relative px-4 py-3 rounded-2xl bg-gradient-to-br ${st.color} backdrop-blur-md border shadow-xl flex items-center gap-3 transition-shadow duration-200 group-hover:shadow-2xl`}
            >
              <div className="p-2 rounded-xl bg-black/40 border border-white/10 shrink-0">
                <st.icon size={18} />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white tracking-tight flex items-center gap-1">
                  {st.title}
                </div>
                <div className="text-[10px] font-mono text-gray-300/80">
                  {st.sub}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default StickerBoard
