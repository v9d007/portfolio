import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'

interface PolaroidCardProps {
  soundEnabled: boolean
}

const PolaroidCard = ({ soundEnabled }: PolaroidCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: -3.4 }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 40,
        transition: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => playSound('pop', soundEnabled)}
      onMouseEnter={() => playSound('hover', soundEnabled)}
      className="relative cursor-pointer select-none group"
      style={{ transformOrigin: 'top center' }}
    >
      {/* Top Left Washi Tape */}
      <div
        className="washi-tape -top-2.5 -left-3 w-14 rotate-[-22deg] bg-amber-100/60 shadow-sm border-dashed border-amber-300/40"
        title="Washi Tape"
      />

      {/* Top Right Washi Tape */}
      <div
        className="washi-tape -top-2.5 -right-3 w-14 rotate-[18deg] bg-cyan-100/60 shadow-sm border-dashed border-cyan-300/40"
        title="Washi Tape"
      />

      {/* Polaroid Physical Paper Frame */}
      <div className="bg-[#fcfaf7] dark:bg-[#f5f0e8] text-slate-900 p-2 sm:p-2.5 pb-4 sm:pb-5 rounded-[4px] shadow-2xl shadow-black/50 border border-black/10 w-28 sm:w-36 transition-shadow group-hover:shadow-indigo-500/20">
        {/* Photo Container */}
        <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-slate-900 rounded-[2px] shadow-inner">
          <img
            src="./avatar.png"
            alt="Vinod Kumar Singh"
            draggable={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback placeholder if image load fails
              const target = e.currentTarget as HTMLImageElement
              target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
            }}
          />
          {/* Subtle glossy photo glare overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Polaroid Handwritten Caption */}
        <div className="mt-2 text-center">
          <p
            className="text-[11px] sm:text-xs font-semibold text-slate-800 tracking-tight leading-tight"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Vinod Kumar Singh
          </p>
          <p className="text-[8px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
            Senior iOS • IITK '19
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PolaroidCard