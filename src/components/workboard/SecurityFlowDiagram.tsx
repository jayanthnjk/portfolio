export default function SecurityFlowDiagram() {
  return (
    <div className="w-full">
      <p className="sr-only">
        Zero Trust LLM data flow diagram showing seven steps: User Input, PII
        Sanitization where names become tokens like PERSON_1, LLM Processing
        where the LLM sees tokens only and never real data, Tool Authorization
        with RBAC and ABAC checks, Database Query using parameterized SQL,
        Results Bypass LLM where results go directly to the user and not back
        through the LLM, and finally User Response.
      </p>

      {/* Desktop: horizontal flow */}
      <div className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide pb-2" aria-hidden="true">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center shrink-0">
            <StepBox step={step} />
            {i < STEPS.length - 1 && <HorizontalArrow />}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="flex md:hidden flex-col items-center gap-0" aria-hidden="true">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center">
            <StepBox step={step} />
            {i < STEPS.length - 1 && <VerticalArrow />}
          </div>
        ))}
      </div>
    </div>
  );
}

interface Step {
  icon: string;
  label: string;
  subtitle?: string;
  color: 'blue' | 'amber' | 'red' | 'green' | 'red-highlight';
}

const STEPS: Step[] = [
  { icon: '💬', label: 'User Input', color: 'blue' },
  {
    icon: '🔒',
    label: 'PII Sanitization',
    subtitle: 'names → PERSON_1',
    color: 'amber',
  },
  {
    icon: '🤖',
    label: 'LLM Processing',
    subtitle: 'sees tokens only, never real data',
    color: 'red',
  },
  {
    icon: '✅',
    label: 'Tool Authorization',
    subtitle: 'RBAC + ABAC check',
    color: 'green',
  },
  {
    icon: '🗄️',
    label: 'Database Query',
    subtitle: 'parameterized SQL',
    color: 'green',
  },
  {
    icon: '⚡',
    label: 'Results Bypass LLM',
    subtitle: 'results go directly to user, NOT to LLM',
    color: 'red-highlight',
  },
  { icon: '👤', label: 'User Response', color: 'green' },
];

const COLOR_MAP: Record<Step['color'], { box: string; icon: string }> = {
  blue: {
    box: 'border-blue-200 bg-blue-50',
    icon: 'bg-blue-100',
  },
  amber: {
    box: 'border-amber-200 bg-amber-50',
    icon: 'bg-amber-100',
  },
  red: {
    box: 'border-red-300 bg-red-50',
    icon: 'bg-red-100',
  },
  green: {
    box: 'border-green-200 bg-green-50',
    icon: 'bg-green-100',
  },
  'red-highlight': {
    box: 'border-red-400 bg-red-100',
    icon: 'bg-red-200',
  },
};

function StepBox({ step }: { step: Step }) {
  const colors = COLOR_MAP[step.color];

  return (
    <div
      className={`flex flex-col items-center justify-start rounded-xl border-2 p-2.5 w-[95px] h-[120px] ${colors.box}`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg mb-1 shrink-0 ${colors.icon}`}
      >
        {step.icon}
      </div>
      <span className="text-[11px] font-bold text-gray-800 text-center leading-tight">
        {step.label}
      </span>
      {step.subtitle && (
        <span className="text-[9px] text-gray-500 text-center leading-tight mt-1">
          {step.subtitle}
        </span>
      )}
    </div>
  );
}

function HorizontalArrow() {
  return (
    <span className="text-gray-400 text-sm font-bold px-1 shrink-0">→</span>
  );
}

function VerticalArrow() {
  return (
    <span className="text-gray-400 text-lg leading-none py-1">↓</span>
  );
}
