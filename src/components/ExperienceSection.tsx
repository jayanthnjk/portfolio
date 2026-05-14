import { AnimatedSection } from './AnimatedSection';
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const items = [
  { logo: '/btgroup.png', company: 'BT Group', period: 'Jan 2025 — Present', current: true, color: '#ff6b4a', yearLabel: '2025', darkLogo: false },
  { logo: '/LTM-Logo.svg', company: 'LTM', period: 'Apr 2022 — Jan 2025', current: false, color: '#3b82f6', yearLabel: '2022', darkLogo: false },
  { logo: '/tcs-logo.svg', company: 'TCS', period: 'Aug 2020 — Apr 2022', current: false, color: '#8b5cf6', yearLabel: '2020', darkLogo: true },
  { logo: '/epikindifi.png', company: 'Epikindifi', period: 'Feb — May 2020', current: false, color: '#10b981', yearLabel: '2020', darkLogo: false },
];

/* Smooth cubic bezier for premium feel */
const smooth = [0.16, 1, 0.3, 1] as const;

function DesktopTimeline({ onCompanyClick, activeCompany }: { onCompanyClick: (i: number) => void; activeCompany: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const progress = useMotionValue(0);
  const trackWidth = useTransform(progress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    if (inView) {
      animate(progress, 1, { duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 });
    }
  }, [inView, progress]);

  return (
    <div ref={ref} className="hidden md:block relative pt-4 pb-4">
      {/* Track background */}
      <div className="absolute left-0 right-0 top-[calc(50%)] -translate-y-1/2 h-[5px] rounded-full bg-gray-100/80" />

      {/* Animated gradient track */}
      <motion.div
        className="absolute left-0 top-[calc(50%)] -translate-y-1/2 h-[5px] rounded-full overflow-hidden"
        style={{
          width: trackWidth,
          background: 'linear-gradient(90deg, #ff6b4a, #3b82f6 35%, #8b5cf6 65%, #10b981)',
        }}
      >
        {/* Traveling light pulse */}
        <motion.div
          className="absolute inset-y-0 w-24"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          }}
          animate={inView ? { x: ['-100px', '1200px'] } : {}}
          transition={{ delay: 1.0, duration: 1.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.div>

      {/* Timeline stations */}
      <div className="relative grid grid-cols-4 gap-5">
        {items.map((item, i) => {
          const isTop = i % 2 === 0;
          const baseDelay = 0.6 + i * 0.4;

          return (
            <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => onCompanyClick(i)}>
              {/* === TOP HALF === */}
              <div className="flex flex-col items-center justify-end" style={{ minHeight: 130 }}>
                {isTop && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: baseDelay, duration: 0.6, ease: smooth }}
                  >
                    <TimelineCard item={item} direction="above" isActive={activeCompany === i} />
                    <motion.div
                      className="w-[2px] h-6 rounded-full"
                      style={{ background: `linear-gradient(to bottom, transparent, ${item.color})` }}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ delay: baseDelay + 0.3, duration: 0.4, ease: smooth }}
                    />
                  </motion.div>
                )}
              </div>

              {/* === NODE === */}
              <div className="relative z-10 flex items-center justify-center" style={{ height: 28 }}>
                {/* Continuous pulsing rings for current company */}
                {item.current && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{ width: 32, height: 32, border: `2px solid ${item.color}`, willChange: 'transform, opacity' }}
                    animate={{ scale: [1, 2.2, 2.5], opacity: [0.5, 0.2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                {/* One-time ripple for non-current */}
                {!item.current && (
                  <motion.div
                    className="absolute w-7 h-7 rounded-full"
                    style={{ border: `2px solid ${item.color}` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: [0, 1.8, 2.2], opacity: [0, 0.4, 0] } : {}}
                    transition={{ delay: baseDelay + 0.15, duration: 1.0, ease: 'easeOut' }}
                  />
                )}
                {/* Node dot */}
                <motion.div
                  className="rounded-full border-[3px] border-white"
                  style={{
                    width: item.current ? 22 : 18,
                    height: item.current ? 22 : 18,
                    background: item.color,
                    boxShadow: `0 0 12px ${item.color}50`,
                  }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: [0, 1.25, 1] } : {}}
                  transition={{ delay: baseDelay + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Soft glow ring only for current — no blinking, just a steady animated glow */}
                {item.current && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: 34,
                      height: 34,
                      background: `radial-gradient(circle, ${item.color}25 0%, ${item.color}00 70%)`,
                    }}
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      scale: [0.95, 1.1, 0.95],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>

              {/* === BOTTOM HALF === */}
              <div className="flex flex-col items-center justify-start" style={{ minHeight: 130 }}>
                {!isTop && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: baseDelay, duration: 0.6, ease: smooth }}
                  >
                    <motion.div
                      className="w-[2px] h-6 rounded-full"
                      style={{ background: `linear-gradient(to top, transparent, ${item.color})` }}
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ delay: baseDelay + 0.3, duration: 0.4, ease: smooth }}
                    />
                    <TimelineCard item={item} direction="below" isActive={activeCompany === i} />
                  </motion.div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineCard({ item, direction, isActive }: { item: typeof items[number]; direction: 'above' | 'below'; isActive?: boolean }) {
  return (
    <motion.div
      className={`relative rounded-xl bg-white p-3 w-full min-w-[140px] max-w-[160px] text-center overflow-hidden transition-all duration-200 ${isActive ? 'ring-2 scale-105' : ''}`}
      style={{
        boxShadow: `0 4px 20px ${item.color}${isActive ? '30' : '12'}`,
        border: '1px solid rgba(0,0,0,0.04)',
        ...(isActive ? { ringColor: item.color } : {}),
      }}
      whileHover={{
        y: direction === 'above' ? -6 : 6,
        boxShadow: `0 8px 30px ${item.color}20`,
        transition: { duration: 0.3, ease: smooth },
      }}
    >
      {/* Colored top/bottom edge */}
      {direction === 'above' && (
        <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full" style={{ background: item.color }} />
      )}
      {direction === 'below' && (
        <div className="absolute top-0 left-3 right-3 h-[2px] rounded-full" style={{ background: item.color }} />
      )}

      {/* Logo container — uniform size */}
      <div
        className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center ${item.darkLogo ? 'bg-dark-900' : ''}`}
        style={!item.darkLogo ? { background: `${item.color}08` } : {}}
      >
        <img src={item.logo} alt={item.company} className="w-7 h-7 object-contain" loading="lazy" />
      </div>

      {/* Company name */}
      <p className="text-xs font-heading font-bold text-dark-900 mb-0.5">{item.company}</p>

      {/* Period */}
      <p className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">{item.period}</p>

      {/* Current badge or year */}
      {item.current ? (
        <motion.div
          className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
          style={{ background: `${item.color}12`, color: item.color }}
          animate={{ boxShadow: [`0 0 0 0px ${item.color}00`, `0 0 0 4px ${item.color}15`, `0 0 0 0px ${item.color}00`] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: item.color }} />
          Current
        </motion.div>
      ) : (
        <div className="mt-1">
          <span className="text-[10px] font-bold font-heading" style={{ color: item.color }}>{item.yearLabel}</span>
        </div>
      )}
    </motion.div>
  );
}

function MobileTimeline({ onCompanyClick, activeCompany }: { onCompanyClick: (i: number) => void; activeCompany: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="md:hidden relative pl-14">
      {/* Track background */}
      <div className="absolute left-[22px] top-0 bottom-0 w-[3px] rounded-full bg-gray-100" />

      {/* Animated gradient track */}
      <motion.div
        className="absolute left-[22px] top-0 bottom-0 w-[3px] rounded-full origin-top"
        style={{ background: 'linear-gradient(to bottom, #ff6b4a, #3b82f6, #8b5cf6, #10b981)' }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.6, ease: smooth }}
      />

      {items.map((item, i) => (
        <motion.div
          key={i}
          className="relative mb-8 last:mb-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.18 + 0.4, duration: 0.5, ease: smooth }}
        >
          {/* Ripple */}
          <motion.div
            className="absolute -left-[16px] top-6 w-6 h-6 rounded-full"
            style={{ border: `1.5px solid ${item.color}` }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [0, 1.6, 2], opacity: [0, 0.3, 0] }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18 + 0.5, duration: 0.8 }}
          />
          {/* Node */}
          <motion.div
            className="absolute -left-[13px] top-[27px] w-[14px] h-[14px] rounded-full border-[2.5px] border-white z-10"
            style={{ background: item.color, boxShadow: `0 0 10px ${item.color}40` }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18 + 0.5, type: 'spring', stiffness: 500, damping: 15 }}
          />

          {/* Card */}
          <div
            onClick={() => onCompanyClick(i)}
            className={`rounded-xl bg-white p-4 relative overflow-hidden cursor-pointer transition-all duration-200 ${activeCompany === i ? 'ring-2' : ''}`}
            style={{
              boxShadow: `0 1px 3px rgba(0,0,0,0.04), 0 4px 16px ${item.color}08`,
              border: '1px solid rgba(0,0,0,0.04)',
              ...(activeCompany === i ? { ringColor: item.color } : {}),
            }}
          >
            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full" style={{ background: item.color }} />
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.darkLogo ? 'bg-dark-900' : ''}`}
                style={!item.darkLogo ? { background: `${item.color}08` } : {}}
              >
                <img src={item.logo} alt={item.company} className="w-7 h-7 object-contain" loading="lazy" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-heading font-bold text-dark-900 leading-tight">{item.company}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">{item.period}</p>
                {item.current && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase mt-1"
                    style={{ color: item.color }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.color }} /> Current
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const ROLES_DATA = [
  {
    company: 'BT Group',
    color: '#ff6b4a',
    responsibilities: [
      'Architected and owned enterprise-grade Spring Boot microservices integrating multiple GRC processes, reducing manual governance tracking effort by 60% and improving audit traceability across enterprise workflows.',
      'Designed and implemented a scalable Role-Based Access Control (RBAC) architecture supporting fine-grained authorization, dynamic role mapping, workflow-level access governance, audit visibility controls, and secure enterprise data segregation across multiple onboarded organizational processes.',
      'Designed and built an AI-powered Solution Impact Assessment platform using AWS Bedrock, OpenAI-based workflows, and conversational AI, automating HLD analysis, impacted-process identification, risk scoring, approval routing, and compliance assessment workflows significantly reducing manual governance effort.',
      'Engineered a highly configurable low-code workflow and template management platform supporting dynamic question banks, workflow builders, layout/theme customization, reusable component generation, and exportable NPM-based UI modules enabling enterprise-wide self-service process onboarding.',
      'Developed an AI-enabled enterprise collaboration and audit platform with conversational search, threaded discussions, workflow intelligence, tool-calling architecture, and enterprise audit tracking capabilities enabling users to retrieve governance data, workflow history, compliance insights, and operational traceability using natural language interactions.',
    ],
  },
  {
    company: 'LTM',
    color: '#3b82f6',
    responsibilities: [
      'Contributed to large-scale AWS cloud migration initiatives for Lincoln Financial Group (LFG) by modernizing legacy applications into scalable Spring Boot, Node.js, Lambda, and ECS-based microservices architectures.',
      'Developed and supported critical enterprise financial systems including AFP Query Service, Fund Modelling, RIA Onboarding, SSO Services, and Annuity platforms handling high-volume business workflows and financial operations.',
      'Improved platform reliability and engineering quality through automated testing, secure coding practices, SonarQube/Fortify compliance, and optimized database operations using DynamoDB and relational databases.',
    ],
  },
  {
    company: 'TCS',
    color: '#8b5cf6',
    responsibilities: [
      'Developed and maintained enterprise banking advisory applications for Bank Yahav supporting retail banking, securities, payment systems, and financial operations across multiple banking workflows.',
      'Implemented backend business logic, PL/SQL procedures, database optimizations, and production enhancements ensuring stable delivery of critical banking change requests and operational fixes.',
      'Strengthened application quality and production stability through secure coding practices, SonarQube/Fortify compliance, issue resolution, and frontend enhancements.',
    ],
  },
  {
    company: 'Epikindifi',
    color: '#10b981',
    responsibilities: [
      'Built and supported fintech application features involving backend APIs, database operations, and frontend integrations while gaining hands-on experience in enterprise software development and SDLC practices.',
    ],
  },
];

function RolesCard({ activeCompany }: { activeCompany: number }) {
  return (
    <div className="mt-10 sm:mt-16 max-w-[900px] mx-auto">
      {/* Content card */}
      <div className="rounded-2xl border border-gray-700/50 bg-dark-800/50 backdrop-blur-sm p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCompany}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-lg font-bold text-white mb-5">{ROLES_DATA[activeCompany].company} <span className="text-xs text-gray-500 font-medium ml-2">Roles & Responsibilities</span></h3>
            <ul className="space-y-3">
              {ROLES_DATA[activeCompany].responsibilities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0 mt-2" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [activeCompany, setActiveCompany] = useState(0);

  return (
    <>
      <section id="experience" className="py-16 sm:py-28 px-5 sm:px-6 bg-dark-900 overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection variant="fadeUp">
            <div className="text-center mb-20">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-[48px] font-bold text-white">Industry Experience</h2>
            </div>
          </AnimatedSection>

          <DesktopTimeline onCompanyClick={setActiveCompany} activeCompany={activeCompany} />
          <MobileTimeline onCompanyClick={setActiveCompany} activeCompany={activeCompany} />

          <AnimatedSection variant="fadeUp" delay={0.2}>
            <RolesCard activeCompany={activeCompany} />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
