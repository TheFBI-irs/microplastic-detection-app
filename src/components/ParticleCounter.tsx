interface ParticleCounterProps {
  count: number
  avgConfidence: number
  processingTimeMs: number
}

export function ParticleCounter({ count, avgConfidence, processingTimeMs }: ParticleCounterProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-primary">{count}</div>
        <div className="text-sm text-text/70">Detected Microplastics</div>
      </div>
      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-primary">{avgConfidence.toFixed(2)}</div>
        <div className="text-sm text-text/70">Average Confidence</div>
      </div>
      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-primary">{(processingTimeMs / 1000).toFixed(2)}s</div>
        <div className="text-sm text-text/70">Processing Time</div>
      </div>
    </div>
  )
}
