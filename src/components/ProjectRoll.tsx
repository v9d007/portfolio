import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Github,
  X,
  Layers,
  Cpu,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Star
} from 'lucide-react'
import { playSound } from '../utils/audio'

interface ProjectRollProps {
  soundEnabled: boolean
}

export interface ProjectData {
  id: string
  num: string
  title: string
  category: 'ios' | 'react-native' | 'fullstack' | 'algorithms'
  categoryLabel: string
  year: string
  tagline: string
  subtitle: string
  description: string
  stars?: string
  mockupType: 'chart' | 'window' | 'typography' | 'buttons' | 'map' | 'tree'
  architectureDetails: {
    overview: string
    patterns: string[]
    highlights: string[]
    metrics: string
  }
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

const projects: ProjectData[] = [
  {
    id: 'system-awakening',
    num: '01',
    title: 'System: Awakening',
    category: 'ios',
    categoryLabel: 'iOS • Swift 6',
    year: '2024',
    tagline: 'Solo Leveling RPG Engine with strict concurrency & offline persistence',
    subtitle: 'Swift 6, SwiftUI, SwiftData',
    stars: '60 FPS',
    mockupType: 'chart',
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
    tags: ['Swift 6', 'SwiftUI', 'SwiftData', 'Clean Arch'],
    githubUrl: 'https://github.com/v9d007',
    liveUrl: 'https://v9d.is-a.dev'
  },
  {
    id: 'compass-xoxoday',
    num: '02',
    title: 'Compass (Xoxoday)',
    category: 'ios',
    categoryLabel: 'Enterprise iOS',
    year: '2022 - 2024',
    tagline: 'Enterprise gamification & commission calculation engine',
    subtitle: 'UIKit, Swift, GraphQL, CoreData',
    stars: '10M+',
    mockupType: 'window',
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
    githubUrl: 'https://github.com/v9d007'
  },
  {
    id: 'empuls-xoxoday',
    num: '03',
    title: 'Empuls Mobile',
    category: 'react-native',
    categoryLabel: 'Social Engagement',
    year: '2021 - 2023',
    tagline: 'Global employee engagement & social reward platform',
    subtitle: 'React Native, Swift Bridge, Redux',
    stars: '1M+ Users',
    mockupType: 'buttons',
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
    tags: ['React Native', 'Swift Bridge', 'Redux', 'WebSockets'],
    githubUrl: 'https://github.com/v9d007'
  },
  {
    id: 'natural-traders',
    num: '04',
    title: 'Natural Traders',
    category: 'fullstack',
    categoryLabel: 'Fintech & Systems',
    year: '2024',
    tagline: 'High-frequency algorithmic options analytics & live Greek calculations',
    subtitle: 'Next.js 14, WebSockets, TypeScript',
    stars: '<50ms',
    mockupType: 'chart',
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
    tags: ['Next.js 14', 'TypeScript', 'WebSockets', 'Trading'],
    githubUrl: 'https://github.com/v9d007'
  },
  {
    id: 'maidpro',
    num: '05',
    title: 'MaidPro Operations',
    category: 'fullstack',
    categoryLabel: 'Enterprise Suite',
    year: '2024',
    tagline: 'Service dispatching & field workforce management suite',
    subtitle: 'Next.js 15, React Native, Postgres',
    stars: '28% Opt',
    mockupType: 'map',
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
    tags: ['Next.js 15', 'React Native', 'PostgreSQL'],
    githubUrl: 'https://github.com/v9d007'
  },
  {
    id: 'nudge-habits',
    num: '06',
    title: 'Nudge Habits',
    category: 'react-native',
    categoryLabel: 'Mobile App',
    year: '2023',
    tagline: 'Gamified habit architecture with haptic feedback & streak locks',
    subtitle: 'React Native, Expo, Reanimated 3',
    stars: 'Offline',
    mockupType: 'typography',
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
    githubUrl: 'https://github.com/v9d007'
  },
  {
    id: 'pulse-mobile',
    num: '07',
    title: 'Pulse Field Sync',
    category: 'react-native',
    categoryLabel: 'Cross-Platform',
    year: '2023',
    tagline: 'Ultra-low bandwidth field communication & operational sync',
    subtitle: 'React Native, Protobuf, Redux',
    stars: 'Protobuf',
    mockupType: 'buttons',
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
    githubUrl: 'https://github.com/v9d007'
  },
  {
    id: 'dsa-competitive',
    num: '08',
    title: 'DSA Systems Core',
    category: 'algorithms',
    categoryLabel: 'Computer Science',
    year: '2019 - Present',
    tagline: 'High-performance algorithms, graph theory & competitive problem solving',
    subtitle: 'C++, Swift, Data Structures',
    stars: 'O(1) Core',
    mockupType: 'tree',
    description:
      'Deep exploration of advanced data structures, algorithmic optimizations, and graph algorithms. Grounded in rigorous IIT Kanpur engineering curriculum.',
    architectureDetails: {
      overview:
        'C++ and Swift implementations of segment trees, fenwick trees, max-flow min-cut algorithms, dynamic programming optimizations, and lock-free concurrency primitives.',
      patterns: ['C++', 'Swift Algorithms', 'Data Structures', 'IIT Kanpur Core'],
      highlights: [
        'Rigorous algorithmic problem solving and competitive systems programming',
        'IIT Kanpur Electrical Engineering graduate (2015-2019)',
        'Extensive algorithmic problem-solving across LeetCode & Codeforces'
      ],
      metrics: 'O(1) Cache-Conscious Optimization • Scalable Primitives'
    },
    tags: ['Algorithms', 'C++', 'Swift', 'IIT Kanpur'],
    githubUrl: 'https://github.com/v9d007'
  }
]

// Vector illustrations inside each card (matching yl0.me Image 2 aesthetic)
const ProjectMockupGraphic = ({ type, title }: { type: string; title: string }) => {
  if (type === 'chart') {
    return (
      <div className="w-44 h-44 rounded-2xl bg-[#0f131d] border border-white/10 p-3.5 flex flex-col justify-between shadow-inner">
        {/* Glowing Chart Curve */}
        <div className="relative w-full h-20">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 140 60">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
            <path
              d="M 5,50 Q 30,55 50,35 T 90,25 T 135,8"
              fill="none"
              stroke="url(#chartGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="135" cy="8" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        {/* Level / Bar indicator */}
        <div className="space-y-1.5 font-mono text-[9px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>1</span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-cyan-400 rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>2</span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-3/5 h-full bg-indigo-400 rounded-full" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>3</span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="w-2/5 h-full bg-cyan-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'window') {
    return (
      <div className="w-44 h-44 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 p-3.5 flex flex-col justify-between shadow-md">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-white/10">
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        </div>

        <div className="space-y-2 py-2">
          <div className="w-3/4 h-2 bg-slate-800 dark:bg-white rounded-full" />
          <div className="w-1/2 h-1.5 bg-slate-400 rounded-full" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="w-12 h-4 rounded-md bg-slate-900 dark:bg-cyan-400" />
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    )
  }

  if (type === 'buttons') {
    return (
      <div className="w-44 h-44 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-white/10 p-3.5 flex flex-col justify-center gap-2.5 shadow-sm">
        <div className="w-full h-8 rounded-xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center">
          <div className="w-10 h-1.5 bg-white/80 rounded-full" />
        </div>
        <div className="w-full h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
          <div className="w-12 h-1.5 bg-white rounded-full" />
        </div>
        <div className="w-full h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-between px-3">
          <div className="w-8 h-1.5 bg-slate-400 rounded-full" />
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500" />
        </div>
      </div>
    )
  }

  // Default typographic / graphics fallback
  return (
    <div className="w-44 h-44 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-white/10 p-4 flex flex-col justify-center items-center text-center shadow-sm">
      <p className="font-bold text-lg text-indigo-600 dark:text-cyan-400 tracking-tight leading-tight">
        {title.split(' ')[0]}
      </p>
      <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
        Architecture
      </p>
    </div>
  )
}

const ProjectRoll = ({ soundEnabled }: ProjectRollProps) => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null)

  const handleCardClick = (project: ProjectData) => {
    playSound('pop', soundEnabled)
    setActiveModalProject(project)
  }

  const handleBack = () => {
    playSound('click', soundEnabled)
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-10 max-w-7xl mx-auto select-none flex flex-col justify-between"
    >
      <div>
        {/* Top Header Row (Exact match to yl0.me Image 2) */}
        <div className="flex items-center justify-between font-mono text-xs sm:text-sm border-b border-slate-200/60 dark:border-white/10 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-purple-600 dark:text-purple-400 font-bold">[P]</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">Projects</span>
          </div>
          <div className="text-slate-400 dark:text-slate-500 tracking-wider">
            01 — {String(projects.length).padStart(2, '0')}
          </div>
        </div>

        {/* Subtitle & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            Libraries, apps and architecture I have built, mostly in Swift, SwiftUI &amp; React Native. Scroll sideways to browse them.
          </p>

          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={12} />
            <span>Back</span>
          </button>
        </div>

        {/* Horizontal Card Roll Conveyor (Matching yl0.me Image 2) */}
        <div className="w-full overflow-x-auto no-scrollbar py-6">
          <div className="flex items-stretch gap-6 min-w-max mx-auto px-4 justify-start sm:justify-center">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
                onClick={() => handleCardClick(project)}
                className="relative w-64 sm:w-72 rounded-2xl bg-white dark:bg-[#0c0e18] border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all cursor-pointer p-4 flex flex-col justify-between"
              >
                {/* Number in top-left */}
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mb-2 block">
                  {project.num}
                </span>

                {/* Center Vector UI Mockup Graphic */}
                <div className="flex items-center justify-center my-auto py-2">
                  <ProjectMockupGraphic type={project.mockupType} title={project.title} />
                </div>

                {/* Bottom Caption Row */}
                <div className="border-t border-slate-100 dark:border-white/10 pt-3 mt-3 flex items-end justify-between font-mono">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[150px] mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span>{project.stars || 'Core'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Deep-Dive Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0c0e18] border border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/20 text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  playSound('pop', soundEnabled)
                  setActiveModalProject(null)
                }}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>SYSTEM SPECIFICATION</span>
                <span>•</span>
                <span>{activeModalProject.num}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeModalProject.title}
              </h2>
              <p className="text-sm text-indigo-300 font-mono mb-6">
                {activeModalProject.tagline}
              </p>

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

                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 text-center">
                  ⚡ Benchmark: {activeModalProject.architectureDetails.metrics}
                </div>
              </div>

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
    </section>
  )
}

export default ProjectRoll