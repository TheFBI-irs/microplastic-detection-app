import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
          AI-Powered Microplastic Detection Kit
        </h1>
        <p className="text-xl text-text/80 max-w-2xl mx-auto mb-8">
          Scan microscope images of water samples to detect fluorescent Nile-Red stained microplastics using RF-DETR object detection.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/scan"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-bg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Start Scan
          </Link>
          <Link
            to="/instructions"
            className="rounded-lg glass px-6 py-3 font-semibold text-primary transition hover:bg-white/10"
          >
            View Instructions
          </Link>
          <Link
            to="/research"
            className="rounded-lg glass px-6 py-3 font-semibold text-primary transition hover:bg-white/10"
          >
            Read Research
          </Link>
        </div>
      </section>

      <section className="glass rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">The Problem</h2>
        <p className="text-text/90 leading-relaxed">
          Microplastics—plastic particles smaller than 5mm—contaminate waterways, marine ecosystems, and drinking water. 
          They are difficult to detect with the naked eye and require specialized methods for identification and quantification.
        </p>
      </section>

      <section className="glass rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Innovation</h2>
        <ul className="space-y-3 text-text/90">
          <li><strong>Nile Red staining</strong> — Fluorescent dye binds to plastics for visibility</li>
          <li><strong>470 nm blue LED illumination</strong> — Optimizes fluorescence excitation</li>
          <li><strong>Phone microscope attachment</strong> — Low-cost, portable imaging</li>
          <li><strong>RF-DETR AI model</strong> — Object detection for automated particle counting</li>
        </ul>
      </section>

      <section className="glass rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-primary mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl bg-white/5 p-4 border border-white/5">
            <span className="text-2xl mb-2 block">⚡</span>
            <h3 className="font-semibold text-text mb-1">Real-time detection</h3>
            <p className="text-sm text-text/70">Instant analysis of uploaded images</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 border border-white/5">
            <span className="text-2xl mb-2 block">📱</span>
            <h3 className="font-semibold text-text mb-1">Works on mobile</h3>
            <p className="text-sm text-text/70">Use your phone camera and microscope</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 border border-white/5">
            <span className="text-2xl mb-2 block">🧠</span>
            <h3 className="font-semibold text-text mb-1">RF-DETR AI</h3>
            <p className="text-sm text-text/70">State-of-the-art object detection</p>
          </div>
          <div className="rounded-xl bg-white/5 p-4 border border-white/5">
            <span className="text-2xl mb-2 block">💧</span>
            <h3 className="font-semibold text-text mb-1">Water sample analysis</h3>
            <p className="text-sm text-text/70">Designed for environmental research</p>
          </div>
        </div>
      </section>
    </div>
  )
}
