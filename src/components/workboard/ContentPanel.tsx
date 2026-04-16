import { motion } from 'framer-motion';
import { AnimatedSection } from '../AnimatedSection';

interface ContentPanelProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  reducedMotion: boolean;
}

export function ContentPanel({
  id,
  title,
  icon,
  isExpanded,
  onToggle,
  children,
  reducedMotion,
}: ContentPanelProps) {
  return (
    <div id={id}>
      <AnimatedSection variant="fadeUp">
        <div className="card-elevated">
          <button
            id={id + '-header'}
            aria-expanded={isExpanded}
            aria-controls={id + '-content'}
            onClick={onToggle}
            className="flex w-full items-center gap-3 p-5 cursor-pointer text-left transition-shadow duration-300 hover:shadow-lg group"
          >
            <span className="text-xl flex-shrink-0">{icon}</span>
            <h3 className="font-heading font-semibold text-dark-900 text-lg flex-1">
              {title}
            </h3>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className="text-dark-600 group-hover:text-coral-500 transition-colors duration-200 flex-shrink-0"
            >
              ▼
            </motion.span>
          </button>

          <motion.div
            id={id + '-content'}
            role="region"
            aria-labelledby={id + '-header'}
            style={{ overflow: 'hidden' }}
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeOut' }}
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
}
