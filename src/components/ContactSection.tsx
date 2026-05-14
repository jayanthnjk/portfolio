import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { validateEmail } from '../utils/validation';
import { useRef, useState, useEffect } from 'react';

const smooth = [0.16, 1, 0.3, 1] as const;

const intentOptions = [
  { value: 'freelance', label: 'Freelance' },
  { value: 'remote', label: 'Remote Work' },
  { value: 'fulltime', label: 'Full-Time' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'general', label: 'Just Connect' },
];

export default function ContactSection() {
  const { formData, errors, handleChange, handleSubmit, isSubmitted, isSending } = useContactForm();
  const isFormComplete = validateEmail(formData.email) && formData.intent !== '';
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = intentOptions.find(o => o.value === formData.intent)?.label;

  return (
    <section ref={ref} id="contact" className="relative bg-gray-50 overflow-hidden">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px] max-w-[100vw]"
        style={{ background: 'radial-gradient(circle, rgba(255,107,74,0.05), transparent 70%)', top: '-10%', right: '-5%' }}
        animate={inView ? { x: [0, 30, 0], y: [0, -20, 0] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] max-w-[100vw]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.04), transparent 70%)', bottom: '-5%', left: '-5%' }}
        animate={inView ? { x: [0, -20, 0], y: [0, 25, 0] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Headline */}
          <div>
            <motion.h2
              className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold text-dark-900 leading-[1.1] mb-5"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: smooth }}
            >
              Let's create<br />
              something{' '}
              <span className="relative inline-block">
                <span className="relative z-10">together</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-3 rounded-full -z-0"
                  style={{ background: 'linear-gradient(90deg, #ff6b4a40, #ff6b4a20)' }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.6, ease: smooth }}
                />
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Whether it's a full-time role, freelance project, or just a conversation — I'd love to hear from you.
            </motion.p>
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
              style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-sm font-bold text-dark-900 uppercase tracking-widest">Open to Work</span>
            </motion.div>

            {/* Contact details */}
            <motion.div
              className="mt-6 space-y-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <a href="mailto:jayanthnjk1327@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-dark-900 transition-colors">
                <svg className="w-4 h-4 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <span className="text-sm">jayanthnjk1327@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-4 h-4 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                <span className="text-sm">Bengaluru, KA</span>
              </div>
              {/* GitHub & LinkedIn buttons in a single row */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://github.com/jayanthkumarnandimandalam" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-dark-900 border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-coral-300 hover:text-coral-600 transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
                <a href="http://www.linkedin.com/in/connect-jayanth" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-[#0A66C2] shadow-sm hover:shadow-md hover:bg-[#004182] transition-all duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Form card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: smooth }}
          >
            {/* Card with animated rotating gradient border */}
            <div className="relative rounded-[24px] p-[1.5px]">
              {/* Rotating gradient border */}
              <style>{`
                @keyframes borderSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              `}</style>
              <div className="absolute inset-[-2px] rounded-[25px] overflow-hidden">
                <div className="absolute inset-[-50%] animate-[borderSpin_6s_linear_infinite]"
                  style={{ background: 'conic-gradient(from 0deg, #ff6b4a, #3b82f6, #8b5cf6, #10b981, #ff6b4a)' }} />
              </div>
              {/* Card bg */}
              <div className="relative rounded-[23px]" style={{ background: 'linear-gradient(160deg, #232340, #1a1a2e)' }}>
                {/* Inner glow */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full blur-[80px]" style={{ background: 'rgba(255,107,74,0.06)' }} />
                <div className="absolute bottom-0 left-0 w-[150px] h-[150px] rounded-full blur-[60px]" style={{ background: 'rgba(59,130,246,0.04)' }} />

                <div className="relative p-7 sm:p-9">
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      <motion.div className="text-4xl mb-3" animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>🎉</motion.div>
                      <h3 className="text-lg font-bold font-heading text-white mb-1">You're all set!</h3>
                      <p className="text-sm text-gray-400">Email sent. Looking forward to connecting.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, ease: smooth }}
                      >
                        <label htmlFor="email" className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Your email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com"
                          className="w-full px-5 py-3.5 rounded-2xl text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:ring-2 focus:ring-coral-500/30"
                          style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${errors.email ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}` }} />
                        {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, ease: smooth }}
                      >
                        <label htmlFor="intent" className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Reaching out for</label>
                        <div ref={dropdownRef} className="relative">
                          <button
                            type="button"
                            id="intent"
                            onClick={() => setDropdownOpen(prev => !prev)}
                            className="w-full px-5 py-3.5 rounded-2xl text-sm text-left outline-none transition-all duration-300 flex items-center justify-between focus:ring-2 focus:ring-coral-500/30"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              border: `1px solid ${errors.intent ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                              color: selectedLabel ? '#fff' : 'rgb(75,85,99)',
                            }}
                          >
                            <span>{selectedLabel || 'Select intent...'}</span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                          </button>
                          <AnimatePresence>
                            {dropdownOpen && (
                              <motion.ul
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-50 mt-2 w-full rounded-xl overflow-hidden border border-white/10 shadow-xl"
                                style={{ background: '#1e1e38' }}
                                role="listbox"
                              >
                                {intentOptions.map(opt => (
                                  <li
                                    key={opt.value}
                                    role="option"
                                    aria-selected={formData.intent === opt.value}
                                    onClick={() => {
                                      handleChange({ target: { name: 'intent', value: opt.value } } as React.ChangeEvent<HTMLSelectElement>);
                                      setDropdownOpen(false);
                                    }}
                                    className={`px-5 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                                      formData.intent === opt.value
                                        ? 'bg-coral-500/20 text-coral-400'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                  >
                                    {opt.label}
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7, ease: smooth }}
                      >
                        <motion.button
                          type="submit"
                          disabled={!isFormComplete || isSending}
                          className="w-full relative overflow-hidden py-4 rounded-2xl text-sm font-bold text-white transition-all duration-300"
                          style={{
                            background: isFormComplete && !isSending ? 'linear-gradient(135deg, #ff6b4a, #e5502f)' : 'rgba(255,255,255,0.04)',
                            color: isFormComplete && !isSending ? '#fff' : 'rgba(255,255,255,0.2)',
                            cursor: isFormComplete && !isSending ? 'pointer' : 'not-allowed',
                            border: isFormComplete && !isSending ? 'none' : '1px solid rgba(255,255,255,0.06)',
                          }}
                          whileHover={isFormComplete && !isSending ? { scale: 1.015, boxShadow: '0 10px 35px rgba(255,107,74,0.3)' } : {}}
                          whileTap={isFormComplete && !isSending ? { scale: 0.985 } : {}}
                        >
                          {isFormComplete && !isSending && (
                            <motion.div
                              className="absolute inset-0"
                              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                            />
                          )}
                          <span className="relative z-10">{isSending ? 'Sending...' : "Let's Connect →"}</span>
                        </motion.button>
                      </motion.div>

                      {/* Contact info line */}
                      <div className="flex items-center justify-center gap-5 pt-3">
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
