import type { DesignPattern } from '../../types';

interface DesignPatternCardProps {
  pattern: DesignPattern;
}

export default function DesignPatternCard({ pattern }: DesignPatternCardProps) {
  return (
    <div className="border-l-4 border-coral-500 bg-white rounded-r-lg p-4">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-semibold text-dark-900">{pattern.name}</span>
        <span className="text-sm text-gray-500">{pattern.location}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{pattern.reason}</p>
    </div>
  );
}
