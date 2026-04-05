import { AnimatedSection } from './AnimatedSection';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-28 px-5 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-bold text-dark-900">Recent Case Studies</h2>
          </div>
        </AnimatedSection>
        <div className="relative">
          {/* Blur overlay with lock */}
          <div className="absolute inset-0 z-20 backdrop-blur-[6px] bg-white/50 rounded-2xl flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <p className="text-dark-900 text-sm font-bold font-heading">Section Locked</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.slice(0, 3).map((p, i) => (
            <AnimatedSection key={p.id} variant="fadeUp" delay={i * 0.08}>
              <ProjectCard project={p} />
            </AnimatedSection>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
