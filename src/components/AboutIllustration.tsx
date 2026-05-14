import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const LAYERS = [
  { label: 'Languages', sub: 'Java \u2022 Python \u2022 JavaScript \u2022 TypeScript \u2022 SQL', color: '#f472b6',
    desc: 'Strong command across multiple programming paradigms — object-oriented, functional, and scripting. Production experience with Java 21, Python 3.x, TypeScript, and SQL across enterprise systems.',
    tags: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'] },
  { label: 'Backend & Distributed Systems', sub: 'Spring Boot \u2022 Microservices \u2022 Event-Driven', color: '#38bdf8',
    desc: 'Building robust, scalable microservices and RESTful APIs with Spring Boot and Node.js. Event-driven architectures, workflow orchestration, async processing, and RBAC system design.',
    tags: ['Spring Boot', 'Spring AI', 'Node.js', 'NestJS', 'REST APIs', 'Microservices', 'Event-Driven Architecture', 'RBAC'] },
  { label: 'AI & Agentic Systems', sub: 'GPT-4o \u2022 Claude \u2022 Llama \u2022 RAG Pipelines', color: '#ff6b4a',
    desc: 'Building production AI systems with LLMs, RAG pipelines, hybrid retrieval, multi-agent architectures, tool calling, and MCP. Hands-on with AWS Bedrock, Groq, LangChain, and LangGraph.',
    tags: ['OpenAI GPT-4o', 'Claude', 'Llama 3.3', 'Groq', 'AWS Bedrock', 'RAG Pipelines', 'Multi-Agent Systems', 'MCP', 'Prompt Engineering', 'Amazon Q'] },
  { label: 'Cloud, Databases & DevOps', sub: 'AWS \u2022 Docker \u2022 Kubernetes \u2022 PostgreSQL', color: '#34d399',
    desc: 'Deep AWS expertise across ECS, Lambda, Step Functions, and managed databases. Container orchestration with Docker and Kubernetes. CI/CD pipelines, observability with Grafana and Prometheus.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Oracle SQL', 'pgvector', 'Pinecone', 'DynamoDB', 'GitLab CI/CD', 'Grafana', 'Prometheus'] },
  { label: 'Frontend & Developer Tools', sub: 'React \u2022 Angular \u2022 TypeScript \u2022 Tailwind', color: '#fbbf24',
    desc: 'Crafting responsive, high-performance user interfaces with React and Angular. Modern tooling with GitHub, GitLab, Postman, Swagger, and AI-powered IDEs.',
    tags: ['Angular', 'React', 'TypeScript', 'Tailwind CSS', 'GitHub', 'GitLab', 'Postman', 'Swagger', 'VS Code', 'IntelliJ IDEA', 'Kiro'] },
];

const ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="3" /><path d="M12 2v4m0 12v4m-7.07-15.07l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
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
    <div ref={ref} className="w-full min-w-0 overflow-hidden">
      {LAYERS.map((layer, i) => {
        const isOpen = expanded === i;
        const reached = step >= i;

        return (
          <div key={layer.label} className="flex gap-2.5 min-w-0">
            {/* Timeline */}
            <div className="flex flex-col items-center shrink-0 w-5">
              <motion.div className="w-2.5 h-2.5 rounded-full shrink-0 z-10"
                style={{
                  background: reached ? layer.color : '#2d2d50',
                  boxShadow: reached ? `0 0 10px ${layer.color}60, 0 0 20px ${layer.color}20` : 'none',
                }}
                animate={reached ? { scale: [0, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }} />
              {i < LAYERS.length - 1 && (
                <div className="w-[2px] flex-1 relative rounded-full" style={{ background: '#1e1e3815' }}>
                  <motion.div className="absolute inset-x-0 top-0 rounded-full"
                    style={{ background: `linear-gradient(to bottom, ${layer.color}, ${LAYERS[i + 1].color})` }}
                    animate={step > i ? { height: '100%' } : { height: '0%' }}
                    transition={{ duration: 0.4, delay: 0.1 }} />
                </div>
              )}
            </div>

            {/* Card */}
            <motion.div
              className="flex-1 min-w-0 mb-1.5 rounded-xl overflow-hidden cursor-pointer group/skill"
              style={{
                background: reached ? 'linear-gradient(135deg, #1e1e38 0%, #1a1a2e 100%)' : '#14142a',
                border: `1px solid ${isOpen ? layer.color + '40' : reached ? '#ffffff0a' : '#ffffff04'}`,
                boxShadow: isOpen ? `0 4px 24px ${layer.color}18, 0 0 0 1px ${layer.color}20` : reached ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
              }}
              onClick={() => setExpanded(isOpen ? null : i)}
              animate={reached ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 8 }}
              transition={{ duration: 0.4 }}
            >
              {/* Top accent bar */}
              <motion.div className="h-[2px]"
                style={{ background: layer.color }}
                animate={{ opacity: isOpen ? 1 : 0.15 }}
                transition={{ duration: 0.3 }} />

              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <motion.div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${layer.color}15`, color: layer.color }}
                  animate={isOpen ? { scale: 1.05, background: `${layer.color}25` } : { scale: 1 }}
                  transition={{ duration: 0.2 }}>
                  {ICONS[i]}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold truncate">{layer.label}</p>
                  <p className="text-gray-500 text-[11px] truncate">{layer.sub}</p>
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
                    <div className="px-3 pb-3" style={{ borderTop: `1px solid ${layer.color}12` }}>
                      <p className="text-gray-400 text-xs leading-relaxed mt-2 mb-2.5">{layer.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.tags.map((tag, ti) => (
                          <motion.span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                            style={{ background: `${layer.color}15`, color: layer.color }}
                            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ti * 0.04 }}>
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
