import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import type { NavTab } from './Notch'

interface TerminalIntroProps {
  onNavigate: (tab: NavTab) => void
  soundEnabled: boolean
}

const TerminalIntro = ({ onNavigate, soundEnabled }: TerminalIntroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="absolute left-4 sm:left-8 bottom-4 sm:bottom-8 z-30 max-w-sm sm:max-w-md w-[calc(100vw-32px)] sm:w-auto select-none pointer-events-auto"
    >
      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#090b14]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 font-mono text-xs text-slate-300">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="ml-1 text-[11px] text-gray-400 font-semibold">vinod@iitk:~</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold">
            <MapPin size={10} />
            <span>Bengaluru, IN</span>
          </div>
        </div>

        {/* Bio Content */}
        <div className="space-y-2 leading-relaxed text-[11px] sm:text-xs">
          <p>
            Hey there, I'm{' '}
            <span className="text-white font-bold bg-indigo-500/20 px-1 py-0.5 rounded border border-indigo-500/30">
              Vinod Kumar Singh
            </span>
            !
          </p>
          <p className="text-gray-300">
            Senior Mobile &amp; iOS Systems Engineer. Graduate of{' '}
            <span className="text-amber-300 font-semibold">IIT Kanpur</span> (EE '19).
          </p>
          <p className="text-gray-400">
            Specializing in Swift 6 strict concurrency, fluid 60 FPS architectures, and high-scale enterprise mobile apps at{' '}
            <span className="text-cyan-300 font-medium">Xoxoday (Giift)</span>.
          </p>
        </div>

        {/* Quick Nav Action Pills */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              playSound('click', soundEnabled)
              onNavigate('projects')
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 transition-colors text-[10px] sm:text-[11px]"
          >
            <Sparkles size={11} className="text-indigo-400" />
            <span>Project Roll</span>
            <ArrowRight size={10} />
          </button>

          <button
            onClick={() => {
              playSound('click', soundEnabled)
              onNavigate('experience')
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors text-[10px] sm:text-[11px]"
          >
            <span>Experience</span>
          </button>

          <button
            onClick={() => {
              playSound('click', soundEnabled)
              onNavigate('contact')
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors text-[10px] sm:text-[11px]"
          >
            <span>Contact</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default TerminalIntro