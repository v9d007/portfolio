import { useState } from 'react'
import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'
import {
  Github,
  Linkedin,
  Twitter,
  Briefcase,
  Compass,
  Zap,
  GraduationCap,
  Layers
} from 'lucide-react'
import { PostageStampBorder } from './PostageStampBorder'
import type { NavTab } from './Notch'

interface RightSidebarStacksProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
  className?: string
}

// 4 Career Milestone Stamps matching the reference accordion layout
const experienceStamps = [
  {
    id: 'xoxoday',
    company: 'Xoxoday',
    role: 'Senior Mobile',
    period: '2021 - Now',
    icon: Briefcase,
    gradient: 'from-cyan-500 to-indigo-600',
    iconColor: 'text-white'
  },
  {
    id: 'compass',
    company: 'Compass iOS',
    role: 'Lead Architect',
    period: '2022 - 2024',
    icon: Compass,
    gradient: 'from-blue-500 to-cyan-500',
    iconColor: 'text-white'
  },
  {
    id: 'empuls',
    company: 'Empuls Client',
    role: 'Mobile Lead',
    period: '2021 - 2023',
    icon: Zap,
    gradient: 'from-purple-500 to-pink-500',
    iconColor: 'text-white'
  },
  {
    id: 'iitk',
    company: 'IIT Kanpur',
    role: 'B.Tech EE',
    period: '2015 - 2019',
    icon: GraduationCap,
    gradient: 'from-amber-500 to-orange-500',
    iconColor: 'text-white'
  }
]

// 5 Project Cards for the fanned radial spread
const projectCards = [
  { id: '05', title: 'Card 05', num: '05' },
  { id: '04', title: 'Card 04', num: '04' },
  { id: '03', title: 'Card 03', num: '03' },
  { id: '02', title: 'Card 02', num: '02' },
  { id: '01', title: 'Card 01', num: '01' } // Front Master Card
]

const RightSidebarStacks = ({
  onNavigate,
  soundEnabled,
  className = ''
}: RightSidebarStacksProps) => {
  const [isExpHovered, setIsExpHovered] = useState(false)
  const [hoveredStampIdx, setHoveredStampIdx] = useState<number | null>(null)
  const [isProjHovered, setIsProjHovered] = useState(false)

  const handleNavigateExp = () => {
    playSound('pop', soundEnabled)
    onNavigate('experience')
  }

  const handleNavigateProj = () => {
    playSound('pop', soundEnabled)
    onNavigate('projects')
  }

  return (
    <aside
      className={`select-none pointer-events-auto flex flex-col justify-between items-center sm:items-end ${className}`}
    >
      {/* ========================================================================= */}
      {/* 1. EXPERIENCE POSTAGE STAMP ACCORDION STACK (Top Right)                  */}
      {/* ========================================================================= */}
      <div
        className="flex flex-col items-center sm:items-end cursor-pointer group"
        onMouseEnter={() => {
          setIsExpHovered(true)
          playSound('hover', soundEnabled)
        }}
        onMouseLeave={() => {
          setIsExpHovered(false)
          setHoveredStampIdx(null)
        }}
        onClick={handleNavigateExp}
      >
        {/* Accordion Stage: width accommodates both collapsed and spread states */}
        <div className="relative h-[114px] sm:h-[122px] w-[174px] sm:w-[188px] flex items-center justify-start">
          {experienceStamps.map((stamp, idx) => {
            const IconComponent = stamp.icon
            const isSingleHovered = hoveredStampIdx === idx

            // Horizontal accordion spreading offsets
            // Front stamp stays at left (x = 0), subsequent stamps spread out to the right
            const targetX = isExpHovered ? idx * 28 : idx * 5.5
            const targetY = isSingleHovered ? -8 : 0
            const targetRotate = isExpHovered ? (idx - 1.5) * 1.5 : idx * 1.2
            const targetScale = isSingleHovered ? 1.06 : 1.0

            // Z-index: Front card (0) is on top, or elevated if hovered individually
            const zIndex = isSingleHovered ? 50 : 40 - idx

            return (
              <motion.div
                key={stamp.id}
                animate={{
                  x: targetX,
                  y: targetY,
                  rotate: targetRotate,
                  scale: targetScale
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 24,
                  mass: 0.8
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredStampIdx(idx)
                  playSound('pop', soundEnabled)
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation()
                  setHoveredStampIdx(null)
                }}
                style={{ zIndex }}
                className="absolute left-0 top-0 w-[82px] sm:w-[88px] h-[108px] sm:h-[116px] text-white dark:text-[#0e1322] drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                {/* Authentic Postage Stamp Scalloped Edge */}
                <PostageStampBorder isActive={isSingleHovered} />

                {/* Inner Dashed Border matching philatelic stamp design */}
                <div className="absolute inset-1.5 border border-dashed border-slate-300/90 dark:border-slate-700/80 rounded pointer-events-none" />

                {/* Stamp Contents */}
                <div className="relative z-10 w-full h-full p-2 flex flex-col items-center justify-between text-center">
                  {/* Stamp Circular Icon Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr ${stamp.gradient} p-1.5 flex items-center justify-center text-white shadow-sm mt-0.5`}
                  >
                    <IconComponent size={14} className={stamp.iconColor} />
                  </div>

                  {/* Company Name & Role */}
                  <div className="w-full px-0.5 my-auto">
                    <p className="text-[9.5px] sm:text-[10px] font-bold text-slate-800 dark:text-slate-100 leading-tight truncate">
                      {stamp.company}
                    </p>
                    <p className="text-[7.5px] sm:text-[8px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                      {stamp.role}
                    </p>
                  </div>

                  {/* Date Pill at bottom of stamp */}
                  <span className="text-[7px] sm:text-[7.5px] font-mono px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 font-medium">
                    {stamp.period}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Caption below stamps: Experiences [04] */}
        <div className="mt-2 w-full flex items-center justify-center sm:justify-start gap-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400 px-1">
          <span>Experiences</span>
          <span className="px-1.5 py-0.2 rounded-full bg-indigo-50 dark:bg-slate-800 text-[10px] font-bold text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-slate-700">
            04
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PROJECTS FANNED RADIAL SPREAD STACK (Middle Right)                     */}
      {/* ========================================================================= */}
      <div
        className="flex flex-col items-center sm:items-end cursor-pointer group my-auto"
        onMouseEnter={() => {
          setIsProjHovered(true)
          playSound('hover', soundEnabled)
        }}
        onMouseLeave={() => setIsProjHovered(false)}
        onClick={handleNavigateProj}
      >
        {/* Fanned Cards Deck */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {projectCards.map((card, idx) => {
            const isFront = idx === projectCards.length - 1
            const offsetIdx = idx - 2 // -2, -1, 0, 1, 2

            // Fan spread rotation & translation
            // Collapsed: slight casual stack (-4deg to +4deg)
            // Hovered: wide radial fan (-13deg to +13deg)
            const targetRotate = isProjHovered ? offsetIdx * 6.5 : offsetIdx * 2
            const targetX = isProjHovered ? offsetIdx * 7.5 : offsetIdx * 2
            const targetY = isProjHovered
              ? isFront
                ? -7
                : Math.abs(offsetIdx) * 2 - 2
              : offsetIdx * -0.5
            const targetScale = isProjHovered && isFront ? 1.04 : 0.94 + idx * 0.015

            if (!isFront) {
              // Background Deck Cards with visible top number tabs
              return (
                <motion.div
                  key={card.id}
                  animate={{
                    rotate: targetRotate,
                    x: targetX,
                    y: targetY,
                    scale: targetScale
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 22,
                    mass: 0.8
                  }}
                  style={{ zIndex: idx * 5 }}
                  className="absolute inset-0 rounded-2xl bg-white dark:bg-[#121626] border border-slate-200/90 dark:border-white/10 shadow-md p-1.5 flex flex-col justify-between pointer-events-none"
                >
                  {/* Top corner label visible when fanned */}
                  <div className="flex justify-between items-center px-1 text-[8px] font-mono text-slate-400 dark:text-slate-500 font-bold">
                    <span>{card.num}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  </div>
                  <div className="w-full h-1/2 rounded-lg bg-slate-50 dark:bg-[#0c0f1c] border border-slate-100 dark:border-white/5 opacity-50" />
                </motion.div>
              )
            }

            // Front Master Card with Dark Oscilloscope / Activity Display
            return (
              <motion.div
                key={card.id}
                animate={{
                  rotate: targetRotate,
                  x: targetX,
                  y: targetY,
                  scale: targetScale
                }}
                transition={{
                  type: 'spring',
                  stiffness: 340,
                  damping: 22,
                  mass: 0.8
                }}
                style={{ zIndex: 30 }}
                className="absolute inset-0 rounded-2xl bg-white dark:bg-[#15192c] border border-slate-200 dark:border-white/15 p-2 sm:p-2.5 shadow-xl group-hover:shadow-2xl flex flex-col justify-between transition-shadow"
              >
                {/* Dark Inner Display */}
                <div className="relative w-full h-full rounded-xl bg-[#070b14] border border-cyan-500/20 p-2 flex flex-col justify-between overflow-hidden shadow-inner">
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between text-cyan-400">
                    <div className="flex items-center gap-1">
                      <Layers size={12} />
                      <span className="text-[7.5px] font-mono tracking-wider font-bold">01</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>

                  {/* Micro SVG Neon Waveform Line Graph */}
                  <div className="w-full my-auto">
                    <svg
                      className="w-full h-6 overflow-visible"
                      viewBox="0 0 80 24"
                      fill="none"
                    >
                      <path
                        d="M 2 18 Q 18 4, 34 14 T 62 6 T 78 12"
                        stroke="#22d3ee"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <circle cx="62" cy="6" r="2" fill="#22d3ee" className="animate-pulse" />
                    </svg>
                  </div>

                  {/* Micro Visual Telemetry Bars */}
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-cyan-400/90 rounded-full" />
                    <div className="w-4/5 h-1 bg-indigo-400/80 rounded-full" />
                    <div className="w-3/5 h-1 bg-purple-400/80 rounded-full" />
                  </div>

                  {/* Status Footer */}
                  <p className="text-[7.5px] font-mono text-cyan-300 font-bold uppercase tracking-wider text-right">
                    60 FPS // 08
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Caption below cards: Projects [08] */}
        <div className="mt-2 w-full flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
          <span>Projects</span>
          <span className="px-1.5 py-0.2 rounded-full bg-cyan-50 dark:bg-slate-800 text-[10px] font-bold text-cyan-600 dark:text-cyan-300 border border-cyan-100 dark:border-slate-700">
            08
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SOCIALS (Bottom Right)                                                */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center sm:items-end">
        <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
          Find me via
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/v9d007"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playSound('hover', soundEnabled)}
            className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="GitHub (v9d007)"
          >
            <Github size={14} />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playSound('hover', soundEnabled)}
            className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="LinkedIn"
          >
            <Linkedin size={13} />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => playSound('hover', soundEnabled)}
            className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="X (Twitter)"
          >
            <Twitter size={13} />
          </a>
        </div>
      </div>
    </aside>
  )
}

export default RightSidebarStacks
