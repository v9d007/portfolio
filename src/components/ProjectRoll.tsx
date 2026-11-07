import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Github,
  Maximize2,
  X,
  Layers,
  Cpu,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { playSound } from '../utils/audio'

interface ProjectRollProps {
  soundEnabled: boolean
}

export interface ProjectData {
  id: string
  title: string
  category: 'ios' | 'react-native' | 'fullstack' | 'algorithms'
  categoryLabel: string
  year: string
  stampId: string
  tagline: string
  description: string
  architectureDetails: {
    overview: string
    patterns: string[]
    highlights: string[]
    metrics: string
  }
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  color: string
}

const projects: ProjectData[] = [
  {
    id: 'system-awakening',
    title: 'System: Awakening',
    category: 'ios',
    categoryLabel: 'iOS • Swift 6',
    year: '2024',
    stampId: 'SWIFT-01',
    tagline: 'Solo Leveling RPG Engine with strict concurrency & offline persistence',
    description:
      'Native iOS application built with modern Swift 6 strict concurrency, declarative SwiftUI, and SwiftData for responsive offline-first RPG stat tracking and quest mechanics.',
    architectureDetails: {
      overview:
        'Engineered with Clean Architecture + Unidirectional Data Flow (UDF). Separates domain logic, game state machines, and view layers to guarantee zero race conditions under Swift 6 Complete Concurrency checking.',
      patterns: ['Swift 6 Concurrency', 'SwiftData', 'UDF / Redux-like State', 'MVVM-C'],
      highlights: [
        'Zero data races with actor-isolated storage and Swift 6 Sendable enforcement',
        'Complex quest progression algorithms running at 60 FPS animation lock',
        'SwiftData schema migrations with local encrypted backup'
      ],
      metrics: '60 FPS UI • Zero Data Races • 100% Native'
    },
    tags: ['Swift 6', 'SwiftUI', 'SwiftData', 'Clean Arch', 'Concurrency'],
    githubUrl: 'https://github.com/v9d007',
    liveUrl: 'https://v9d.is-a.dev',
    color: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20 border-purple-500/40 text-purple-300'
  },
  {
    id: 'compass-xoxoday',
    title: 'Compass (Xoxoday)',
    category: 'ios',
    categoryLabel: 'Enterprise iOS',
    year: '2022 - 2024',
    stampId: 'XOXO-02',
    tagline: 'Enterprise gamification & commission calculation engine',
    description:
      'Architected and scaled the flagship Compass iOS client for enterprise commission and sales incentive management. Handled multi-currency calculations and offline sync.',
    architectureDetails: {
      overview:
        'Hybrid architecture leveraging high-performance UIKit for complex nested data tables and SwiftUI for dynamic incentive dashboards. GraphQL client with optimistic mutations.',
      patterns: ['UIKit & SwiftUI Hybrid', 'GraphQL Apollo', 'VIPER Architecture', 'CoreData Sync'],
      highlights: [
        'Reduced cold start latency by 42% through lazy module loading',
        'Custom interactive leaderboard graphs rendering 50,000+ data points smoothly',
        'Offline transaction queue with automatic conflict resolution upon reconnection'
      ],
      metrics: 'Enterprise Scale • 42% Faster Boot • Millions Processed'
    },
    tags: ['UIKit', 'Swift', 'GraphQL', 'CoreData', 'VIPER'],
    githubUrl: 'https://github.com/v9d007',
    color: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border-cyan-500/40 text-cyan-300'
  },
  {
    id: 'empuls-xoxoday',
    title: 'Empuls (Xoxoday)',
    category: 'react-native',
    categoryLabel: 'Mobile App',
    year: '2021 - 2023',
    stampId: 'XOXO-03',
    tagline: 'Global employee engagement & social reward platform',
    description:
      'Led core mobile client development for Empuls, connecting distributed workforces across 500+ enterprises worldwide with social feeds, surveys, and peer recognition.',
    architectureDetails: {
      overview:
        'Cross-platform React Native client with native iOS Swift bridging for high-performance media caching, push notifications, and cryptographic token security.',
      patterns: ['React Native', 'Native Swift Bridges', 'Redux Toolkit', 'WebSocket Feeds'],
      highlights: [
        'Real-time peer applause & recognition feed powered by WebSocket subscriptions',
        'Custom Native iOS image pre-caching engine eliminating feed stutter',
        'Biometric authentication with Apple Secure Enclave keychain integration'
      ],
      metrics: '1,000,000+ Active Users • 99.8% Crash-Free Rate'
    },
    tags: ['React Native', 'Swift Bridge', 'Redux', 'WebSockets', 'iOS SDK'],
    githubUrl: 'https://github.com/v9d007',
    color: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20 border-blue-500/40 text-blue-300'
  },
  {
    id: 'natural-traders',
    title: 'Natural Traders',
    category: 'fullstack',
    categoryLabel: 'Fintech & Systems',
    year: '2024',
    stampId: 'FIN-04',
    tagline: 'High-frequency algorithmic options analytics & live Greek calculations',
    description:
      'High-speed fintech dashboard providing real-time Black-Scholes options pricing, implied volatility surfaces, and automated multi-leg strategy execution.',
    architectureDetails: {
      overview:
        'Built with Next.js 14 App Router, WebSockets, and WebGL charts to visualize live options Greeks across thousands of market strikes without UI thread starvation.',
      patterns: ['Next.js 14', 'WebSockets', 'High-Frequency Canvas', 'TypeScript'],
      highlights: [
        'Sub-millisecond mathematical evaluations for delta, gamma, theta, and vega',
        'Live candlestick charts rendering 100k ticks with zero layout re-computations',
        'Paper trading sandbox environment for strategy backtesting'
      ],
      metrics: '<50ms Streaming Latency • Real-Time Greeks'
    },
    tags: ['Next.js 14', 'TypeScript', 'WebSockets', 'Tailwind', 'Trading'],
    githubUrl: 'https://github.com/v9d007',
    color: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-emerald-500/40 text-emerald-300'
  },
  {
    id: 'maidpro',
    title: 'MaidPro Operations',
    category: 'fullstack',
    categoryLabel: 'Enterprise Suite',
    year: '2024',
    stampId: 'OPS-05',
    tagline: 'Service dispatching & field workforce management suite',
    description:
      'Modern web and mobile operations suite featuring automated dispatch algorithms, live geolocation fleet tracking, and automated customer scheduling.',
    architectureDetails: {
      overview:
        'Full-stack Next.js 15 & React Native architecture sharing business domain models, with Postgres geospatial queries for optimal route dispatching.',
      patterns: ['Next.js 15', 'React Native', 'PostgreSQL PostGIS', 'Microservices'],
      highlights: [
        'Geospatial route clustering cutting field travel time by 28%',
        'Offline job sync allowing technicians to operate in zero-connectivity basements',
        'Automated billing integration with Stripe webhooks and tax calculation'
      ],
      metrics: '28% Dispatch Efficiency Gain • Multi-Tenant'
    },
    tags: ['Next.js 15', 'React Native', 'PostgreSQL', 'Tailwind'],
    githubUrl: 'https://github.com/v9d007',
    color: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20 border-amber-500/40 text-amber-300'
  },
  {
    id: 'nudge-habits',
    title: 'Nudge Habit Tracker',
    category: 'react-native',
    categoryLabel: 'Mobile App',
    year: '2023',
    stampId: 'APP-06',
    tagline: 'Gamified habit architecture with haptic feedback & streak locks',
    description:
      'A sleek, minimalist iOS & Android habit tracking app built with React Native and Expo, utilizing psychological micro-commitments and haptic feedback loops.',
    architectureDetails: {
      overview:
        'Local-first SQLite storage architecture utilizing Reanimated 3 for tactile 60 FPS gesture controls and custom native haptic engine triggers.',
      patterns: ['React Native Expo', 'Reanimated 3', 'Local SQLite', 'Haptic Loops'],
      highlights: [
        'Zero cloud dependency: 100% private local-first encrypted SQLite database',
        'Fluid gestures with custom spring physics and tactile drag-to-complete interactions',
        'Smart notification scheduler calculating optimal nudge timing'
      ],
      metrics: '100% Offline-First • 60 FPS Gestures'
    },
    tags: ['React Native', 'Expo', 'Reanimated 3', 'SQLite'],
    githubUrl: 'https://github.com/v9d007',
    color: 'from-rose-500/20 via-pink-500/20 to-purple-500/20 border-rose-500/40 text-rose-300'
  },
  {
    id: 'pulse-mobile',
    title: 'Pulse Field Sync',
    category: 'react-native',
    categoryLabel: 'Cross-Platform',
    year: '2023',
    stampId: 'APP-07',
    tagline: 'Ultra-low bandwidth field communication & operational sync',
    description:
      'Field team coordination mobile app optimized for harsh network conditions, featuring packet batching, background synchronization, and push notifications.',
    architectureDetails: {
      overview:
        'Engineered for 2G/3G edge conditions using binary protobuf serialization and delta-syncing, ensuring operational updates reach dispatch without loss.',
      patterns: ['React Native', 'Protobuf Sync', 'Redux Toolkit', 'Background Fetch'],
      highlights: [
        'Reduced data consumption by 70% compared to standard JSON REST APIs',
        'Background task execution managing critical status heartbeats',
        'Custom local cache with automatic compression of media attachments'
      ],
      metrics: '70% Data Compression • Resilient Edge Sync'
    },
    tags: ['React Native', 'Redux', 'Protobuf', 'Offline Sync'],
    githubUrl: 'https://github.com/v9d007',
    color: 'from-teal-500/20 via-emerald-500/20 to-cyan-500/20 border-teal-500/40 text-teal-300'
  },
  {
    id: 'dsa-competitive',
    title: 'DSA & Algorithmic Core',
    category: 'algorithms',
    categoryLabel: 'Computer Science',
    year: '2019 - Present',
    stampId: 'IITK-08',
    tagline: 'High-performance algorithms, graph theory & competitive problem solving',
    description:
      'Deep exploration of advanced data structures, algorithmic optimizations, and graph algorithms. Grounded in rigorous IIT Kanpur engineering curriculum.',
    architectureDetails: {
      overview:
        'C++ and Swift implementations of segment trees, fenwick trees, max-flow min-cut algorithms, dynamic programming optimizations, and lock-free concurrency primitives.',
      patterns: ['C++', 'Swift Algorithms', 'Data Structures', 'IIT Kanpur AIR 110'],
      highlights: [
        'JEE Advanced All India Rank 110 out of 200,000+ candidates',
        'IIT Kanpur Electrical Engineering graduate (2015-2019)',
        'Extensive algorithmic problem-solving across LeetCode & Codeforces'
      ],
      metrics: 'AIR 110 • O(1) Cache-Conscious Optimization'
    },
    tags: ['Algorithms', 'C++', 'Swift', 'IIT Kanpur', 'Data Structures'],
    githubUrl: 'https://github.com/v9d007',
    color: 'from-amber-500/20 via-yellow-500/20 to-orange-500/20 border-amber-500/40 text-amber-300'
  }
]

const ProjectRoll = ({ soundEnabled }: ProjectRollProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null)

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ios', label: 'iOS & Swift' },
    { id: 'react-native', label: 'React Native' },
    { id: 'fullstack', label: 'Systems & Web' },
    { id: 'algorithms', label: 'DSA & CS' }
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  const handleCardClick = (project: ProjectData) => {
    playSound('pop', soundEnabled)
    setActiveModalProject(project)
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-4 sm:px-8 py-16 overflow-hidden select-none">
      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 flex-wrap z-20">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => {
                playSound('click', soundEnabled)
                setSelectedCategory(cat.id)
              }}
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-mono transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Horizontal Scrollable Stamp Roll */}
      <div className="relative w-full overflow-x-auto no-scrollbar py-4 px-2 sm:px-6">
        <div className="flex items-stretch gap-5 sm:gap-7 min-w-max mx-auto justify-center">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -8,
                rotate: 0,
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300, damping: 15 }
              }}
              className="relative w-72 sm:w-80 flex flex-col cursor-pointer group"
              onClick={() => handleCardClick(project)}
            >
              {/* Stamp Washi Tape at Top */}
              <div
                className="washi-tape -top-2 left-1/2 -translate-x-1/2 w-16 bg-white/30 rotate-[-2deg]"
                title="Washi Tape"
              />

              {/* Physical Postage Stamp Card */}
              <div className="relative p-4 sm:p-5 rounded-xl bg-[#0f111c]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between h-full transition-all group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/20">
                {/* Stamp Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                      POSTAGE // {project.stampId}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-indigo-300 mb-1.5">
                      {project.categoryLabel}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech Chips & Inspect Button */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                    <span className="text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
                      <span>Architecture</span>
                      <Maximize2 size={12} />
                    </span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instruction Tip */}
      <div className="text-center mt-4">
        <p className="text-[11px] font-mono text-gray-500">
          Click any stamp card to inspect full system architecture &amp; benchmarks
        </p>
      </div>

      {/* Architectural Deep-Dive Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0c0e18] border border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/20 text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playSound('pop', soundEnabled)
                  setActiveModalProject(null)
                }}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>SYSTEM SPECIFICATION</span>
                <span>•</span>
                <span>{activeModalProject.stampId}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeModalProject.title}
              </h2>
              <p className="text-sm text-indigo-300 font-mono mb-6">
                {activeModalProject.tagline}
              </p>

              {/* Architecture Blueprint Section */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 flex items-center gap-1.5">
                    <Cpu size={14} className="text-indigo-400" />
                    <span>Architecture Overview</span>
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
                    {activeModalProject.architectureDetails.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 flex items-center gap-1.5">
                    <Layers size={14} className="text-cyan-400" />
                    <span>Design Patterns &amp; Primitives</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.architectureDetails.patterns.map((pat) => (
                      <span
                        key={pat}
                        className="px-3 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-xs font-mono text-indigo-300"
                      >
                        {pat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-gray-400 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    <span>Engineering Highlights</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    {activeModalProject.architectureDetails.highlights.map((hi, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hi}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benchmark Metric Pill */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 text-center">
                  ⚡ Benchmark: {activeModalProject.architectureDetails.metrics}
                </div>
              </div>

              {/* Action Links */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-mono text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    <span>Live Deployment</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectRoll