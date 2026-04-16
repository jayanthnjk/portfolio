import type {
  PanelConfig,
  BeforeAfterRow,
  TechCategory,
  ArchDecision,
  DesignPattern,
  DevChange,
  Screenshot,
  FeatureDomain,
} from '../types';

export const PANELS: PanelConfig[] = [
  { id: 'problem-solution', title: 'Problem & Solution', icon: '01' },
  { id: 'architecture-stack', title: 'Architecture & Stack', icon: '02' },
  { id: 'ai-strategy', title: 'AI & LLM Strategy', icon: '03' },
  { id: 'security', title: 'Security Architecture', icon: '04' },
  { id: 'design-patterns', title: 'Design Patterns', icon: '05' },
  { id: 'request-flow', title: 'End-to-End Request Flow', icon: '06' },
  { id: 'snapshots', title: 'Snapshots', icon: '07' },
];

export const BEFORE_AFTER_DATA: BeforeAfterRow[] = [
  {
    area: 'Duty Rostering',
    before: 'Paper rosters, hours of manual work',
    after: 'AI generates fair schedules in seconds',
  },
  {
    area: 'Leave Requests',
    before: 'Physical letters, days to process',
    after: 'Voice or chat command — done in seconds',
  },
  {
    area: 'Daily Attendance',
    before: 'Handwritten Form 168',
    after: 'Upload form → OCR extracts → confirm → saved',
  },
  {
    area: 'Ad-hoc Assignments',
    before: 'Phone calls, no record',
    after: 'Chat command with full audit trail',
  },
  {
    area: 'Personnel Queries',
    before: 'Call someone who might know',
    after: 'Ask AI: "Who is on Guard-I today?" — instant',
  },
  {
    area: 'Audit Trail',
    before: 'None',
    after: 'Every action logged — who, what, when, why',
  },
];

export const TECH_STACK: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', version: '18.2', purpose: 'UI framework with lazy-loaded pages' },
      { name: 'TypeScript', version: '5.2', purpose: 'Type safety across frontend' },
      { name: 'Tailwind CSS', version: '3.3', purpose: 'Utility-first responsive styling' },
      { name: 'React Router', version: '6.20', purpose: 'Client-side routing with protected routes' },
      { name: 'Recharts', purpose: 'Dashboard analytics and data visualization' },
      { name: 'Leaflet', purpose: 'Interactive maps for guard locations' },
      { name: 'React Hook Form + Zod', purpose: 'Form management with schema validation' },
      { name: 'Web Speech API', purpose: 'Voice input and text-to-speech' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Java', version: '21', purpose: 'Backend language — modern features, performance' },
      { name: 'Spring Boot', version: '3.4.4', purpose: 'Application framework — web, security, data' },
      { name: 'Spring Security', version: '6.x', purpose: 'JWT auth, RBAC, ABAC enforcement' },
      { name: 'PostgreSQL', version: '16', purpose: 'Primary database with RLS policies' },
      { name: 'pgvector', purpose: 'Vector similarity search for document RAG' },
      { name: 'Resilience4j', purpose: 'Circuit breaker for AI service calls' },
      { name: 'Apache Tika + Tesseract', purpose: 'Document text extraction and OCR' },
      { name: 'Caffeine', purpose: 'In-memory caching for reference data' },
      { name: 'Flyway', purpose: 'Database migration management' },
      { name: 'Docker Compose', purpose: 'Local development environment' },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'Groq API (Llama 3.3 70B)', purpose: 'NLU, intent classification, tool selection' },
      { name: 'Ollama (all-minilm)', purpose: 'Local embeddings — data never leaves server' },
      { name: 'Web Speech API', purpose: 'Browser-native speech recognition' },
    ],
  },
];

export const ARCH_DECISIONS: ArchDecision[] = [
  {
    decision: 'LLM Provider',
    chosen: 'Groq (Llama 3.3 70B)',
    considered: 'OpenAI GPT-4, self-hosted Ollama',
    reasoning: 'Open-source model (no vendor lock-in), fastest inference via Groq LPU, cost-effective',
  },
  {
    decision: 'Database',
    chosen: 'PostgreSQL 16 + pgvector',
    considered: 'MySQL, MongoDB',
    reasoning: 'pgvector for RAG, Row-Level Security, JSON support for flexibility',
  },
  {
    decision: 'Embedding Strategy',
    chosen: 'Ollama (local)',
    considered: 'OpenAI embeddings',
    reasoning: 'Document content never leaves the server — privacy requirement',
  },
  {
    decision: 'Auth Mechanism',
    chosen: 'JWT (short-lived)',
    considered: 'Session cookies',
    reasoning: 'Stateless backend, works with API gateway, mobile-ready',
  },
];

export const DESIGN_PATTERNS_GROUPED: { category: string; color: string; patterns: DesignPattern[] }[] = [
  {
    category: 'AI Pipeline',
    color: '#ff6b4a',
    patterns: [
      { name: 'Facade', location: 'ChatService', reason: 'Single orchestrator for the entire AI pipeline - one entry point simplifies the controller and centralizes security checks' },
      { name: 'Chain of Responsibility', location: 'Request Pipeline', reason: 'Each stage (Sanitize > NLU > Prompt > LLM > Tool > Authorize > Execute) processes and passes to the next, with the ability to short-circuit' },
      { name: 'Strategy', location: 'Document Parsers', reason: 'Each document type (Roster, Form 168, Platoon Chart) selects its own parsing strategy at runtime' },
    ],
  },
  {
    category: 'Security & Data Integrity',
    color: '#3b82f6',
    patterns: [
      { name: 'Token-Based Sanitization', location: 'DataSanitizerService', reason: 'All PII replaced with session-scoped tokens (PERSON_1, BADGE_1) before reaching the LLM - resolved back after response' },
      { name: 'Confirmation Gate', location: 'ConfirmationService', reason: 'Every write operation generates a 60-second confirmation token - no silent mutations in a law enforcement system' },
      { name: 'Soft Delete', location: 'All Entities', reason: 'No physical deletes anywhere - status flags preserve data for recovery and audit trail compliance' },
      { name: 'Repository', location: 'Spring Data JPA', reason: 'All database access through parameterized queries only - raw SQL is structurally impossible' },
    ],
  },
  {
    category: 'Resilience',
    color: '#10b981',
    patterns: [
      { name: 'Circuit Breaker', location: 'Groq API Calls', reason: 'Resilience4j prevents cascading failures when the AI service is down - graceful fallback to manual UI' },
    ],
  },
  {
    category: 'Frontend Architecture',
    color: '#8b5cf6',
    patterns: [
      { name: 'Observer', location: 'DataStore Events', reason: 'Custom event dispatching lets UI components react to data changes without tight coupling' },
      { name: 'Lazy Loading', location: 'React.lazy() Pages', reason: 'Code-split by route for faster initial load - each page loads only when navigated to' },
      { name: 'Context Pattern', location: 'Auth / Theme / Language', reason: 'Global state shared via React Context providers - no prop drilling across the component tree' },
    ],
  },
];

export const DEV_CHANGES: DevChange[] = [
  { original: 'Direct Groq calls from browser', changedTo: 'All LLM calls routed through backend', reason: 'Security — browser cannot be trusted with API keys' },
  { original: 'Single LLM for everything', changedTo: 'Groq for chat + Ollama for embeddings', reason: 'Privacy — document content stays local' },
  { original: 'Auto-execute AI suggestions', changedTo: 'Confirmation required for all writes', reason: 'Safety — no silent mutations in law enforcement system' },
];

export const SCREENSHOTS: Screenshot[] = [
  { src: '/workboard/1.png', alt: 'AI-powered dashboard showing personnel overview and section metrics' },
  { src: '/workboard/2.png', alt: 'Natural language chat interface for duty management commands' },
  { src: '/workboard/3.png', alt: 'Duty roster calendar with platoon rotation schedule' },
  { src: '/workboard/4.png', alt: 'Personnel management view with rank hierarchy and status tracking' },
  { src: '/workboard/5.png', alt: 'Leave management interface with balance tracking and approval workflow' },
  { src: '/workboard/6.png', alt: 'Security audit trail showing logged actions with source tracking' },
];

export const FEATURE_DOMAINS: FeatureDomain[] = [
  {
    icon: '👥',
    title: 'Personnel Management',
    description: '572+ personnel across 3 sections with rank hierarchy, badge-based identification, and real-time status tracking (active, on-leave, training, suspended).',
  },
  {
    icon: '📋',
    title: 'Duty Management',
    description: '15-day platoon rotation across 22 guard locations with shift management, VIP escorts, and ad-hoc assignments — all with full audit trail.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Features',
    description: 'Natural language chat in English and Kannada, voice commands, document OCR with structured data extraction, and AI-generated fair duty schedules.',
  },
  {
    icon: '🏖️',
    title: 'Leave Management',
    description: '11 leave types with balance tracking, carry-forward rules, duty conflict detection, and rank-based approval workflow.',
  },
  {
    icon: '🔐',
    title: 'Security & Compliance',
    description: 'Zero Trust LLM architecture — PII never reaches the AI. JWT auth, RBAC + ABAC at every layer, immutable audit trail, AES-256 encryption at rest.',
  },
];

export const SECURITY_LAYERS: string[] = [
  'TLS 1.3 everywhere',
  'JWT auth (30-min access, 7-day refresh)',
  'RBAC (rank hierarchy) + ABAC (section, ownership)',
  'PII masking before LLM',
  'Parameterized queries only',
  'Confirmation gates for all writes',
  'Immutable append-only audit logs',
  'AES-256 encryption at rest',
  'Soft delete policy — no physical deletes',
];

export const RBAC_HIERARCHY: { rank: string; access: string }[] = [
  { rank: 'DCP', access: 'Full access — all sections, all personnel, soft delete' },
  { rank: 'ACP', access: 'All sections — edit own section subordinates' },
  { rank: 'RPI', access: 'Own section + reports — approve RSI and below' },
  { rank: 'RSI', access: 'Own section — approve ARSI and below' },
  { rank: 'ARSI', access: 'View AHC + APC in section' },
  { rank: 'AHC', access: 'View APC + own data' },
  { rank: 'APC', access: 'Own data only' },
];

export const CURRENT_BEHAVIOUR: { area: string; howItWorks: string; painPoint: string }[] = [
  { area: 'Duty Rostering', howItWorks: 'Paper rosters, spreadsheets', painPoint: 'Hours to create, cascading changes on any modification' },
  { area: 'Leave Requests', howItWorks: 'Physical letters through chain of command', painPoint: 'Days to process, no balance tracking, lost paperwork' },
  { area: 'Daily Attendance (Form 168)', howItWorks: 'Handwritten daily', painPoint: 'Cannot query history, no analytics' },
  { area: 'Ad-hoc Assignments', howItWorks: 'Phone calls, verbal orders', painPoint: 'No audit trail, miscommunication' },
  { area: 'Platoon Rotation', howItWorks: 'Manual 15-day cycle tracking', painPoint: 'Errors in rotation, unfair distribution' },
  { area: 'Strength Reporting', howItWorks: 'Manual counting from registers', painPoint: 'Outdated by the time it is compiled' },
  { area: 'Document Management', howItWorks: 'Scanned PDFs, photocopies', painPoint: 'Cannot search or extract data' },
  { area: 'Personnel Queries', howItWorks: 'Call someone who might know', painPoint: 'Slow, unreliable, no single source of truth' },
];

export const SOLUTION_WHAT_CHANGED: BeforeAfterRow[] = [
  { area: 'Duty Rostering', before: 'Paper, hours of work', after: 'AI generates fair schedules in seconds, respecting all rules' },
  { area: 'Leave Requests', before: 'Physical letters, days to process', after: 'Type or say "Apply 5 days EL for AHC 2573" — done in seconds' },
  { area: 'Daily Attendance', before: 'Handwritten Form 168', after: 'Upload the form → OCR extracts data → officer confirms → saved' },
  { area: 'Ad-hoc Assignments', before: 'Phone calls', after: 'Create via chat or voice with full audit trail' },
  { area: 'Platoon Rotation', before: 'Manual tracking', after: 'Automated 15-day rotation engine with conflict detection' },
  { area: 'Strength Reporting', before: 'Manual counting', after: 'Real-time dashboard with sanctioned vs actual vs vacancy' },
  { area: 'Document Management', before: 'Scanned PDFs', after: 'Upload → OCR → structured data extraction → searchable' },
  { area: 'Personnel Queries', before: 'Call someone', after: 'Ask the AI: "Who is on Guard-I today?" — instant answer' },
  { area: 'Audit Trail', before: 'None', after: 'Every action logged — who, what, when, from where, why' },
];

export const WHY_AI_CAPABILITIES: { capability: string; reason: string }[] = [
  { capability: 'Natural Language Commands', reason: 'Officers speak in their natural language (English or Kannada). No training needed. "Who is on Guard-I today?" is faster than navigating 3 screens.' },
  { capability: 'Voice-First Interface', reason: 'Field officers may not have time to type. Voice commands while on duty are practical.' },
  { capability: 'Document Intelligence', reason: 'Hundreds of existing paper forms need digitization. OCR + AI parsing converts them to structured data in minutes instead of hours of manual entry.' },
  { capability: 'Intent Understanding', reason: '"Show me Vasantha\'s schedule" and "What duty is AHC 2573 on?" mean the same thing. AI handles this naturally.' },
  { capability: 'Ad-hoc Query Flexibility', reason: 'Officers ask questions the system wasn\'t explicitly designed for. AI can interpret and route to the right data.' },
  { capability: 'Multilingual Support', reason: 'Kannada-speaking officers can interact in their native language without translation overhead.' },
];

export const AI_ESSENTIAL: { useCase: string; withoutAI: string; withAI: string; verdict: string }[] = [
  { useCase: 'Voice commands in the field', withoutAI: 'Not possible', withAI: 'Officers speak naturally', verdict: 'Essential' },
  { useCase: 'Document OCR + parsing', withoutAI: 'Manual data entry (hours)', withAI: 'Upload → extract → confirm (minutes)', verdict: 'Essential' },
  { useCase: 'Natural language queries', withoutAI: 'Rigid search forms', withAI: '"Who is absent today?"', verdict: 'High value' },
  { useCase: 'Multilingual interaction', withoutAI: 'Separate UI per language', withAI: 'Speak in Kannada, get Kannada response', verdict: 'High value' },
  { useCase: 'Ad-hoc duty requests', withoutAI: 'Phone calls, no trail', withAI: 'Chat command with full audit', verdict: 'High value' },
];

export const AI_OPTIONAL: { useCase: string; traditional: string; aiAdvantage: string }[] = [
  { useCase: 'Leave request creation', traditional: 'Fill a form', aiAdvantage: 'Faster via voice, but form works too' },
  { useCase: 'Schedule viewing', traditional: 'Navigate to calendar page', aiAdvantage: '"Show my schedule" is convenient, not essential' },
  { useCase: 'Personnel lookup', traditional: 'Search bar with filters', aiAdvantage: 'Natural language is easier but search works' },
];

export const LLM_COMPARISON: { factor: string; groq: string; selfHosted: string; openai: string }[] = [
  { factor: 'Speed', groq: 'Very fast (Groq\'s LPU hardware)', selfHosted: 'Slower (depends on GPU)', openai: 'Moderate' },
  { factor: 'Cost', groq: 'Free tier available, paid for production', selfHosted: 'Hardware cost only', openai: 'Expensive per token' },
  { factor: 'Data Privacy', groq: 'Data sent to Groq servers (we sanitize first)', selfHosted: 'Data stays local', openai: 'Data sent to OpenAI' },
  { factor: 'Multilingual (Kannada)', groq: 'Good with 70B model', selfHosted: 'Depends on model', openai: 'Excellent' },
  { factor: 'Tool Calling', groq: 'Supported', selfHosted: 'Supported', openai: 'Excellent' },
  { factor: 'Availability', groq: '99.9% SLA on paid tier', selfHosted: 'Depends on your infra', openai: '99.9% SLA' },
  { factor: 'Vendor Lock-in', groq: 'Low (Llama is open-source)', selfHosted: 'None', openai: 'High' },
];

export const LLM_TRADEOFFS: { tradeoff: string; decision: string; reasoning: string }[] = [
  { tradeoff: 'Speed vs Cost', decision: 'Groq free tier for dev, paid for production', reasoning: 'Groq\'s LPU is the fastest inference available' },
  { tradeoff: 'Privacy vs Quality', decision: 'Sanitize data + use external LLM', reasoning: '70B quality is worth it when data is anonymized' },
  { tradeoff: 'Local vs Cloud LLM', decision: 'Cloud for inference, local for embeddings', reasoning: 'Best of both worlds — quality + privacy' },
  { tradeoff: 'Single LLM vs Multiple', decision: 'Groq for chat, Ollama for embeddings', reasoning: 'Each tool for its strength' },
  { tradeoff: 'Streaming vs Batch', decision: 'Batch responses (streaming planned)', reasoning: 'Simpler initial implementation' },
];

export const LLM_LIMITATIONS: { limitation: string; handling: string }[] = [
  { limitation: 'LLM can hallucinate', handling: 'LLM only selects tools and parameters — actual data comes from the database' },
  { limitation: 'LLM can be prompt-injected', handling: 'Input sanitization + Java-level authorization (LLM cannot bypass security)' },
  { limitation: 'LLM adds latency', handling: '40-60% of commands resolved locally without LLM call' },
  { limitation: 'LLM has rate limits', handling: 'Circuit breaker + graceful fallback to manual UI' },
  { limitation: 'LLM may mix languages', handling: 'Strong system prompt + Unicode validation + retry on mismatch' },
];

export const LLM_DATA_VISIBILITY: { dataType: string; sentToLLM: string; handling: string }[] = [
  { dataType: 'Officer\'s natural language query', sentToLLM: 'Yes — sanitized', handling: 'SQL-like patterns stripped, escape characters removed' },
  { dataType: 'Personnel names', sentToLLM: 'Never', handling: 'Replaced with tokens (PERSON_1, PERSON_2)' },
  { dataType: 'Badge numbers', sentToLLM: 'Never', handling: 'Replaced with tokens (BADGE_1)' },
  { dataType: 'Phone numbers', sentToLLM: 'Never', handling: 'Completely removed' },
  { dataType: 'Query results', sentToLLM: 'Never', handling: 'Results go directly from database to officer' },
  { dataType: 'Document content', sentToLLM: 'Never sent to Groq', handling: 'OCR and parsing happen locally via Ollama' },
];

export const SECURITY_MEASURES: { layer: string; protection: string }[] = [
  { layer: 'Transport', protection: 'TLS 1.3 everywhere' },
  { layer: 'Authentication', protection: 'JWT (30-min access, 7-day refresh), SCRAM-SHA-256 for DB' },
  { layer: 'Authorization', protection: 'RBAC (rank hierarchy) + ABAC (section, ownership, time-based)' },
  { layer: 'LLM Security', protection: 'PII masking, results bypass LLM, tool authorization at Java layer' },
  { layer: 'Prompt Injection', protection: 'Input sanitization, hardened system prompt, LLM cannot execute directly' },
  { layer: 'Database', protection: 'Row-Level Security, parameterized queries only, no raw SQL' },
  { layer: 'Write Operations', protection: 'Confirmation required, 60-second token expiry' },
  { layer: 'Audit', protection: 'Immutable append-only logs, separate schema, external SIEM in production' },
  { layer: 'Data at Rest', protection: 'AES-256 for PII columns, encrypted file storage, encrypted backups' },
  { layer: 'Soft Delete', protection: 'No physical deletes — all records recoverable' },
  { layer: 'Inactivity', protection: 'Auto-logout after 10 minutes with 2-minute warning' },
];

export const EXTENDED_ARCH_DECISIONS: ArchDecision[] = [
  { decision: 'Frontend Framework', chosen: 'React + TypeScript', considered: 'Angular, Vue', reasoning: 'React\'s ecosystem, TypeScript for safety, team expertise' },
  { decision: 'Backend Framework', chosen: 'Spring Boot 3.4', considered: 'Node.js, Django', reasoning: 'Java 21 performance, Spring Security maturity, enterprise-grade' },
  { decision: 'Database', chosen: 'PostgreSQL 16 + pgvector', considered: 'MySQL, MongoDB', reasoning: 'pgvector for RAG, RLS for security, JSON support for flexibility' },
  { decision: 'LLM Provider', chosen: 'Groq (Llama 3.3 70B)', considered: 'OpenAI, self-hosted', reasoning: 'Open-source model (no vendor lock-in), Groq speed, cost-effective' },
  { decision: 'Embedding Model', chosen: 'Ollama (local)', considered: 'OpenAI embeddings', reasoning: 'Document content never leaves the server — privacy requirement' },
  { decision: 'Auth Mechanism', chosen: 'JWT (short-lived)', considered: 'Session cookies', reasoning: 'Stateless backend, works with API gateway, mobile-ready' },
  { decision: 'State Management', chosen: 'React Context', considered: 'Redux, Zustand', reasoning: 'Sufficient for this app\'s complexity, no extra dependency' },
  { decision: 'Styling', chosen: 'Tailwind CSS', considered: 'CSS Modules, Styled Components', reasoning: 'Rapid development, consistent design, small bundle' },
  { decision: 'Build Tool', chosen: 'Vite', considered: 'Webpack, CRA', reasoning: 'Faster dev server, better HMR, modern defaults' },
  { decision: 'OCR Engine', chosen: 'Apache Tika + Tesseract', considered: 'Google Vision, AWS Textract', reasoning: 'Runs locally (no cloud dependency), supports Kannada' },
  { decision: 'Caching', chosen: 'Caffeine (in-memory)', considered: 'Redis', reasoning: 'Sufficient for single-instance deployment, no infra overhead' },
  { decision: 'Resilience', chosen: 'Resilience4j', considered: 'Hystrix, custom', reasoning: 'Spring Boot 3 native support, active maintenance' },
];

export const EXTENDED_DEV_CHANGES: DevChange[] = [
  { original: 'Direct Groq calls from browser', changedTo: 'All LLM calls routed through backend', reason: 'Security — browser cannot be trusted with API keys or raw data' },
  { original: 'Single LLM for everything', changedTo: 'Groq for chat + Ollama for embeddings', reason: 'Privacy — document content stays local' },
  { original: 'Auto-execute AI suggestions', changedTo: 'Confirmation required for all writes', reason: 'Safety — no silent mutations in law enforcement system' },
  { original: 'Mock LLM for demo', changedTo: 'Real Groq integration with mock fallback', reason: 'Production readiness while keeping demo capability' },
  { original: 'Simple role check', changedTo: 'Full RBAC + ABAC + tool-level authorization', reason: 'Law enforcement data requires granular access control' },
];

export const REQUEST_FLOW_STEPS: { step: number; component: string; action: string; securityCheck: string }[] = [
  { step: 1, component: 'ChatbotPanel', action: 'Captured user input, showed loading state', securityCheck: '—' },
  { step: 2, component: 'groqService', action: 'Sent message to backend with JWT token', securityCheck: 'JWT attached' },
  { step: 3, component: 'Spring Security', action: 'Validated JWT signature and expiry', securityCheck: 'Authentication' },
  { step: 4, component: 'LanguageDetection', action: 'Detected English (Unicode range check)', securityCheck: '—' },
  { step: 5, component: 'NLU Service', action: 'Extracted duty type and date locally (no LLM needed)', securityCheck: '—' },
  { step: 6, component: 'DataSanitizer', action: 'Checked for PII to mask (none in this query)', securityCheck: 'PII protection' },
  { step: 7, component: 'PromptBuilder', action: 'Built sanitized prompt with tool definitions', securityCheck: '—' },
  { step: 8, component: 'Groq API', action: 'LLM selected the right tool and parameters', securityCheck: '—' },
  { step: 9, component: 'Authorization', action: 'Verified user can execute this tool for this data', securityCheck: 'RBAC + ABAC' },
  { step: 10, component: 'Database', action: 'Executed parameterized query', securityCheck: 'No raw SQL' },
  { step: 11, component: 'Backend', action: 'Formatted results locally — LLM never saw the data', securityCheck: 'Data isolation' },
  { step: 12, component: 'AuditService', action: 'Logged the complete action with context', securityCheck: 'Audit trail' },
  { step: 13, component: 'Frontend', action: 'Displayed formatted results to officer', securityCheck: '—' },
];

export const DB_KEY_TABLES: { table: string; records: string; purpose: string }[] = [
  { table: 'personnel', records: '572+', purpose: 'All officers with rank, badge, status, contact' },
  { table: 'sections', records: '3', purpose: 'Section A (Fixed), B (Support), C (Rotational)' },
  { table: 'duty_assignments', records: 'Dynamic', purpose: 'Current and historical duty postings' },
  { table: 'section_members', records: '572+', purpose: 'Personnel-to-section mapping with sub-section detail' },
  { table: 'platoon_rotations', records: '5 per cycle', purpose: '15-day rotation schedule for 5 platoons' },
  { table: 'platoon_members', records: '277', purpose: 'Section C personnel-to-platoon mapping' },
  { table: 'leave_requests', records: 'Dynamic', purpose: 'Leave applications with approval workflow' },
  { table: 'leave_balances', records: '572 × 11 types', purpose: 'Per-person per-year balance for all leave types' },
  { table: 'daily_attendance', records: 'Daily', purpose: 'Form 168 data — duty/status snapshot' },
  { table: 'audit_logs', records: 'Append-only', purpose: 'Immutable record of every system action' },
  { table: 'uploaded_documents', records: 'Dynamic', purpose: 'Scanned forms and rosters' },
  { table: 'document_chunks', records: 'Dynamic', purpose: 'OCR text chunks with pgvector embeddings for RAG' },
];
