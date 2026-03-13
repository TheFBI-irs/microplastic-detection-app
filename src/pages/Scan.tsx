import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageUpload } from '../components/ImageUpload'
import { CameraCapture } from '../components/CameraCapture'
import { ConfidenceSlider } from '../components/ConfidenceSlider'
import { runInference } from '../model/rfdetr_inference'

const base = import.meta.env.BASE_URL || '/'
const DEMO_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `${base}images/demo/demo-${n}.jpg`)

export function Scan() {
  const navigate = useNavigate()
  const [image, setImage] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0.35)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState('')
  const [error, setError] = useState<string | null>(null)

  const runDetection = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    try {
      setLoadingStep('Analyzing image...')
      await new Promise((r) => setTimeout(r, 300))
      setLoadingStep('Running RF-DETR model...')
      const result = await runInference(image, confidence)
      setLoadingStep('Detecting microplastics...')
      await new Promise((r) => setTimeout(r, 200))
      navigate('/results', { state: { image, result } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Detection failed')
    } finally {
      setLoading(false)
      setLoadingStep('')
    }
  }

  const loadDemo = (idx = 0) => {
    const url = DEMO_IMAGES[idx] || DEMO_IMAGES[0]
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
    img.onerror = () => setError(`Demo image failed. Add public/images/demo/demo-${idx + 1}.jpg`)
    img.src = url
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
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-text/70 self-center mr-2">Demo:</span>
          {DEMO_IMAGES.slice(0, 8).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => loadDemo(i)}
              className="rounded-lg glass px-3 py-2 text-sm font-semibold text-accent hover:bg-white/10"
            >
              Sample {i + 1}
            </button>
          ))}
        </div>
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

          <div className="mt-6 flex flex-col gap-4">
            <button
              type="button"
              onClick={runDetection}
              disabled={loading}
              className="rounded-lg bg-primary px-8 py-3 font-semibold text-bg disabled:opacity-50 w-fit"
            >
              {loading ? loadingStep : 'Run AI Detection'}
            </button>
            <AnimatePresence>
              {loading && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-primary/80"
                >
                  Goal: &lt; 1 second inference
                </motion.p>
              )}
            </AnimatePresence>
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
