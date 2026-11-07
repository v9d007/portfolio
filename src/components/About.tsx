import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Trophy,
  Activity,
  Code2,
  Copy,
  Check,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react'

const About = () => {
  const [copied, setCopied] = useState(false)

  const codeSnippet = `// Mobile Systems Architect
final class VinodKumarSingh: MobileEngineer {
    let education    = "IIT Kanpur (B.Tech, EE '19)"
    let coreStack    = ["Swift 6", "SwiftUI", "React Native", "SwiftData"]
    let architecture = ["Clean Architecture", "MVVM", "Actor Isolation"]
    let location     = "Bangalore, India"
    let passion      = "Shipping fluid, zero-jank mobile apps"
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pillars = [
    {
      title: 'Swift 6 Strict Concurrency',
      desc: 'Actor-isolated background persistence and thread-safe data flow eliminating data races.',
      icon: ShieldCheck,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      title: 'Clean Architecture & MVVM',
      desc: 'Decoupled domain layers, testable view models, and modular feature-driven folder structures.',
      icon: Layers,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Offline-First Reactive State',
      desc: 'SwiftData & Redux Toolkit stores with optimistic synchronization and resilient caching.',
      icon: Cpu,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: '60fps Fluid Interfaces',
      desc: 'High-performance virtualized lists, custom gesture responders, and polished micro-interactions.',
      icon: Sparkles,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    }
  ]

  const achievements = [
    {
      title: 'IIT Kanpur Graduate (B.Tech EE)',
      desc: 'Deep analytical foundation in electrical engineering and computation.',
      highlight: 'IIT Kanpur'
    },
    {
      title: 'Senior Mobile Systems Architect',
      desc: 'Architecting 60 FPS offline-first apps serving millions of users.',
      highlight: 'Senior iOS'
    },
    {
      title: 'Dakshana Scholar & Super-30 Alumnus',
      desc: 'Selected among top 1% scholars across 600 JNVs; Super-30 Patna scholar.',
      highlight: 'Top 1%'
    },
    {
      title: 'Two-Time National Football Athlete',
      desc: 'Contributed to Inter-IIT General Championship winning sports teams.',
      highlight: 'National Level'
    }
  ]

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Code2 size={13} />
            Engineering Identity
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            System Mindset. <span className="gradient-text-aurora">Analytical Rigor.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bridging native iOS performance and cross-platform flexibility with an engineering foundation rooted in IIT Kanpur.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Interactive Terminal Code Window (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 font-mono text-xs text-gray-400">
                    Profile.swift
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-gray-300 transition-colors border border-white/[0.08]"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Spec</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Snippet */}
              <pre className="font-mono text-xs sm:text-sm text-gray-300 leading-relaxed overflow-x-auto p-4 rounded-xl bg-[#05060a]/90 border border-white/[0.05]">
                <code>
                  <span className="text-purple-400">final class </span>
                  <span className="text-indigo-300 font-semibold">VinodKumarSingh</span>: <span className="text-cyan-300">MobileEngineer</span> &#123;{'\n'}
                  {'  '}<span className="text-purple-400">let </span><span className="text-indigo-200">education</span>    = <span className="text-emerald-300">"IIT Kanpur (B.Tech, EE '19)"</span>{'\n'}
                  {'  '}<span className="text-purple-400">let </span><span className="text-indigo-200">coreStack</span>    = [<span className="text-emerald-300">"Swift 6"</span>, <span className="text-emerald-300">"SwiftUI"</span>, <span className="text-emerald-300">"React Native"</span>, <span className="text-emerald-300">"SwiftData"</span>]{'\n'}
                  {'  '}<span className="text-purple-400">let </span><span className="text-indigo-200">architecture</span> = [<span className="text-emerald-300">"Clean Architecture"</span>, <span className="text-emerald-300">"MVVM"</span>, <span className="text-emerald-300">"Actor Isolation"</span>]{'\n'}
                  {'  '}<span className="text-purple-400">let </span><span className="text-indigo-200">location</span>     = <span className="text-emerald-300">"Bangalore, India"</span>{'\n'}
                  {'  '}<span className="text-purple-400">let </span><span className="text-indigo-200">passion</span>      = <span className="text-emerald-300">"Shipping fluid, zero-jank mobile apps"</span>{'\n'}
                  &#125;
                </code>
              </pre>
            </div>

            {/* Quick Summary Pill */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                5+ Years Professional Mobile Experience
              </span>
              <span className="font-mono text-gray-500">v9d007 / Bangalore</span>
            </div>
          </motion.div>

          {/* Card 2: Academic Honors & Rigor (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Trophy size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Academic &amp; Athletic Honors
                </h3>
              </div>

              <div className="space-y-4">
                {achievements.map((item, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/30 transition-all hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {item.highlight}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <GraduationCap size={15} />
                IIT Kanpur '19 Alumni
              </span>
              <span className="font-mono text-gray-500">Electrical Eng</span>
            </div>
          </motion.div>

          {/* Card 3: Core Architectural Pillars (Full 12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-12 glass-panel rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Activity size={18} />
              </div>
              <h3 className="text-lg font-bold text-white">
                Core Architectural Philosophy
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/30 transition-all hover:bg-white/[0.04]"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${pillar.color} mb-3`}>
                    <pillar.icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
