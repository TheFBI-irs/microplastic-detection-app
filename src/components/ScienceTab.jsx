const protocolSteps = [
  {
    num: 1,
    title: 'Sample Collection',
    detail: 'Collect 10mL of water in a clean glass vial from your target source — tap water, river, ocean, rainwater, etc. Use a clean pipette to avoid cross-contamination.',
    note: 'Glass vials are preferred over plastic to prevent leaching of microplastics from the container itself.',
  },
  {
    num: 2,
    title: 'Nile Red Staining',
    detail: 'Add 0.5mL of Nile Red working solution (2 µg/mL in acetone) to the water sample. Cap the vial, shake gently for 30 seconds, and let sit in complete darkness for 30 minutes.',
    note: 'Nile Red is lipophilic — it bonds to the hydrophobic surface of plastics but barely fluoresces in water alone. This selectivity makes microplastics glow bright orange under blue light while the water background stays dark.',
  },
  {
    num: 3,
    title: 'Slide Preparation',
    detail: 'Using a micropipette, place 50–100µL of stained sample onto a clean glass microscope slide. Allow the drop to spread naturally — do not use a coverslip.',
    note: 'Multiple droplets from different areas of the vial improve sampling representativeness.',
  },
  {
    num: 4,
    title: 'Fluorescence Imaging',
    detail: 'Place the slide in your viewing box. Attach the orange filter over your phone camera, then clip on the 60x microscope lens. Set camera to highest resolution, ISO 100–200, manual focus, flash disabled. Capture 10–15 images from different areas of the slide.',
    note: 'The orange filter blocks the blue excitation light and only passes the orange/yellow fluorescence emission from Nile Red-stained particles.',
  },
  {
    num: 5,
    title: 'AI Analysis',
    detail: 'Upload your best fluorescence images to the Scan tab. The RF-DETR model automatically detects every glowing microplastic particle and draws bounding boxes with confidence scores.',
    note: 'Results within 5% of manual counting have been validated across our test dataset.',
  },
];

const kitComponents = [
  { item: '60x clip-on microscope lens', cost: '$19.25', source: 'Amazon' },
  { item: '470nm blue LEDs', cost: '$1', source: 'Amazon' },
  { item: 'Orange filter (wratten #21)', cost: '$0.25', source: 'Amazon' },
  { item: 'Nile Red (10µg)', cost: '$2', source: 'Sigma-Aldrich' },
  { item: 'Glass vials (10mL)', cost: '$5.00', source: 'Amazon' },
  { item: 'Glass microscope slides (100)', cost: '$10', source: 'Amazon' },
  { item: 'Acetone (solvent, 50mL)', cost: '$2.5', source: 'Hardware store' },
  { item: 'Pipettes (100)', cost: '$8', source: 'Hardware store' },
  { item: '3d Print Filament (to make box)', cost: '$2', source: 'Hardware store' },
];

export default function ScienceTab() {
  const totalCost = kitComponents.reduce((sum, c) => sum + parseFloat(c.cost.replace('$', '')), 0);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">The Science</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          How Nile Red fluorescent staining makes invisible microplastic particles
          detectable with a smartphone microscope.
        </p>
      </div>

      {/* Nile Red Chemistry */}
      <section className="mb-20">
        <div className="card p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-orange-500/5" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-100">Why Nile Red?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Nile Red (9-diethylamino-5-benzo[α]phenoxazinone) is a lipophilic fluorescent dye
                  that selectively binds to hydrophobic surfaces — like the polymer chains that make up
                  plastic particles.
                </p>
                <p className="text-slate-400 leading-relaxed mb-4">
                  When excited by <span className="text-cyan-400 font-medium">blue light (470nm)</span>,
                  Nile Red fluoresces with a bright <span className="text-orange-400 font-medium">orange emission (580–620nm)</span>.
                  Because it barely dissolves in water, the background stays dark while plastic particles
                  glow intensely.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  This technique was first demonstrated for microplastics by Maes et al. (2017) and has since become
                  a standard screening method in environmental science.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Excitation</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-400/40" />
                    <div>
                      <p className="text-sm font-semibold text-blue-400">470nm Blue Light</p>
                      <p className="text-xs text-slate-500">LED flashlight at 45° angle</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Emission</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/30 border border-orange-400/40" />
                    <div>
                      <p className="text-sm font-semibold text-orange-400">580–620nm Orange Fluorescence</p>
                      <p className="text-xs text-slate-500">Orange filter blocks blue, passes only fluorescence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Steps */}
      <section className="mb-20">
        <h3 className="text-2xl font-bold tracking-tight mb-8">Detection Protocol</h3>
        <div className="space-y-4">
          {protocolSteps.map((step) => (
            <div key={step.num} className="card p-6 group hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0 mt-1">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-100 mb-2">{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed mb-3">{step.detail}</p>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                    <svg className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <p className="text-xs text-cyan-300/70 leading-relaxed">{step.note}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kit Bill of Materials */}
      <section>
        <h3 className="text-2xl font-bold tracking-tight mb-8">Kit Components (For 100 tests)</h3>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left p-4 text-slate-400 font-semibold">Component</th>
                <th className="text-left p-4 text-slate-400 font-semibold">Cost</th>
                <th className="text-left p-4 text-slate-400 font-semibold hidden sm:table-cell">Source</th>
              </tr>
            </thead>
            <tbody>
              {kitComponents.map((c) => (
                <tr key={c.item} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-slate-300">{c.item}</td>
                  <td className="p-4 text-cyan-400 font-medium">{c.cost}</td>
                  <td className="p-4 text-slate-500 hidden sm:table-cell">{c.source}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-700/50 bg-slate-800/20">
                <td className="p-4 text-slate-100 font-bold">Total</td>
                <td className="p-4 text-cyan-400 font-bold">${totalCost}</td>
                <td className="p-4 hidden sm:table-cell" />
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
