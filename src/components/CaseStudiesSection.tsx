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
        {/* Row 1: Ingestion Pipeline */}
        <ArchRow label="Ingestion" color="#3b82f6" delay={0}>
          <ArchNode label="Document Loader" color="#3b82f6" delay={0.1} />
          <ArchNode label="Legal-Aware Chunker" color="#3b82f6" delay={0.2} />
          <ArchNode label="Embedding Service" color="#3b82f6" delay={0.3} />
        </ArchRow>

        {/* Row 2: Storage */}
        <ArchRow label="Storage" color="#8b5cf6" delay={0.4}>
          <ArchNode label="OpenSearch (k-NN + BM25)" color="#8b5cf6" delay={0.5} mono />
          <ArchNode label="Metadata Index" color="#8b5cf6" delay={0.55} />
        </ArchRow>

        {/* Row 3: Query Pipeline */}
        <ArchRow label="Query" color="#10b981" delay={0.6}>
          <ArchNode label="Hybrid Retrieval" color="#10b981" delay={0.7} />
          <ArchNode label="Prompt Builder" color="#10b981" delay={0.75} />
          <ArchNode label="Claude (Bedrock)" color="#10b981" delay={0.8} highlight />
        </ArchRow>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 my-1" />

        {/* Row 4: Verification */}
        <ArchRow label="Verification" color="#f59e0b" delay={0.9}>
          <ArchNode label="Citation Verifier" color="#f59e0b" delay={1.0} />
          <ArchNode label="Confidence Scorer" color="#f59e0b" delay={1.05} />
          <ArchNode label="Audit Logger" color="#f59e0b" delay={1.1} />
        </ArchRow>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 my-1" />

        {/* Row 5: AWS Infrastructure */}
        <ArchRow label="AWS" color="#ef4444" delay={1.2}>
          <ArchNode label="Titan V2 (dev)" color="#ef4444" delay={1.3} mono />
          <ArchNode label="Cohere Embed 4 (prod)" color="#ef4444" delay={1.35} mono />
          <ArchNode label="Circuit Breaker" color="#ef4444" delay={1.4} />
        </ArchRow>
      </div>
    </div>
  );
}

function ArchRow({ label, color, delay, children }: { label: string; color: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.6, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.6, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
            A production-grade RAG (Retrieval-Augmented Generation) pipeline built for regulatory compliance. It answers GDPR, FCA, and internal policy questions with verifiable citations, confidence scoring, and a complete audit trail.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Unlike generic chatbots, this system is designed for zero-hallucination tolerance — every claim must map to a specific source document, and the system explicitly says "I don't have enough information" rather than fabricating answers.
          </p>
          <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
            <p className="text-xs font-semibold text-dark-900 mb-1">Core Question</p>
            <p className="text-sm text-gray-600 italic">"How do we give compliance teams instant, trustworthy, auditable answers to regulatory questions — without risking hallucinated legal references?"</p>
          </div>
          <div className="flex flex-wrap gap-4 text-center">
            {[
              { value: '95%', label: 'Citation Accuracy' },
              { value: '~5s', label: 'Response Time' },
              { value: '100%', label: 'Audit Coverage' },
              { value: '4', label: 'Design Patterns' },
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
            Compliance teams spend 2-4 hours per regulatory question manually searching through 500+ page documents. GDPR fines reached €1.5 billion in 2024-2025. A wrong compliance answer has legal consequences.
          </p>
          <ul className="space-y-2">
            {[
              { title: 'Manual search is slow', desc: 'Officers dig through GDPR, FCA, Ofcom, internal policies, and audit reports for every question' },
              { title: 'Generic AI hallucinates', desc: 'LLMs fabricate legal references that sound plausible but don\'t exist — dangerous in compliance' },
              { title: 'No audit trail', desc: 'Can\'t prove which sources were used for a decision when auditors ask' },
              { title: 'Version confusion', desc: 'Regulations get amended, but internal policies still reference outdated versions' },
            ].map(item => (
              <li key={item.title} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-coral-500 shrink-0 mt-1.5" />
                <span><strong className="text-dark-900">{item.title}</strong> - {item.desc}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-lg bg-red-50 border border-red-100 p-3">
            <p className="text-xs font-semibold text-red-700 mb-1">Business Risk</p>
            <p className="text-xs text-red-600">Non-compliance fines up to €20M or 4% of global revenue. For large enterprises, this means hundreds of millions in potential exposure. A fabricated citation used in an audit response could trigger regulatory action.</p>
          </div>
        </div>
      );
    case 'solution':
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">A pipeline architecture with four major capabilities:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { num: '01', title: 'Legal-Aware Chunking', desc: 'Splits documents by article/section boundaries, never mid-clause. Preserves cross-references.' },
              { num: '02', title: 'Hybrid Retrieval', desc: 'Combines vector similarity (semantic) + BM25 keyword matching in a single OpenSearch query for ~85% precision.' },
              { num: '03', title: 'Attributed Generation', desc: 'LLM answers ONLY from retrieved context with [SOURCE_N] citations. Post-generation verification catches hallucinations.' },
              { num: '04', title: 'Audit + Versioning', desc: 'Every interaction logged. Document versions tracked. Outdated references flagged automatically.' },
            ].map(c => (
              <div key={c.num} className="rounded-lg border border-gray-100 p-3">
                <span className="text-[10px] font-bold text-coral-500">{c.num}</span>
                <p className="text-xs font-semibold text-dark-900 mt-0.5">{c.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-dark-900">Design Patterns</p>
            <div className="flex flex-wrap gap-1.5">
              {['Strategy (Embedding/LLM swap)', 'Pipeline (staged processing)', 'Repository (VectorStore)', 'Circuit Breaker (AWS resilience)'].map(s => (
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
            Two pipelines — ingestion (offline) and query (per-request) — with cross-cutting concerns for audit, confidence, and resilience. Strategy pattern enables swapping Titan↔Cohere and InMemory↔OpenSearch via config.
          </p>
          <SREArchDiagram />
        </div>
      );
    case 'impact':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { title: 'Hours → Seconds', desc: 'Compliance questions answered in ~5s instead of 2-4 hours of manual research' },
              { title: 'Verifiable Citations', desc: 'Every claim maps to a specific article/section — auditor-ready from day one' },
              { title: 'Zero Hallucination Design', desc: 'System says "insufficient context" rather than fabricating. Citation verification catches 95% of LLM hallucinations.' },
              { title: 'Production-Ready Architecture', desc: 'Profile-based config (dev/prod), circuit breakers, OpenSearch for scale, full audit logging' },
            ].map(i => (
              <div key={i.title} className="rounded-lg border border-gray-100 p-3">
                <p className="text-xs font-semibold text-dark-900">{i.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{i.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-green-50 border border-green-100 p-3">
            <p className="text-xs font-semibold text-green-700 mb-1">Why This Stands Out</p>
            <p className="text-[11px] text-green-600">Solves the hardest problems in RAG — citation accuracy, legal-aware chunking, hybrid retrieval, and audit compliance. Built from scratch without LangChain4j to maintain full pipeline observability and control. Enterprise-grade with AWS Bedrock + OpenSearch.</p>
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
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                      </svg>
                    </div>
                  </div>

                  {/* Middle: Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-dark-900 text-base sm:text-lg leading-tight">
                        ComplianceRAG — Regulatory Q&A Pipeline
                      </h3>
                      <a
                        href="https://github.com/jayanthkumarnandimandalam/compliance-rag-pipeline"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200/80 text-gray-500 hover:text-blue-500 hover:border-blue-200 transition-colors text-[11px] font-medium"
                        title="View on GitHub"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View on GitHub
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Enterprise RAG pipeline for regulatory compliance — answers GDPR/FCA questions with verifiable citations, audit trails, and zero-hallucination tolerance. Built with hybrid search (vector + BM25) on AWS Bedrock + OpenSearch.
                    </p>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {['Java 21', 'Spring Boot', 'AWS Bedrock', 'OpenSearch', 'Titan V2', 'Claude', 'Cohere Embed 4', 'Resilience4j'].map(t => (
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
