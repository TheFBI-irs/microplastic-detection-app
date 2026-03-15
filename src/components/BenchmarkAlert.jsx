import { useState } from 'react';

const BENCHMARKS = {
  tap: {
    label: 'Tap Water',
    desc: 'Municipal drinking water (p/mL)',
    levels: [
      { max: 0.02, label: 'Normal / Background', color: 'emerald', text: 'Consistent with many municipal systems and the ~5 p/L global average.' },
      { max: 0.1, label: 'Concerning (Elevated)', color: 'amber', text: 'At the upper end of reported tap-water values. Indicates higher source contamination or less effective treatment.' },
      { max: Infinity, label: 'Very High / Unusual', color: 'red', text: 'In the realm of heavily contaminated systems. Warrants confirming methods and checking local issues (e.g., old pipes).' },
    ]
  },
  bottled: {
    label: 'Bottled Water',
    desc: 'Store-bought bottled water (p/mL)',
    levels: [
      { max: 0.3, label: 'Normal for Bottled', color: 'emerald', text: 'Typical for current products (often higher than tap due to packaging).' },
      { max: 1.0, label: 'Concerning', color: 'amber', text: 'Higher than typical for microplastics compared to peer products.' },
      { max: Infinity, label: 'Very High / Extreme', color: 'red', text: 'Extreme levels relative to typical bottled water values.' },
    ]
  },
  ocean: {
    label: 'Ocean Surface',
    desc: 'Open sea surface water (p/mL)',
    levels: [
      { max: 0.0001, label: 'Normal / Background', color: 'emerald', text: 'Typical low concentrations for open-ocean surface waters.' },
      { max: 0.001, label: 'Concerning', color: 'amber', text: 'Typical for coastal accumulation zones or gyre-influenced areas.' },
      { max: Infinity, label: 'Very High / Hotspot', color: 'red', text: 'Usually near urban outfalls or enclosed seas. Associated with visible pollution.' },
    ]
  },
  river: {
    label: 'Rivers & Streams',
    desc: 'Flowing surface water (p/mL)',
    levels: [
      { max: 0.001, label: 'Normal / Background', color: 'emerald', text: 'Typical for rural or less impacted watersheds.' },
      { max: 0.01, label: 'Concerning', color: 'amber', text: 'Typical for rivers near large cities, industrial zones, or urbanized watersheds.' },
      { max: Infinity, label: 'Very High / Polluted', color: 'red', text: 'At or above the most contaminated systems globally (e.g. heavily polluted deltas).' },
    ]
  },
  lake: {
    label: 'Ponds & Lakes',
    desc: 'Standing surface water (p/mL)',
    levels: [
      { max: 0.001, label: 'Normal / Background', color: 'emerald', text: 'Similar to lightly impacted rivers/coastal waters.' },
      { max: 0.01, label: 'Concerning', color: 'amber', text: 'Suggests local inputs (runoff, litter, wastewater, or heavy recreational activity).' },
      { max: Infinity, label: 'Very High / Hotspot', color: 'red', text: 'Likely near dense human activity or direct plastic waste inputs.' },
    ]
  }
};

export default function BenchmarkAlert({ particleCount, sampleVolumeML = 10 }) {
  const [sourceType, setSourceType] = useState('tap');

  // Calculate particles per mL
  const pML = particleCount / sampleVolumeML;

  const currentBenchmark = BENCHMARKS[sourceType];
  const severityLevel = currentBenchmark.levels.find(l => pML <= l.max) || currentBenchmark.levels[currentBenchmark.levels.length - 1];

  const colorThemes = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/30'
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      text: 'text-amber-400',
      badgeBg: 'bg-amber-500/20',
      badgeText: 'text-amber-300',
      badgeBorder: 'border-amber-500/30'
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      text: 'text-red-400',
      badgeBg: 'bg-red-500/20',
      badgeText: 'text-red-300',
      badgeBorder: 'border-red-500/30'
    }
  };

  const theme = colorThemes[severityLevel.color];

  return (
    <div className="card p-5 mt-6 border-slate-700/50 bg-slate-900/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.21 15.89A10 10 0 118 2.83" /><path d="M22 12A10 10 0 0012 2v10z" />
          </svg>
          Concentration Benchmark
        </h3>
        
        <div className="flex items-center gap-2">
          <label htmlFor="sourceType" className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Water Source:
          </label>
          <select
            id="sourceType"
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors cursor-pointer"
          >
            {Object.entries(BENCHMARKS).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={`p-4 rounded-xl relative overflow-hidden ${theme.bg} ${theme.border}`}>
        {/* Dynamic decorative background element */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none ${theme.bg}`} />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
          {/* Concentration display */}
          <div className="shrink-0 md:border-r border-slate-700/50 md:pr-6">
            <p className={`text-3xl font-bold ${theme.text} mb-1`}>
              {pML.toFixed(4).replace(/\.?0+$/, '')} <span className="text-sm font-medium text-slate-400">p/mL</span>
            </p>
            <p className="text-xs text-slate-500">
              Based on {sampleVolumeML}mL sample
            </p>
          </div>

          {/* Severity explanation */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                {severityLevel.label}
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {severityLevel.text}
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
        * Benchmarks based on scientific literature averages (e.g. 2022/2024 global reviews). 
        The WHO notes that current concentrations in drinking water are unlikely to pose a significant health risk, 
        and there are no official numeric danger cutoffs. These levels simply indicate how your sample compares to 
        typical environmental baselines.
      </p>
    </div>
  );
}
