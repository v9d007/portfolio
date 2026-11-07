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

const TechTokensOrbit = ({ soundEnabled }: TechTokensOrbitProps) => {
  // Elliptical ring surrounding the Bot Face
  const tokens: TechToken[] = [
    { id: 'swift', label: 'Swift 6', spec: 'Strict Concurrency', Icon: SwiftIcon, angle: -90, radiusX: 185, radiusY: 135 },
    { id: 'swiftui', label: 'SwiftUI', spec: 'Declarative iOS 18+', Icon: SwiftUIIcon, angle: -52, radiusX: 190, radiusY: 135 },
    { id: 'apple', label: 'iOS Core', spec: 'StoreKit & CoreData', Icon: AppleIcon, angle: -15, radiusX: 195, radiusY: 135 },
    { id: 'iitk', label: 'IIT Kanpur', spec: 'B.Tech EE \'19', Icon: IITKIcon, angle: 22, radiusX: 195, radiusY: 135 },
    { id: 'python', label: 'Python', spec: 'Systems & ML', Icon: PythonIcon, angle: 58, radiusX: 185, radiusY: 135 },
    { id: 'cpp', label: 'C++', spec: 'Low Latency DSA', Icon: CppIcon, angle: 95, radiusX: 185, radiusY: 135 },
    { id: 'typescript', label: 'TypeScript', spec: 'Strict Types', Icon: TypeScriptIcon, angle: 130, radiusX: 185, radiusY: 135 },
    { id: 'react', label: 'React Native', spec: 'Cross-Platform', Icon: ReactIcon, angle: 165, radiusX: 190, radiusY: 135 },
    { id: 'graphql', label: 'GraphQL', spec: 'Apollo Client', Icon: GraphQLIcon, angle: 200, radiusX: 190, radiusY: 135 },
    { id: 'docker', label: 'Docker', spec: 'CI/CD Pipelines', Icon: DockerIcon, angle: 235, radiusX: 190, radiusY: 135 },
    { id: 'kotlin', label: 'Kotlin', spec: 'Android Interop', Icon: KotlinIcon, angle: 270, radiusX: 185, radiusY: 135 }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Hand-Drawn Cursive Hint matching yl0.me: "Drag the stickers ↗" */}
      <div
        className="absolute top-1 right-2 sm:right-6 pointer-events-none flex items-center gap-1.5 text-[#5A6272] dark:text-[#8E96A6]"
        style={{ transform: 'rotate(-4deg)' }}
      >
        <svg
          className="w-10 sm:w-12 h-8 sm:h-9 overflow-visible stroke-[#7E8596] dark:stroke-[#9AA1B2] fill-none stroke-[1.8] stroke-linecap-round"
          viewBox="0 0 96 70"
          aria-hidden="true"
        >
          <path
            d="M92 10C82 5 68 7 62 15C57 22 60 30 67 29C74 28 71 18 63 19C53 20 46 32 36 41C29 47 24 50 18 53C14 56 11 59 8 62"
            strokeDasharray="4.5 4"
          />
          <path d="M18.8 60L8 62L11.7 51.6" />
        </svg>
        <span
          className="text-sm sm:text-base font-bold whitespace-nowrap"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          Drag the stickers
        </span>
      </div>

      {/* Orbiting Die-Cut Vinyl Stickers */}
      {tokens.map((token) => {
        const rad = (token.angle * Math.PI) / 180
        const x = Math.cos(rad) * token.radiusX
        const y = Math.sin(rad) * token.radiusY

        return (
          <motion.div
            key={token.id}
            drag
            dragConstraints={{ left: -320, right: 320, top: -220, bottom: 220 }}
            dragElastic={0.15}
            onDragStart={() => playSound('pop', soundEnabled)}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            initial={{ x, y, scale: 0.8, opacity: 0 }}
            animate={{ x, y, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.18,
              rotate: (token.angle % 12) - 6,
              zIndex: 60,
              transition: { type: 'spring', stiffness: 400, damping: 14 }
            }}
            whileDrag={{ scale: 1.28, zIndex: 70 }}
            className="absolute left-1/2 top-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group"
            style={{
              marginLeft: '-22px',
              marginTop: '-22px'
            }}
          >
            {/* Authentic Die-Cut White-Contour Vinyl Sticker (White paper/vinyl border in both themes) */}
            <div
              className="p-2 sm:p-2.5 rounded-2xl bg-white border-[2.5px] border-white shadow-md transition-all duration-200 die-cut-sticker flex items-center justify-center"
              title={`${token.label} (${token.spec})`}
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

export default TechTokensOrbit
