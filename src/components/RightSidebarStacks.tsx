import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'
import { Github, Linkedin, Twitter, Briefcase, Layers } from 'lucide-react'
import type { NavTab } from './Notch'

interface RightSidebarStacksProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const RightSidebarStacks = ({ onNavigate, soundEnabled }: RightSidebarStacksProps) => {
  return (
    <aside className="absolute right-6 sm:right-12 top-20 bottom-10 z-20 flex flex-col justify-between items-end select-none pointer-events-auto">
      {/* 1. Experience Career Stack (Top Right) */}
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          playSound('pop', soundEnabled)
          onNavigate('experience')
        }}
        onMouseEnter={() => playSound('hover', soundEnabled)}
        className="cursor-pointer flex flex-col items-center group"
      >
        <div className="relative w-22 h-26 sm:w-26 sm:h-30">
          {/* Card layer 2 */}
          <div className="absolute inset-0 translate-x-2 -translate-y-1.5 rotate-4 rounded-2xl bg-indigo-100/70 dark:bg-slate-800/80 border border-indigo-200 dark:border-slate-700 opacity-60 shadow-sm" />
          {/* Card layer 1 */}
          <div className="absolute inset-0 translate-x-1 -translate-y-0.5 rotate-2 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 opacity-80 shadow-sm" />

          {/* Front Glass Pass */}
          <div className="relative w-full h-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg flex flex-col items-center justify-between text-center transition-shadow group-hover:shadow-2xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-0.5 flex items-center justify-center text-white shadow-md">
              <Briefcase size={15} />
            </div>

            <div className="my-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                Xoxoday
              </p>
              <p className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                Senior Mobile
              </p>
            </div>

            <span className="text-[8px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              2021 - Present
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
          <span>Experience</span>
          <span className="px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-slate-800 text-[10px] font-bold text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-slate-700">
            04
          </span>
        </div>
      </motion.div>

      {/* 2. Projects Stack (Middle Right) */}
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          playSound('pop', soundEnabled)
          onNavigate('projects')
        }}
        onMouseEnter={() => playSound('hover', soundEnabled)}
        className="cursor-pointer flex flex-col items-center group my-auto"
      >
        <div className="relative w-22 h-22 sm:w-26 sm:h-26">
          {/* Card layer 2 */}
          <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-6 rounded-2xl bg-cyan-100/60 dark:bg-slate-800 border border-cyan-200 dark:border-slate-700 opacity-60 shadow-sm" />
          {/* Card layer 1 */}
          <div className="absolute inset-0 translate-x-1 -translate-y-1 rotate-3 rounded-2xl bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 opacity-80 shadow-sm" />

          {/* Front Card */}
          <div className="relative w-full h-full p-3 rounded-2xl bg-[#0a0d18] border border-white/10 shadow-lg flex flex-col justify-between text-white transition-shadow group-hover:shadow-2xl">
            <div className="flex items-center justify-between text-cyan-400">
              <Layers size={15} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Micro visual bars */}
            <div className="space-y-1">
              <div className="w-full h-1 bg-cyan-400/80 rounded-full" />
              <div className="w-4/5 h-1 bg-indigo-400/80 rounded-full" />
              <div className="w-3/5 h-1 bg-purple-400/80 rounded-full" />
            </div>

            <p className="text-[8px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
              System: Awakening
            </p>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
          <span>Projects</span>
          <span className="px-1.5 py-0.2 rounded bg-cyan-50 dark:bg-slate-800 text-[10px] font-bold text-cyan-600 dark:text-cyan-300 border border-cyan-100 dark:border-slate-700">
            08
          </span>
        </div>
      </motion.div>

      {/* 3. Socials (Bottom Right) */}
      <div className="flex flex-col items-end">
        <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
          Connect via
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/v9d007"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="GitHub"
          >
            <Github size={14} />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="LinkedIn"
          >
            <Linkedin size={13} />
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="X (Twitter)"
          >
            <Twitter size={13} />
          </a>
        </div>
      </div>
    </aside>
  )
}

export default RightSidebarStacks