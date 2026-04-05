import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { staggerContainer, fadeUp } from '../utils/motionVariants';
import { HeroIllustration } from './HeroIllustration';

import { DomainRotator } from './DomainRotator';

import { ExpertiseCarousel } from './ExpertiseCarousel';

export function HeroSection() {
  const r = useReducedMotion();
  const cV = r ? undefined : staggerContainer;
  const iV = r ? undefined : fadeUp;

  return (
    <section id="hero" className="relative bg-dark-900 overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6">
        <motion.div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20 pb-12 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-28 min-h-[85vh] sm:min-h-screen"
          variants={cV} initial={r ? undefined : 'hidden'} animate={r ? undefined : 'visible'}>

          {/* Text */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div variants={iV} className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-3 bg-dark-800/80 backdrop-blur-sm border border-green-500/20 text-white text-[11px] sm:text-xs font-semibold uppercase tracking-widest px-4 sm:px-5 py-2 sm:py-2.5 rounded-full">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                Open to Work
              </span>
            </motion.div>

            <motion.h1 variants={iV} className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-extrabold text-white leading-[1.1] mb-5 sm:mb-6 tracking-tight">
              Hello! I am<br /><span className="text-coral-400">Jayanth Kumar</span>
            </motion.h1>

            <motion.p variants={iV} className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0">
              <span className="text-coral-400 font-semibold">From cloud to code</span> — <span className="text-white font-semibold">real‑time intelligence, engineered.</span> Driven to join teams that leverage AI to build smarter, faster, and more adaptive systems—shaping products that define the future of technology
            </motion.p>

            <motion.div variants={iV}>
              <DomainRotator />
            </motion.div>


          </div>

          {/* Animated illustration */}
          <motion.div className="order-1 lg:order-2 h-64 sm:h-80 lg:h-[500px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
            <HeroIllustration />
          </motion.div>
        </motion.div>
      </div>

      {/* Brand strip */}
      <ExpertiseCarousel />
    </section>
  );
}
