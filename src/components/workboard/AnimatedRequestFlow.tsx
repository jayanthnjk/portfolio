import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { label: 'Officer', icon: 'mic', color: '#ff6b4a', payload: '"Who is on Guard-I duty today?"', detail: 'Voice command captured via Web Speech API and sent to backend with JWT bearer token.' },
  { label: 'Auth', icon: 'lock', color: '#3b82f6', payload: 'JWT: RSI, Section B', detail: 'Spring Security validates token signature, extracts userId, rank (RSI), and section assignment.' },
  { label: 'NLU', icon: 'brain', color: '#8b5cf6', payload: 'QUERY_DUTY { Guard-I, today }', detail: 'Local NLU engine detects "Guard-I" as duty type and "today" as date - no LLM call needed for entity extraction.' },
  { label: 'Sanitize', icon: 'shield', color: '#f59e0b', payload: 'No PII detected', detail: 'DataSanitizer scans for names and badge numbers to replace with tokens. This query has no PII - passed through clean.' },
  { label: 'Groq LLM', icon: 'ai', color: '#ef4444', payload: 'query_duty(Guard-I, 2026-04-15)', detail: 'Llama 3.3 70B on Groq selects the right tool and parameters. It only sees sanitized text - never real names or results.' },
  { label: 'RBAC', icon: 'check', color: '#3b82f6', payload: 'VIEWER+ OK, Section B OK', detail: 'Tool-level authorization: RBAC confirms rank allows query_duty, ABAC confirms section ownership matches.' },
  { label: 'Database', icon: 'db', color: '#10b981', payload: 'SELECT ... WHERE duty=Guard-I', detail: 'Parameterized query executed against PostgreSQL 16. No raw SQL anywhere - all queries go through Spring Data JPA.' },
  { label: 'Bypass', icon: 'skip', color: '#ef4444', payload: 'Results skip LLM entirely', detail: 'Query results are formatted by the backend and sent directly to the officer. The LLM never sees actual personnel data.' },
  { label: 'Audit', icon: 'log', color: '#8b5cf6', payload: 'QUERY, SUCCESS, logged', detail: 'Immutable audit entry: source=VOICE, action=query_duty, user=RSI-xxx, result=SUCCESS, timestamp recorded.' },
  { label: 'Response', icon: 'done', color: '#10b981', payload: '12 personnel on Guard-I', detail: 'Formatted response delivered to the officer with personnel list, duty details, and shift information.' },
];

function StepIcon({ icon, size = 16 }: { icon: string; size?: number }) {
  const s = size;
  const props = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (icon) {
    case 'mic': return <svg {...props}><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>;
    case 'lock': return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
    case 'brain': return <svg {...props}><path d="M9.5 2A2.5 2.5 0 0112 4.5V5a2.5 2.5 0 014.96.44A2.5 2.5 0 0119.5 10"/><path d="M14.5 22a2.5 2.5 0 01-2.5-2.5V19a2.5 2.5 0 01-4.96-.44A2.5 2.5 0 014.5 14"/><path d="M2 10h4"/><path d="M18 14h4"/></svg>;
    case 'shield': return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case 'ai': return <svg {...props}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h.01M18 12h.01"/><path d="M12 6v12"/></svg>;
    case 'check': return <svg {...props}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
    case 'db': return <svg {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
    case 'skip': return <svg {...props}><path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/></svg>;
    case 'log': return <svg {...props}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
    case 'done': return <svg {...props}><polyline points="20 6 9 17 4 12"/></svg>;
    default: return null;
  }
}

export default function AnimatedRequestFlow() {
  const [active, setActive] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);

  const play = useCallback(() => {
    setActive(-1);
    setDone(false);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (active >= STEPS.length - 1) { setPlaying(false); setDone(true); return; }
    const t = setTimeout(() => setActive(p => p + 1), active === -1 ? 500 : 900);
    return () => clearTimeout(t);
  }, [playing, active]);

  const current = active >= 0 ? STEPS[active] : null;

  return (
    <div className="space-y-5">
      {/* Horizontal node pipeline */}
      <div className="relative rounded-xl border border-dark-600 bg-dark-700/30 p-4 overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* Nodes row */}
        <div className="relative flex items-center justify-between gap-0 overflow-x-auto scrollbar-hide py-2 px-1">
          {STEPS.map((step, i) => {
            const isActive = i <= active || done;
            const isCurrent = i === active;
            const isLLM = step.icon === 'ai' || step.icon === 'skip';
            return (
              <div key={step.label} className="flex items-center shrink-0">
                {/* Node */}
                <motion.div
                  className="relative flex flex-col items-center cursor-pointer"
                  onClick={() => { if (done || isActive) setActive(i); }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Glow */}
                  {isCurrent && (
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: 48, height: 48, background: `radial-gradient(circle, ${step.color}30 0%, transparent 70%)` }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {/* Circle */}
                  <motion.div
                    className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-2"
                    animate={{
                      borderColor: isActive ? step.color : '#3a3a5c',
                      background: isCurrent ? `${step.color}25` : isActive ? `${step.color}10` : '#1a1a2e',
                      boxShadow: isCurrent ? `0 0 20px ${step.color}40` : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div animate={{ color: isActive ? step.color : '#555' }} transition={{ duration: 0.3 }}>
                      <StepIcon icon={step.icon} size={14} />
                    </motion.div>
                  </motion.div>
                  {/* Label */}
                  <motion.span
                    className="text-[9px] font-bold mt-1.5 whitespace-nowrap"
                    animate={{ color: isActive ? (isLLM ? '#ef4444' : step.color) : '#555', opacity: isActive ? 1 : 0.5 }}
                  >
                    {step.label}
                  </motion.span>
                </motion.div>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="relative w-6 h-[2px] mx-0.5 shrink-0">
                    <div className="absolute inset-0 bg-dark-600 rounded-full" />
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: `linear-gradient(90deg, ${step.color}, ${STEPS[i + 1].color})` }}
                      animate={{ width: (i < active || done) ? '100%' : '0%' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                    {/* Traveling dot */}
                    {i === active - 1 && playing && (
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ background: STEPS[i + 1].color, boxShadow: `0 0 6px ${STEPS[i + 1].color}` }}
                        initial={{ left: 0 }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div className="min-h-[120px]">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: `${current.color}30` }}
            >
              {/* Header bar */}
              <div className="flex items-center gap-3 px-4 py-2.5" style={{ background: `${current.color}08` }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${current.color}20`, color: current.color }}>
                  <StepIcon icon={current.icon} size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{current.label}</span>
                    <span className="text-[9px] text-gray-600">Step {active + 1} of {STEPS.length}</span>
                    {(current.icon === 'ai' || current.icon === 'skip') && (
                      <span className="text-[8px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded uppercase tracking-wider">Zero Trust</span>
                    )}
                  </div>
                </div>
                {/* Mini progress */}
                <div className="flex gap-0.5">
                  {STEPS.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors duration-200" style={{ background: i <= active ? STEPS[i].color : '#3a3a5c' }} />
                  ))}
                </div>
              </div>
              {/* Body */}
              <div className="px-4 py-3 bg-dark-700/30">
                <p className="text-xs text-gray-500 font-mono mb-2 px-2 py-1 rounded bg-dark-700 inline-block">{current.payload}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{current.detail}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle state */}
        {active < 0 && !done && (
          <div className="flex items-center justify-center h-[120px]">
            <button onClick={play} className="group flex items-center gap-3 text-gray-500 hover:text-coral-400 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-coral-500 flex items-center justify-center transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <span className="text-sm font-medium">Trace a live request through the system</span>
            </button>
          </div>
        )}

        {/* Done state */}
        <AnimatePresence>
          {done && active >= STEPS.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 text-green-400">
                <StepIcon icon="done" size={14} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-green-400">Complete - 10 steps, ~2.1s end-to-end</p>
                <p className="text-[10px] text-gray-500">LLM never saw real data. Results bypassed AI. Immutable audit trail logged.</p>
              </div>
              <button onClick={play} className="text-[10px] font-bold text-gray-500 hover:text-coral-400 transition-colors cursor-pointer uppercase tracking-wider">Replay</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
