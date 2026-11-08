import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'
import {
  SwiftIcon,
  SwiftUIIcon,
  ReactIcon,
  TypeScriptIcon,
  PythonIcon,
  AppleIcon,
  KotlinIcon,
  GraphQLIcon,
  IITKIcon,
  DockerIcon,
  CppIcon
} from './TechStickerIcons'

interface TechTokensOrbitProps {
  soundEnabled: boolean
}

interface TechToken {
  id: string
  label: string
  spec: string
  Icon: () => JSX.Element
  angle: number
  radiusX: number
  radiusY: number
}

// True circular ring surrounding the Bot Face (R: 200px)
const RADIUS = 200
const TOKENS: readonly TechToken[] = [
  { id: 'swift', label: 'Swift 6', spec: 'Strict Concurrency', Icon: SwiftIcon, angle: -90, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'swiftui', label: 'SwiftUI', spec: 'Declarative iOS 18+', Icon: SwiftUIIcon, angle: -56, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'apple', label: 'iOS Core', spec: 'StoreKit & CoreData', Icon: AppleIcon, angle: -20, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'iitk', label: 'IIT Kanpur', spec: "B.Tech EE '19", Icon: IITKIcon, angle: 14, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'python', label: 'Python', spec: 'Systems & ML', Icon: PythonIcon, angle: 46, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'cpp', label: 'C++', spec: 'Low Latency DSA', Icon: CppIcon, angle: 78, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'typescript', label: 'TypeScript', spec: 'Strict Types', Icon: TypeScriptIcon, angle: 108, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'react', label: 'React Native', spec: 'Cross-Platform', Icon: ReactIcon, angle: 138, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'graphql', label: 'GraphQL', spec: 'Apollo Client', Icon: GraphQLIcon, angle: 168, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'docker', label: 'Docker', spec: 'CI/CD Pipelines', Icon: DockerIcon, angle: -160, radiusX: RADIUS, radiusY: RADIUS },
  { id: 'kotlin', label: 'Kotlin', spec: 'Android Interop', Icon: KotlinIcon, angle: -125, radiusX: RADIUS, radiusY: RADIUS }
]

const TechTokensOrbit = ({ soundEnabled }: TechTokensOrbitProps) => {
  const [resetCounts, setResetCounts] = useState<Record<string, number>>({})

  const handleDoubleClick = (id: string) => {
    playSound('pop', soundEnabled)
    setResetCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  const handleDragEnd = (id: string) => {
    const slotEl = document.getElementById(`slot-${id}`)
    const stickerEl = document.getElementById(`sticker-${id}`)
    if (slotEl && stickerEl) {
      const slotRect = slotEl.getBoundingClientRect()
      const stickerRect = stickerEl.getBoundingClientRect()
      const slotCenterX = slotRect.left + slotRect.width / 2
      const slotCenterY = slotRect.top + slotRect.height / 2
      const stickerCenterX = stickerRect.left + stickerRect.width / 2
      const stickerCenterY = stickerRect.top + stickerRect.height / 2
      const dist = Math.hypot(stickerCenterX - slotCenterX, stickerCenterY - slotCenterY)
      // Snap neatly back into home slot if dropped within 55px of it
      if (dist < 55) {
        playSound('pop', soundEnabled)
        setResetCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
      }
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30">
      {/* 1. Permanent Silhouette Slots ("space defined below" matching yl0.me) */}
      {TOKENS.map((token) => {
        const rad = (token.angle * Math.PI) / 180
        const x = Math.cos(rad) * token.radiusX
        const y = Math.sin(rad) * token.radiusY

        return (
          <div
            key={`slot-${token.id}`}
            id={`slot-${token.id}`}
            className="absolute left-1/2 top-1/2 pointer-events-none z-10 flex items-center justify-center"
            style={{
              marginLeft: '-24px',
              marginTop: '-24px',
              transform: `translate(${x}px, ${y}px)`
            }}
          >
            {/* Tactile die-cut placeholder slot matching the sticker shape */}
            <div
              className="w-12 h-12 sm:w-12 sm:h-12 rounded-2xl bg-[#EEF2F6]/90 dark:bg-[#151A24]/90 border-2 border-dashed border-[#CBD5E1] dark:border-[#2A3342] shadow-inner flex items-center justify-center transition-colors scale-105 sm:scale-110"
              title={`Slot: ${token.label}`}
            >
              <div className="opacity-20 dark:opacity-20 grayscale pointer-events-none scale-90">
                <token.Icon />
              </div>
            </div>
          </div>
        )
      })}

      {/* 2. Hand-Drawn Cursive Hint matching yl0.me: "Drag the stickers ↗" positioned cleanly above orbit */}
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none flex items-center gap-1.5 z-50 text-[#5A6272] dark:text-[#8E96A6]"
        style={{ transform: 'translate(48px, -225px) rotate(-3deg)' }}
      >
        <svg
          className="w-10 sm:w-12 h-8 sm:h-9 overflow-visible stroke-[#7E8596] dark:stroke-[#9AA1B2] fill-none stroke-[2] stroke-linecap-round"
          viewBox="-4 -4 104 78"
          aria-hidden="true"
        >
          <path
            d="M92 10C82 5 68 7 62 15C57 22 60 30 67 29C74 28 71 18 63 19C53 20 46 32 36 41C29 47 24 50 18 53C14 56 11 59 8 62"
            strokeDasharray="4.5 4"
          />
          <path d="M18.8 60L8 62L11.7 51.6" />
        </svg>
        <span
          className="text-sm sm:text-base font-bold whitespace-nowrap drop-shadow-sm"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          Drag the stickers
        </span>
      </div>

      {/* 3. Orbiting Die-Cut Vinyl Stickers */}
      {TOKENS.map((token) => {
        const rad = (token.angle * Math.PI) / 180
        const x = Math.cos(rad) * token.radiusX
        const y = Math.sin(rad) * token.radiusY

        return (
          <motion.div
            key={`${token.id}-${resetCounts[token.id] || 0}`}
            id={`sticker-${token.id}`}
            drag
            dragConstraints={{ left: -420, right: 420, top: -320, bottom: 320 }}
            dragElastic={0.15}
            onDragStart={() => playSound('pop', soundEnabled)}
            onDragEnd={() => handleDragEnd(token.id)}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            onDoubleClick={() => handleDoubleClick(token.id)}
            initial={{ x, y, scale: 0.8, opacity: 0 }}
            animate={{ x, y, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.22,
              rotate: (token.angle % 12) - 6,
              zIndex: 80,
              transition: { type: 'spring', stiffness: 400, damping: 14 }
            }}
            whileDrag={{ scale: 1.3, zIndex: 90 }}
            className="absolute left-1/2 top-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group"
            style={{
              marginLeft: '-24px',
              marginTop: '-24px',
              zIndex: 30
            }}
          >
            {/* Authentic Die-Cut White-Contour Vinyl Sticker (White paper/vinyl border in both themes) */}
            <div
              className="p-2 sm:p-2.5 rounded-2xl bg-white border-[2.5px] border-white shadow-md transition-all duration-200 die-cut-sticker flex items-center justify-center scale-105 sm:scale-110"
              title={`${token.label} (${token.spec}) • Drag to play, drop near slot to dock`}
            >
              <token.Icon />
            </div>

            {/* Micro Monospace Tooltip */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#09090B] text-white dark:bg-[#F1F3F8] dark:text-[#12151B] text-[9.5px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-white/10 dark:border-black/10">
              {token.label}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default memo(TechTokensOrbit)
