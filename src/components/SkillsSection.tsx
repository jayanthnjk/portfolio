import { AnimatedSection } from './AnimatedSection';
import { WorkboardWikiSection } from './workboard/WorkboardWikiSection';

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-28 px-5 sm:px-6 bg-dark-900 relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] bg-coral-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-150px] left-[-80px] w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-[1100px] mx-auto relative z-10">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[44px] font-bold text-white">
              Solutions Built for Impact, Speed, and Reliability
            </h2>
          </div>
        </AnimatedSection>

        <WorkboardWikiSection embedded />
      </div>
    </section>
  );
}
