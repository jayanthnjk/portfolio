import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface AmbientBackgroundProps {
  scrollProgress: MotionValue<number>;
  reducedMotion: boolean;
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

const springConfig = { stiffness: 30, damping: 25, mass: 1 };

export function AmbientBackground({ reducedMotion }: Omit<AmbientBackgroundProps, 'scrollProgress'> & { scrollProgress?: AmbientBackgroundProps['scrollProgress'] }) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to -1..1 range, then scale to pixel offset
      cursorX.set(((e.clientX / innerWidth) - 0.5) * 30);
      cursorY.set(((e.clientY / innerHeight) - 0.5) * 30);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion, cursorX, cursorY]);

  const orbAnimation = reducedMotion
    ? undefined
    : {
        y: [0, -20, 0],
        x: [0, 15, 0],
      };

  const orbTransition = reducedMotion
    ? undefined
    : {
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: 'none', zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Gradient orb 1 — coral */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          maxWidth: 600,
          maxHeight: 600,
          top: '10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(255,107,74,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          x: reducedMotion ? 0 : springX,
          y: reducedMotion ? 0 : springY,
        }}
        animate={orbAnimation}
        transition={orbTransition}
        aria-hidden="true"
      />

      {/* Gradient orb 2 — dark-700 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '40vw',
          height: '40vw',
          maxWidth: 550,
          maxHeight: 550,
          bottom: '5%',
          right: '-8%',
          background: 'radial-gradient(circle, rgba(45,45,80,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
          x: reducedMotion ? 0 : springX,
          y: reducedMotion ? 0 : springY,
        }}
        animate={
          reducedMotion
            ? undefined
            : { y: [0, 15, 0], x: [0, -12, 0] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 16, repeat: Infinity, ease: 'easeInOut' as const }
        }
        aria-hidden="true"
      />

      {/* Grain texture overlay */}
      <div
        data-testid="grain-overlay"
        className="absolute inset-0"
        style={{
          backgroundImage: NOISE_SVG,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          opacity: 0.4,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
