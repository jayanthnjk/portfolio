import { AnimatedSection } from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const tabs = [
  { id: 'about', label: 'About', icon: '📋' },
  { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  { id: 'implementation', label: 'Tools & Stack', icon: '⚙️' },
  { id: 'snapshots', label: 'Snapshots', icon: '📸' },
];

const smooth = [0.16, 1, 0.3, 1] as const;

function TabContent({ id }: { id: string }) {
  if (id === 'about') return (
    <div className="space-y-4">
      <p className="text-sm text-gray-300 leading-relaxed">
        A shift management and duty roster platform for the Karnataka State Police CAR (City Armed Reserve) unit. Manages 572 personnel across three operational sections, with intelligent scheduling, AI-powered conversational assistance, and role-based access control.
      </p>
      <p className="text-sm text-gray-400 leading-relaxed">
        Covers rotational platoon duties across 5 platoons on 15-day cycles, guard duty for 22 locations, VIP escort assignments, Form 168 daily tracking, and leave management — all with real-time dashboards and audit trails.
      </p>
    </div>
  );
  if (id === 'architecture') return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {['React + TS UI', '→', 'REST API', '→', 'Spring Boot Services', '→', 'PostgreSQL'].map((x, i) => (
          x === '→'
            ? <span key={i} className="text-sm" style={{ color: '#FFC107' }}>→</span>
            : <span key={i} className="px-3 py-1.5 rounded-lg text-xs text-white font-medium" style={{ background: 'rgba(0,0,128,0.25)', border: '1px solid rgba(0,0,128,0.4)' }}>{x}</span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {['Groq Cloud', '→', 'LLaMA 3', '→', 'Intent Engine', '→', 'Action Execution'].map((x, i) => (
          x === '→'
            ? <span key={i} className="text-sm" style={{ color: '#FFC107' }}>→</span>
            : <span key={i} className="px-3 py-1.5 rounded-lg text-xs text-white font-medium" style={{ background: 'rgba(0,0,128,0.25)', border: '1px solid rgba(0,0,128,0.4)' }}>{x}</span>
        ))}
      </div>
      <p className="text-[11px] text-gray-500">Microservices on AWS with CI/CD via GitHub Actions. Mocked API layer for demo with LocalStorage persistence.</p>
    </div>
  );
  if (id === 'implementation') return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {[
        { cat: 'Frontend', tools: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query'], color: '#000080', icon: '⚛️' },
        { cat: 'Backend', tools: ['Java 17', 'Spring Boot 3', 'Spring Security', 'JPA/Hibernate'], color: '#2D5A27', icon: '☕' },
        { cat: 'Database', tools: ['PostgreSQL 15', 'Redis Cache', 'Flyway'], color: '#6b5c42', icon: '🗄️' },
        { cat: 'Cloud', tools: ['AWS ECS', 'S3', 'CloudFront', 'RDS', 'GitHub Actions'], color: '#FFC107', icon: '☁️' },
        { cat: 'AI / ML', tools: ['Groq Cloud', 'LLaMA 3', 'Streaming', 'Intent Recognition'], color: '#ba1a1a', icon: '🤖' },
      ].map((r) => (
        <div key={r.cat} className="rounded-xl p-3.5 relative overflow-hidden" style={{ background: `${r.color}0a`, border: `1px solid ${r.color}20` }}>
          <div className="absolute top-0 left-0 w-[3px] h-full rounded-full" style={{ background: r.color }} />
          <div className="flex items-center gap-2 mb-2 pl-2">
            <span className="text-sm">{r.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">{r.cat}</span>
          </div>
          <div className="flex flex-wrap gap-1 pl-2">
            {r.tools.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md text-[10px] text-gray-300 bg-white/[0.05]">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  if (id === 'snapshots') return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { src: '/workboard/1.png', label: 'Dashboard' },
        { src: '/workboard/2.png', label: 'Duty Roster' },
        { src: '/workboard/3.png', label: 'AI Assistant' },
        { src: '/workboard/4.png', label: 'Schedule View', overlay: true },
      ].map((s) => (
        <div key={s.src} className="relative rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,0,128,0.2)' }}>
          <img src={s.src} alt={s.label} className="w-full aspect-video object-cover object-top" loading="lazy" />
          {s.overlay && (
            <div className="absolute inset-0 bg-dark-900/50 flex items-center justify-center cursor-pointer hover:bg-dark-900/40 transition-colors">
              <span className="text-xs font-semibold text-white tracking-wide">View More →</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  return null;
}

export function SkillsSection() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [expanded]);

  return (
    <section id="skills" className="py-16 sm:py-28 px-5 sm:px-6 bg-dark-900 relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-coral-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-150px] left-[-80px] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[44px] font-bold text-white">
              Solutions Built for Impact, Speed, and Reliability
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={0.15}>
          <div ref={cardRef} className="relative">
          {/* Blur overlay with lock */}
          <div className="absolute inset-0 z-20 backdrop-blur-[6px] bg-dark-900/40 rounded-[20px] flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-dark-800/80 border border-white/10 flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <p className="text-white text-sm font-bold font-heading">Section Locked</p>
          </div>
          {/* === PROJECT CARD === */}
          <motion.div
            className="relative rounded-[20px] overflow-hidden cursor-pointer group"
            onClick={() => setExpanded(!expanded)}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-[20px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, rgba(0,0,128,0.5), rgba(107,92,66,0.3), rgba(255,193,7,0.4))' }}>
              <div className="w-full h-full rounded-[20px] bg-[#1e1e38]" />
            </div>

            <div className="relative">
              {/* Top accent gradient bar */}
              <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #00003c, #000080, #FFC107)' }} />

              <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                {/* Left: icon + status */}
                <div className="flex sm:flex-col items-center gap-3 sm:gap-1 shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(0,0,128,0.2), rgba(255,193,7,0.1))' }}>
                    <span className="text-xl">🛡️</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">In Dev</span>
                  </div>
                </div>

                {/* Middle: Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-tight">
                    Karnataka State Police Workboard
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Shift management and duty roster platform for the CAR unit with AI-powered scheduling.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'AWS', 'Groq + LLaMA'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[9px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.06]">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right: expand arrow */}
                <motion.div
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 group-hover:text-coral-500 group-hover:border-coral-500/20 transition-colors shrink-0"
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: smooth }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* === EXPANDABLE DETAIL PANEL === */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="mt-2 rounded-[20px] overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(160deg, #1e1e38 0%, #181830 100%)' }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: smooth }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Side nav */}
                  <nav className="md:w-48 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.04] p-3 md:py-5 md:px-3">
                    <div className="flex md:flex-col gap-0.5 overflow-x-auto md:overflow-visible">
                      {tabs.map((tab) => {
                        const active = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={(e) => { e.stopPropagation(); setActiveTab(tab.id); }}
                            className={`relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 w-full text-left ${
                              active ? 'text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                            }`}
                          >
                            {active && (
                              <motion.div
                                className="absolute inset-0 rounded-xl bg-coral-500/[0.08] border border-coral-500/[0.15]"
                                layoutId="tabBg"
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                              />
                            )}
                            <span className="relative text-sm">{tab.icon}</span>
                            <span className="relative">{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: smooth }}
                      >
                        <TabContent id={activeTab} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
