import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageUpload } from '../components/ImageUpload'
import { CameraCapture } from '../components/CameraCapture'
import { ConfidenceSlider } from '../components/ConfidenceSlider'
import { runInference } from '../model/rfdetr_inference'

const DEMO_IMAGE_URL = `${import.meta.env.BASE_URL || '/'}images/demo-sample.jpg`

export function Scan() {
  const navigate = useNavigate()
  const [image, setImage] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0.35)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runDetection = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    try {
      const result = await runInference(image, confidence)
      navigate('/results', { state: { image, result } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Detection failed')
    } finally {
      setLoading(false)
    }
  }

  const loadDemo = () => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        setImage(canvas.toDataURL('image/jpeg'))
      }
    }
    img.onerror = () => setError('Demo image failed to load. Add a sample to public/images/demo-sample.jpg')
    img.src = DEMO_IMAGE_URL
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Scan Water Sample</h1>
      <p className="text-text/80 mb-8">
        Upload or capture a microscope image, then run AI detection.
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        <ImageUpload onImage={setImage} onError={setError} />
        <CameraCapture onCapture={setImage} onError={setError} />
        <button
          type="button"
          onClick={loadDemo}
          className="rounded-lg glass px-6 py-3 font-semibold text-accent transition hover:bg-white/10"
        >
          Demo Mode
        </button>
      </div>

      {image && (
        <>
          <div className="glass rounded-xl p-4 mb-6">
            <p className="text-sm text-text/70 mb-2">Preview</p>
            <img
              src={image}
              alt="Sample preview"
              className="max-h-64 rounded-lg object-contain"
            />
          </div>

          <ConfidenceSlider value={confidence} onChange={setConfidence} />

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={runDetection}
              disabled={loading}
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-bg disabled:opacity-50"
            >
              {loading ? 'Running AI Detection…' : 'Run AI Detection'}
            </button>
          </div>
        </>
      )}

      {error && (
        <div className="mt-4 rounded-lg bg-accent/20 border border-accent/50 p-4 text-accent">
          {error}
        </div>
      )}
    </div>
  )
}
