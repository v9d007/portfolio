import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Copy, Check, Send, Sparkles } from 'lucide-react'
import { playSound } from '../utils/audio'

interface ContactViewProps {
  soundEnabled: boolean
}

const ContactView = ({ soundEnabled }: ContactViewProps) => {
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')
  const [sentStatus, setSentStatus] = useState(false)

  const email = 'v9d200@gmail.com'

  const handleCopyEmail = () => {
    playSound('pop', soundEnabled)
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    playSound('chime', soundEnabled)
    setSentStatus(true)
    window.location.href = `mailto:${email}?subject=Portfolio%20Inquiry%20from%20v9d.is-a.dev&body=${encodeURIComponent(
      message
    )}`
    setTimeout(() => {
      setMessage('')
      setSentStatus(false)
    }, 3000)
  }

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 max-w-xl mx-auto select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="p-6 sm:p-8 rounded-3xl bg-[#FBFBF9] dark:bg-[#181D26] border border-slate-200/90 dark:border-white/10 shadow-xl text-[#151922] dark:text-[#ECEFF5]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-1 text-xs font-mono text-[#5A6272] dark:text-[#8E96A6] font-semibold">
              contact.sh // vinod@v9d
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Intro */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151922] dark:text-[#ECEFF5] mb-2 tracking-tight">
            Let's Build Together
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6272] dark:text-[#C5CBD8] leading-relaxed font-mono">
            Looking for a Senior Mobile &amp; iOS Systems Engineer who crafts 60 FPS architectures with Swift 6 and React Native? Send a transmission below.
          </p>
        </div>

        {/* One-Click Copy Email Card */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#12151B] border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#7C3AED] dark:text-[#A78BFA] shrink-0 border border-purple-200/60 dark:border-purple-800/40">
              <Mail size={16} />
            </div>
            <div className="truncate">
              <p className="text-[9px] font-mono text-[#5A6272] dark:text-[#8E96A6] uppercase tracking-wider font-semibold">
                Direct Transmission
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-[#151922] dark:text-[#ECEFF5] truncate">
                {email}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#09090B] text-white dark:bg-[#F1F3F8] dark:text-[#12151B] text-xs font-mono font-semibold transition-all hover:scale-105 active:scale-95 shrink-0 shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Message Dispatch Box */}
        <form onSubmit={handleSendMessage} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-[#5A6272] dark:text-[#8E96A6] uppercase tracking-wider mb-1.5 font-semibold">
              // Message Buffer
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Vinod, let's connect regarding an iOS architecture role / consulting project..."
              className="w-full p-3 rounded-2xl bg-white dark:bg-[#12151B] border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-mono text-[#151922] dark:text-[#ECEFF5] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-[#7C3AED] dark:focus:border-[#A78BFA] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sentStatus || !message.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {sentStatus ? (
              <>
                <Sparkles size={14} className="animate-spin" />
                <span>Transmission Queued in Mail Client...</span>
              </>
            ) : (
              <>
                <Send size={13} />
                <span>Transmit Transmission</span>
              </>
            )}
          </button>
        </form>

        {/* Social Links Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#5A6272] dark:text-[#8E96A6]">
          <span>Coordinates: Bengaluru, IN (IST)</span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/v9d007"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#7C3AED] dark:hover:text-[#A78BFA] transition-colors"
            >
              <Linkedin size={15} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactView
