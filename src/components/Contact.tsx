import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  MessageSquare,
  Clock
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('v9d200@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate reliable dispatch
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Direct mailto fallback trigger as backup
    const mailtoLink = `mailto:v9d200@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`

    window.open(mailtoLink, '_blank')

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactChannels = [
    {
      icon: Mail,
      title: 'Email Address',
      value: 'v9d200@gmail.com',
      action: 'Click to copy',
      onClick: handleCopyEmail,
      isCopied: copiedEmail
    },
    {
      icon: Phone,
      title: 'Direct Phone',
      value: '+91 7054117364',
      action: 'Direct Call',
      href: 'tel:+917054117364'
    },
    {
      icon: MapPin,
      title: 'Base Location',
      value: 'Bangalore, India',
      action: 'Active (IST UTC+5:30)',
      href: null
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      handle: 'v9d007',
      url: 'https://github.com/v9d007',
      icon: Github,
      color: 'hover:text-white hover:border-white/30'
    },
    {
      name: 'LinkedIn',
      handle: 'vinod-kumar-singh200',
      url: 'https://www.linkedin.com/in/vinod-kumar-singh200',
      icon: Linkedin,
      color: 'hover:text-blue-400 hover:border-blue-500/30'
    }
  ]

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquare size={13} />
            Let's Collaborate
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Start a <span className="gradient-text-aurora">Conversation</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Interested in discussing mobile engineering roles, architectural consultations, or high-impact projects? Let's talk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Quick Status Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Available Immediately
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Currently open to full-time Senior Mobile Engineer, iOS Lead, and Systems Architect roles in Bangalore or remote worldwide.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Clock size={13} className="text-indigo-400" />
                <span>Typical response time: &lt; 24 hours</span>
              </div>
            </div>

            {/* Contact Channels */}
            {contactChannels.map((channel, idx) => (
              <div
                key={idx}
                onClick={channel.onClick}
                className={`glass-card rounded-2xl p-4 sm:p-5 border border-white/[0.08] hover:border-indigo-500/40 transition-all flex items-center justify-between group ${
                  channel.onClick ? 'cursor-pointer' : ''
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <channel.icon size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-gray-400">
                      {channel.title}
                    </div>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-white">
                        {channel.value}
                      </div>
                    )}
                  </div>
                </div>

                {channel.onClick ? (
                  <button
                    onClick={channel.onClick}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 transition-colors border border-white/[0.06]"
                    aria-label="Copy email"
                  >
                    {channel.isCopied ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                ) : null}
              </div>
            ))}

            {/* Social Links Bar */}
            <div className="glass-panel rounded-2xl p-4 border border-white/[0.08]">
              <div className="text-xs font-mono text-gray-400 mb-3">
                Professional Profiles
              </div>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-semibold text-gray-300 transition-all ${s.color}`}
                  >
                    <s.icon size={15} />
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-white/[0.08] relative"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Send Direct Message
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Fill in the form below to initiate a discussion or send a project brief.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-gray-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-gray-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-gray-400 mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Mobile Engineering Role / Consultation"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-gray-400 mb-1.5">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Share details about the role, project requirements, or opportunity..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>

              {isSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-medium">
                  Thank you! Your email client has been prepared. I look forward to connecting with you shortly.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
