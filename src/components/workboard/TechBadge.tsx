interface TechBadgeProps {
  name: string;
  purpose?: string;
}

export default function TechBadge({ name, purpose }: TechBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium bg-gray-100 text-dark-900 transition-all duration-200 hover:scale-105 hover:bg-gray-200 cursor-default"
    >
      {name}
      {purpose && (
        <span className="text-xs text-gray-500 font-normal">— {purpose}</span>
      )}
    </span>
  );
}
