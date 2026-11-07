import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { playSound } from '../utils/audio'

interface ExperienceViewProps {
  soundEnabled: boolean
}

const experiences = [
  {
    id: 'xoxoday-giift',
    role: 'Senior Mobile & iOS Developer',
    company: 'Xoxoday (Giift)',
    location: 'Bengaluru, India',
    period: '2021 - Present',
    stampId: 'EXP-BLR-01',
    type: 'Full-Time',
    description:
      'Leading core mobile client architecture for enterprise incentive automation (Compass) and global employee social engagement (Empuls).',
    achievements: [
      'Architected offline-first sync engine in Swift & CoreData, handling over 10M+ transaction updates with zero corruption.',
      'Reduced memory footprint by 35% in high-volume social feed views using custom virtualized cell caching in UIKit and SwiftUI.',
      'Engineered bi-directional GraphQL real-time event pipeline for enterprise leaderboards and peer recognition.',
      'Mentored mobile engineering squad and instituted strict code quality, CI/CD pipelines via Fastlane and GitHub Actions.'
    ],
    skills: ['Swift 6', 'UIKit', 'SwiftUI', 'React Native', 'GraphQL', 'CoreData', 'CI/CD']
  },
  {
    id: 'iit-kanpur',
    role: 'B.Tech in Electrical Engineering',
    company: 'Indian Institute of Technology, Kanpur (IITK)',
    location: 'Kanpur, India',
    period: '2015 - 2019',
    stampId: 'IITK-EE-19',
    type: 'Alma Mater',
    description:
      'Grounded in rigorous algorithmic fundamentals, digital signal processing, systems architecture, and competitive programming.',
    achievements: [
      'Graduated with strong foundations in Computer Systems, Discrete Mathematics, and Algorithmic Complexity.',
      'Strong coursework: Advanced Data Structures, Algorithms, Computer Systems, Microprocessors.',
      'Active participant in algorithmic programming contests and competitive problem solving.'
    ],
    skills: ['Algorithms', 'Data Structures', 'C++', 'System Design', 'Mathematics']
  }
]

const ExperienceView = ({ soundEnabled }: ExperienceViewProps) => {
  return (
    <section
      id="experience"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto select-none"
    >
      {/* Section Header with Scroll Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 mb-3 font-semibold">
          // 02. CAREER SCALE & ALUMNI
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Work Experience &amp; Education
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-mono">
          Engineering high-scale mobile platforms serving millions of enterprise users worldwide.
        </p>
      </motion.div>

      {/* Experience Timeline Cards */}
      <div className="space-y-8 sm:space-y-10">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 15 } }}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            className="relative p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#0e101a]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:shadow-2xl hover:border-indigo-500/40 transition-all"
          >
            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3.5 mb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                  RECORD // {exp.stampId}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-semibold">
                  {exp.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            {/* Title & Organization */}
            <div className="mb-3.5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                {exp.id.includes('iit') ? (
                  <GraduationCap className="text-amber-500 shrink-0" size={22} />
                ) : (
                  <Briefcase className="text-indigo-600 dark:text-indigo-400 shrink-0" size={22} />
                )}
                <span>{exp.role}</span>
              </h3>
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-mono mt-1">
                {exp.company}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {exp.description}
            </p>

            {/* Key Achievements */}
            <div className="space-y-2.5 mb-6">
              {exp.achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </div>
              ))}
            </div>

            {/* Technology Footer Pills */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-2">
              {exp.skills.map((sk) => (
                <span
                  key={sk}
                  className="text-[10px] sm:text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-slate-700 dark:text-slate-300"
                >
                  {sk}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ExperienceView