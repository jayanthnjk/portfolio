import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const LAYERS = [
  { label: 'UI/UX Design', sub: 'Figma • Google Stitch • Prototyping', color: '#f472b6',
    desc: 'Translating business requirements into intuitive wireframes and interactive prototypes. Focused on user-centered design principles that reduce friction.',
    tags: ['Figma', 'Google Stitch', 'Wireframing', 'Prototyping'] },
  { label: 'UI Development', sub: 'React • Angular • TypeScript • JavaScript', color: '#38bdf8',
    desc: 'Crafting responsive, high-performance user interfaces with React and Angular. Strong command over TypeScript, JavaScript ES6+, and modern CSS frameworks.',
    tags: ['React', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS'] },
  { label: 'Backend Development', sub: 'Java • Python • Node.js', color: '#ff6b4a',
    desc: 'Building robust, scalable microservices and RESTful APIs with Spring Boot, FastAPI, and NestJS. Event-driven architectures with full test coverage.',
    tags: ['Spring Boot', 'FastAPI', 'NestJS', 'REST APIs', 'Microservices'] },
  { label: 'Database Management', sub: 'PostgreSQL • Oracle • DynamoDB • MongoDB', color: '#34d399',
    desc: 'Designing optimized schemas and complex queries across SQL and NoSQL. PL/SQL, stored procedures, triggers, and performance tuning.',
    tags: ['PostgreSQL', 'Oracle SQL', 'DynamoDB', 'MongoDB', 'PL/SQL'] },
  { label: 'Cloud & DevOps', sub: 'AWS • Azure • CI/CD', color: '#fbbf24',
    desc: 'AWS Certified engineer with deep expertise across the full AWS ecosystem and Azure. Serverless architectures, containers, and automated CI/CD pipelines.',
    tags: ['AWS', 'Azure', 'Serverless', 'CI/CD', 'Docker'] },
  { label: 'AI & LLM Integration', sub: 'GPT • Claude • Groq', color: '#a78bfa',
    desc: 'Integrating cutting-edge AI and large language models into production apps. RAG pipelines, prompt engineering, and AI-powered automation.',
    tags: ['GPT', 'Claude', 'Groq', 'RAG', 'Prompt Engineering'] },
];

const ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="3" /><path d="M12 2v4m0 12v4m-7.07-15.07l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>,
];

export function AboutIllustration() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [step, setStep] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const timer = setInterval(() => {
      setStep(current);
      setExpanded(current);
      current++;
      if (current >= LAYERS.length) {
        clearInterval(timer);
        setTimeout(() => setExpanded(null), 1500);
      }
    }, 1200);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="w-full overflow-hidden">
      {LAYERS.map((layer, i) => {
        const isOpen = expanded === i;
        const reached = step >= i;

        return (
          <div key={layer.label} className="flex gap-2 sm:gap-3">
            {/* Timeline */}
            <div className="flex flex-col items-center shrink-0 w-4 sm:w-5">
              <motion.div className="w-2 h-2 rounded-full shrink-0 z-10"
                style={{ background: reached ? layer.color : '#2d2d50', boxShadow: reached ? `0 0 6px ${layer.color}40` : 'none' }}
                animate={reached ? { scale: [0, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }} />
              {i < LAYERS.length - 1 && (
                <div className="w-px flex-1 relative" style={{ background: '#1e1e3820' }}>
                  <motion.div className="absolute inset-x-0 top-0 rounded-full"
                    style={{ background: layer.color }}
                    animate={step > i ? { height: '100%' } : { height: '0%' }}
                    transition={{ duration: 0.4, delay: 0.1 }} />
                </div>
              )}
            </div>

            {/* Card */}
            <motion.div
              className="flex-1 min-w-0 mb-1.5 rounded-lg overflow-hidden cursor-pointer"
              style={{
                background: reached ? '#1a1a2e' : '#14142a',
                border: `1px solid ${isOpen ? layer.color + '30' : reached ? '#ffffff08' : '#ffffff04'}`,
              }}
              onClick={() => setExpanded(isOpen ? null : i)}
              animate={reached ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 8 }}
              transition={{ duration: 0.4 }}
              layout
            >
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${layer.color}12`, color: layer.color }}>
                  {ICONS[i]}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-white text-sm sm:text-base font-bold truncate">{layer.label}</p>
                  <p className="text-gray-500 text-xs sm:text-sm truncate">{layer.sub}</p>
                </div>
                <motion.svg viewBox="0 0 20 20" fill={reached ? layer.color : '#333'} className="w-3.5 h-3.5 shrink-0"
                  animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </motion.svg>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    className="overflow-hidden">
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4" style={{ borderTop: `1px solid ${layer.color}10` }}>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-2 mb-2">{layer.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.tags.map((tag, ti) => (
                          <motion.span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded"
                            style={{ background: `${layer.color}10`, color: layer.color }}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ delay: ti * 0.03 }}>
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
