import { useState } from 'react'
import { motion } from 'framer-motion'
import { PostageStampBorder } from './PostageStampBorder'
import { ArrowLeft, Briefcase, GraduationCap } from 'lucide-react'
import { playSound } from '../utils/audio'

interface ExperienceViewProps {
  soundEnabled: boolean
}

interface ExperienceItem {
  id: string
  num: string
  company: string
  period: string
  datePill: string
  role: string
  type: string
  icon: 'work' | 'iitk' | 'award'
  bullets: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 'xoxoday',
    num: '01',
    company: 'Xoxoday (Giift)',
    period: '2021 - Present',
    datePill: 'Now',
    role: 'Senior Mobile & iOS Developer',
    type: 'Full-time, Bengaluru',
    icon: 'work',
    bullets: [
      'Architected offline-first sync engine in Swift & CoreData, handling over 10M+ transaction updates with zero corruption.',
      'Reduced memory footprint by 35% in high-volume social feed views using custom virtualized cell caching in UIKit and SwiftUI.',
      'Engineered bi-directional GraphQL real-time event pipeline for enterprise leaderboards and peer recognition.',
      'Mentored mobile engineering squad and instituted strict code quality, CI/CD pipelines via Fastlane and GitHub Actions.'
    ]
  },
  {
    id: 'compass',
    num: '02',
    company: 'Compass iOS Architecture',
    period: '2022 - 2024',
    datePill: '2022 - 2024',
    role: 'Lead iOS Architect (Compass)',
    type: 'Enterprise, Hybrid',
    icon: 'work',
    bullets: [
      'Architected and scaled the flagship Compass iOS client for enterprise commission and sales incentive management.',
      'Reduced cold start latency by 42% through modular dynamic framework loading and lazy memory allocation.',
      'Custom interactive leaderboard graphs rendering 50,000+ data points smoothly with zero frame drops at 60 FPS.',
      'Engineered multi-currency real-time commission calculation engine with local-first encrypted SQLite persistence.'
    ]
  },
  {
    id: 'empuls',
    num: '03',
    company: 'Empuls Mobile Client',
    period: '2021 - 2023',
    datePill: '2021 - 2023',
    role: 'Senior React Native & Swift Engineer',
    type: 'Global Scale, 1M+ Users',
    icon: 'work',
    bullets: [
      'Led core mobile client development connecting distributed workforces across 500+ enterprises worldwide.',
      'Custom Native iOS image pre-caching engine in Swift eliminating feed stutter and scroll lag.',
      'Real-time peer applause & recognition feed powered by WebSocket subscriptions and optimistic local updates.',
      'Integrated biometric authentication with Apple Secure Enclave keychain encryption.'
    ]
  },
  {
    id: 'iitk',
    num: '04',
    company: 'IIT Kanpur',
    period: '2015 - 2019',
    datePill: '2015 - 2019',
    role: 'B.Tech in Electrical Engineering',
    type: 'Alma Mater, Kanpur',
    icon: 'iitk',
    bullets: [
      'Graduated with strong foundations in Computer Systems, Discrete Mathematics, and Algorithmic Complexity.',
      'Deep coursework in Advanced Data Structures, Algorithms, Computer Architecture, and Digital Signal Processing.',
      'Active participant in algorithmic problem solving and competitive systems programming contests.',
      'Two-time football athlete contributing to Inter-IIT General Championship winning sports teams.'
    ]
  }
]

const ExperienceView = ({ soundEnabled }: ExperienceViewProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeExp = experiences[activeIndex]

  const handleSelect = (idx: number) => {
    playSound('pop', soundEnabled)
    setActiveIndex(idx)
  }

  const handleBack = () => {
    playSound('click', soundEnabled)
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-10 max-w-7xl mx-auto select-none flex flex-col justify-between"
    >
      {/* Top Header Row (Matching yl0.me Image 1) */}
      <div>
        <div className="flex items-center justify-between font-mono text-xs sm:text-sm border-b border-slate-200/80 dark:border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#7C3AED] dark:text-[#A78BFA] font-extrabold">[E]</span>
            <span className="text-[#7C3AED] dark:text-[#A78BFA] font-extrabold tracking-wide">Experiences</span>
          </div>
          <div className="text-[#5A6272] dark:text-[#8E96A6] tracking-wider font-semibold">
            {String(activeIndex + 1).padStart(2, '0')} — {String(experiences.length).padStart(2, '0')}
          </div>
        </div>

        {/* Subtitle & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-xs sm:text-sm font-mono text-[#5A6272] dark:text-[#C5CBD8] max-w-xl leading-relaxed">
            Places I have worked and what I built there. Scroll sideways or click to browse.
          </p>

          {/* Minimalist Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBFBF9] dark:bg-[#181D26] border border-slate-200 dark:border-white/15 text-xs font-mono text-[#151922] dark:text-[#ECEFF5] shadow-sm hover:bg-slate-100 dark:hover:bg-[#202632] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} className="text-[#7C3AED] dark:text-[#A78BFA]" />
            <span>Back</span>
          </button>
        </div>

        {/* Timeline Rail */}
        <div className="relative w-full my-6 sm:my-8 px-4">
          {/* Continuous Line */}
          <div className="w-full h-[2px] bg-slate-200 dark:bg-white/15 relative">
            {/* Active progress highlight */}
            <div
              className="h-full bg-[#7C3AED] dark:bg-[#A78BFA] transition-all duration-500"
              style={{
                width: `${((activeIndex + 1) / experiences.length) * 100}%`
              }}
            />
          </div>

          {/* Date Nodes */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 pointer-events-none">
            {experiences.map((exp, idx) => {
              const isPastOrActive = idx <= activeIndex
              return (
                <div key={exp.id} className="flex flex-col items-center">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full mb-1 transition-colors ${
                      idx === activeIndex
                        ? 'bg-[#7C3AED] text-white font-bold shadow-sm'
                        : isPastOrActive
                        ? 'bg-purple-100 dark:bg-purple-950/60 text-[#7C3AED] dark:text-[#A78BFA] font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {exp.datePill}
                  </span>
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all ${
                      idx === activeIndex
                        ? 'bg-white border-[#7C3AED] scale-125'
                        : isPastOrActive
                        ? 'bg-[#7C3AED] border-[#7C3AED]'
                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-white/20'
                    }`}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Horizontal Stamp Roll Carousel */}
        <div className="w-full overflow-x-auto no-scrollbar py-6">
          <div className="flex items-stretch gap-6 min-w-max mx-auto px-4 justify-start sm:justify-center">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex
              return (
                <motion.div
                  key={exp.id}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
                  onClick={() => handleSelect(idx)}
                  className={`relative w-60 sm:w-64 h-80 rounded p-6 cursor-pointer flex flex-col justify-between text-[#151922] transition-all bg-[#FDFDFB] ${
                    isActive
                      ? 'shadow-2xl scale-102 ring-2 ring-[#7C3AED]/40'
                      : 'opacity-90 hover:opacity-100 shadow-md'
                  }`}
                  style={{
                    boxShadow:
                      '0 0 0 1px rgba(21,25,34,.06), 0 4px 14px -3px rgba(0,0,0,0.18)'
                  }}
                >
                  {/* Authentic Postage Stamp Scalloped Edge (Paper white in both modes!) */}
                  <PostageStampBorder isActive={isActive} fillColor="#FDFDFB" />

                  {/* Stamp Contents */}
                  <div className="relative z-10 flex flex-col items-center text-center mt-2">
                    {/* Stamp Logo Circle */}
                    <div className="w-14 h-14 rounded-full bg-slate-100 p-2 flex items-center justify-center shadow-inner mb-4 border border-slate-200">
                      {exp.icon === 'iitk' ? (
                        <GraduationCap className="text-amber-500" size={26} />
                      ) : (
                        <Briefcase className="text-[#7C3AED]" size={26} />
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#151922] leading-tight mb-1">
                      {exp.company}
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      {exp.period}
                    </p>
                  </div>

                  <div className="relative z-10 text-center border-t border-slate-200/80 pt-3">
                    <p className="text-xs font-bold text-[#151922] leading-snug">
                      {exp.role}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5 font-medium">
                      {exp.type}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Details Section for Selected Experience (Exact match to yl0.me Image 1) */}
      <motion.div
        key={activeExp.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-white/10 font-mono text-xs sm:text-sm text-[#3A404C] dark:text-[#C5CBD8]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
          <span className="text-[#7C3AED] dark:text-[#A78BFA] font-bold">
            /{activeExp.period}
          </span>
          <span className="font-bold text-[#151922] dark:text-[#ECEFF5] uppercase tracking-wider">
            {activeExp.company}
          </span>
        </div>

        <ul className="space-y-2.5 max-w-4xl text-xs sm:text-[13px] leading-relaxed text-[#3A404C] dark:text-[#C5CBD8]">
          {activeExp.bullets.map((bullet, bIdx) => (
            <li key={bIdx} className="flex items-start gap-2.5">
              <span className="text-[#7C3AED] dark:text-[#A78BFA] font-bold mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

export default ExperienceView
