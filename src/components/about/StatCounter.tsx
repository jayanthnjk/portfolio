import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
  reducedMotion: boolean;
}

export function StatCounter({
  target,
  suffix = '',
  label,
  reducedMotion,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const motionVal = useMotionValue(reducedMotion ? target : 0);

  const spring = useSpring(motionVal, {
    stiffness: 50,
    damping: 20,
  });

  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (reducedMotion) {
      motionVal.set(target);
      return;
    }
    if (isInView) {
      motionVal.set(target);
    }
  }, [isInView, target, reducedMotion, motionVal]);

  return (
    <div
      ref={ref}
      className="text-center"
      aria-label={`${target}${suffix} ${label}`}
    >
      <div className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
        <motion.span>{rounded}</motion.span>
        {suffix && <span>{suffix}</span>}
      </div>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}
