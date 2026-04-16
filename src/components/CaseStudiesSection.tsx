import { useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'overview', title: 'Overview' },
  { id: 'problem', title: 'Problem' },
  { id: 'solution', title: 'Solution' },
  { id: 'architecture', title: 'Architecture' },
  { id: 'impact', title: 'Impact' },
];

function SREArchDiagram() {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 overflow-x-auto scrollbar-hide">
      <div className="min-w-[500px] space-y-3">
        {/* Row 1: Client */}
        <ArchRow label="Client" color="#ff6b4a" delay={0}>
          <ArchNode label="Load Generator" color="#ff6b4a" delay={0.1} />
          <ArchNode label="API Client" color="#ff6b4a" delay={0.2} />
        </ArchRow>

        {/* Row 2: Gateway */}
        <ArchRow label="Gateway" color="#3b82f6" delay={0.3}>
          <ArchNode label="api-gateway" color="#3b82f6" delay={0.4} mono />
          <ArchNode label="Routing" color="#3b82f6" delay={0.45} />
          <ArchNode label="Rate Limit" color="#3b82f6" delay={0.5} />
          <ArchNode label="Correlation" color="#3b82f6" delay={0.55} />
        </ArchRow>

        {/* Row 3: Business Services */}
        <ArchRow label="Business Services" color="#10b981" delay={0.6}>
          <ArchNode label="user-service" color="#10b981" delay={0.7} mono />
          <ArchNode label="order-service" color="#10b981" delay={0.75} mono />
          <ArchNode label="payment-service" color="#10b981" delay={0.8} mono />
        </ArchRow>

        {/* Row 4: Infrastructure */}
        <ArchRow label="Infrastructure" color="#8b5cf6" delay={0.9}>
          <ArchNode label="PostgreSQL" color="#8b5cf6" delay={1.0} />
          <ArchNode label="Redis" color="#8b5cf6" delay={1.05} />
          <ArchNode label="RabbitMQ" color="#8b5cf6" delay={1.1} />
        </ArchRow>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 my-1" />

        {/* Row 5: Observability */}
        <ArchRow label="Observability" color="#f59e0b" delay={1.2}>
          <ArchNode label="OTel Collector" color="#f59e0b" delay={1.3} />
          <ArchNode label="Prometheus" color="#f59e0b" delay={1.35} />
          <ArchNode label="Loki" color="#f59e0b" delay={1.4} />
          <ArchNode label="Tempo" color="#f59e0b" delay={1.45} />
          <ArchNode label="Grafana" color="#f59e0b" delay={1.5} />
        </ArchRow>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 my-1" />

        {/* Row 6: Control Plane */}
        <ArchRow label="Control Plane (SRE)" color="#ef4444" delay={1.5}>
          <ArchNode label="chaos-controller" color="#ef4444" delay={1.6} mono />
          <ArchNode label="incident-detector" color="#ef4444" delay={1.65} mono />
          <ArchNode label="ai-analyzer" color="#ef4444" delay={1.7} mono highlight />
        </ArchRow>
      </div>
    </div>
  );
}

function ArchRow({ label, color, delay, children }: { label: string; color: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-28 shrink-0 text-right pr-2 border-r-2" style={{ borderColor: color }}>
        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color }}>{label}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {children}
      </div>
    </motion.div>
  );
}

function ArchNode({ label, color, delay, mono, highlight }: { label: string; color: string; delay: number; mono?: boolean; highlight?: boolean }) {
  return (
    <motion.span
      className={`inline-block text-[10px] px-2.5 py-1 rounded-md border font-medium ${mono ? 'font-mono' : ''} ${highlight ? 'ring-1 ring-offset-1' : ''}`}
      style={{
        borderColor: `${color}40`,
        background: `${color}08`,
        color: color,
        ...(highlight ? { ringColor: color } : {}),
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {label}
    </motion.span>
  );
}

function SREContent({ section }: { section: string }) {
  switch (section) {
    case 'overview':
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            A production-style engineering platform designed to simulate real incidents in a distributed microservice system and use AI to help engineers understand failures faster.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            The platform combines Java microservices, observability with metrics/logs/traces, controlled fault injection, incident detection, and AI-assisted root-cause analysis.
          </p>
          <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
            <p className="text-xs font-semibold text-dark-900 mb-1">Core Question</p>
            <p className="text-sm text-gray-600 italic">"How do we reduce the time and effort needed to detect, understand, and respond to failures in distributed systems?"</p>
          </div>
          <div className="flex flex-wrap gap-4 text-center">
            {[
              { value: '7', label: 'Microservices' },
              { value: '4', label: 'Observability Tools' },
              { value: 'AI', label: 'Root Cause Analysis' },
              { value: '6', label: 'Fault Scenarios' },
            ].map(s => (
              <div key={s.label} className="flex-1 min-w-[80px] rounded-lg bg-gray-50 border border-gray-100 p-2.5">
                <span className="text-lg font-bold text-coral-500 block">{s.value}</span>
                <span className="text-[10px] text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'problem':
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            Distributed systems fail in complex ways. A single dependency slowdown can trigger retries, queue buildup, latency spikes, and cross-service degradation.
          </p>
          <ul className="space-y-2">
            {[
              { title: 'Source unclear', desc: 'The origin of a failure is often hidden behind cascading effects' },
              { title: 'Impact spreads', desc: 'One slow service degrades multiple downstream consumers' },
              { title: 'Evidence scattered', desc: 'Signals live across dashboards, logs, traces, and dependency chains' },
              { title: 'Response depends on speed', desc: 'Fast correlation and good judgment are needed under pressure' },
            ].map(item => (
              <li key={item.title} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0 mt-1.5" />
                <span><strong className="text-dark-900">{item.title}</strong> - {item.desc}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-lg bg-red-50 border border-red-100 p-3">
            <p className="text-xs font-semibold text-red-700 mb-1">Business Pain</p>
            <p className="text-xs text-red-600">Slower incident response, reduced reliability, higher on-call burden, longer recovery time, more engineering hours on manual triage.</p>
          </div>
        </div>
      );
    case 'solution':
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">A layered platform with four major capabilities:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { num: '01', title: 'Business Workflow', desc: 'Realistic order-processing with gateway, user, order, and payment services' },
              { num: '02', title: 'Observability-First', desc: 'Metrics, logs, and traces captured from day one using Prometheus, Grafana, Loki, Tempo' },
              { num: '03', title: 'Controlled Chaos', desc: 'Latency spikes, 5xx bursts, DB slowdowns, and cache outages injected intentionally' },
              { num: '04', title: 'AI-Assisted RCA', desc: 'Telemetry evidence collected and summarized by AI with likely root cause and safe next steps' },
            ].map(c => (
              <div key={c.num} className="rounded-lg border border-gray-100 p-3">
                <span className="text-[10px] font-bold text-coral-500">{c.num}</span>
                <p className="text-xs font-semibold text-dark-900 mt-0.5">{c.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-dark-900">7 Services</p>
            <div className="flex flex-wrap gap-1.5">
              {['api-gateway', 'user-service', 'order-service', 'payment-service', 'chaos-controller', 'incident-detector', 'ai-analyzer'].map(s => (
                <span key={s} className="text-[10px] font-mono text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>
          </div>
        </div>
      );
    case 'architecture':
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            The architecture provides a realistic balance of business flow and operational complexity with synchronous dependencies, persistent state, async messaging, and clear observability signals.
          </p>
          <SREArchDiagram />
        </div>
      );
    case 'impact':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { title: 'Faster Incident Triage', desc: 'Evidence gathered and summarized automatically - reduces manual dashboard/log/trace correlation' },
              { title: 'Reliability Readiness', desc: 'Test retries, circuit breakers, timeouts, and fault tolerance before production' },
              { title: 'Platform Visibility', desc: 'Complete view of request health, dependency health, queue pressure, and failure correlation' },
              { title: 'Reusable Blueprint', desc: 'Architecture can evolve into training platform, demo environment, or internal observability template' },
            ].map(i => (
              <div key={i.title} className="rounded-lg border border-gray-100 p-3">
                <p className="text-xs font-semibold text-dark-900">{i.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{i.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-green-50 border border-green-100 p-3">
            <p className="text-xs font-semibold text-green-700 mb-1">Why This Stands Out</p>
            <p className="text-[11px] text-green-600">Combines microservice architecture, real observability tooling, controlled chaos testing, reliability patterns, and evidence-based AI analysis. Significantly stronger than a typical chatbot-style project.</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function CaseStudiesSection() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="projects" className="py-16 sm:py-28 px-5 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-bold text-dark-900">
              Case Studies
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={0.1}>
          {/* SRE Sandbox case study card */}
          <div className="relative rounded-[20px] overflow-hidden">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-[20px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(139,92,246,0.3), rgba(16,185,129,0.4))' }}>
              <div className="w-full h-full rounded-[20px] bg-white" />
            </div>

            <div className="relative">
              {/* Top accent bar */}
              <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981)' }} />

              {/* Card header */}
              <button
                onClick={() => setIsExpanded(prev => !prev)}
                className="w-full text-left cursor-pointer"
              >
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
                  {/* Left: icon + status */}
                  <div className="flex sm:flex-col items-center gap-3 sm:gap-1.5 shrink-0">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.08))' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                        <circle cx="8" cy="10" r="1.5" fill="#3b82f6"/><circle cx="12" cy="10" r="1.5" fill="#10b981"/><circle cx="16" cy="10" r="1.5" fill="#f59e0b"/>
                      </svg>
                    </div>
                  </div>

                  {/* Middle: Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-dark-900 text-base sm:text-lg leading-tight">
                      Java AI SRE Sandbox
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      AI-powered incident analysis platform for distributed microservices - simulates real failures and uses AI for root-cause analysis with full observability.
                    </p>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {['Java 21', 'Spring Boot', 'Spring AI', 'Prometheus', 'Grafana', 'Docker'].map(t => (
                        <span key={t} className="text-[9px] font-medium text-gray-500 bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: expand arrow */}
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200/80 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-colors shrink-0"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </motion.div>
                </div>
              </button>

            {/* Expanded glossary content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 420 }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="border-t border-gray-100">
                    <div className="flex flex-col md:flex-row">
                      {/* Side nav */}
                      <div className="md:w-44 shrink-0 border-b md:border-b-0 md:border-r border-gray-100 p-3 md:p-4">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2 px-2">Contents</p>
                        {/* Desktop */}
                        <ul className="hidden md:flex flex-col gap-0.5">
                          {SECTIONS.map((s, i) => {
                            const isActive = s.id === activeSection;
                            return (
                              <li key={s.id}>
                                <button
                                  type="button"
                                  onClick={() => setActiveSection(s.id)}
                                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    isActive ? 'text-blue-600 bg-blue-50 border-l-2 border-blue-500' : 'text-gray-500 hover:text-dark-900 hover:bg-gray-50'
                                  }`}
                                >
                                  <span className="text-gray-400 mr-1.5 text-[10px]">{i + 1}.</span>{s.title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                        {/* Mobile */}
                        <ul className="flex md:hidden gap-1 overflow-x-auto scrollbar-hide">
                          {SECTIONS.map(s => {
                            const isActive = s.id === activeSection;
                            return (
                              <li key={s.id}>
                                <button
                                  type="button"
                                  onClick={() => setActiveSection(s.id)}
                                  className={`whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
                                    isActive ? 'text-white bg-blue-500' : 'text-gray-500 bg-gray-50'
                                  }`}
                                >
                                  {s.title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Content area */}
                      <div className="flex-1 relative">
                        <div className="p-4 md:p-6 overflow-y-auto max-h-[360px]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#e5e7eb #fff', WebkitOverflowScrolling: 'touch' }}>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={activeSection}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              transition={{ duration: 0.2 }}
                            >
                              <h3 className="font-heading font-bold text-dark-900 text-lg mb-3 pb-2 border-b border-gray-100">
                                {SECTIONS.find(s => s.id === activeSection)?.title}
                              </h3>
                              <SREContent section={activeSection} />
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none" style={{ background: 'linear-gradient(to top, white, transparent)' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
