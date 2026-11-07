import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'
import { Github, Linkedin, Twitter, Briefcase, FolderGit2 } from 'lucide-react'
import type { NavTab } from './Notch'

interface RightSidebarStacksProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const RightSidebarStacks = ({ onNavigate, soundEnabled }: RightSidebarStacksProps) => {
  return (
    <aside className="absolute right-6 sm:right-12 top-20 bottom-10 z-20 flex flex-col justify-between items-end select-none pointer-events-auto">
      {/* 1. Experiences Stamp Stack (Top Right) */}
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
        {/* Layered Physical Stamps */}
        <div className="relative w-20 h-24 sm:w-24 sm:h-28">
          {/* Background Stamp 3 */}
          <div className="absolute inset-0 translate-x-2.5 -translate-y-1.5 rotate-6 rounded bg-[#e5e7eb] dark:bg-slate-800 border border-slate-300 dark:border-slate-700 opacity-60 shadow-sm" />
          {/* Background Stamp 2 */}
          <div className="absolute inset-0 translate-x-1.5 -translate-y-0.5 rotate-3 rounded bg-[#f3f4f6] dark:bg-slate-800 border border-slate-300 dark:border-slate-700 opacity-80 shadow-sm" />

          {/* Front Postage Stamp */}
          <div className="relative w-full h-full p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col items-center justify-between text-center transition-shadow group-hover:shadow-xl">
            {/* Stamp Perforated Top Edge Indicator */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-0.5 flex items-center justify-center text-white shadow-sm mt-1">
              <Briefcase size={14} />
            </div>

            <div className="my-1">
              <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                Xoxoday
              </p>
              <p className="text-[9px] font-mono text-slate-500 dark:text-slate-400">
                2021 - Now
              </p>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
          <span>Experiences</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
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
        {/* Layered Card Fan */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          {/* Back Card 2 */}
          <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-8 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 opacity-60 shadow-sm" />
          {/* Back Card 1 */}
          <div className="absolute inset-0 translate-x-1 -translate-y-1 rotate-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 opacity-80 shadow-sm" />

          {/* Front Card */}
          <div className="relative w-full h-full p-2.5 rounded-xl bg-[#0e1017] border border-slate-800 shadow-md flex flex-col justify-between text-white transition-shadow group-hover:shadow-xl">
            <div className="flex items-center justify-between text-cyan-400">
              <FolderGit2 size={14} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            {/* Mini Chart Lines */}
            <div className="space-y-1">
              <div className="w-full h-1 bg-cyan-500/40 rounded-full" />
              <div className="w-3/4 h-1 bg-indigo-500/40 rounded-full" />
              <div className="w-1/2 h-1 bg-purple-500/40 rounded-full" />
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
          <span>Projects</span>
          <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            08
          </span>
        </div>
      </motion.div>

      {/* 3. Socials (Bottom Right) */}
      <div className="flex flex-col items-end">
        <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
          Find me via
        </p>
        <div className="flex items-center gap-2">
          {/* GitHub */}
          <a
            href="https://github.com/v9d007"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#151922] dark:bg-white text-white dark:text-[#151922] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="GitHub"
          >
            <Github size={15} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#151922] dark:bg-white text-white dark:text-[#151922] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="LinkedIn"
          >
            <Linkedin size={14} />
          </a>

          {/* X / Twitter */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 rounded-full bg-[#151922] dark:bg-white text-white dark:text-[#151922] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
            title="X (Twitter)"
          >
            <Twitter size={14} />
          </a>
        </div>
      </div>
    </aside>
  )
}

export default RightSidebarStacks