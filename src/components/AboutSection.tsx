import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { AboutIllustration } from './AboutIllustration';
import { useReducedMotion } from '../hooks/useReducedMotion';

const CTA_TEXT = "If you're looking for an engineer who can turn complex requirements into fully scalable, cloud\u2011optimized products\u2014and do it with accountability, speed, and innovation\u2014I'm ready to bring that value to your team.";

function TypewriterCTA({ text, reducedMotion }: { text: string; reducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView || reducedMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, 18);
    return () => clearInterval(timer);
  }, [isInView, text, reducedMotion]);

  return (
    <div ref={ref}>
      <p className="text-gray-600 font-medium leading-relaxed text-[13px] break-words">
        {displayed}
        {!done && <span className="inline-block w-[2px] h-[14px] bg-coral-500 ml-0.5 align-middle animate-pulse" />}
      </p>
    </div>
  );
}

export function AboutSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 sm:py-28 px-4 sm:px-6 bg-gray-50 overflow-hidden relative">
      {/* Subtle decorative blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral-500/[0.03] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Two-column grid: stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left: Collapsible skill cards */}
          <AnimatedSection variant="slideLeft">
            <div className="min-w-0 overflow-hidden">
              <AboutIllustration />
            </div>
          </AnimatedSection>

          {/* Right: About card */}
          <AnimatedSection variant="fadeIn" delay={0.2}>
            <div className="relative rounded-2xl bg-white border border-gray-100/80 shadow-[0_8px_50px_rgba(0,0,0,0.06)] p-5 sm:p-6 overflow-hidden min-w-0">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-400 to-violet-500" />

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-dark-900 leading-tight mb-4">
                About Me
              </h2>

              <div className="space-y-3">
                <p className="text-gray-500 leading-relaxed text-[13px]">
                  With 6+ years of hands&#x2011;on experience in application development, cloud migration, and scalable system design, I bring end&#x2011;to&#x2011;end engineering expertise&#x2014;from architecture to deployment. I specialize in building robust, cloud&#x2011;native microservices using Java, Node.js, and AWS, delivering solutions that are performant, secure, and production&#x2011;ready.
                </p>
                <p className="text-gray-500 leading-relaxed text-[13px]">
                  I&#x2019;ve delivered mission&#x2011;critical projects for Fortune 200 enterprises and global banking institutions, consistently meeting high standards of reliability, compliance, and scalability. My work has directly enabled faster releases, improved system performance, and long&#x2011;term cost optimization.
                </p>
                <p className="text-gray-500 leading-relaxed text-[13px]">
                  Beyond technical capability, I bring a strong mindset for clarity, reliability, and excellence. I collaborate effectively across distributed teams, navigate ambiguity with structure, and ensure every decision aligns with business impact.
                </p>
              </div>

              {/* CTA with typewriter */}
              <div className="mt-4 rounded-xl bg-gradient-to-br from-coral-50 via-orange-50 to-rose-50 border border-coral-200/40 p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-coral-500/[0.06] rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="flex gap-2.5 items-start relative min-w-0">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-coral-500 to-rose-500 flex items-center justify-center mt-0.5 shadow-sm">
                    <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                      <path d="M4.5 16.5l1.5-4.5 3 3-4.5 1.5zM14.5 2.5a2.12 2.12 0 013 3L9 14l-3-3 8.5-8.5z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <TypewriterCTA text={CTA_TEXT} reducedMotion={reducedMotion} />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>


      </div>
    </section>
  );
}
