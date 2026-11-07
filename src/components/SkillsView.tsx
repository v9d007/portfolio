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
    color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
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
    color: 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10',
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
    color: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
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
    color: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    skills: [
      { name: 'Advanced DSA', level: 'AIR 110', desc: 'Graph theory, segment trees, dynamic programming' },
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
    <div className="relative w-full h-full flex flex-col justify-center px-4 sm:px-8 py-16 overflow-y-auto no-scrollbar select-none">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-2">
            STAMP SHEET // TECHNICAL CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Engineering Matrix &amp; Skills
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIdx) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.1 }}
                className="relative p-5 sm:p-6 rounded-2xl bg-[#0d0f1a]/90 backdrop-blur-xl border border-white/10 shadow-xl"
              >
                {/* Washi Tape */}
                <div
                  className="washi-tape -top-2 left-6 w-16 bg-white/20 rotate-[-1deg]"
                  title="Washi Tape"
                />

                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-4 border-b border-white/10 pb-3">
                  <div className={`p-2 rounded-xl border ${cat.color}`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cat.skills.map((sk) => (
                    <motion.div
                      key={sk.name}
                      whileHover={{ scale: 1.02, x: 2 }}
                      onMouseEnter={() => playSound('hover', soundEnabled)}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-200">
                          {sk.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">
                          {sk.level}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 line-clamp-2">
                        {sk.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SkillsView