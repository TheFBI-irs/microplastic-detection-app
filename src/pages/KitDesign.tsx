export function KitDesign() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Kit Design</h1>
      <p className="text-text/80 mb-12">
        Hardware and materials used in the microplastic detection kit.
      </p>

      <div className="space-y-8">
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-primary mb-4">Components</h2>
          <ul className="space-y-3 text-text/90">
            <li><strong>Nile Red dye</strong> — Fluorescent stain for plastics</li>
            <li><strong>470 nm blue LED</strong> — Excitation light for fluorescence</li>
            <li><strong>Phone microscope attachment</strong> — Low-cost magnification</li>
            <li><strong>Microscope slides</strong> — Sample preparation</li>
            <li><strong>Web application</strong> — AI detection and analysis</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
