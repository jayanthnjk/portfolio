import { AnimatedSection } from './AnimatedSection';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const items = [
  { logo: '/btgroup.png', company: 'BT Group', period: 'Jan 2025 — Present', current: true, color: '#ff6b4a', yearLabel: '2025', darkLogo: false },
  { logo: '/LTM-Logo.svg', company: 'LTM', period: 'Apr 2022 — Jan 2025', current: false, color: '#3b82f6', yearLabel: '2022', darkLogo: false },
  { logo: '/tcs-logo.svg', company: 'TCS', period: 'Aug 2020 — Apr 2022', current: false, color: '#8b5cf6', yearLabel: '2020', darkLogo: true },
  { logo: '/epikindifi.png', company: 'Epikindifi', period: 'Feb — May 2020', current: false, color: '#10b981', yearLabel: '2020', darkLogo: false },
];

/* Smooth cubic bezier for premium feel */
const smooth = [0.16, 1, 0.3, 1] as const;

function DesktopTimeline() {
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
            <div key={i} className="flex flex-col items-center">
              {/* === TOP HALF === */}
              <div className="flex flex-col items-center justify-end" style={{ minHeight: 130 }}>
                {isTop && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ delay: baseDelay, duration: 0.7, ease: smooth }}
                  >
                    <TimelineCard item={item} direction="above" />
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
                  <>
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: 32, height: 32, border: `2px solid ${item.color}` }}
                      animate={{ scale: [1, 2.2, 2.5], opacity: [0.5, 0.2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute rounded-full"
                      style={{ width: 32, height: 32, border: `2px solid ${item.color}` }}
                      animate={{ scale: [1, 2.2, 2.5], opacity: [0.5, 0.2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
                    />
                  </>
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
                    initial={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
                    animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{ delay: baseDelay, duration: 0.7, ease: smooth }}
                  >
                    <motion.div
                      className="w-[2px] h-6 rounded-full"
                      style={{ background: `linear-gradient(to top, transparent, ${item.color})` }}
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ delay: baseDelay + 0.3, duration: 0.4, ease: smooth }}
                    />
                    <TimelineCard item={item} direction="below" />
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

function TimelineCard({ item, direction }: { item: typeof items[number]; direction: 'above' | 'below' }) {
  return (
    <motion.div
      className="relative rounded-xl bg-white p-3 w-full max-w-[160px] text-center overflow-hidden"
      style={{
        boxShadow: `0 4px 20px ${item.color}12`,
        border: '1px solid rgba(0,0,0,0.04)',
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

function MobileTimeline() {
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
          initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.18 + 0.4, duration: 0.6, ease: smooth }}
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
            className="rounded-xl bg-white p-4 relative overflow-hidden"
            style={{
              boxShadow: `0 1px 3px rgba(0,0,0,0.04), 0 4px 16px ${item.color}08`,
              border: '1px solid rgba(0,0,0,0.04)',
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

export function ExperienceSection() {
  return (
    <>
      <section id="experience" className="py-16 sm:py-28 px-5 sm:px-6 bg-dark-900 overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <AnimatedSection variant="fadeUp">
            <div className="text-center mb-20">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-[48px] font-bold text-white">Industry Experience</h2>
            </div>
          </AnimatedSection>

          <DesktopTimeline />
          <MobileTimeline />
        </div>
      </section>
    </>
  );
}
