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
      'Secured All India Rank (AIR) 110 in JEE Advanced out of 200,000+ nationwide aspirants (top 0.05% percentile).',
      'Strong coursework: Advanced Data Structures, Algorithms, Computer Systems, Microprocessors.',
      'Active participant in algorithmic programming contests and competitive problem solving.'
    ],
    skills: ['Algorithms', 'Data Structures', 'C++', 'System Design', 'Mathematics']
  }
]

const ExperienceView = ({ soundEnabled }: ExperienceViewProps) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center px-4 sm:px-8 py-16 overflow-y-auto no-scrollbar select-none">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-2">
            POSTAL ARCHIVE // CAREER CHRONOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Work Experience &amp; Education
          </h2>
        </div>

        {/* Experience Stamp Cards Grid */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => playSound('hover', soundEnabled)}
              className="relative p-5 sm:p-7 rounded-2xl bg-[#0e101a]/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all hover:border-indigo-500/40"
            >
              {/* Top Washi Tape */}
              <div
                className="washi-tape -top-2.5 left-8 w-20 bg-amber-100/40 rotate-[-1deg]"
                title="Washi Tape"
              />

              {/* Stamp ID Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold">
                    POSTMARK: {exp.stampId}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                    {exp.type}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{exp.period}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              {/* Title & Company */}
              <div className="mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  {exp.id.includes('iit') ? (
                    <GraduationCap className="text-amber-400 shrink-0" size={20} />
                  ) : (
                    <Briefcase className="text-indigo-400 shrink-0" size={20} />
                  )}
                  <span>{exp.role}</span>
                </h3>
                <p className="text-sm font-semibold text-indigo-300 font-mono mt-0.5">
                  {exp.company}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Key Achievements Bullet points */}
              <div className="space-y-2 mb-5">
                {exp.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Skills Footer */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                {exp.skills.map((sk) => (
                  <span
                    key={sk}
                    className="text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExperienceView