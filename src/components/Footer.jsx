export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>Low-Cost AI-Powered Microplastic Detection Kit -- CSEF 2026 — Nathan Lee &amp; Solomon Chan</p>
          <p className="text-center">
            CSEF 2026 · Environmental Engineering · 9th Grade SR Division
          </p>
          <p>Powered by RF-DETR 2× Large via Roboflow Inference</p>
        </div>
      </div>
    </footer>
  );
}
