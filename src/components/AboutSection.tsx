import { AnimatedSection } from './AnimatedSection';
import { AboutIllustration } from './AboutIllustration';

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-28 px-4 sm:px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <AnimatedSection variant="slideLeft" className="h-full">
            <div className="relative h-full flex flex-col">
              <AboutIllustration />
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeIn" delay={0.2}>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-bold text-dark-900 leading-tight mb-6">
              About Me
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              With 6+ years of hands‑on experience in application development, cloud migration, and scalable system design, I bring end‑to‑end engineering expertise—from architecture to deployment. I specialize in building robust, cloud‑native microservices using Java, Node.js, and AWS, delivering solutions that are performant, secure, and production‑ready.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              I've delivered mission‑critical projects for Fortune 200 enterprises and global banking institutions, consistently meeting high standards of reliability, compliance, and scalability. My work has directly enabled faster releases, improved system performance, and long‑term cost optimization.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              Beyond technical capability, I bring a strong mindset for clarity, reliability, and excellence. I collaborate effectively across distributed teams, navigate ambiguity with structure, and ensure every decision aligns with business impact.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed mb-5">
              If you're looking for an engineer who can turn complex requirements into fully scalable, cloud‑optimized products—and do it with accountability, speed, and innovation—I'm ready to bring that value to your team.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
