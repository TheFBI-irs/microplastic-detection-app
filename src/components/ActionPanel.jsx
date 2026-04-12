import { BENCHMARKS } from './BenchmarkAlert';

// SVG Icons for reuse
const FilterIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const BottleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15.2 22H8.8a1.2 1.2 0 0 1-1.2-1.2V8a1.6 1.6 0 0 1 1.6-1.6h5.6A1.6 1.6 0 0 1 16.4 8v12.8a1.2 1.2 0 0 1-1.2 1.2Z" />
    <path d="M10 6.4V4.8C10 3.8 10.6 3 11.6 3h.8c1 0 1.6.8 1.6 1.8v1.6" />
    <path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
  </svg>
);

const UtilitiesIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    <line x1="12" y1="22" x2="12" y2="17" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const FlameIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 3.5 6.5 1.5 2 1 4.5-1 6.126" />
    <path d="M12 22c4.418 0 8-3.582 8-8 0-4.418-4.418-9-8-14-3.582 5-8 9.582-8 14 0 4.418 3.582 8 8 8z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function ActionPanel({ particleCount, sampleVolumeML = 10, sourceType }) {
  // Compute pML and determine severity
  const pML = particleCount / sampleVolumeML;
  const currentBenchmark = BENCHMARKS[sourceType];
  const severityLevel = currentBenchmark.levels.find(l => pML <= l.max) || currentBenchmark.levels[currentBenchmark.levels.length - 1];

  let borderColorClass = 'border-l-emerald-500/60';
  if (severityLevel.color === 'amber') borderColorClass = 'border-l-amber-500/60';
  if (severityLevel.color === 'red') borderColorClass = 'border-l-red-500/60';

  let iconColorClass = 'text-emerald-400';
  if (severityLevel.color === 'amber') iconColorClass = 'text-amber-400';
  if (severityLevel.color === 'red') iconColorClass = 'text-red-400';

  // Determine actions based on source type and severity
  const immediateActions = [];

  if (sourceType === 'tap') {
    immediateActions.push({
      id: 'tap-filter',
      title: 'Switch to a Water Filter Pitcher',
      desc: 'Pitchers like Brita or ZeroWater use activated carbon filters that effectively trap many microplastics from municipal sources.',
      icon: <FilterIcon />
    });
    immediateActions.push({
      id: 'tap-microwave',
      title: 'Stop Microwaving Plastics',
      desc: 'Heat significantly accelerates plastic degradation. Use glass or ceramic containers to heat food instead.',
      icon: <FlameIcon />
    });
    immediateActions.push({
      id: 'tap-bottle',
      title: 'Use Alternative Bottles',
      desc: 'Switch to a reliable stainless steel or glass water bottle for daily hydration to prevent continuous shedding.',
      icon: <BottleIcon />
    });
    if (severityLevel.color === 'red') {
      immediateActions.push({
        id: 'tap-utility',
        title: 'Contact Local Water Utility',
        desc: 'Request their latest particle analysis report and ask about the filtration protocols and infrastructure age in your area.',
        icon: <UtilitiesIcon />
      });
    }
  } else if (sourceType === 'bottled') {
    immediateActions.push({
      id: 'bottled-switch',
      title: 'Switch to Filtered Tap Water',
      desc: 'Bottled water often contains higher plastic particle concentrations than municipal tap water due to packaging degradation.',
      icon: <FilterIcon />
    });
    immediateActions.push({
      id: 'bottled-refuse',
      title: 'Avoid Single-Use Plastics',
      desc: 'By carrying a reusable metal or glass bottle, you reduce both personal exposure and your overall plastic footprint.',
      icon: <BottleIcon />
    });
    if (severityLevel.color === 'amber' || severityLevel.color === 'red') {
      immediateActions.push({
        id: 'bottled-high',
        title: 'Mind the Packaging',
        desc: 'Certain materials (like PET plastics) shed differently in heat or sunlight. Store any necessary bottled water in cool, dark environments.',
        icon: <TrashIcon />
      });
    }
  } else {
    // Environmental: ocean, river, lake
    // Environmental: ocean, river, lake
    if (severityLevel.color === 'emerald') {
      immediateActions.push({
        id: 'env-cleanup',
        title: 'Join a Local Cleanup',
        desc: 'Participate in beach or river cleanups to stop macro-plastics before they degrade. Use the Ocean Conservancy trash tracker.',
        icon: <TrashIcon />
      });
      immediateActions.push({
        id: 'env-wash',
        title: 'Capture Laundry Fibers',
        desc: 'Synthetic clothing releases microfibers when washed. Use a Guppyfriend washing bag or install a washing machine filter.',
        icon: <FilterIcon />
      });
      immediateActions.push({
        id: 'env-report',
        title: 'Report Your Data',
        desc: 'Share your findings with local environmental agencies or water management boards to advocate for better local policies.',
        icon: <ReportIcon />
      });
    } else {
      // Amber or Red - Hotspot / Concerning levels
      immediateActions.push({
        id: 'env-investigate',
        title: 'Investigate Local Outfalls',
        desc: 'High concentrations suggest a nearby source. Check for storm drains, industrial runoff, or illegal dumping points in the vicinity.',
        icon: <SearchIcon />
      });
      immediateActions.push({
        id: 'env-alert',
        title: 'Alert Local Authorities',
        desc: 'Report this hotspot to local environmental boards. High readings can trigger official investigations and water quality remediation.',
        icon: <MegaphoneIcon />
      });
      immediateActions.push({
        id: 'env-infrastructure',
        title: 'Advocate for Infrastructure',
        desc: 'Push for advanced filtration at local wastewater treatment plants, which serve as the primary gatekeepers for our waterways.',
        icon: <UtilitiesIcon />
      });
    }
  }

  return (
    <div className="card p-5 mt-6 border-slate-700/50 bg-slate-900/50">
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M12 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
        <h3 className="text-xl font-bold text-slate-100">What You Can Do</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Immediate Actions Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Immediate Actions
          </h4>
          {immediateActions.map(action => (
            <div key={action.id} className={`card p-4 border-l-2 bg-slate-800/40 ${borderColorClass} hover:bg-slate-800/80 transition-colors`}>
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${iconColorClass}`}>
                  {action.icon}
                </div>
                <div>
                  <h5 className="font-bold text-slate-200 text-sm mb-1">{action.title}</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">{action.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Longer-Term Impact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Longer-Term Impact
          </h4>
          
          <div className="card p-4 border-l-2 border-l-slate-600 bg-slate-800/40 hover:bg-slate-800/80 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-400">
                <LeafIcon />
              </div>
              <div>
                <h5 className="font-bold text-slate-200 text-sm mb-1">Reduce Plastic at the Source</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Refuse single-use plastics. Choose glass, metal, or cardboard packaging, and buy loose produce instead of plastic-wrapped alternatives.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-4 border-l-2 border-l-slate-600 bg-slate-800/40 hover:bg-slate-800/80 transition-colors">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-400">
                <MegaphoneIcon />
              </div>
              <div>
                <h5 className="font-bold text-slate-200 text-sm mb-1">Demand Policy Change</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  Contact your city council members to push for single-use ordinances, plastic bag bans, and municipal filtration upgrades.
                </p>
                <a href="https://www.usa.gov/elected-officials" target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1">
                  Find your rep
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="card p-4 border border-cyan-500/30 bg-cyan-950/20 shadow-inner">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-cyan-400">
                <DatabaseIcon />
              </div>
              <div>
                <h5 className="font-bold text-cyan-300 text-sm mb-1">Contribute Your Data</h5>
                <p className="text-xs text-cyan-100/70 leading-relaxed">
                  Your reading has been logged in this session. If you share it with a citizen science platform like Litterati or the NOAA Marine Debris Tracker, it contributes to the global map of microplastic distribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-slate-500 mt-6 leading-relaxed border-t border-slate-800 pt-4">
        Recommendations are general guidance based on published environmental health literature. For health decisions, consult your local water utility or a certified testing lab.
      </p>
    </div>
  );
}
