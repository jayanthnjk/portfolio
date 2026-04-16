export default function ArchitectureDiagram() {
  return (
    <div className="w-full">
      <p className="sr-only">
        Architecture diagram showing five layers of the Karnataka State Police
        AI-Powered Data Management Platform. From top to bottom: the User
        Interface layer with React App, Voice Input, Document Upload, and AI
        Chat Panel; the API Gateway layer with Nginx handling TLS, rate
        limiting, and CORS; the Backend layer built on Spring Boot containing
        Auth, RBAC, Chat Service, NLU, Sanitizer, Tool Registry, RAG, and
        Business Services; the AI Layer with Groq API running Llama 3.3 70B and
        Ollama for local embeddings; and the Data Layer with PostgreSQL 16,
        pgvector, and Encrypted File Storage.
      </p>

      <div className="flex flex-col items-center gap-0">
        {/* Layer 1: User Interface */}
        <div className="w-full rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <h4 className="text-sm font-bold text-blue-800 mb-2">
            User Interface
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-800">React App</Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <span className="hidden md:inline">Voice Input</span>
              <span className="md:hidden">Voice</span>
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <span className="hidden md:inline">Document Upload</span>
              <span className="md:hidden">Docs</span>
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <span className="hidden md:inline">AI Chat Panel</span>
              <span className="md:hidden">Chat</span>
            </Badge>
          </div>
        </div>

        {/* Arrow */}
        <Arrow />

        {/* Layer 2: API Gateway */}
        <div className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
          <h4 className="text-sm font-bold text-gray-700 mb-2">
            API Gateway
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-200 text-gray-700">Nginx</Badge>
            <Badge className="bg-gray-200 text-gray-700">TLS</Badge>
            <Badge className="bg-gray-200 text-gray-700">
              <span className="hidden md:inline">Rate Limiting</span>
              <span className="md:hidden">Rate Limit</span>
            </Badge>
            <Badge className="bg-gray-200 text-gray-700">CORS</Badge>
          </div>
        </div>

        {/* Arrow */}
        <Arrow />

        {/* Layer 3: Backend (Spring Boot) */}
        <div className="w-full rounded-xl border-2 border-slate-700 bg-slate-800 p-4">
          <h4 className="text-sm font-bold text-white mb-2">
            Backend <span className="font-normal text-slate-300">(Spring Boot)</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-slate-700 text-slate-100">Auth</Badge>
            <Badge className="bg-slate-700 text-slate-100">RBAC</Badge>
            <Badge className="bg-slate-700 text-slate-100">
              <span className="hidden md:inline">Chat Service</span>
              <span className="md:hidden">Chat</span>
            </Badge>
            <Badge className="bg-slate-700 text-slate-100">NLU</Badge>
            <Badge className="bg-slate-700 text-slate-100">Sanitizer</Badge>
            <Badge className="bg-slate-700 text-slate-100">
              <span className="hidden md:inline">Tool Registry</span>
              <span className="md:hidden">Tools</span>
            </Badge>
            <Badge className="bg-slate-700 text-slate-100">RAG</Badge>
            <Badge className="bg-slate-700 text-slate-100">
              <span className="hidden md:inline">Business Services</span>
              <span className="md:hidden">Services</span>
            </Badge>
          </div>
        </div>

        {/* Arrow */}
        <Arrow />

        {/* Layer 4: AI Layer */}
        <div className="w-full rounded-xl border-2 border-coral-200 bg-coral-50 p-4">
          <h4 className="text-sm font-bold text-coral-800 mb-2">
            AI Layer
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-coral-100 text-coral-800">
              <span className="hidden md:inline">Groq API (Llama 3.3 70B)</span>
              <span className="md:hidden">Groq / Llama 3.3</span>
            </Badge>
            <Badge className="bg-coral-100 text-coral-800">
              <span className="hidden md:inline">Ollama (Local Embeddings)</span>
              <span className="md:hidden">Ollama</span>
            </Badge>
          </div>
        </div>

        {/* Arrow */}
        <Arrow />

        {/* Layer 5: Data Layer */}
        <div className="w-full rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <h4 className="text-sm font-bold text-green-800 mb-2">
            Data Layer
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-100 text-green-800">PostgreSQL 16</Badge>
            <Badge className="bg-green-100 text-green-800">pgvector</Badge>
            <Badge className="bg-green-100 text-green-800">
              <span className="hidden md:inline">Encrypted File Storage</span>
              <span className="md:hidden">Encrypted FS</span>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="py-1 text-gray-400 text-lg leading-none" aria-hidden="true">
      ↓
    </div>
  );
}

function Badge({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
