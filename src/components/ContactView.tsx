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
    // Construct mailto link
    window.location.href = `mailto:${email}?subject=Portfolio%20Inquiry%20from%20v9d.is-a.dev&body=${encodeURIComponent(
      message
    )}`
    setTimeout(() => {
      setMessage('')
      setSentStatus(false)
    }, 3000)
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center px-4 sm:px-8 py-16 overflow-y-auto no-scrollbar select-none">
      <div className="max-w-xl mx-auto w-full">
        {/* Washi Tape at Top */}
        <div className="relative">
          <div
            className="washi-tape -top-3 left-1/2 -translate-x-1/2 w-24 bg-cyan-100/50 rotate-[-1deg]"
            title="Washi Tape"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-8 rounded-2xl bg-[#0c0e18]/95 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span className="ml-1 text-xs font-mono text-gray-400 font-semibold">
                  contact.sh // vinod@v9d
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                AVAILABLE FOR HIRE
              </span>
            </div>

            {/* Introduction */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Let's Build Something Great
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-mono">
                Looking for a Senior Mobile &amp; iOS Systems Engineer who crafts 60 FPS architectures with Swift 6 and React Native? Send a transmission below.
              </p>
            </div>

            {/* One-Click Copy Email Card */}
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 shrink-0">
                  <Mail size={16} />
                </div>
                <div className="truncate">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Direct Email
                  </p>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-white truncate">
                    {email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Instant Message Composer */}
            <form onSubmit={handleSendMessage} className="space-y-3 mb-6">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                  Draft Quick Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey Vinod, saw your portfolio. Let's discuss an iOS / Mobile engineering opportunity..."
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sentStatus || !message.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-all shadow-lg shadow-indigo-600/30"
              >
                {sentStatus ? (
                  <>
                    <Sparkles size={14} className="animate-spin" />
                    <span>Opening Mail Client...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Transmission</span>
                  </>
                )}
              </button>
            </form>

            {/* Social Footnotes */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Connect on web:</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/v9d007"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github size={15} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactView