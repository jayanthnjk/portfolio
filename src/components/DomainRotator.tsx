import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const domains = [
  { text: 'Banking Domain', icon: '🏦' },
  { text: 'Fintech Domain', icon: '💰' },
  { text: 'Telecom Domain', icon: '📡' },
];

export function DomainRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % domains.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = domains[index];

  return (
    <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-8 sm:mb-10">
      <span className="text-white text-xs sm:text-sm font-medium">Experienced in</span>
      <div className="relative h-8 sm:h-9 overflow-hidden min-w-[180px] sm:min-w-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.text}
            initial={{ y: 30, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -30, opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center"
          >
            <span className="inline-flex items-center gap-2 bg-dark-800/60 backdrop-blur-sm border border-coral-500/20 rounded-lg px-3 sm:px-4 py-1 sm:py-1.5 shadow-lg shadow-coral-500/5">
              <span className="text-sm sm:text-base">{current.icon}</span>
              <span className="text-xs sm:text-sm font-bold text-coral-400 tracking-wide">{current.text}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
