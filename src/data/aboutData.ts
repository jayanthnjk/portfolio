export interface SkillDomain {
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  icon: string;
}

export interface StatMetric {
  value: number;
  suffix: string;
  label: string;
}

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    name: 'UI/UX Design',
    subtitle: 'Figma \u2022 Google Stitch \u2022 Prototyping',
    description:
      'Translating business requirements into intuitive wireframes and interactive prototypes. Focused on user-centered design principles that reduce friction.',
    tags: ['Figma', 'Google Stitch', 'Wireframing', 'Prototyping'],
    accentColor: '#f472b6',
    icon: 'design',
  },
  {
    name: 'UI Development',
    subtitle: 'React \u2022 Angular \u2022 TypeScript \u2022 JavaScript',
    description:
      'Crafting responsive, high-performance user interfaces with React and Angular. Strong command over TypeScript, JavaScript ES6+, and modern CSS frameworks.',
    tags: ['React', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    accentColor: '#38bdf8',
    icon: 'frontend',
  },
  {
    name: 'Backend Development',
    subtitle: 'Java \u2022 Python \u2022 Node.js',
    description:
      'Building robust, scalable microservices and RESTful APIs with Spring Boot, FastAPI, and NestJS. Event-driven architectures with full test coverage.',
    tags: ['Spring Boot', 'FastAPI', 'NestJS', 'REST APIs', 'Microservices'],
    accentColor: '#ff6b4a',
    icon: 'backend',
  },
  {
    name: 'Database Management',
    subtitle: 'PostgreSQL \u2022 Oracle \u2022 DynamoDB \u2022 MongoDB',
    description:
      'Designing optimized schemas and complex queries across SQL and NoSQL. PL/SQL, stored procedures, triggers, and performance tuning.',
    tags: ['PostgreSQL', 'Oracle SQL', 'DynamoDB', 'MongoDB', 'PL/SQL'],
    accentColor: '#34d399',
    icon: 'database',
  },
  {
    name: 'Cloud & DevOps',
    subtitle: 'AWS \u2022 Azure \u2022 CI/CD',
    description:
      'AWS Certified engineer with deep expertise across the full AWS ecosystem and Azure. Serverless architectures, containers, and automated CI/CD pipelines.',
    tags: ['AWS', 'Azure', 'Serverless', 'CI/CD', 'Docker'],
    accentColor: '#fbbf24',
    icon: 'cloud',
  },
  {
    name: 'AI & LLM Integration',
    subtitle: 'GPT \u2022 Claude \u2022 Groq',
    description:
      'Integrating cutting-edge AI and large language models into production apps. RAG pipelines, prompt engineering, and AI-powered automation.',
    tags: ['GPT', 'Claude', 'Groq', 'RAG', 'Prompt Engineering'],
    accentColor: '#a78bfa',
    icon: 'ai',
  },
];

export const STAT_METRICS: StatMetric[] = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 25, suffix: '+', label: 'Technologies' },
];

export const NARRATIVE_PARAGRAPHS: string[] = [
  'With 6+ years of hands\u2011on experience in application development, cloud migration, and scalable system design, I bring end\u2011to\u2011end engineering expertise\u2014from architecture to deployment. I specialize in building robust, cloud\u2011native microservices using Java, Node.js, and AWS, delivering solutions that are performant, secure, and production\u2011ready.',
  'I\u2019ve delivered mission\u2011critical projects for Fortune 200 enterprises and global banking institutions, consistently meeting high standards of reliability, compliance, and scalability. My work has directly enabled faster releases, improved system performance, and long\u2011term cost optimization.',
  'Beyond technical capability, I bring a strong mindset for clarity, reliability, and excellence. I collaborate effectively across distributed teams, navigate ambiguity with structure, and ensure every decision aligns with business impact.',
  'If you\u2019re looking for an engineer who can turn complex requirements into fully scalable, cloud\u2011optimized products\u2014and do it with accountability, speed, and innovation\u2014I\u2019m ready to bring that value to your team.',
];

/**
 * Calculate 3D tilt rotation based on cursor position relative to card center.
 * Returns rotateX and rotateY values clamped to ±8 degrees.
 */
export function calculateTilt(
  cardWidth: number,
  cardHeight: number,
  cursorX: number,
  cursorY: number,
): { rotateX: number; rotateY: number } {
  if (cardWidth === 0 || cardHeight === 0) {
    return { rotateX: 0, rotateY: 0 };
  }

  const MAX_ROTATION = 8;

  // Normalize cursor position to [-1, 1] relative to card center
  const normalizedX = (cursorX / cardWidth - 0.5) * 2;
  const normalizedY = (cursorY / cardHeight - 0.5) * 2;

  // rotateY follows horizontal movement, rotateX follows vertical (inverted)
  const rotateY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, normalizedX * MAX_ROTATION));
  const rotateX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, -normalizedY * MAX_ROTATION));

  return { rotateX, rotateY };
}
