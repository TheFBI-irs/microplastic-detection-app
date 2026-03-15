const trainingJourney = [
  { version: 'v1–v5', desc: 'Initial YOLOv8 experiments — low mAP, high false positives on background noise.' },
  { version: 'v6–v10', desc: 'Switched to augmented dataset with varied lighting. mAP improved to ~60%.' },
  { version: 'v11–v15', desc: 'Migrated to RF-DETR architecture. Immediate 15% accuracy gain from transformer attention.' },
  { version: 'v16–v18', desc: 'Expanded dataset to 1,000+ images, 3,000+ labels. Precision plateaued at 82%.' },
  { version: 'v19–v20', desc: 'Hyperparameter tuning, advanced augmentation. Recall improved to 85%.' },
  { version: 'v21 (Final)', desc: 'RF-DETR 2× Large — Precision 86.8%, Recall 87.0%, mAP@50 89.4%. Deployed via Roboflow.', highlight: true },
];

const metrics = [
  { label: 'Precision', value: '86.8%', desc: 'Of all detections, 86.8% are true microplastics' },
  { label: 'Recall', value: '87.0%', desc: 'Of all true particles, 87.0% are successfully detected' },
  { label: 'mAP@50', value: '89.4%', desc: 'Mean average precision at 50% IoU threshold' },
  { label: 'Mean Error', value: '5.0%', desc: 'Average particle count deviation from manual counting' },
];

export default function ModelTab() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Our Model</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          RF-DETR 2× Large — a transformer-based object detection model trained through
          21 iterations to achieve production-level accuracy.
        </p>
      </div>

      {/* Architecture Overview */}
      <section className="mb-20">
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100">RF-DETR Architecture</h3>
          </div>

          <p className="text-slate-400 leading-relaxed mb-6">
            RF-DETR (Real-time Feature-extracting Detection Transformer) uses a transformer
            encoder-decoder architecture for end-to-end object detection. Unlike traditional
            CNN-based detectors that rely on anchor boxes and non-maximum suppression, RF-DETR
            uses learned object queries that directly predict bounding box coordinates and
            confidence scores.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
              <h4 className="text-sm font-bold text-cyan-400 mb-2">Backbone</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Feature extraction from input images using a multi-scale convolutional feature pyramid.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
              <h4 className="text-sm font-bold text-indigo-400 mb-2">Transformer Encoder</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Self-attention mechanisms model global context and relationships between feature regions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <h4 className="text-sm font-bold text-emerald-400 mb-2">Transformer Decoder</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learned object queries cross-attend to encoder features to predict detection outputs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="mb-20">
        <h3 className="text-2xl font-bold tracking-tight mb-8">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="card p-6 text-center group hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{m.value}</p>
              <p className="text-sm font-semibold text-slate-200 mb-1">{m.label}</p>
              <p className="text-xs text-slate-500 leading-snug">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* F1-Confidence Analysis */}
      <section className="mb-20">
        <div className="card p-8">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Optimal Threshold Analysis</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            Through F1-confidence curve analysis, we determined that a confidence threshold of{' '}
            <span className="text-cyan-400 font-semibold">0.35</span> provides the optimal
            balance between precision and recall. This threshold maximizes the F1 score, catching
            the most true microplastic particles while minimizing false positives from background
            fluorescence noise.
          </p>

          {/* Visual threshold bar */}
          <div className="relative h-3 rounded-full bg-slate-700 overflow-hidden mb-3">
            <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-red-500 via-emerald-500 to-red-500" style={{ width: '100%' }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-full shadow-lg" style={{ left: '35%' }} />
          </div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>0.0 (All detections)</span>
            <span className="text-cyan-400 font-medium">0.35 optimal</span>
            <span>1.0 (Only highest confidence)</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Lower thresholds increase recall but introduce false positives; higher thresholds increase
            precision but miss true particles.
          </p>
        </div>
      </section>

      {/* Training Journey */}
      <section>
        <h3 className="text-2xl font-bold tracking-tight mb-8">Training Journey — 21 Versions</h3>
        <div className="space-y-3">
          {trainingJourney.map((step) => (
            <div
              key={step.version}
              className={`card p-5 flex items-start gap-4 transition-all duration-300 ${
                step.highlight
                  ? 'border-cyan-500/40 bg-cyan-500/5'
                  : 'hover:border-slate-600'
              }`}
            >
              <div className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 mt-0.5 ${
                step.highlight
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {step.version}
              </div>
              <p className={`text-sm leading-relaxed ${step.highlight ? 'text-slate-200' : 'text-slate-400'}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="text-slate-400 font-medium">Training Hardware:</span> NVIDIA RTX 5070 Ti ·
            <span className="text-slate-400 font-medium"> Deployment:</span> Roboflow Hosted Inference API ·
            <span className="text-slate-400 font-medium"> Dataset:</span> 1,000+ fluorescence microscopy images, 3,000+ manually labeled particles
          </p>
        </div>
      </section>
    </div>
  );
}
