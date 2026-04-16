import type { FeatureDomain } from '../../types';

interface FeatureDomainCardProps {
  domain: FeatureDomain;
}

export default function FeatureDomainCard({ domain }: FeatureDomainCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="text-2xl mb-3" aria-hidden="true">{domain.icon}</div>
      <h4 className="font-semibold text-dark-900">{domain.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{domain.description}</p>
    </div>
  );
}
