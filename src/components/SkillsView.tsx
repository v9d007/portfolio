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
    color: 'text-cyan-500 border-cyan-500/30 bg-cyan-500/10',
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
    color: 'text-indigo-500 border-indigo-500/30 bg-indigo-500/10',
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
    color: 'text-purple-500 border-purple-500/30 bg-purple-500/10',
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
    color: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
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
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto select-none"
    >
      {/* Section Header with Scroll Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 mb-3 font-semibold">
          // 03. ENGINEERING MATRIX
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Technical Capabilities &amp; Skills
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-mono">
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
              className="p-6 sm:p-7 rounded-3xl bg-white/70 dark:bg-[#0d0f1a]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-white/10 pb-3.5">
                  <div className={`p-2.5 rounded-2xl border ${cat.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
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
                      className="p-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.06] hover:border-indigo-500/30 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {sk.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-white/10 text-indigo-600 dark:text-cyan-300 font-bold">
                          {sk.level}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 line-clamp-2">
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