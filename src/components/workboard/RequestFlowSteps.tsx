const STEPS: { label: string; description: string }[] = [
  { label: 'User Input', description: 'Chat command' },
  { label: 'Authentication', description: 'JWT validation' },
  { label: 'Language Detection', description: 'EN / Kannada' },
  { label: 'NLU', description: 'Intent + entities' },
  { label: 'Sanitization', description: 'PII masking' },
  { label: 'LLM Call', description: 'Groq API' },
  { label: 'Tool Authorization', description: 'RBAC + ABAC' },
  { label: 'Database Query', description: 'Parameterized SQL' },
  { label: 'Response Formatting', description: 'Bypasses LLM' },
  { label: 'Audit Logging', description: 'Who, what, when' },
];

export default function RequestFlowSteps() {
  return (
    <div className="w-full">
      <p className="sr-only">
        End-to-end chat command request flow in 10 steps: User Input,
        Authentication with JWT validation, Language Detection, Natural Language
        Understanding for intent and entity extraction, Sanitization with PII
        masking, LLM Call via Groq API, Tool Authorization with RBAC and ABAC,
        Database Query using parameterized SQL, Response Formatting that bypasses
        the LLM, and Audit Logging.
      </p>

      {/* Desktop: horizontal scrollable row */}
      <div
        className="hidden md:flex items-start gap-0 overflow-x-auto scrollbar-hide pb-4"
        aria-hidden="true"
      >
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center shrink-0">
            <Step number={i + 1} label={step.label} description={step.description} />
            {i < STEPS.length - 1 && (
              <span className="text-gray-300 text-lg font-bold px-1.5 shrink-0 mt-3">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="flex md:hidden flex-col items-start pl-4" aria-hidden="true">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-start gap-3">
            {/* Timeline line + circle */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-coral-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-0.5 h-8 bg-coral-200" />
              )}
            </div>
            {/* Label + description */}
            <div className="pb-4">
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                {step.label}
              </span>
              <span className="block text-xs text-gray-500 leading-tight mt-0.5">
                {step.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step({
  number,
  label,
  description,
}: {
  number: number;
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center min-w-[90px] max-w-[100px]">
      <div className="w-9 h-9 rounded-full bg-coral-500 text-white text-sm font-bold flex items-center justify-center mb-1.5">
        {number}
      </div>
      <span className="text-xs font-bold text-gray-800 leading-tight">{label}</span>
      <span className="text-[10px] text-gray-500 leading-tight mt-0.5">{description}</span>
    </div>
  );
}
