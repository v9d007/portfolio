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
  NextjsIcon,
  CppIcon
} from './TechStickerIcons'

interface StickerRingProps {
  soundEnabled: boolean
}

interface TechSticker {
  id: string
  name: string
  Icon: () => JSX.Element
  angle: number // degrees
  radius: number // px
  initialRotate: number
}

const StickerRing = ({ soundEnabled }: StickerRingProps) => {
  const stickers: TechSticker[] = [
    { id: 'swift', name: 'Swift 6', Icon: SwiftIcon, angle: -90, radius: 190, initialRotate: -4 },
    { id: 'swiftui', name: 'SwiftUI', Icon: SwiftUIIcon, angle: -60, radius: 195, initialRotate: 6 },
    { id: 'apple', name: 'iOS Ecosystem', Icon: AppleIcon, angle: -30, radius: 190, initialRotate: -2 },
    { id: 'python', name: 'Python', Icon: PythonIcon, angle: 0, radius: 195, initialRotate: 8 },
    { id: 'kotlin', name: 'Kotlin', Icon: KotlinIcon, angle: 30, radius: 190, initialRotate: -6 },
    { id: 'nextjs', name: 'Next.js', Icon: NextjsIcon, angle: 60, radius: 195, initialRotate: 4 },
    { id: 'cpp', name: 'C++', Icon: CppIcon, angle: 90, radius: 190, initialRotate: -3 },
    { id: 'typescript', name: 'TypeScript', Icon: TypeScriptIcon, angle: 120, radius: 195, initialRotate: 5 },
    { id: 'react', name: 'React Native', Icon: ReactIcon, angle: 150, radius: 190, initialRotate: -5 },
    { id: 'graphql', name: 'GraphQL', Icon: GraphQLIcon, angle: 180, radius: 195, initialRotate: 4 },
    { id: 'docker', name: 'Docker', Icon: DockerIcon, angle: 210, radius: 190, initialRotate: -7 },
    { id: 'iitk', name: 'IIT Kanpur', Icon: IITKIcon, angle: 240, radius: 195, initialRotate: 3 }
  ]

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Cursive "Drag the stickers" annotation with curved arrow */}
      <div className="absolute left-1/2 top-1/2 -translate-y-48 translate-x-28 sm:translate-x-36 z-20 pointer-events-none">
        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <svg
            className="w-10 h-7 stroke-current fill-none rotate-[15deg]"
            viewBox="0 0 50 35"
          >
            <path
              d="M45,5 Q20,5 5,28"
              strokeDasharray="2.5 2.5"
              strokeWidth="1.5"
            />
            <polyline points="2,20 5,28 14,26" strokeWidth="1.5" />
          </svg>
          <span
            className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Drag the stickers
          </span>
        </div>
      </div>

      {/* Orbiting Stickers */}
      {stickers.map((st) => {
        const rad = (st.angle * Math.PI) / 180
        const x = Math.cos(rad) * st.radius
        const y = Math.sin(rad) * st.radius

        return (
          <motion.div
            key={st.id}
            drag
            dragConstraints={{ left: -350, right: 350, top: -250, bottom: 250 }}
            dragElastic={0.15}
            onDragStart={() => playSound('pop', soundEnabled)}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            initial={{
              x,
              y,
              rotate: st.initialRotate,
              scale: 0.8,
              opacity: 0
            }}
            animate={{
              x,
              y,
              rotate: st.initialRotate,
              scale: 1,
              opacity: 1
            }}
            whileHover={{
              scale: 1.18,
              rotate: 0,
              zIndex: 50,
              transition: { type: 'spring', stiffness: 400, damping: 15 }
            }}
            whileDrag={{
              scale: 1.25,
              rotate: st.initialRotate * 2,
              zIndex: 60
            }}
            className="absolute left-1/2 top-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group"
            style={{
              marginLeft: '-22px',
              marginTop: '-22px'
            }}
            title={st.name}
          >
            {/* Die-Cut White Bordered Sticker Badge */}
            <div className="relative p-1.5 rounded-2xl bg-white dark:bg-slate-900 shadow-md border-2 border-white dark:border-slate-800 transition-all group-hover:shadow-2xl">
              <st.Icon />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default StickerRing