import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { InteractiveDetectionViewer } from '../components/InteractiveDetectionViewer'
import { DetectionHeatmap } from '../components/DetectionHeatmap'
import { drawBoundingBoxes } from '../utils/boundingBoxes'
import { ParticleCounter } from '../components/ParticleCounter'
import { ConfidenceSlider } from '../components/ConfidenceSlider'
import { exportDetectionsCSV, downloadCSV } from '../utils/exportCSV'
import { generatePDFReport } from '../utils/generateReport'
import type { InferenceResult } from '../model/rfdetr_inference'

interface LocationState {
  image: string
  result: InferenceResult
}

export function Results() {
  const { state } = useLocation() as { state: LocationState | null }
  const navigate = useNavigate()

  const [confidence, setConfidence] = useState(state?.result ? 0.35 : 0.35)

  if (!state?.image || !state?.result) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-text/80 mb-6">No results to display. Run a scan first.</p>
        <button
          onClick={() => navigate('/scan')}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-bg"
        >
          Go to Scan
        </button>
      </div>
    )
  }

  const { image, result } = state
  const filtered = result.detections.filter((d) => d.confidence >= confidence)
  const avgConf =
    filtered.length > 0
      ? filtered.reduce((s, d) => s + d.confidence, 0) / filtered.length
      : 0

  const handleExportCSV = () => {
    const csv = exportDetectionsCSV(filtered)
    downloadCSV(csv, `microplastic-detection-${Date.now()}.csv`)
  }

  const handleGenerateReport = async () => {
    try {
      await generatePDFReport(image, result, filtered)
    } catch (e) {
      console.error(e)
    }
  }

  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      drawBoundingBoxes(ctx, filtered, img.width, img.height)
      const a = document.createElement('a')
      a.download = `microplastic-annotated-${Date.now()}.png`
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = image
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Results</h1>
      <p className="text-text/80 mb-8">Detection results and export options.</p>

      <div className="glass rounded-2xl p-6 mb-8">
        <ConfidenceSlider value={confidence} onChange={setConfidence} />
      </div>

      <ParticleCounter
        count={filtered.length}
        avgConfidence={avgConf}
        processingTimeMs={result.inferenceTime}
      />

      <div className="mt-8 glass rounded-2xl p-6 overflow-auto">
        <h2 className="text-lg font-semibold text-primary mb-4">Interactive Viewer</h2>
        <InteractiveDetectionViewer
          imageUrl={image}
          detections={result.detections}
          confidenceThreshold={confidence}
        />
      </div>

      <div className="mt-8 glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Density Heatmap</h2>
        <DetectionHeatmap imageUrl={image} detections={filtered} />
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={handleGenerateReport}
          className="rounded-lg glass px-6 py-3 font-semibold text-primary hover:bg-white/10"
        >
          Generate Report (PDF)
        </button>
        <button
          onClick={handleExportCSV}
          className="rounded-lg glass px-6 py-3 font-semibold text-primary hover:bg-white/10"
        >
          Export CSV
        </button>
        <button
          onClick={handleDownloadImage}
          className="rounded-lg glass px-6 py-3 font-semibold text-primary hover:bg-white/10"
        >
          Download Annotated Image
        </button>
        <button
          onClick={() => navigate('/scan')}
          className="rounded-lg border border-primary/50 px-6 py-3 font-semibold text-primary hover:bg-primary/10"
        >
          New Scan
        </button>
      </div>

      <p className="mt-6 text-sm text-text/60">
        Model: RF-DETR via Roboflow API • Expected accuracy: ~1 particle error per image
      </p>
    </div>
  )
}
