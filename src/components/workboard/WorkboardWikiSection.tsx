import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AnimatedSection } from '../AnimatedSection';
import BeforeAfterTable from './BeforeAfterTable';
import ArchitectureDiagram from './ArchitectureDiagram';
import SecurityFlowDiagram from './SecurityFlowDiagram';
import RequestFlowSteps from './RequestFlowSteps';
import AnimatedRequestFlow from './AnimatedRequestFlow';
import ScreenshotGallery from './ScreenshotGallery';
import Lightbox from './Lightbox';
import TechBadge from './TechBadge';
import DesignPatternCard from './DesignPatternCard';
import FeatureDomainCard from './FeatureDomainCard';
import {
  PANELS,
  BEFORE_AFTER_DATA,
  TECH_STACK,
  ARCH_DECISIONS,
  DESIGN_PATTERNS_GROUPED,
  DEV_CHANGES,
  SCREENSHOTS,
  FEATURE_DOMAINS,
  SECURITY_LAYERS,
  RBAC_HIERARCHY,
  CURRENT_BEHAVIOUR,
  SOLUTION_WHAT_CHANGED,
  WHY_AI_CAPABILITIES,
  AI_ESSENTIAL,
  AI_OPTIONAL,
  LLM_COMPARISON,
  LLM_TRADEOFFS,
  LLM_LIMITATIONS,
  LLM_DATA_VISIBILITY,
  SECURITY_MEASURES,
  EXTENDED_ARCH_DECISIONS,
  EXTENDED_DEV_CHANGES,
  REQUEST_FLOW_STEPS,
  DB_KEY_TABLES,
} from '../../data/workboardData';

export function WorkboardWikiSection({ embedded = false }: { embedded?: boolean }) {
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('problem-solution');
  const [lightbox, setLightbox] = useState({ isOpen: false, currentIndex: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on click outside (but not when lightbox is open)
  useEffect(() => {
    if (!isOpen || lightbox.isOpen) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, lightbox.isOpen]);

  const openLightbox = useCallback((index: number) => {
    setLightbox({ isOpen: true, currentIndex: index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox({ isOpen: false, currentIndex: 0 });
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightbox(prev => ({ ...prev, currentIndex: index }));
  }, []);

  const cardContent = (
    <>
          {/* Project Card */}
          <div
            ref={cardRef}
            className="relative rounded-[20px] overflow-hidden group/card"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-[20px] p-[1px]"
              style={{ background: 'linear-gradient(135deg, rgba(255,107,74,0.5), rgba(59,130,246,0.3), rgba(255,107,74,0.4))' }}>
              <div className="w-full h-full rounded-[20px] bg-[#1e1e38]" />
            </div>

            <div className="relative">
              {/* Top accent gradient bar */}
              <div className="h-[3px]" style={{ background: 'linear-gradient(90deg, #ff6b4a, #3b82f6, #ff6b4a)' }} />

              <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full text-left cursor-pointer"
              >
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
                  {/* Left: icon + status */}
                  <div className="flex sm:flex-col items-center gap-3 sm:gap-1.5 shrink-0">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(255,107,74,0.15), rgba(59,130,246,0.1))' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6b4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Delivered</span>
                    </div>
                  </div>

                  {/* Middle: Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-tight">
                      Karnataka State Police Workboard
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      AI-powered shift management and duty roster platform for the CAR unit - managing 572+ personnel with intelligent scheduling, voice commands, and document intelligence.
                    </p>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {['React', 'Spring Boot', 'PostgreSQL', 'Groq LLM', 'Ollama'].map(t => (
                        <span key={t} className="text-[9px] font-medium text-gray-400 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: expand arrow */}
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 group-hover/card:text-coral-500 group-hover/card:border-coral-500/20 transition-colors shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </motion.div>
                </div>
              </button>

            {/* Expanded Wiki Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 500 }}
                  exit={{ height: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.4, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="border-t border-dark-700">
                    <div className="flex flex-col lg:flex-row">
                      {/* Side Navigation */}
                      <div className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-dark-700 p-4 lg:p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Contents</p>
                        {/* Desktop: vertical list */}
                        <ul className="hidden lg:flex flex-col gap-0.5">
                          {PANELS.map((panel, i) => {
                            const isActive = panel.id === activeSection;
                            return (
                              <li key={panel.id}>
                                <button
                                  type="button"
                                  onClick={() => setActiveSection(panel.id)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:outline-none ${
                                    isActive
                                      ? 'text-white bg-dark-700 border-l-2 border-coral-500'
                                      : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
                                  }`}
                                >
                                  <span className="text-gray-500 mr-2 text-xs">{i + 1}.</span>
                                  {panel.title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                        {/* Mobile: horizontal scroll */}
                        <ul className="flex lg:hidden gap-1 overflow-x-auto scrollbar-hide">
                          {PANELS.map((panel, i) => {
                            const isActive = panel.id === activeSection;
                            return (
                              <li key={panel.id}>
                                <button
                                  type="button"
                                  onClick={() => setActiveSection(panel.id)}
                                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                                    isActive
                                      ? 'text-white bg-coral-500'
                                      : 'text-gray-400 hover:text-white bg-dark-700'
                                  }`}
                                >
                                  {panel.title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 relative">
                        <div className="p-5 sm:p-8 overflow-y-auto max-h-[440px]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3a3a5c #1a1a2e', WebkitOverflowScrolling: 'touch' }}>
                          <SectionContent
                            activeSection={activeSection}
                            openLightbox={openLightbox}
                          />
                        </div>
                        {/* Fade hint at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none" style={{ background: 'linear-gradient(to top, #1a1a2e, transparent)' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>

        {/* Lightbox */}
        <Lightbox
          screenshots={SCREENSHOTS}
          currentIndex={lightbox.currentIndex}
          isOpen={lightbox.isOpen}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
    </>
  );

  if (embedded) {
    return (
      <AnimatedSection variant="fadeUp" delay={0.15}>
        {cardContent}
      </AnimatedSection>
    );
  }

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
          {cardContent}
        </AnimatedSection>
      </div>
    </section>
  );
}

/* --- Section Content Renderer --- */
function SectionContent({ activeSection, openLightbox }: { activeSection: string; openLightbox: (i: number) => void }) {
  switch (activeSection) {

    /* 1. Problem & Solution (merged: Problem Statement + Current Behaviour + Solution) */
    case 'problem-solution':
      return (
        <div className="space-y-8">
          <h3 className="font-heading font-bold text-white text-xl">Problem & Solution</h3>

          {/* Problem Statement */}
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              The Karnataka State Police CAR (City Armed Reserve) MT Section manages <strong className="text-white">572 active personnel</strong> across three operational sections, plus 111 personnel on training and 24 recruit APCs. Every day, officers must be assigned to guard duties across 22 locations, VIP escorts, check posts (3 shifts), striking force teams, court duties, cash escorts, and prison escorts - all following a strict 15-day platoon rotation cycle.
            </p>
            <ul className="space-y-2">
              {[
                { title: 'Manual duty rostering', desc: 'Section heads create duty rosters on paper or basic spreadsheets. A single change cascades into hours of manual re-planning.' },
                { title: 'Paper-based leave management', desc: 'Leave applications travel as physical letters through a chain of command. Tracking leave balances across 11 leave types is error-prone.' },
                { title: 'No real-time visibility', desc: 'No single source of truth for "who is on duty right now." Officers call each other to find out.' },
                { title: 'Form 168 is handwritten daily', desc: 'The daily duty tracking form is filled by hand, making historical queries nearly impossible.' },
                { title: 'Document chaos', desc: 'Platoon charts, strength statements, and rosters exist as scanned PDFs and photocopies.' },
                { title: 'Ad-hoc requests are verbal', desc: 'Urgent duty assignments communicated through phone calls with no audit trail.' },
                { title: 'No accountability trail', desc: 'When something goes wrong, there is no record of who assigned whom, when, or why.' },
              ].map(item => (
                <li key={item.title} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0 mt-1.5" />
                  <span><strong className="text-gray-300">{item.title}</strong> - {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Current Behaviour */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">Current Behaviour (Before)</h4>
            <div className="overflow-x-auto rounded-xl border border-dark-600">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-300">Area</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">How It Works Today</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">Pain Point</th>
                  </tr>
                </thead>
                <tbody>
                  {CURRENT_BEHAVIOUR.map(row => (
                    <tr key={row.area} className="border-t border-dark-600">
                      <td className="px-4 py-2 font-medium text-gray-300">{row.area}</td>
                      <td className="px-4 py-2 text-gray-400">{row.howItWorks}</td>
                      <td className="px-4 py-2 text-red-400/80">{row.painPoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">Solution We Provided</h4>
            <p className="text-gray-300 leading-relaxed">
              We built an AI-powered digital workboard that replaces every manual process with a unified platform. Officers interact through a web interface, voice commands, or document uploads - and the system handles the rest.
            </p>
            <div className="[&_th]:!text-gray-300 [&_td]:!text-gray-400 [&_table]:!border-dark-600 [&_tr]:!border-dark-600 [&_thead_tr]:!bg-dark-700 [&_.bg-red-50]:!bg-red-900/20 [&_.bg-green-50]:!bg-green-900/20 [&_.font-medium]:!text-gray-300 [&_.font-semibold]:!text-gray-300 [&_.text-dark-900]:!text-gray-300 [&_div.rounded-xl]:!border-dark-600 [&_div.bg-gray-50]:!bg-dark-700">
              <BeforeAfterTable rows={SOLUTION_WHAT_CHANGED} />
            </div>
          </div>

          {/* Key Capabilities */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white">Key Capabilities</h4>
            <ul className="space-y-2">
              {[
                { name: 'Natural Language Chat', desc: 'Officers type or speak commands in English or Kannada. The AI understands intent and executes actions.' },
                { name: 'Voice Commands', desc: 'Speak to create leave requests, assign duties, query personnel, or check schedules.' },
                { name: 'Document Intelligence', desc: 'Upload scanned rosters, Form 168, platoon charts. The system extracts structured data using OCR.' },
                { name: 'AI-Powered Scheduling', desc: 'Generates fair duty rosters respecting rotation rules, rest periods, leave, and preferences.' },
                { name: 'Role-Based Access', desc: 'Rank hierarchy (DCP > ACP > RPI > RSI > ARSI > AHC > APC) enforced at every level.' },
                { name: 'Complete Audit Trail', desc: 'Every action logged with source (voice, document, manual), user, timestamp, and before/after values.' },
              ].map(cap => (
                <li key={cap.name} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0 mt-1.5" />
                  <span><strong className="text-gray-300">{cap.name}</strong> - {cap.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    /* 2. Architecture & Stack (merged: System Architecture + Technology Stack) */
    case 'architecture-stack':
      return (
        <div className="space-y-8">
          <h3 className="font-heading font-bold text-white text-xl">Architecture & Stack</h3>

          {/* Architecture */}
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              A layered architecture with clear separation of concerns - from the React frontend through an Nginx API gateway to a Spring Boot backend orchestrating AI services, business logic, and security.
            </p>
            <ArchitectureDiagram />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-heading font-semibold text-white mb-2">Frontend Highlights</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• React with lazy-loaded pages</li>
                  <li>• Context providers for auth, theme, language</li>
                  <li>• Protected routes with role guards</li>
                  <li>• AI chat panel with voice input</li>
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-white mb-2">Backend Highlights</h4>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>• ChatService facade orchestrating AI pipeline</li>
                  <li>• Language detection + NLU pre-processing</li>
                  <li>• PII sanitization before LLM calls</li>
                  <li>• Tool registry with 17 secured tools</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Architecture Decisions */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white">Architecture Decisions</h4>
            <div className="overflow-hidden rounded-xl border border-dark-600">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-300">Decision</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">Chosen</th>
                    <th className="px-4 py-2 font-semibold text-gray-300 hidden md:table-cell">Considered</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">Reasoning</th>
                  </tr>
                </thead>
                <tbody>
                  {EXTENDED_ARCH_DECISIONS.map(d => (
                    <tr key={d.decision} className="border-t border-dark-600">
                      <td className="px-4 py-2 font-medium text-gray-300">{d.decision}</td>
                      <td className="px-4 py-2 text-gray-400">{d.chosen}</td>
                      <td className="px-4 py-2 text-gray-500 hidden md:table-cell">{d.considered}</td>
                      <td className="px-4 py-2 text-gray-400">{d.reasoning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    /* 3. AI & LLM Strategy (merged: Why AI + Is AI Necessary + LLM Trade-offs) */
    case 'ai-strategy':
      return (
        <div className="space-y-8">
          <h3 className="font-heading font-bold text-white text-xl">AI & LLM Strategy</h3>

          {/* Why AI */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">Why LLMs and AI?</h4>
            <p className="text-gray-300 leading-relaxed">
              A traditional CRUD application could handle duty assignments, leave requests, and personnel management. But it would require officers to navigate multiple screens, fill structured forms, learn specific workflows, and type exact search queries.
            </p>
            <div className="overflow-x-auto rounded-xl border border-dark-600">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-300">Capability</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">Why AI is the Right Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {WHY_AI_CAPABILITIES.map(row => (
                    <tr key={row.capability} className="border-t border-dark-600">
                      <td className="px-4 py-2 font-medium text-gray-300">{row.capability}</td>
                      <td className="px-4 py-2 text-gray-400">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 className="font-heading font-semibold text-white">What AI Does NOT Do</h4>
            <ul className="space-y-1">
              {[
                'AI does NOT make decisions - it only understands requests and suggests actions',
                'AI does NOT have direct database access - it requests tool execution, which is authorized separately',
                'AI does NOT see real personnel data - all PII is masked before the LLM processes it',
                'AI does NOT auto-execute write operations - every mutation requires human confirmation',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-red-400 mt-0.5">x</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Is AI Necessary */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">Is AI Necessary Here?</h4>
            <p className="text-gray-300 leading-relaxed"><strong className="text-white">Yes, but with clear boundaries.</strong> AI as an accelerator, not a dependency. Every operation can be performed without AI - the traditional UI is fully functional.</p>
            <div className="overflow-x-auto rounded-xl border border-dark-600">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-300">Use Case</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">Without AI</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">With AI</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {AI_ESSENTIAL.map(row => (
                    <tr key={row.useCase} className="border-t border-dark-600">
                      <td className="px-4 py-2 font-medium text-gray-300">{row.useCase}</td>
                      <td className="px-4 py-2 text-red-400/80">{row.withoutAI}</td>
                      <td className="px-4 py-2 text-green-400/80">{row.withAI}</td>
                      <td className="px-4 py-2 text-gray-400">{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LLM Trade-offs */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white">LLM Trade-offs - Why Groq + Llama 3.3 70B?</h4>
            <div className="overflow-x-auto rounded-xl border border-dark-600">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-300">Factor</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">Groq (Llama 3.3 70B)</th>
                    <th className="px-4 py-2 font-semibold text-gray-300 hidden md:table-cell">Self-Hosted</th>
                    <th className="px-4 py-2 font-semibold text-gray-300 hidden md:table-cell">OpenAI GPT-4</th>
                  </tr>
                </thead>
                <tbody>
                  {LLM_COMPARISON.map(row => (
                    <tr key={row.factor} className="border-t border-dark-600">
                      <td className="px-4 py-2 font-medium text-gray-300">{row.factor}</td>
                      <td className="px-4 py-2 text-green-400/80">{row.groq}</td>
                      <td className="px-4 py-2 text-gray-400 hidden md:table-cell">{row.selfHosted}</td>
                      <td className="px-4 py-2 text-gray-400 hidden md:table-cell">{row.openai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h4 className="font-heading font-semibold text-white">Limitations We Designed Around</h4>
            <div className="overflow-x-auto rounded-xl border border-dark-600">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-dark-700 text-left">
                    <th className="px-4 py-2 font-semibold text-gray-300">Limitation</th>
                    <th className="px-4 py-2 font-semibold text-gray-300">How We Handle It</th>
                  </tr>
                </thead>
                <tbody>
                  {LLM_LIMITATIONS.map(row => (
                    <tr key={row.limitation} className="border-t border-dark-600">
                      <td className="px-4 py-2 font-medium text-gray-300">{row.limitation}</td>
                      <td className="px-4 py-2 text-gray-400">{row.handling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    /* 4. Security Architecture */
    case 'security':
      return (
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-white text-xl">Security Architecture</h3>

          {/* Zero Trust principle */}
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-red-400">Zero Trust LLM Principle</p>
                <p className="text-xs text-gray-400 mt-1">The LLM is treated as an untrusted external service. It never sees real data, never executes actions directly, and never receives query results. It only understands intent and suggests tool calls.</p>
              </div>
            </div>
          </div>

          {/* Security layers - concentric rings concept */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Defense Layers</h4>
            {SECURITY_MEASURES.map((row, i) => (
              <div key={row.layer} className="flex items-center gap-3 rounded-lg px-3 py-2 bg-dark-700/50 border border-dark-600/50">
                <div className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold text-gray-500 bg-dark-600 shrink-0">{i + 1}</div>
                <span className="text-xs font-bold text-white w-24 shrink-0">{row.layer}</span>
                <span className="text-xs text-gray-400">{row.protection}</span>
              </div>
            ))}
          </div>

          {/* LLM data visibility */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">What the LLM Sees vs Reality</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {LLM_DATA_VISIBILITY.map(row => (
                <div key={row.dataType} className="flex items-start gap-2 rounded-lg px-3 py-2 bg-dark-700/50 border border-dark-600/50">
                  <span className={`text-[10px] font-bold mt-0.5 shrink-0 ${row.sentToLLM === 'Never' || row.sentToLLM.startsWith('Never') ? 'text-green-400' : 'text-amber-400'}`}>
                    {row.sentToLLM === 'Never' || row.sentToLLM.startsWith('Never') ? 'BLOCKED' : 'SANITIZED'}
                  </span>
                  <div>
                    <span className="text-xs text-gray-300">{row.dataType}</span>
                    <p className="text-[10px] text-gray-500">{row.handling}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RBAC */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rank-Based Access Control</h4>
            <div className="flex flex-wrap gap-1.5">
              {RBAC_HIERARCHY.map((r, i) => (
                <div key={r.rank} className="flex items-center gap-1.5">
                  <div className="rounded-lg bg-dark-600 px-2.5 py-1.5 text-center" style={{ opacity: 1 - i * 0.07 }}>
                    <span className="text-[10px] font-bold text-white block">{r.rank}</span>
                    <span className="text-[8px] text-gray-500 block leading-tight">{r.access.split(' - ')[0]}</span>
                  </div>
                  {i < RBAC_HIERARCHY.length - 1 && <span className="text-gray-600 text-[10px]">&gt;</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    /* 5. Design Patterns */
    case 'design-patterns':
      return (
        <div className="space-y-6">
          <h3 className="font-heading font-bold text-white text-xl">Design Patterns</h3>
          {DESIGN_PATTERNS_GROUPED.map(group => (
            <div key={group.category} className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: group.color }} />
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{group.category}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {group.patterns.map(p => (
                  <div key={p.name} className="flex items-start gap-2 rounded-lg px-3 py-2 bg-dark-700/50 border border-dark-600/50">
                    <span className="text-[10px] font-bold text-white bg-dark-600 px-1.5 py-0.5 rounded shrink-0 mt-0.5" style={{ borderLeft: `2px solid ${group.color}` }}>{p.name}</span>
                    <p className="text-xs text-gray-400 leading-relaxed"><span className="text-gray-500">{p.location}</span> - {p.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    /* 6. End-to-End Request Flow */
    case 'request-flow':
      return (
        <div className="space-y-5">
          <h3 className="font-heading font-bold text-white text-xl">End-to-End Request Flow</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Watch a real command flow through the system - from officer input to authenticated response. Click "Run Demo" to trace the journey.
          </p>
          <AnimatedRequestFlow />
        </div>
      );

    /* 7. Snapshots */
    case 'snapshots':
      return (
        <div className="space-y-5">
          <h3 className="font-heading font-bold text-white text-xl">Snapshots</h3>
          <p className="text-sm text-gray-400">Application screenshots from the live platform.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {SCREENSHOTS.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => openLightbox(i)}
                className="rounded-xl overflow-hidden border border-dark-600 hover:border-coral-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:outline-none cursor-pointer"
              >
                <img src={s.src} alt={s.alt} loading="lazy" className="w-full aspect-video object-cover object-top" />
              </button>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

