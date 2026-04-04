import { useState } from 'react';
import type { Project } from '../types';

export function ProjectCard({ project }: { project: Project }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="case-card group">
      <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
        {imgErr ? (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center" role="img" aria-label={project.title}>
            <span className="text-gray-400 text-sm">{project.title}</span>
          </div>
        ) : (
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" loading="lazy" onError={() => setImgErr(true)} />
        )}
        <div className="case-overlay">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.slice(0, 3).map((t) => (
              <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm">{t}</span>
            ))}
          </div>
          <h3 className="font-heading font-bold text-white text-lg leading-snug">{project.title}</h3>
          <p className="text-sm text-gray-300 mt-1.5 line-clamp-2">{project.description}</p>
          <div className="flex gap-3 mt-3">
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-coral-400 hover:text-coral-300">Live Demo ↗</a>}
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-gray-400 hover:text-white">Source ↗</a>}
          </div>
        </div>
        {/* Coral accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-coral-500 to-coral-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );
}
