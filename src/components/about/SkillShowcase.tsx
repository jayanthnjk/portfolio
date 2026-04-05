import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SKILL_DOMAINS } from '../../data/aboutData';
import { staggerSkillCards, skillCardReveal } from '../../utils/motionVariants';
import { SkillCard } from './SkillCard';

const SKILL_ICONS: Record<string, React.ReactNode> = {
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    </svg>
  ),
  frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4m-7.07-15.07l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  ),
};

interface SkillShowcaseProps {
  reducedMotion: boolean;
}

export function SkillShowcase({ reducedMotion }: SkillShowcaseProps) {
  const [disableTilt, setDisableTilt] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    setDisableTilt(mql.matches);

    const handler = (e: MediaQueryListEvent) => setDisableTilt(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Grid item classes for bento layout — index-based sizing
  const gridSpans = [
    'md:col-span-2', // row 1: wider card
    'md:col-span-1', // row 1: normal card
    'md:col-span-1', // row 2: 3 equal cards
    'md:col-span-1',
    'md:col-span-1',
    'md:col-span-3', // row 3: full-width card
  ];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      variants={staggerSkillCards}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {SKILL_DOMAINS.map((domain, i) => (
        <motion.div key={domain.name} variants={skillCardReveal} className={gridSpans[i]}>
          <SkillCard
            icon={SKILL_ICONS[domain.icon]}
            name={domain.name}
            subtitle={domain.subtitle}
            description={domain.description}
            tags={domain.tags}
            accentColor={domain.accentColor}
            reducedMotion={reducedMotion}
            disableTilt={disableTilt}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
