import { motion } from 'framer-motion';

const NODES = [
  { angle: 0, label: 'API', icon: '⚡' },
  { angle: 60, label: 'DB', icon: '🗄️' },
  { angle: 120, label: 'Cloud', icon: '☁️' },
  { angle: 180, label: 'CI/CD', icon: '🔄' },
  { angle: 240, label: 'Auth', icon: '🔐' },
  { angle: 300, label: 'Queue', icon: '📨' },
];

const R_OUTER = 130;
const R_INNER = 75;

function nodePos(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: 200 + r * Math.cos(rad), y: 200 + r * Math.sin(rad) };
}

export function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Large pulsing glow */}
      <motion.div className="absolute w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,107,74,0.25) 0%, rgba(255,107,74,0.08) 40%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Secondary glow */}
      <motion.div className="absolute w-60 h-60 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,138,115,0.15) 0%, transparent 60%)' }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Outer rotating ring — brighter */}
      <motion.svg viewBox="0 0 400 400" className="absolute w-[95%] h-[95%]"
        animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#ff8a73" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ff6b4a" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="185" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="8 12" />
      </motion.svg>

      {/* Counter-rotating middle ring — brighter */}
      <motion.svg viewBox="0 0 400 400" className="absolute w-[75%] h-[75%]"
        animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
        <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(255,107,74,0.2)" strokeWidth="1" />
      </motion.svg>

      {/* Main SVG */}
      <motion.svg viewBox="0 0 400 400" className="relative w-[85%] h-[85%] z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff8a73" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connection lines — brighter */}
        {NODES.map((n, i) => {
          const outer = nodePos(n.angle, R_OUTER);
          return (
            <motion.line key={`conn-${i}`} x1="200" y1="200" x2={outer.x} y2={outer.y}
              stroke="url(#lineGrad)" strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: 'easeOut' }} />
          );
        })}

        {/* Inner hexagon — brighter fill and stroke */}
        {(() => {
          const pts = [0, 60, 120, 180, 240, 300].map((a) => nodePos(a, R_INNER));
          const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
          return (
            <motion.path d={d} fill="rgba(255,107,74,0.08)" stroke="#ff6b4a" strokeWidth="2" filter="url(#glowStrong)"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }} />
          );
        })()}

        {/* Inner smaller hexagon — brighter */}
        {(() => {
          const pts = [0, 60, 120, 180, 240, 300].map((a) => nodePos(a, 40));
          const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
          return (
            <motion.path d={d} fill="rgba(255,107,74,0.05)" stroke="rgba(255,107,74,0.4)" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }} />
          );
        })()}

        {/* Center icon — brighter, bigger */}
        <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <circle cx="200" cy="200" r="26" fill="rgba(255,107,74,0.15)" stroke="#ff6b4a" strokeWidth="2" filter="url(#glowStrong)" />
          <text x="200" y="207" textAnchor="middle" fill="#ff8a73" fontSize="18" fontWeight="bold" fontFamily="monospace">{'</>'}</text>
        </motion.g>

        {/* Outer nodes — brighter borders and labels */}
        {NODES.map((n, i) => {
          const pos = nodePos(n.angle, R_OUTER);
          return (
            <motion.g key={`node-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <circle cx={pos.x} cy={pos.y} r="22" fill="rgba(26,26,46,0.95)" stroke="#ff6b4a" strokeWidth="1.5" strokeOpacity="0.5" />
              <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="central" fontSize="16">{n.icon}</text>
              <text x={pos.x} y={pos.y + 34} textAnchor="middle" fill="#ff8a73" fontSize="9" fontWeight="700" letterSpacing="1.5">{n.label}</text>
            </motion.g>
          );
        })}

        {/* Data packets — bigger, brighter */}
        {NODES.map((n, i) => {
          const outer = nodePos(n.angle, R_OUTER);
          return (
            <motion.circle key={`packet-${i}`} r="3.5" fill="#ff6b4a" filter="url(#glowStrong)"
              animate={{
                cx: [200, outer.x, 200],
                cy: [200, outer.y, 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: 2 + i * 0.7,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut',
              }} />
          );
        })}

        {/* Orbiting particle — brighter */}
        <motion.circle r="4" fill="#ff8a73" opacity="0.9" filter="url(#glow)"
          animate={{
            cx: [0, 60, 120, 180, 240, 300, 360].map((a) => nodePos(a, 105).x),
            cy: [0, 60, 120, 180, 240, 300, 360].map((a) => nodePos(a, 105).y),
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} />
      </motion.svg>

      {/* Ambient glow — bigger, brighter */}
      <div className="absolute w-56 h-56 bg-coral-500/15 rounded-full blur-3xl" aria-hidden="true" />
    </div>
  );
}
