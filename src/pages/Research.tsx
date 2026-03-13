import { ThresholdChart } from '../components/ThresholdChart'
import { CountAccuracyChart } from '../components/CountAccuracyChart'

export function Research() {
  const metrics = [
    { label: 'Precision', value: '0.856' },
    { label: 'Recall', value: '0.849' },
    { label: 'F1 Score', value: '0.853' },
    { label: 'mAP@50', value: '0.894' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Research Summary</h1>
      <p className="text-text/80 mb-12">
        Model performance metrics and dataset overview.
      </p>

      <section className="glass rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-semibold text-primary mb-4">Dataset</h2>
        <ul className="space-y-2 text-text/90">
          <li><strong>Total images:</strong> 1,023</li>
          <li><strong>Test set:</strong> 112 images</li>
          <li><strong>Task:</strong> Object detection of Nile Red–stained microplastics</li>
        </ul>
      </section>

      <section className="glass rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-semibold text-primary mb-4">Best Model: RF-DETR</h2>
        <p className="text-text/90 mb-6">
          RF-DETR (Resolution-adaptive Feature DETR) provides transformer-based detection optimized for small objects in fluorescence microscopy.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-xl bg-white/5 p-4 border border-white/5 text-center">
              <div className="text-2xl font-bold text-primary">{m.value}</div>
              <div className="text-sm text-text/70">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <ThresholdChart />
        <CountAccuracyChart />
      </div>

      <section className="glass rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-primary mb-4">Expected Accuracy</h2>
        <p className="text-text/90">
          The model averages approximately 1 particle error per image in validation. Use the confidence threshold slider to balance precision and recall for your use case.
        </p>
      </section>
    </div>
  )
}
