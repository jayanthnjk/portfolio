import type { PanelConfig } from '../../types';

interface WikiNavigationProps {
  panels: PanelConfig[];
  activePanelId: string;
  onNavigate: (panelId: string) => void;
}

export default function WikiNavigation({ panels, activePanelId, onNavigate }: WikiNavigationProps) {
  return (
    <>
      {/* Desktop sidebar navigation */}
      <nav aria-label="Wiki section navigation" className="hidden lg:block sticky top-24 w-64 shrink-0">
        <ul className="flex flex-col gap-1">
          {panels.map((panel) => {
            const isActive = panel.id === activePanelId;
            return (
              <li key={panel.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(panel.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`w-full text-left px-4 py-2.5 rounded-r-lg text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:outline-none ${
                    isActive
                      ? 'text-coral-500 border-l-2 border-coral-500 bg-coral-50/50'
                      : 'text-gray-600 hover:text-dark-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2" aria-hidden="true">{panel.icon}</span>
                  {panel.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile horizontal tab bar */}
      <nav aria-label="Wiki section navigation" className="lg:hidden overflow-x-auto scrollbar-hide">
        <ul className="flex gap-1">
          {panels.map((panel) => {
            const isActive = panel.id === activePanelId;
            return (
              <li key={panel.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(panel.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`px-3 py-2 whitespace-nowrap text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:outline-none ${
                    isActive
                      ? 'border-b-2 border-coral-500 text-coral-500'
                      : 'text-gray-600'
                  }`}
                >
                  <span className="mr-1.5" aria-hidden="true">{panel.icon}</span>
                  {panel.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
