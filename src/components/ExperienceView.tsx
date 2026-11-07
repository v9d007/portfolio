import { useState } from 'react'
import { motion } from 'framer-motion'
import { PostageStampBorder } from './PostageStampBorder'
import { playSound } from '../utils/audio'
import { GraduationCap, Smartphone, Layers } from 'lucide-react'

interface ExperienceViewProps {
  soundEnabled: boolean
}

interface ExperienceItem {
  id: string
  num: string
  company: string
  period: string
  role: string
  type: string
  logoType: 'xoxoday' | 'giift' | 'compass' | 'iitk'
  bullets: string[]
}

const experiences: ExperienceItem[] = [
  {
    id: 'xoxoday-partner',
    num: '01',
    company: 'Xoxoday',
    period: '2023 - Present',
    role: 'Lead Mobile Engineer',
    type: 'React Native & Apollo GraphQL',
    logoType: 'xoxoday',
    bullets: [
      'Architected an end-to-end partner platform using React Native (TypeScript) with a custom Apollo GraphQL wrapper layer, reducing redundant network payloads by 35% and shielding backend endpoints.',
      'Delivered an intuitive Store Locator and live navigation feature using Geolocation APIs, battery-optimized background GPS polling, and native deep linking, driving a 25% increase in partner store redemptions.',
      'Implemented advanced media pipelines using Vimeo SDK and expo-camera with custom native bridges in Swift and Kotlin for hardware storage and video processing.',
      'Leveraged Zustand for predictable global state management, eliminating unnecessary re-renders and reducing mobile app memory footprint by 30%.',
      'Established unit and integration testing pipelines with Jest and React Native Testing Library, achieving 80%+ test coverage across core loyalty flows.'
    ]
  },
  {
    id: 'giift-compass',
    num: '02',
    company: 'Giift Compass',
    period: '2021 - 2024',
    role: 'Senior Mobile Architect',
    type: 'Expo DevClient (CNG) • B2B2C',
    logoType: 'giift',
    bullets: [
      'Spearheaded greenfield architecture and 0 → 1 development of Giift Compass, an enterprise B2B2C rewards platform using React Native (TypeScript) and Expo DevClient (Continuous Native Generation).',
      'Automated mobile CI/CD release pipelines using EAS Build, EAS Submit, and GitHub Actions; governed store compliance, code-signing, and publishing across Apple App Store and Google Play Console, slashing deployment turnaround to under 30 minutes.',
      'Established progressive phased rollouts (10% → 50% → 100%) and integrated Sentry and Firebase Crashlytics, maintaining a 99.85%+ crash-free session rate and eliminating production ANRs across varied Android OEMs.',
      'Implemented Over-The-Air (OTA) updates via EAS Update across isolated release branches and channels, enabling instant zero-downtime hotfixes for critical production bugs without awaiting store reviews.',
      'Optimized runtime performance by precompiling JS via Hermes bytecode and adopting the Fabric renderer, reducing cold-start TTI by 40%; built i18n multi-language and multi-account capabilities.'
    ]
  },
  {
    id: 'compass-native',
    num: '03',
    company: 'Compass iOS',
    period: '2019 - 2021',
    role: 'Senior iOS Systems Engineer',
    type: 'UIKit, Auto Layout & 60 FPS',
    logoType: 'compass',
    bullets: [
      'Engineered scalable, interactive native iOS interfaces using UIKit, Auto Layout, and SwiftUI interop, adhering strictly to Apple Human Interface Guidelines (HIG).',
      'Implemented fluid custom vector animations and visual transitions using UIBezierPath and native Swift Core Animation frameworks, ensuring smooth 60 FPS rendering.',
      'Architected offline-first storage and credential vaults leveraging Core Data, SQLite, and Keychain Services; applied GCD and Swift concurrency for background sync and image caching (Kingfisher).',
      'Wrote comprehensive Unit Tests using XCTest and conducted memory profiling using Xcode Instruments (Leaks, Time Profiler) to eliminate retain cycles.'
    ]
  },
  {
    id: 'iitk',
    num: '04',
    company: 'IIT Kanpur',
    period: '2015 - 2019',
    role: 'B.Tech in Electrical Engineering',
    type: 'Alma Mater, Kanpur',
    logoType: 'iitk',
    bullets: [
      'Graduated with strong foundations in Computer Systems, Discrete Mathematics, and Algorithmic Complexity.',
      'Deep coursework in Advanced Data Structures, Algorithms, Computer Architecture, and Digital Signal Processing.',
      'Active participant in algorithmic problem solving, systems programming, and competitive hackathons.',
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

  // Render vibrant, full-bleed circular brand badges matching yl0.me
  const renderLogo = (type: ExperienceItem['logoType']) => {
    switch (type) {
      case 'xoxoday':
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF512F] via-[#DD2476] to-[#7C3AED] p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#FF512F] to-[#DD2476] flex items-center justify-center text-white">
              <span className="font-extrabold text-2xl font-mono tracking-tighter">X</span>
            </div>
          </div>
        )
      case 'giift':
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00F2FE] via-[#4FACFE] to-[#0072FF] p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#00F2FE] to-[#0072FF] flex items-center justify-center text-white">
              <Smartphone size={26} className="text-white drop-shadow-sm" />
            </div>
          </div>
        )
      case 'compass':
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#667EEA] via-[#764BA2] to-[#4338CA] p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#667EEA] to-[#764BA2] flex items-center justify-center text-white">
              <Layers size={26} className="text-white drop-shadow-sm" />
            </div>
          </div>
        )
      case 'iitk':
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1E3A8A] via-[#2563EB] to-[#D97706] p-0.5 flex items-center justify-center shadow-md">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#1E3A8A] to-[#D97706] flex items-center justify-center text-white">
              <GraduationCap size={28} className="text-white drop-shadow-sm" />
            </div>
          </div>
        )
    }
  }

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-10 max-w-7xl mx-auto select-none flex flex-col justify-between"
    >
      {/* Top Header Row (Matching yl0.me) */}
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

        {/* Subtitle */}
        <div className="mb-8">
          <p className="text-xs sm:text-sm font-mono text-[#5A6272] dark:text-[#C5CBD8] max-w-2xl leading-relaxed">
            Places I have worked and what I built there. Scroll sideways or click to browse.
          </p>
        </div>

        {/* Horizontal Stamp Roll Carousel - Authentic Philatelic Stamps matching yl0.me exactly */}
        <div className="w-full overflow-x-auto no-scrollbar py-6">
          <div className="flex items-stretch gap-6 sm:gap-8 min-w-max mx-auto px-4 justify-start sm:justify-center">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex
              return (
                <motion.div
                  key={exp.id}
                  whileHover={{ y: -8, transition: { type: 'spring', stiffness: 350, damping: 18 } }}
                  onClick={() => handleSelect(idx)}
                  className="relative w-[260px] sm:w-[275px] h-[345px] sm:h-[365px] cursor-pointer flex flex-col justify-between text-[#151922] transition-transform select-none"
                  style={{
                    filter: isActive
                      ? 'drop-shadow(0 2px 5px rgba(124,58,237,0.18)) drop-shadow(0 14px 24px rgba(0,0,0,0.18))'
                      : 'drop-shadow(0 1px 3px rgba(21,25,34,0.10)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))'
                  }}
                >
                  {/* Authentic Philatelic Scalloped Stamp Paper (Dense 18x24 scallops from yl0.me) */}
                  <PostageStampBorder
                    isActive={isActive}
                    fillColor="#FDFDFB"
                    strokeColor={isActive ? '#7C3AED' : 'rgba(21, 25, 34, 0.20)'}
                    strokeWidth={isActive ? 0.75 : 0.45}
                  />

                  {/* Inner Dashed Border Frame matching philatelic stamp design in yl0.me */}
                  <div
                    className={`absolute inset-[15px] sm:inset-[17px] border border-dashed rounded-[1px] pointer-events-none transition-colors duration-300 ${
                      isActive
                        ? 'border-[#7C3AED] dark:border-[#7C3AED]'
                        : 'border-slate-300 dark:border-slate-400'
                    }`}
                  />

                  {/* Top: Brand Circular Logo Badge */}
                  <div className="relative z-10 pt-7 flex flex-col items-center">
                    {renderLogo(exp.logoType)}
                  </div>

                  {/* Middle: Company Name & Period */}
                  <div className="relative z-10 px-4 text-center -mt-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#151922] font-mono tracking-tight leading-snug">
                      {exp.company}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-mono text-slate-500 font-medium mt-1">
                      {exp.period}
                    </p>
                  </div>

                  {/* Bottom: Role & Employment Type */}
                  <div className="relative z-10 pb-6 px-4 text-center">
                    <p className="text-xs sm:text-[13px] font-bold text-[#2A2F3A] font-mono leading-tight">
                      {exp.role}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 mt-1 font-medium">
                      {exp.type}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Details Section for Selected Experience */}
      <motion.div
        key={activeExp.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8 pt-6 border-t border-dashed border-slate-200 dark:border-white/10 font-mono text-xs sm:text-sm text-[#3A404C] dark:text-[#C5CBD8]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs sm:text-[13px]">
          <span className="text-[#7C3AED] dark:text-[#A78BFA] font-bold">
            /{activeExp.period}
          </span>
          <span className="font-bold text-[#151922] dark:text-[#ECEFF5] uppercase tracking-wider">
            {activeExp.company}
          </span>
        </div>

        <ul className="space-y-3 max-w-5xl text-xs sm:text-[13.5px] leading-relaxed text-[#3A404C] dark:text-[#C5CBD8]">
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
