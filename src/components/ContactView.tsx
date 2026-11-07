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
        className="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-[#0c0e18]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-1 text-xs font-mono text-slate-500 dark:text-gray-400 font-semibold">
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Let's Build Together
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-mono">
            Looking for a Senior Mobile &amp; iOS Systems Engineer who crafts 60 FPS architectures with Swift 6 and React Native? Send a transmission below.
          </p>
        </div>

        {/* One-Click Copy Email Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Mail size={16} />
            </div>
            <div className="truncate">
              <p className="text-[9px] font-mono text-slate-400 dark:text-gray-400 uppercase tracking-wider">
                Direct Transmission
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white truncate">
                {email}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-mono font-medium transition-all hover:scale-105 active:scale-95 shrink-0 shadow-sm"
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

        {/* Instant Message Composer */}
        <form onSubmit={handleSendMessage} className="space-y-3 mb-6">
          <div>
            <label className="block text-[11px] font-mono text-slate-500 dark:text-gray-400 uppercase mb-1">
              Draft Quick Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hey Vinod, saw your portfolio. Let's discuss a mobile engineering opportunity..."
              className="w-full p-3 rounded-2xl bg-slate-50/80 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sentStatus || !message.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-all shadow-lg shadow-indigo-600/25"
          >
            {sentStatus ? (
              <>
                <Sparkles size={14} className="animate-spin" />
                <span>Opening Mail Client...</span>
              </>
            ) : (
              <>
                <Send size={13} />
                <span>Send Transmission</span>
              </>
            )}
          </button>
        </form>

        {/* Social Footnotes */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-gray-400">
          <span>Connect via web:</span>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/v9d007"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 transition-colors"
              title="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 transition-colors"
              title="LinkedIn"
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