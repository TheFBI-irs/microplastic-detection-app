export default function AboutTab() {
  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">About Us</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Meet the team behind The Low-Cost Microplastic Detection Kit — a project born from curiosity about
          what's really in our water.
        </p>
      </div>

      {/* Team */}
      <section className="mb-16">
        <div className="card p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-100 mb-2">Project Team</h3>
          <p className="text-slate-400 mb-6">Nathan Lee &amp; Solomon Chan</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="font-semibold text-slate-200 mb-1">Nathan Lee</p>
              <p className="text-xs text-slate-500">AI/ML Engineering, Model Training, Web Development. Freshman at The Cambridge School.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <p className="font-semibold text-slate-200 mb-1">Solomon Chan</p>
              <p className="text-xs text-slate-500">Sample Preparation, Image Annotation, Kit Assembly. Freshman at The Cambridge School.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Info */}
      <section className="mb-16">
        <h3 className="text-xl font-bold tracking-tight mb-6">Competition</h3>
        <div className="card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fair</p>
              <p className="text-slate-200 font-medium">Greater San Diego Science &amp; Engineering Fair 2026</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</p>
              <p className="text-slate-200 font-medium">Earth &amp; Environmental Sciences</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Division</p>
              <p className="text-slate-200 font-medium">9th Grade SR Division</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Goal */}
      <section className="mb-16">
        <h3 className="text-xl font-bold tracking-tight mb-6">Our Goal</h3>
        <div className="card p-8">
          <p className="text-slate-400 leading-relaxed mb-6">
            Professional microplastic testing costs $500–$1,000 per sample, making
            large-scale environmental monitoring financially impossible for communities,
            schools, and citizen scientists. Our goal is to democratize water quality
            testing by combining low-cost fluorescence microscopy with AI-powered
            detection, putting laboratory-grade analysis in everyone's hands.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                ),
                title: 'Accessible',
                desc: '$60 kit cost vs $500+ professional testing',
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
                title: 'Accurate',
                desc: '89.4% mAP@50, within 5% of manual counting',
              },
              {
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                title: 'Citizen Science',
                desc: 'Anyone can test their own water at home',
              },
            ].map((g) => (
              <div key={g.title} className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-center">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mx-auto mb-2">
                  {g.icon}
                </div>
                <p className="text-sm font-semibold text-slate-200 mb-1">{g.title}</p>
                <p className="text-xs text-slate-500">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Work */}
      <section className="mb-16">
        <h3 className="text-xl font-bold tracking-tight mb-6">Future Work</h3>
        <div className="space-y-3">
          {[
            'Particle size classification — distinguishing microplastics by diameter (< 1µm, 1–10µm, 10–100µm, 100µm–5mm)',
            'Polymer type identification via spectral analysis or multi-wavelength fluorescence',
            'GPS-tagged crowd-sourced contamination mapping across San Diego water sources',
            'Expanded training dataset with diverse water types and particle morphologies',
            'Mobile app version with on-device inference for offline field use',
          ].map((item, i) => (
            <div key={i} className="card p-4 flex items-start gap-3 hover:border-slate-600 transition-colors">
              <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Acknowledgments */}
      <section>
        <h3 className="text-xl font-bold tracking-tight mb-6">Acknowledgments</h3>
        <div className="card p-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            Special thanks to <span className="text-slate-300">Roboflow</span> for hosting our
            model inference API, the open-source communities behind{' '}
            <span className="text-slate-300">React</span>,{' '}
            <span className="text-slate-300">Vite</span>, and{' '}
            <span className="text-slate-300">Tailwind CSS</span>, and our science fair mentors
            for guidance throughout this project.
          </p>
        </div>
      </section>
    </div>
  );
}
