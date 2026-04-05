import { NARRATIVE_PARAGRAPHS } from '../../data/aboutData';

interface NarrativePanelProps {
  reducedMotion: boolean;
}

export default function NarrativePanel(_props: NarrativePanelProps) {
  return (
    <div>
      <span className="section-label">About</span>
      <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-bold leading-tight mb-6 bg-gradient-to-r from-white to-coral-400 bg-clip-text text-transparent">
        About Me
      </h2>
      {NARRATIVE_PARAGRAPHS.map((text, index) => {
        const isLast = index === NARRATIVE_PARAGRAPHS.length - 1;
        return (
          <p
            key={index}
            className={
              isLast
                ? 'text-gray-200 font-medium border-l-2 border-coral-500 pl-4 leading-[1.75] mb-4'
                : 'text-gray-300 leading-[1.75] mb-4'
            }
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
