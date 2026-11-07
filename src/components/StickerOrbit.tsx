import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'
import {
  Smartphone,
  Cpu,
  GraduationCap,
  Sparkles,
  Layers,
  Award,
  ShieldCheck
} from 'lucide-react'

interface StickerOrbitProps {
  soundEnabled: boolean
}

interface StickerItem {
  id: string
  title: string
  subtitle: string
  icon: typeof Cpu
  bg: string
  border: string
  text: string
  tapeColor: string
  tapeAngle: number
  // Angular placement around the bot (in degrees)
  angleDeg: number
  radius: number
}

const StickerOrbit = ({ soundEnabled }: StickerOrbitProps) => {
  const stickers: StickerItem[] = [
    {
      id: 'swift6',
      title: 'Swift 6',
      subtitle: 'Strict Concurrency',
      icon: Cpu,
      bg: 'bg-orange-500/15 backdrop-blur-md',
      border: 'border-orange-500/40',
      text: 'text-orange-400',
      tapeColor: 'bg-orange-200/50',
      tapeAngle: -15,
      angleDeg: -140, // top-left-ish
      radius: 230
    },
    {
      id: 'swiftui',
      title: 'SwiftUI & UIKit',
      subtitle: 'Native iOS • 60 FPS',
      icon: Smartphone,
      bg: 'bg-cyan-500/15 backdrop-blur-md',
      border: 'border-cyan-500/40',
      text: 'text-cyan-300',
      tapeColor: 'bg-cyan-200/50',
      tapeAngle: 12,
      angleDeg: -45, // top-right
      radius: 240
    },
    {
      id: 'iit-kanpur',
      title: 'IIT Kanpur',
      subtitle: 'EE \'19 Alumnus',
      icon: GraduationCap,
      bg: 'bg-amber-500/15 backdrop-blur-md',
      border: 'border-amber-500/40',
      text: 'text-amber-300',
      tapeColor: 'bg-amber-200/50',
      tapeAngle: -8,
      angleDeg: 30, // right
      radius: 260
    },
    {
      id: 'system-awakening',
      title: 'System: Awakening',
      subtitle: 'Solo Leveling RPG',
      icon: Sparkles,
      bg: 'bg-purple-500/15 backdrop-blur-md',
      border: 'border-purple-500/40',
      text: 'text-purple-300',
      tapeColor: 'bg-purple-200/50',
      tapeAngle: 18,
      angleDeg: 95, // bottom-right
      radius: 220
    },
    {
      id: 'react-native',
      title: 'React Native',
      subtitle: 'Cross-Platform Core',
      icon: Layers,
      bg: 'bg-blue-500/15 backdrop-blur-md',
      border: 'border-blue-500/40',
      text: 'text-blue-300',
      tapeColor: 'bg-blue-200/50',
      tapeAngle: -12,
      angleDeg: 155, // bottom-left
      radius: 240
    },
    {
      id: 'shipped',
      title: 'Store Certified',
      subtitle: 'Millions Impacted',
      icon: Award,
      bg: 'bg-emerald-500/15 backdrop-blur-md',
      border: 'border-emerald-500/40',
      text: 'text-emerald-300',
      tapeColor: 'bg-emerald-200/50',
      tapeAngle: 10,
      angleDeg: 215, // left
      radius: 250
    },
    {
      id: 'clean-arch',
      title: 'Clean Arch',
      subtitle: 'VIPER & MVVM-C',
      icon: ShieldCheck,
      bg: 'bg-indigo-500/15 backdrop-blur-md',
      border: 'border-indigo-500/40',
      text: 'text-indigo-300',
      tapeColor: 'bg-indigo-200/50',
      tapeAngle: -6,
      angleDeg: -85, // top center-right
      radius: 270
    }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {stickers.map((st) => {
        // Calculate standard orbital position
        const rad = (st.angleDeg * Math.PI) / 180
        const posX = Math.cos(rad) * st.radius
        const posY = Math.sin(rad) * st.radius

        const Icon = st.icon

        return (
          <motion.div
            key={st.id}
            drag
            dragConstraints={{ left: -400, right: 400, top: -300, bottom: 300 }}
            dragElastic={0.15}
            onDragStart={() => playSound('pop', soundEnabled)}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            initial={{
              x: posX,
              y: posY,
              scale: 0.9,
              opacity: 0,
              rotate: st.tapeAngle * 0.7
            }}
            animate={{
              x: posX,
              y: posY,
              scale: 1,
              opacity: 1,
              rotate: st.tapeAngle * 0.7
            }}
            whileHover={{
              scale: 1.12,
              rotate: 0,
              zIndex: 60,
              transition: { type: 'spring', stiffness: 350, damping: 15 }
            }}
            whileDrag={{
              scale: 1.2,
              rotate: st.tapeAngle * 1.8,
              zIndex: 70
            }}
            className="absolute left-1/2 top-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group"
            style={{
              // Center the origin of placement
              marginLeft: '-60px',
              marginTop: '-30px'
            }}
          >
            {/* Washi Tape Strip */}
            <div
              className={`washi-tape -top-2 left-1/2 -translate-x-1/2 w-14 ${st.tapeColor}`}
              style={{ transform: `translateX(-50%) rotate(${st.tapeAngle}deg)` }}
            />

            {/* Tactile Sticker Badge */}
            <div
              className={`px-3 py-2 rounded-xl border shadow-lg transition-shadow group-hover:shadow-2xl ${st.bg} ${st.border} ${st.text} backdrop-blur-md flex items-center gap-2.5 min-w-[124px]`}
            >
              <div className="p-1.5 rounded-lg bg-white/10 shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight tracking-tight text-white whitespace-nowrap">
                  {st.title}
                </h4>
                <p className="text-[9px] font-mono opacity-80 whitespace-nowrap">
                  {st.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default StickerOrbit