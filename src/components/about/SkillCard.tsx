import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { calculateTilt } from '../../data/aboutData';

interface SkillCardProps {
  icon: React.ReactNode;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  reducedMotion: boolean;
  disableTilt: boolean;
}

export function SkillCard({
  icon,
  name,
  subtitle,
  description,
  tags,
  accentColor,
  reducedMotion,
  disableTilt,
}: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowing, setGlowing] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disableTilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      setTilt(calculateTilt(rect.width, rect.height, cursorX, cursorY));
    },
    [disableTilt],
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlowing(false);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setGlowing(true);
  }, []);

  const handleFocus = useCallback(() => setGlowing(true), []);
  const handleBlur = useCallback(() => setGlowing(false), []);

  const transitionStyle = reducedMotion ? 'none' : 'transform 0.2s ease-out, box-shadow 0.3s ease';
  const glowShadow = glowing ? `0 0 40px ${accentColor}40` : 'none';

  return (
    <motion.div
      ref={cardRef}
      className="bg-white/[0.06] backdrop-blur-[20px] border border-white/[0.1] rounded-2xl p-6 relative"
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        boxShadow: glowShadow,
        transition: transitionStyle,
        willChange: 'transform',
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="article"
      aria-label={`${name} skill domain`}
    >
      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: `${accentColor}20` }}
      >
        <div style={{ color: accentColor }} className="w-6 h-6">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-lg mb-1">{name}</h3>

      {/* Subtitle */}
      <p className="text-gray-400 text-sm mb-3">{subtitle}</p>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              color: accentColor,
              backgroundColor: `${accentColor}15`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
