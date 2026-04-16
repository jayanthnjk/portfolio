import type { BeforeAfterRow } from '../../types';

interface BeforeAfterTableProps {
  rows: BeforeAfterRow[];
}

export default function BeforeAfterTable({ rows }: BeforeAfterTableProps) {
  return (
    <>
      {/* Desktop: semantic table */}
      <div className="hidden md:block w-full overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-dark-900 font-semibold">
              <th className="px-4 py-3 border-b border-gray-200">Area</th>
              <th className="px-4 py-3 border-b border-gray-200">Before</th>
              <th className="px-4 py-3 border-b border-gray-200">After</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.area} className="border-b last:border-b-0 border-gray-100">
                <td className="px-4 py-3 font-medium text-dark-900">{row.area}</td>
                <td className="px-4 py-3 bg-red-50">{row.before}</td>
                <td className="px-4 py-3 bg-green-50">{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.area} className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-2 bg-gray-50 font-semibold text-dark-900 text-sm">
              {row.area}
            </div>
            <div className="px-4 py-2 bg-red-50 text-sm">
              <span className="font-medium text-dark-900">Before: </span>
              {row.before}
            </div>
            <div className="px-4 py-2 bg-green-50 text-sm">
              <span className="font-medium text-dark-900">After: </span>
              {row.after}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
