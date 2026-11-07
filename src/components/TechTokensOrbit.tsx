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
  radius: number
  glow: string
}

const TechTokensOrbit = ({ soundEnabled }: TechTokensOrbitProps) => {
  const tokens: TechToken[] = [
    { id: 'swift', label: 'Swift 6', spec: 'Strict Concurrency', Icon: SwiftIcon, angle: -90, radius: 210, glow: 'hover:shadow-orange-500/30 border-orange-500/30' },
    { id: 'swiftui', label: 'SwiftUI', spec: 'iOS 18+ Declarative', Icon: SwiftUIIcon, angle: -55, radius: 215, glow: 'hover:shadow-blue-500/30 border-blue-500/30' },
    { id: 'apple', label: 'iOS Core', spec: 'StoreKit & CoreData', Icon: AppleIcon, angle: -20, radius: 210, glow: 'hover:shadow-slate-500/30 border-slate-500/30' },
    { id: 'iitk', label: 'IIT Kanpur', spec: 'AIR 110 • EE \'19', Icon: IITKIcon, angle: 15, radius: 220, glow: 'hover:shadow-amber-500/30 border-amber-500/30' },
    { id: 'python', label: 'Python', spec: 'Systems & Data', Icon: PythonIcon, angle: 50, radius: 210, glow: 'hover:shadow-yellow-500/30 border-yellow-500/30' },
    { id: 'cpp', label: 'C++', spec: 'Low Latency DSA', Icon: CppIcon, angle: 85, radius: 215, glow: 'hover:shadow-cyan-500/30 border-cyan-500/30' },
    { id: 'typescript', label: 'TypeScript', spec: 'Strict Types', Icon: TypeScriptIcon, angle: 120, radius: 210, glow: 'hover:shadow-blue-500/30 border-blue-500/30' },
    { id: 'react', label: 'React Native', spec: 'Cross-Platform Core', Icon: ReactIcon, angle: 155, radius: 215, glow: 'hover:shadow-cyan-500/30 border-cyan-500/30' },
    { id: 'graphql', label: 'GraphQL', spec: 'Optimistic Cache', Icon: GraphQLIcon, angle: 190, radius: 210, glow: 'hover:shadow-pink-500/30 border-pink-500/30' },
    { id: 'docker', label: 'Docker', spec: 'CI/CD Pipelines', Icon: DockerIcon, angle: 225, radius: 215, glow: 'hover:shadow-sky-500/30 border-sky-500/30' },
    { id: 'kotlin', label: 'Kotlin', spec: 'Android Interop', Icon: KotlinIcon, angle: 260, radius: 210, glow: 'hover:shadow-purple-500/30 border-purple-500/30' }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {tokens.map((token) => {
        const rad = (token.angle * Math.PI) / 180
        const x = Math.cos(rad) * token.radius
        const y = Math.sin(rad) * token.radius

        return (
          <motion.div
            key={token.id}
            drag
            dragConstraints={{ left: -360, right: 360, top: -260, bottom: 260 }}
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
              marginLeft: '-22px',
              marginTop: '-22px'
            }}
          >
            {/* Frosted Spatial Glass Token */}
            <div
              className={`p-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg transition-all duration-300 ${token.glow} flex items-center justify-center`}
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