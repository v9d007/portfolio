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
        className="p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#161B22] border-2 border-slate-200/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_18px_36px_-6px_rgba(0,0,0,0.06)] text-[#09090B] dark:text-[#F8FAFC]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-200/90 dark:border-white/10 pb-3.5 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 text-xs font-mono text-[#0F172A] dark:text-[#CBD5E1] font-bold">
              contact.sh // vinod@v9d
            </span>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Intro */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] dark:text-[#F8FAFC] mb-2 tracking-tight">
            Let's Build Together
          </h2>
          <p className="text-xs sm:text-sm text-[#1E293B] dark:text-[#E2E8F0] leading-relaxed font-mono font-medium">
            Looking for a Senior Mobile &amp; iOS Systems Engineer who crafts 60 FPS architectures with Swift 6 and React Native? Send a transmission below.
          </p>
        </div>

        {/* One-Click Copy Email Card */}
        <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1117] border border-slate-300/80 dark:border-white/15 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] text-white shrink-0 shadow-md shadow-purple-500/20">
              <Mail size={18} />
            </div>
            <div className="truncate">
              <p className="text-[10px] font-mono text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider font-bold">
                Direct Transmission
              </p>
              <p className="text-xs sm:text-sm font-mono font-extrabold text-[#09090B] dark:text-[#F8FAFC] truncate">
                {email}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#09090B] text-white hover:bg-[#1E1E24] dark:bg-[#F8FAFC] dark:text-[#09090B] dark:hover:bg-white text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 shrink-0 shadow-md cursor-pointer border border-white/10 dark:border-black/10"
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
            <label className="block text-xs font-mono text-[#09090B] dark:text-[#E2E8F0] uppercase tracking-wider mb-2 font-bold">
              // Message Buffer
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Vinod, let's connect regarding an iOS architecture role / consulting project..."
              className="w-full p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0D1117] border-2 border-slate-200 dark:border-white/15 text-xs sm:text-sm font-mono text-[#09090B] dark:text-[#F8FAFC] placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6D28D9] dark:focus:border-[#A78BFA] transition-colors resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={sentStatus || !message.trim()}
            className="w-full py-3 px-4 rounded-xl bg-[#09090B] hover:bg-[#1E1E24] text-white dark:bg-[#F8FAFC] dark:text-[#09090B] dark:hover:bg-white font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/15 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer border border-white/10 dark:border-black/10"
          >
            {sentStatus ? (
              <>
                <Sparkles size={14} className="animate-spin text-purple-400" />
                <span>Transmission Queued in Mail Client...</span>
              </>
            ) : (
              <>
                <Send size={13} className="text-[#A78BFA] dark:text-[#6D28D9]" />
                <span>Transmit Transmission</span>
              </>
            )}
          </button>
        </form>

        {/* Social Links Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200/90 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#1E293B] dark:text-[#CBD5E1] font-semibold">
          <span>Coordinates: Bengaluru, IN (IST)</span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/v9d007"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-[#09090B] dark:text-[#F8FAFC] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-[#09090B] dark:text-[#F8FAFC] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactView
