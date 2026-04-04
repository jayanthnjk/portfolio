import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const items = [
  'UI Development',
  'UI/UX Design',
  'Backend Development',
  'Cloud & DevOps',
  'AI & LLM Integration',
  'Database Management',
];

const SPACING = 210;

export function ExpertiseCarousel() {
  const [active, setActive] = useState(0);
  const len = items.length;

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % len), 2500);
    return () => clearInterval(t);
  }, [len]);

  const getIdx = (offset: number) => ((active + offset) % len + len) % len;

  return (
    <div className="relative z-10 bg-white py-6 sm:py-8 px-4 sm:px-6 overflow-hidden">
      <p className="text-center text-sm sm:text-base font-semibold text-dark-900 mb-5 flex items-center justify-center gap-2">
        <span className="text-coral-500">✦</span> Full-Stack Expertise Across the Modern Stack
      </p>

      <div className="relative h-12 max-w-4xl mx-auto">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const idx = getIdx(offset);
          const isCenter = offset === 0;
          const isAdj = Math.abs(offset) === 1;

          return (
            <motion.div
              key={`slot-${offset}`}
              className="absolute top-0 left-1/2 h-12 flex items-center justify-center pointer-events-none"
              animate={{
                x: offset * SPACING,
                opacity: isCenter ? 1 : isAdj ? 0.35 : 0.1,
                scale: isCenter ? 1 : isAdj ? 0.9 : 0.8,
              }}
              style={{ translateX: '-50%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 28, mass: 0.8 }}
            >
              <span
                className="whitespace-nowrap rounded-full font-semibold px-6 py-2.5 text-sm sm:text-base select-none pointer-events-auto cursor-pointer"
                onClick={() => setActive(idx)}
                style={{
                  background: isCenter ? '#1a1a2e' : 'transparent',
                  color: isCenter ? '#fff' : '#aaa',
                  border: isCenter ? 'none' : '1px solid #e8e8ee',
                }}
              >
                {items[idx]}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-1.5 mt-4">
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === active ? 24 : 6, background: i === active ? '#ff6b4a' : '#ddd' }}
            aria-label={`Go to ${items[i]}`} />
        ))}
      </div>
    </div>
  );
}
