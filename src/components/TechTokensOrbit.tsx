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
  glow: string
}

const TechTokensOrbit = ({ soundEnabled }: TechTokensOrbitProps) => {
  // Elliptical orbit snugly wrapping the Dynamic Island core
  // Keeps all tokens clear of DeveloperPass (top-left) and TypewriterIntro (bottom-left)
  const tokens: TechToken[] = [
    { id: 'swift', label: 'Swift 6', spec: 'Strict Concurrency', Icon: SwiftIcon, angle: -90, radiusX: 175, radiusY: 130, glow: 'hover:shadow-orange-500/30 border-orange-500/30' },
    { id: 'swiftui', label: 'SwiftUI', spec: 'iOS 18+ Declarative', Icon: SwiftUIIcon, angle: -50, radiusX: 180, radiusY: 130, glow: 'hover:shadow-blue-500/30 border-blue-500/30' },
    { id: 'apple', label: 'iOS Core', spec: 'StoreKit & CoreData', Icon: AppleIcon, angle: -15, radiusX: 180, radiusY: 130, glow: 'hover:shadow-slate-500/30 border-slate-500/30' },
    { id: 'iitk', label: 'IIT Kanpur', spec: 'B.Tech EE \'19', Icon: IITKIcon, angle: 20, radiusX: 180, radiusY: 130, glow: 'hover:shadow-amber-500/30 border-amber-500/30' },
    { id: 'python', label: 'Python', spec: 'Systems & Data', Icon: PythonIcon, angle: 55, radiusX: 175, radiusY: 130, glow: 'hover:shadow-yellow-500/30 border-yellow-500/30' },
    { id: 'cpp', label: 'C++', spec: 'Low Latency DSA', Icon: CppIcon, angle: 90, radiusX: 175, radiusY: 130, glow: 'hover:shadow-cyan-500/30 border-cyan-500/30' },
    { id: 'typescript', label: 'TypeScript', spec: 'Strict Types', Icon: TypeScriptIcon, angle: 125, radiusX: 175, radiusY: 130, glow: 'hover:shadow-blue-500/30 border-blue-500/30' },
    { id: 'react', label: 'React Native', spec: 'Cross-Platform Core', Icon: ReactIcon, angle: 160, radiusX: 180, radiusY: 130, glow: 'hover:shadow-cyan-500/30 border-cyan-500/30' },
    { id: 'graphql', label: 'GraphQL', spec: 'Optimistic Cache', Icon: GraphQLIcon, angle: 195, radiusX: 180, radiusY: 130, glow: 'hover:shadow-pink-500/30 border-pink-500/30' },
    { id: 'docker', label: 'Docker', spec: 'CI/CD Pipelines', Icon: DockerIcon, angle: 230, radiusX: 180, radiusY: 130, glow: 'hover:shadow-sky-500/30 border-sky-500/30' },
    { id: 'kotlin', label: 'Kotlin', spec: 'Android Interop', Icon: KotlinIcon, angle: 265, radiusX: 175, radiusY: 130, glow: 'hover:shadow-purple-500/30 border-purple-500/30' }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {tokens.map((token) => {
        const rad = (token.angle * Math.PI) / 180
        const x = Math.cos(rad) * token.radiusX
        const y = Math.sin(rad) * token.radiusY

        return (
          <motion.div
            key={token.id}
            drag
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
            dragElastic={0.15}
            onDragStart={() => playSound('pop', soundEnabled)}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            initial={{ x, y, scale: 0.8, opacity: 0 }}
            animate={{ x, y, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.15,
              zIndex: 60,
              transition: { type: 'spring', stiffness: 380, damping: 14 }
            }}
            whileDrag={{ scale: 1.25, zIndex: 70 }}
            className="absolute left-1/2 top-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group"
            style={{
              marginLeft: '-20px',
              marginTop: '-20px'
            }}
          >
            {/* Frosted Spatial Glass Token */}
            <div
              className={`p-1.5 sm:p-2 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 shadow-md transition-all duration-300 ${token.glow} flex items-center justify-center`}
              title={`${token.label} (${token.spec})`}
            >
              <token.Icon />
            </div>

            {/* Micro Hover Tooltip */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              {token.label}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default TechTokensOrbit
