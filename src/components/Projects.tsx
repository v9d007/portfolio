import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Github,
  Globe,
  Smartphone,
  CheckCircle2,
  Code2,
  Layers,
  ArrowUpRight,
  Sparkles,
  X,
  Cpu,
  ShieldCheck
} from 'lucide-react'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  deepDive: string
  category: 'ios' | 'mobile' | 'web' | 'algorithms'
  tag: string
  technologies: string[]
  liveUrl?: string | null
  githubUrl?: string | null
  features: string[]
  architecture: string[]
  gradient: string
  accentBorder: string
  accentPill: string
  badgeBg: string
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 'system-awakening',
      title: 'System: Awakening',
      subtitle: 'Gamified Solo Leveling Productivity iOS App',
      description:
        'Production-grade native iOS productivity app inspired by Solo Leveling. Engineered with Swift 6 strict concurrency, Clean Architecture + MVVM + Observation framework, and SwiftData actor-isolated persistence.',
      deepDive:
        'Designed from the ground up for iOS 17+ with Swift 6 strict concurrency guarantees. Features a decoupled 3-tier architecture with separate Domain, Data, and Presentation layers, custom Hunter Rank math progression algorithms, and actor-isolated background persistence ensuring zero main-thread hitching.',
      category: 'ios',
      tag: 'Native iOS (Swift 6)',
      technologies: ['Swift 6', 'SwiftUI', 'SwiftData', 'Observation', 'Clean Architecture', 'Actors', 'XCTest'],
      liveUrl: null,
      githubUrl: 'https://github.com/v9d007/system-awakening',
      features: [
        'Swift 6 strict concurrency & actor-isolated persistence',
        'Clean Architecture + MVVM + Observation framework',
        'Gamified quest engine, penalty zone, & rank progression',
        'Unit & UI test suites written with XCTest framework'
      ],
      architecture: [
        'Domain Layer: HunterRank, Quest, Stat entities & pure business protocols',
        'Data Layer: SwiftData model container isolated to background actor',
        'Presentation Layer: Modern declarative SwiftUI with Observation state',
        'Math Engine: Logarithmic XP scaling and milestone difficulty curves'
      ],
      gradient: 'from-indigo-600/30 via-purple-600/15 to-blue-600/20',
      accentBorder: 'group-hover:border-indigo-500/50',
      accentPill: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      badgeBg: 'bg-indigo-500'
    },
    {
      id: 'compass',
      title: 'Compass (Xoxoday)',
      subtitle: 'Enterprise Sales Gamification & Incentive Platform',
      description:
        'Enterprise sales incentive gamification and commission automation platform. Engineered native iOS modules using UIKit and cross-platform screens in React Native, integrated GraphQL APIs, and Grand Central Dispatch.',
      deepDive:
        'Contributed to the core mobile architecture powering real-time commission tracking and gamified sales milestones for enterprise workforces. Implemented responsive UIKit auto-layout, multi-thread GCD background computations, and seamless EAS builds distributed on the iOS App Store and Google Play.',
      category: 'ios',
      tag: 'Enterprise Mobile (iOS / Android)',
      technologies: ['Swift', 'UIKit', 'React Native', 'GraphQL', 'Firebase', 'GCD', 'EAS', 'Alamofire'],
      liveUrl: 'https://www.xoxoday.com/compass',
      githubUrl: 'https://github.com/v9d007',
      features: [
        'Real-time commission computation & milestone gamification',
        'Scalable UIKit auto-layout & Grand Central Dispatch optimization',
        'Integrated Kingfisher, Alamofire, GoogleTagManager & Firebase',
        'Shipped to production on Apple App Store & Google Play Store'
      ],
      architecture: [
        'Hybrid UIKit & React Native bridge architecture',
        'GraphQL caching and real-time incentive websocket feeds',
        'Secure keychain credentials and enterprise SSO integration',
        'Continuous deployment pipeline with Expo Application Services (EAS)'
      ],
      gradient: 'from-blue-600/30 via-cyan-600/15 to-indigo-600/20',
      accentBorder: 'group-hover:border-blue-500/50',
      accentPill: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      badgeBg: 'bg-blue-500'
    },
    {
      id: 'empuls',
      title: 'Empuls (Xoxoday)',
      subtitle: 'Global Workplace Culture & Social Recognition Platform',
      description:
        'Social recognition and employee rewards mobile app connecting distributed global teams. Architected modular iOS feed interfaces with UIKit/Cocoa Touch and React Native, implementing custom gestures and enterprise auth.',
      deepDive:
        'Engineered high-frequency feed interfaces handling asynchronous media caching, peer recognition feeds, and custom reaction micro-interactions. Integrated Protocols, Delegates, and Redux state stores for consistent cross-platform UX across iOS and Android.',
      category: 'mobile',
      tag: 'Enterprise Mobile (iOS / Android)',
      technologies: ['Swift', 'Xcode', 'Cocoa Touch', 'React Native', 'Redux', 'Push Notifications'],
      liveUrl: 'https://www.xoxoday.com/empuls',
      githubUrl: 'https://github.com/v9d007',
      features: [
        'Peer recognition feeds, social wall, and badge rewards',
        'Modular protocols, delegates, and extension architecture in Swift',
        'Multi-user login and enterprise single sign-on (SSO)',
        'Fluid feed scrolling, memory management, and async media caching'
      ],
      architecture: [
        'Custom UITableView and UICollectionView layout coordinators',
        'Redux store slices with normalized feed entity caches',
        'Push notifications, badge counters, and deep link routing',
        'Multi-language internationalization (i18n) support'
      ],
      gradient: 'from-rose-600/30 via-pink-600/15 to-purple-600/20',
      accentBorder: 'group-hover:border-rose-500/50',
      accentPill: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      badgeBg: 'bg-rose-500'
    },
    {
      id: 'natural-traders',
      title: 'Natural Traders Platform',
      subtitle: 'Wholesale FMCG & Beverage Distribution Platform',
      description:
        'Modern wholesale FMCG & beverage distribution portal built with Next.js 14 and TypeScript. Features high-performance product browsing, dynamic catalog inquiries, SEO optimization, and mobile-first responsive design.',
      deepDive:
        'Built with Next.js 14 App Router and server-rendered components to achieve top-tier Lighthouse performance and search rankings. Features dynamic wholesale catalog queries, WhatsApp business lead routing, and fluid responsive layouts with Tailwind CSS.',
      category: 'web',
      tag: 'Live Web Platform (Next.js 14)',
      technologies: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'SEO'],
      liveUrl: 'https://www.thenaturaltraders.in',
      githubUrl: 'https://github.com/v9d007/natural-traders',
      features: [
        'Full B2B wholesale product showcase & automated inquiries',
        'High-performance Next.js server-rendered pages with metadata',
        'Mobile-first responsive design with Tailwind CSS styling',
        'Live in production with custom domain & SSL certification'
      ],
      architecture: [
        'Next.js 14 App Router with React Server Components',
        'Optimized responsive asset delivery and layout shifts',
        'Direct WhatsApp and SMTP automated inquiry triggers',
        'Tailwind CSS design system with custom brand tokens'
      ],
      gradient: 'from-emerald-600/30 via-teal-600/15 to-cyan-600/20',
      accentBorder: 'group-hover:border-emerald-500/50',
      accentPill: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      badgeBg: 'bg-emerald-500'
    },
    {
      id: 'maid-pro',
      title: 'MaidPro Service Platform',
      subtitle: 'On-Demand Domestic Help & Home Services Platform',
      description:
        'Modern domestic service booking platform with web and companion mobile apps. Built with Next.js 15, React 19, TypeScript, and React Native. Includes instant bilingual switching (English / Hindi), dark/light theme, and transparent pricing slabs.',
      deepDive:
        'Architected with Next.js 15 and React 19 compiler primitives for ultra-fast client hydration. Integrates instantaneous bilingual English/Hindi localization, dynamic service pricing matrix, and a companion React Native mobile application for domestic workers and customers.',
      category: 'web',
      tag: 'Next.js 15 & React Native',
      technologies: ['Next.js 15', 'React 19', 'React Native', 'TypeScript', 'Tailwind CSS', 'i18n'],
      liveUrl: 'https://maid-pro-web.vercel.app',
      githubUrl: 'https://github.com/v9d007/maid-pro-web',
      features: [
        'Instant bilingual toggle between English and Hindi',
        'Seamless Dark and Light theme switching',
        'Categorized home cleaning services with transparent pricing',
        'Companion React Native mobile application for mobile booking'
      ],
      architecture: [
        'Next.js 15 modern compiler & React 19 action primitives',
        'Unified JSON-based localization engine for English & Hindi',
        'Persistent theme state with zero flash on hydration',
        'Shared TypeScript types between Web and React Native Mobile client'
      ],
      gradient: 'from-purple-600/30 via-violet-600/15 to-pink-600/20',
      accentBorder: 'group-hover:border-purple-500/50',
      accentPill: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      badgeBg: 'bg-purple-500'
    },
    {
      id: 'nudge',
      title: 'Nudge — Momentum Tracker',
      subtitle: 'Goal & Habit Tracking Productivity Mobile App',
      description:
        'Productivity-focused mobile app designed to help users build momentum and achieve daily goals. Features comprehensive analytics, trend monitoring, task management with smart filters, and customizable light/dark themes.',
      deepDive:
        'Engineered in React Native with Expo and TypeScript. Built around habit loop psychology, featuring daily priority actions, dynamic streak counters, interactive weekly insight graphs, and persistent local storage.',
      category: 'mobile',
      tag: 'React Native (Expo)',
      technologies: ['React Native', 'Expo', 'TypeScript', 'React Navigation', 'Tailwind CSS'],
      liveUrl: null,
      githubUrl: 'https://github.com/v9d007/nudge',
      features: [
        'Daily progress overview & priority action cards',
        'Trend analytics & weekly insight tracking',
        'Task management with dynamic filtering and completion states',
        'Light and dark theme switching with custom design system'
      ],
      architecture: [
        'React Navigation with bottom tabs and modal sheets',
        'Modular feature folder structure for tasks, streaks, and stats',
        'AsyncStorage persistence engine with optimistic UI updates',
        'Framer Motion / Reanimated micro-interactions for streak celebration'
      ],
      gradient: 'from-amber-600/30 via-orange-600/15 to-yellow-600/20',
      accentBorder: 'group-hover:border-amber-500/50',
      accentPill: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      badgeBg: 'bg-amber-500'
    },
    {
      id: 'pulse-mobile',
      title: 'Pulse Mobile Client',
      subtitle: 'Team Collaboration & Activity Tracking Mobile App',
      description:
        'Mobile client for Pulse built with Expo, React Native, and Redux Toolkit. Implements modular feature-sliced architecture, persistent navigation stacks, and reactive centralized state stores.',
      deepDive:
        'A mobile application engineered for team activity feeds and collaboration. Leverages Redux Toolkit slices with typed hooks, high-performance virtualized lists, and clean separation between screen presentation and state management.',
      category: 'mobile',
      tag: 'React Native & Redux',
      technologies: ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'React Navigation'],
      liveUrl: null,
      githubUrl: 'https://github.com/v9d007/pulse-mobile',
      features: [
        'Feature-driven modular architecture separating screens, logic, and state',
        'Redux Toolkit state slices with strongly-typed action dispatchers',
        'Multi-stack React Navigation with smooth screen transitions',
        'Optimized virtualized list performance for seamless scrolling'
      ],
      architecture: [
        'Feature-sliced folder organization (features, screens, navigation)',
        'Redux Toolkit store with centralized middleware and selectors',
        'Optimized FlatList item renderers avoiding layout thrashing',
        'Full TypeScript strict mode throughout navigation and store types'
      ],
      gradient: 'from-sky-600/30 via-blue-600/15 to-cyan-600/20',
      accentBorder: 'group-hover:border-sky-500/50',
      accentPill: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
      badgeBg: 'bg-sky-500'
    },
    {
      id: 'dsa-neetcode',
      title: 'DSA & Algorithmic Problem Solving',
      subtitle: 'Curated NeetCode & LeetCode Solutions',
      description:
        'Algorithmic problem solutions across dynamic programming, trees, graphs, arrays, and two-pointer patterns. Engineered with clean, idiomatic TypeScript and JavaScript, backed by an IIT Kanpur engineering foundation.',
      deepDive:
        'A comprehensive repository of algorithmic challenges solved with a focus on optimal asymptotic bounds, memory trade-offs, and clean modular code. Demonstrates core computer science fundamentals from IIT Kanpur Electrical Engineering and JEE Advanced AIR 110.',
      category: 'algorithms',
      tag: 'Algorithms & Data Structures',
      technologies: ['Algorithms', 'Data Structures', 'TypeScript', 'JavaScript', 'Problem Solving'],
      liveUrl: null,
      githubUrl: 'https://github.com/v9d007/dsa-neetcode',
      features: [
        'Optimized time and space complexities (O(1), O(N), O(log N))',
        'Comprehensive coverage of graph, tree, heap, and DP patterns',
        'Clean, modular code structure with edge-case handling',
        'Rooted in IIT Kanpur Electrical Engineering analytical discipline'
      ],
      architecture: [
        'Graph Algorithms: Dijkstra, BFS/DFS, Topological Sort, Union-Find',
        'Dynamic Programming: Memoization, Tabulation, Knapsack variations',
        'Tree Traversals: Binary search trees, Segment trees, Trie structures',
        'Modular unit test drivers validating boundary and edge conditions'
      ],
      gradient: 'from-teal-600/30 via-emerald-600/15 to-blue-600/20',
      accentBorder: 'group-hover:border-teal-500/50',
      accentPill: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      badgeBg: 'bg-teal-500'
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ios', label: 'Native iOS & Swift' },
    { id: 'mobile', label: 'React Native & Mobile' },
    { id: 'web', label: 'Web & Full Stack' },
    { id: 'algorithms', label: 'Algorithms & DSA' }
  ]

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'ios') return project.category === 'ios' || project.technologies.includes('Swift')
    if (activeFilter === 'mobile') return project.category === 'mobile' || project.category === 'ios'
    if (activeFilter === 'web') return project.category === 'web'
    if (activeFilter === 'algorithms') return project.category === 'algorithms'
    return project.category === activeFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ios':
        return Smartphone
      case 'mobile':
        return Smartphone
      case 'web':
        return Globe
      case 'algorithms':
        return Code2
      default:
        return Layers
    }
  }

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            Showcase Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Production &amp; <span className="gradient-text-aurora">Engineered Systems</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From Swift 6 native iOS architectures to enterprise React Native applications and full-stack web platforms.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-tab-pill"
                    className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const Icon = getCategoryIcon(project.category)

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className={`glass-card rounded-2xl overflow-hidden border border-white/[0.08] ${project.accentBorder} flex flex-col group cursor-pointer`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Visual Header Mockup */}
                  <div
                    className={`relative h-44 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between overflow-hidden border-b border-white/[0.06]`}
                  >
                    {/* Background Light Reflector */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>

                    {/* Top Row: Type Pill and Action Links */}
                    <div className="flex items-center justify-between z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${project.accentPill}`}
                      >
                        <Icon size={12} />
                        {project.tag}
                      </span>

                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} on GitHub`}
                            className="p-2 rounded-xl bg-black/40 hover:bg-black/80 text-gray-300 hover:text-white transition-colors border border-white/[0.1]"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${project.title} live`}
                            className="p-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white transition-colors border border-indigo-400/40 shadow-sm"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row in Header: Title */}
                    <div className="z-10">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-300/80 line-clamp-1 mt-0.5 font-medium">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Project Details Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Description */}
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Key Features */}
                      <div className="mb-4">
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          Architecture Highlights
                        </h4>
                        <ul className="space-y-1.5">
                          {project.features.slice(0, 3).map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="text-xs text-gray-300 flex items-start gap-2 leading-tight"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0"></span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Tech Badges & Interactive Trigger */}
                    <div className="pt-4 border-t border-white/[0.06] mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 py-0.5 bg-white/[0.04] rounded-md text-[11px] font-mono text-gray-300 border border-white/[0.06]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 bg-white/[0.02] rounded-md text-[11px] font-mono text-gray-400">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:text-indigo-300">
                        <span>Click for Deep Dive &amp; Architecture</span>
                        <ArrowUpRight
                          size={14}
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* View More on GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/v9d007"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Github size={17} />
            <span>View All Repositories on GitHub (@v9d007)</span>
          </a>
        </motion.div>
      </div>

      {/* Interactive Project Inspection Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#0b0c15] border border-white/[0.12] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>

              {/* Tag & Title */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${selectedProject.accentPill} mb-3`}>
                  {selectedProject.tag}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-gray-400 font-medium">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Deep Dive Description */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                  <Cpu size={14} />
                  System Overview
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                  {selectedProject.deepDive}
                </p>
              </div>

              {/* Architecture Details */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                  <ShieldCheck size={14} />
                  Architecture &amp; Implementation Details
                </h4>
                <div className="space-y-2">
                  {selectedProject.architecture.map((item, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-gray-300 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack List */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                  Technologies &amp; Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5"
                  >
                    <Github size={15} />
                    <span>View Source Code</span>
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

export default Projects
