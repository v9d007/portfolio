import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Apple,
  Smartphone,
  Globe2,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react'

interface SkillGroup {
  id: string
  title: string
  subtitle: string
  icon: typeof Apple
  color: string
  borderColor: string
  skills: { name: string; level: number; note: string }[]
}

const Skills = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('ios')

  const skillGroups: SkillGroup[] = [
    {
      id: 'ios',
      title: 'Native Apple & iOS Ecosystem',
      subtitle: 'Native Swift, modern declarative SwiftUI, and system frameworks',
      icon: Apple,
      color: 'text-indigo-400 bg-indigo-500/10',
      borderColor: 'border-indigo-500/30',
      skills: [
        { name: 'Swift 6 & Strict Concurrency', level: 95, note: 'Actors, Sendable, zero data races' },
        { name: 'SwiftUI & UIKit', level: 92, note: 'Custom coordinators, auto-layout, animations' },
        { name: 'SwiftData & Core Data', level: 90, note: 'Actor-isolated background persistence' },
        { name: 'Grand Central Dispatch & Memory', level: 88, note: 'Thread safety, ARC, Instruments leak profiling' },
        { name: 'Combine & Reactive Flows', level: 85, note: 'Publishers, subscribers, async pipelines' },
        { name: 'App Store Connect & EAS', level: 90, note: 'TestFlight beta & store submission pipeline' },
        { name: 'XCTest & UI Testing', level: 86, note: 'Unit testing, mocking protocols, UI automation' },
      ]
    },
    {
      id: 'cross-platform',
      title: 'Cross-Platform Mobile (React Native)',
      subtitle: 'Enterprise-grade React Native, Expo, and native integration',
      icon: Smartphone,
      color: 'text-cyan-400 bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      skills: [
        { name: 'React Native & TypeScript', level: 94, note: 'Modular feature-driven codebases' },
        { name: 'Expo & EAS Build', level: 90, note: 'Managed workflows, continuous deployment' },
        { name: 'Redux Toolkit & Slices', level: 92, note: 'Normalized caching, typed dispatch hooks' },
        { name: 'React Navigation', level: 90, note: 'Deep linking, nested stacks & modal flows' },
        { name: 'Native Modules & Bridging', level: 84, note: 'Bridging iOS UIKit/Swift with JavaScript' },
        { name: 'Push Notifications & Deep Linking', level: 88, note: 'APNs, Firebase FCM, URL scheme handlers' },
      ]
    },
    {
      id: 'web-backend',
      title: 'Modern Web, Backend & APIs',
      subtitle: 'Modern full-stack web platforms and reliable service contracts',
      icon: Globe2,
      color: 'text-purple-400 bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      skills: [
        { name: 'Next.js 15 & React 19', level: 88, note: 'Server components, actions, fast SSR' },
        { name: 'TypeScript Strict Mode', level: 92, note: 'Strongly typed contracts & generics' },
        { name: 'GraphQL & Apollo', level: 85, note: 'Query batching, mutations, schema caching' },
        { name: 'RESTful API Engineering', level: 90, note: 'Axios, status codes, payload optimization' },
        { name: 'Tailwind CSS & Styling', level: 90, note: 'Responsive design systems & animations' },
        { name: 'Firebase & Cloud Services', level: 86, note: 'Auth, Firestore, Analytics & Crashlytics' },
      ]
    },
    {
      id: 'architecture',
      title: 'Architecture, Systems & Tooling',
      subtitle: 'Clean architectural patterns, design principles, and developer tools',
      icon: Cpu,
      color: 'text-emerald-400 bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      skills: [
        { name: 'Clean Architecture & MVVM', level: 94, note: 'Separation of concerns & domain boundaries' },
        { name: 'Actor Isolation & Concurrency', level: 90, note: 'Swift 6 task pools & isolation guarantees' },
        { name: 'Git & GitHub Workflows', level: 92, note: 'Branching, PR reviews, merge strategies' },
        { name: 'Xcode & Instruments', level: 92, note: 'Time profiler, memory allocations, zombies' },
        { name: 'Postman & API Mocking', level: 88, note: 'Test collections & environment variables' },
        { name: 'Figma & UI Prototyping', level: 80, note: 'Design token alignment and component specs' },
      ]
    }
  ]

  const activeGroupData = skillGroups.find((g) => g.id === selectedGroup) || skillGroups[0]

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers size={13} />
            Technical Arsenal
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Mastered <span className="gradient-text-aurora">Technologies &amp; Systems</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Engineered through 5+ years of shipping enterprise production apps and exploring the leading edge of modern frameworks.
          </p>
        </motion.div>

        {/* Group Selector Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {skillGroups.map((group) => {
            const isSelected = selectedGroup === group.id
            const Icon = group.icon
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'glass-panel bg-white/[0.08] border-indigo-500/50 shadow-lg shadow-indigo-500/10 scale-[1.02]'
                    : 'glass-card border-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${group.color}`}>
                  <Icon size={18} />
                </div>
                <div className="font-semibold text-sm text-white mb-0.5 line-clamp-1">
                  {group.title}
                </div>
                <div className="text-[11px] text-gray-400 font-mono">
                  {group.skills.length} core competencies
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Group Detail Panel */}
        <motion.div
          key={activeGroupData.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.1]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-2">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <activeGroupData.icon size={20} className="text-indigo-400" />
                {activeGroupData.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {activeGroupData.subtitle}
              </p>
            </div>
            <div className="text-xs font-mono text-gray-400 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.06] self-start sm:self-auto">
              Production Verified
            </div>
          </div>

          {/* Skill List with Progress and Detail Notes */}
          <div className="grid md:grid-cols-2 gap-4">
            {activeGroupData.skills.map((skill, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 transition-all hover:bg-white/[0.04] group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-white group-hover:text-indigo-300 transition-colors">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-indigo-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                  <span>{skill.note}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
