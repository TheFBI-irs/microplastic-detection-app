const tabs = [
  { id: 'intro', label: 'Introduction' },
  { id: 'scan', label: 'Scan & Detect' },
  { id: 'science', label: 'The Science' },
  { id: 'model', label: 'Our Model' },
  { id: 'about', label: 'About Us' },
];

export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row: logo + badges */}
        <div className="h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="text-sm sm:text-lg font-bold tracking-tight text-cyan-400">
              Low-cost AI-Powered Microplastic Detection Kit
            </span>
          </div>

          {/* Model badges (hidden on small screens) */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-medium text-cyan-300 border border-cyan-500/40 rounded-full px-3 py-1">
              CSEF 2026
            </span>
            <span className="text-xs font-medium text-cyan-300 border border-cyan-500/40 rounded-full px-3 py-1">
              SR - Environmental Engineering
            </span>
          </div>
        </div>

        {/* Tab navigation */}
        <nav className="-mb-px flex overflow-x-auto scrollbar-hide gap-1" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 shrink-0
                ${activeTab === tab.id
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-600'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
