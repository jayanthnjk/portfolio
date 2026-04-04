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
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(255,107,74,0.05), transparent 70%)', top: '-10%', right: '-5%' }}
        animate={inView ? { x: [0, 30, 0], y: [0, -20, 0] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.04), transparent 70%)', bottom: '-5%', left: '-5%' }}
        animate={inView ? { x: [0, -20, 0], y: [0, 25, 0] } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Headline */}
          <div>
            <motion.h2
              className="font-heading text-4xl sm:text-5xl lg:text-[58px] font-bold text-dark-900 leading-[1.1] mb-6"
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
