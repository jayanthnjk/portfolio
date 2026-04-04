import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { fadeUp, fadeIn, slideLeft, slideRight } from '../utils/motionVariants';
import type { Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight';
  delay?: number;
  className?: string;
}

const variantMap: Record<string, Variants> = {
  fadeUp,
  fadeIn,
  slideLeft,
  slideRight,
};

export function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const selectedVariant = variantMap[variant];

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
