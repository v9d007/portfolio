import { motion } from 'framer-motion'
import { Smartphone, Layers, Cpu, Code2 } from 'lucide-react'
import { playSound } from '../utils/audio'

interface SkillsViewProps {
  soundEnabled: boolean
}

const skillCategories = [
  {
    id: 'ios-native',
    title: 'Native Apple & iOS Core',
    icon: Smartphone,
    accentBg: 'bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-transparent',
    iconBg: 'bg-sky-500 text-white shadow-md shadow-sky-500/25',
    borderColor: 'border-sky-500/30 dark:border-sky-400/20',
    skills: [
      { name: 'Swift 6', level: 'Expert', desc: 'Strict Concurrency, Actors, Sendable' },
      { name: 'SwiftUI', level: 'Expert', desc: 'Declarative UI, State & Binding, iOS 18+' },
      { name: 'UIKit', level: 'Expert', desc: 'AutoLayout, Custom Cells, 60 FPS Lists' },
      { name: 'SwiftData & CoreData', level: 'Advanced', desc: 'Local-first offline sync & encrypted stores' },
      { name: 'Combine & Concurrency', level: 'Expert', desc: 'Async/Await, TaskGroups, Reactive Streams' },
      { name: 'StoreKit 2', level: 'Advanced', desc: 'In-App Purchases & Subscription Entitlements' }
    ]
  },
  {
    id: 'cross-platform',
    title: 'Cross-Platform Mobile',
    icon: Layers,
    accentBg: 'bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-transparent',
    iconBg: 'bg-violet-600 text-white shadow-md shadow-violet-500/25',
    borderColor: 'border-violet-500/30 dark:border-violet-400/20',
    skills: [
      { name: 'React Native', level: 'Expert', desc: 'Native bridging to Swift/Obj-C, New Arch' },
      { name: 'Expo & EAS', level: 'Expert', desc: 'Continuous deployment, OTA updates' },
      { name: 'Reanimated 3', level: 'Advanced', desc: 'Gesture-driven 60 FPS physics animations' },
      { name: 'Redux Toolkit', level: 'Expert', desc: 'Normalized state, RTK Query caching' },
      { name: 'Native iOS Bridging', level: 'Expert', desc: 'TurboModules, Fabric, C++ JSI' },
      { name: 'Fastlane & CI/CD', level: 'Advanced', desc: 'Automated TestFlight & App Store releases' }
    ]
  },
  {
    id: 'architecture',
    title: 'Architecture & Systems',
    icon: Cpu,
    accentBg: 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent',
    iconBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25',
    borderColor: 'border-emerald-500/30 dark:border-emerald-400/20',
    skills: [
      { name: 'Clean Architecture', level: 'Expert', desc: 'Unidirectional data flow, isolated domain' },
      { name: 'VIPER & MVVM-C', level: 'Expert', desc: 'Coordinator patterns & decoupled routing' },
      { name: 'Modular iOS', level: 'Advanced', desc: 'SPM packages, micro-features, fast builds' },
      { name: 'GraphQL & Apollo', level: 'Expert', desc: 'Optimistic mutations & normalized cache' },
      { name: 'Offline-First Sync', level: 'Expert', desc: 'Conflict resolution & resilient network queues' },
      { name: 'Memory & Performance', level: 'Expert', desc: 'Instruments profiling, zero leaks' }
    ]
  },
  {
    id: 'cs-foundations',
    title: 'CS & Algorithmic Core',
    icon: Code2,
    accentBg: 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent',
    iconBg: 'bg-amber-600 text-white shadow-md shadow-amber-500/25',
    borderColor: 'border-amber-500/30 dark:border-amber-400/20',
    skills: [
      { name: 'Advanced DSA', level: 'Expert', desc: 'Graph theory, segment trees, dynamic programming' },
      { name: 'C++ Systems', level: 'Proficient', desc: 'Low-latency algorithms, memory management' },
      { name: 'IIT Kanpur Graduate', level: 'B.Tech EE', desc: 'Rigorous engineering & systems background' },
      { name: 'TypeScript & Next.js', level: 'Advanced', desc: 'Full-stack tooling & web dashboards' },
      { name: 'Git & Linux', level: 'Expert', desc: 'Shell scripting, CI pipelines, version control' },
      { name: 'REST & WebSockets', level: 'Expert', desc: 'Low-latency packet serialization' }
    ]
  }
]

const SkillsView = ({ soundEnabled }: SkillsViewProps) => {
  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 max-w-6xl mx-auto select-none"
    >
      {/* Section Header with Scroll Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono bg-[#6D28D9]/10 dark:bg-[#A78BFA]/15 border border-[#6D28D9]/30 dark:border-[#A78BFA]/30 text-[#6D28D9] dark:text-[#A78BFA] mb-3 font-bold">
          // 03. ENGINEERING MATRIX
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090B] dark:text-[#F8FAFC] tracking-tight">
          Technical Capabilities &amp; Skills
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#1E293B] dark:text-[#E2E8F0] max-w-2xl mx-auto font-mono font-medium">
          Comprehensive stack across native iOS systems, cross-platform architecture, and algorithmic design.
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skillCategories.map((cat, catIdx) => {
          const Icon = cat.icon
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
              className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161B22] border-2 border-slate-200/90 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className={`flex items-center gap-3.5 mb-5 p-2 rounded-2xl ${cat.accentBg} border ${cat.borderColor}`}>
                  <div className={`p-2.5 rounded-xl ${cat.iconBg}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#09090B] dark:text-[#F8FAFC] font-mono tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cat.skills.map((sk) => (
                    <motion.div
                      key={sk.name}
                      whileHover={{ scale: 1.02, x: 2 }}
                      onMouseEnter={() => playSound('hover', soundEnabled)}
                      className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/10 hover:border-[#6D28D9]/50 hover:bg-white dark:hover:bg-[#1C2128] transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs sm:text-[13px] font-bold text-[#09090B] dark:text-[#F8FAFC] font-mono">
                          {sk.name}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold shadow-sm ${
                            sk.level === 'Expert'
                              ? 'bg-[#09090B] text-white dark:bg-white dark:text-black'
                              : 'bg-purple-100 text-[#6D28D9] dark:bg-purple-950/80 dark:text-[#C4B5FD] border border-purple-200 dark:border-purple-800'
                          }`}
                        >
                          {sk.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#334155] dark:text-[#CBD5E1] font-mono leading-relaxed line-clamp-2 font-medium">
                        {sk.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsView
