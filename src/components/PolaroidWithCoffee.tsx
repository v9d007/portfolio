import { motion } from 'framer-motion'
import { playSound } from '../utils/audio'

interface PolaroidWithCoffeeProps {
  soundEnabled: boolean
}

const PolaroidWithCoffee = ({ soundEnabled }: PolaroidWithCoffeeProps) => {
  return (
    <div className="absolute top-16 sm:top-20 left-6 sm:left-14 z-20 flex flex-col items-center select-none">
      {/* Polaroid Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: -3.5 }}
        whileHover={{
          scale: 1.05,
          rotate: 0,
          y: -4,
          transition: { type: 'spring', stiffness: 300, damping: 15 }
        }}
        onClick={() => playSound('pop', soundEnabled)}
        className="relative cursor-pointer group"
      >
        {/* Top-Left Blue Crossed Washi Tape */}
        <div className="absolute -top-3 -left-3 w-10 h-4 bg-sky-200/80 rotate-[-25deg] shadow-sm z-30 border-l border-r border-dashed border-sky-400/50" />
        <div className="absolute -top-3 -left-3 w-4 h-10 bg-sky-200/80 rotate-[-25deg] shadow-sm z-30 border-t border-b border-dashed border-sky-400/50" />

        {/* Top-Right Blue Crossed Washi Tape */}
        <div className="absolute -top-3 -right-3 w-10 h-4 bg-sky-200/80 rotate-[25deg] shadow-sm z-30 border-l border-r border-dashed border-sky-400/50" />
        <div className="absolute -top-3 -right-3 w-4 h-10 bg-sky-200/80 rotate-[25deg] shadow-sm z-30 border-t border-b border-dashed border-sky-400/50" />

        {/* White Polaroid Paper Frame */}
        <div className="bg-[#fcfbf9] text-slate-800 p-2 pb-4 rounded-[3px] shadow-xl border border-black/5 w-24 sm:w-28 transition-shadow group-hover:shadow-2xl">
          {/* Photo Window */}
          <div className="relative aspect-square w-full overflow-hidden bg-slate-100 rounded-[2px] shadow-inner">
            <img
              src="./avatar.png"
              alt="Vinod"
              draggable={false}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement
                target.src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
              }}
            />
          </div>

          {/* Handwritten Caption */}
          <p
            className="text-center text-xs font-semibold text-slate-700 mt-2"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Vinod
          </p>
        </div>
      </motion.div>

      {/* Steaming Coffee Cup below the Polaroid (exact match to yl0.me) */}
      <div className="mt-4 flex flex-col items-center">
        {/* Animated Rising Steam */}
        <motion.div
          animate={{ y: [0, -4, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="flex gap-1 mb-1"
        >
          <svg className="w-4 h-3 stroke-slate-400 fill-none" viewBox="0 0 20 16">
            <path d="M5,14 Q3,8 7,2" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10,14 Q8,8 12,2" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15,14 Q13,8 17,2" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Coffee Mug Icon */}
        <div className="relative w-6 h-5 rounded-b-md bg-[#151922] dark:bg-slate-700 shadow-sm flex items-center justify-center">
          {/* Mug Handle */}
          <div className="absolute -right-2 top-0.5 w-2.5 h-3 border-2 border-[#151922] dark:border-slate-700 rounded-r-md" />
        </div>
      </div>
    </div>
  )
}

export default PolaroidWithCoffee