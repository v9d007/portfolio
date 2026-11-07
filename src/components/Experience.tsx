import { motion } from 'framer-motion'
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      role: 'Mobile Developer (Cross-Platform & Native)',
      company: 'Xoxoday',
      companyUrl: 'https://www.xoxoday.com',
      period: "Jul '19 – Present",
      location: 'Bangalore, India',
      tag: 'React Native & iOS',
      description:
        'Led and contributed to the engineering of high-scale mobile applications using React Native and native iOS (Swift). Architected RESTful and GraphQL data flows, push notifications, deep linking, Redux stores, and automated EAS deployment pipelines for iOS App Store and Google Play Store.',
      achievements: [
        'Engineered responsive mobile frontends with React Native, Expo Go, and Redux Toolkit',
        'Implemented end-to-end push notification architectures and custom universal deep links',
        'Built multi-language internationalization (i18n) and multi-account enterprise authentication',
        'Automated app releases through Expo Application Services (EAS) CI/CD to App Store and Google Play'
      ],
      technologies: ['React Native', 'Expo Go', 'Redux', 'GraphQL', 'REST APIs', 'EAS Build', 'iOS', 'Android']
    },
    {
      role: 'iOS Developer (Compass Platform)',
      company: 'Xoxoday',
      companyUrl: 'https://www.xoxoday.com/compass',
      period: "Jul '19 – Present",
      location: 'Bangalore, India',
      tag: 'Native iOS / Swift',
      description:
        'Architected native iOS screens, auto-layout constraints, and fluid animations for the Compass incentive gamification platform using UIKit and Swift. Engineered robust networking with Alamofire, Grand Central Dispatch, and asynchronous image pipelines.',
      achievements: [
        'Created custom 60fps animations utilizing UIKit, UIBezierPath, and Swift animation curves',
        'Optimized background tasks and networking performance with Grand Central Dispatch (GCD)',
        'Integrated third-party SDKs including Kingfisher, Alamofire, GoogleTagManager, and Firebase',
        'Authored robust unit test suites utilizing XCTest to guarantee zero-regression releases'
      ],
      technologies: ['Swift', 'UIKit', 'Alamofire', 'Kingfisher', 'Firebase', 'GCD', 'XCTest', 'CocoaPods']
    },
    {
      role: 'iOS Developer (Empuls Platform)',
      company: 'Xoxoday',
      companyUrl: 'https://www.xoxoday.com/empuls',
      period: "Jul '19 – Present",
      location: 'Bangalore, India',
      tag: 'Native iOS / Swift',
      description:
        'Developed mobile features for the Empuls employee engagement and recognition platform using Swift, Xcode, Interface Builder, and Cocoa Touch. Focused on UI performance, feed responsiveness, and protocol-oriented architecture.',
      achievements: [
        'Built reusable, high-performance UI components using UITableView and UIScrollView',
        'Architected modular code patterns using Protocols, Delegates, Extensions, and Structs',
        'Collaborated closely with cross-functional design and product teams across release cycles'
      ],
      technologies: ['Swift', 'Xcode', 'Cocoa Touch', 'Protocols & Delegates', 'Memory Optimization', 'Git']
    }
  ]

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase size={13} />
            Professional Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Engineering <span className="gradient-text-aurora">Impact &amp; Experience</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delivering high-reliability mobile solutions, enterprise incentive engines, and engagement platforms.
          </p>
        </motion.div>

        {/* Timeline Stack */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Glowing Line */}
          <div className="hidden md:block absolute left-8 top-4 bottom-4 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 opacity-30"></div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative md:pl-20"
              >
                {/* Timeline Icon Node */}
                <div className="hidden md:flex absolute left-4 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[#07070b] border-2 border-indigo-500 items-center justify-center shadow-glow-indigo/50 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse"></div>
                </div>

                {/* Experience Card */}
                <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] hover:border-indigo-500/40 transition-all">
                  {/* Top Row: Role, Company, Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/[0.06] gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-white">
                          {exp.role}
                        </h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          @{exp.company}
                          <ExternalLink size={12} />
                        </a>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-gray-300 border border-white/[0.08]">
                        {exp.tag}
                      </span>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-1 text-xs text-gray-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-indigo-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-rose-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Key Achievements Checklist */}
                  <div className="mb-5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      Key Contributions &amp; Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-xs text-gray-300 flex items-start gap-2.5 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                    {exp.technologies.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-2.5 py-0.5 bg-white/[0.03] rounded-md text-[11px] font-mono text-gray-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
