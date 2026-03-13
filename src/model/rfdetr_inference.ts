/**
 * RF-DETR Inference via Roboflow Hosted API
 * No local ONNX model — inference runs on Roboflow servers.
 */

const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY || ''
const ROBOFLOW_MODEL_ID_RAW = import.meta.env.VITE_ROBOFLOW_MODEL_ID || ''

function getModelId(): string {
  const raw = ROBOFLOW_MODEL_ID_RAW.trim()
  if (!raw) return ''
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) return raw
  try {
    const u = new URL(raw)
    const m = u.pathname.match(/\/models\/([^/]+)\/(\d+)$/)
    if (m) return `${m[1]}/${m[2]}`
  } catch (_) {}
  return raw
}

const ROBOFLOW_MODEL_ID = getModelId()

export interface BBox {
  x: number
  y: number
  width: number
  height: number
}

export interface Detection {
  bbox: BBox
  confidence: number
  class: string
  classId: number
}

export interface InferenceResult {
  count: number
  detections: Detection[]
  inferenceTime: number
  imageSize: { width: number; height: number }
}

function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = reject
    img.src = dataUrl
  })
}

export async function runInference(
  imageDataUrl: string,
  confidenceThreshold = 0.35
): Promise<InferenceResult> {
  if (!ROBOFLOW_API_KEY) {
    throw new Error('No Roboflow API key set. Add VITE_ROBOFLOW_API_KEY to your .env file.')
  }
  if (!ROBOFLOW_MODEL_ID) {
    throw new Error('No Roboflow model ID set. Add VITE_ROBOFLOW_MODEL_ID to your .env file.')
  }

  const { width: originalWidth, height: originalHeight } = await getImageDimensions(imageDataUrl)
  const base64Image = imageDataUrl.includes(',') ? imageDataUrl.split(',')[1] : imageDataUrl

  const startTime = performance.now()
  const url = `https://serverless.roboflow.com/${ROBOFLOW_MODEL_ID}?api_key=${ROBOFLOW_API_KEY}&confidence=${Math.round(confidenceThreshold * 100)}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: base64Image,
  })

  const errText = !response.ok ? await response.text() : ''
  if (!response.ok) {
    throw new Error(`Roboflow API error ${response.status}: ${errText}`)
  }

  const data = await response.json()
  const inferenceTime = performance.now() - startTime

  const detections: Detection[] = (data.predictions || []).map((pred: { x: number; y: number; width: number; height: number; confidence: number; class?: string; class_id?: number }) => ({
    bbox: {
      x: pred.x - pred.width / 2,
      y: pred.y - pred.height / 2,
      width: pred.width,
      height: pred.height,
    },
    confidence: pred.confidence,
    class: pred.class || 'microplastic',
    classId: pred.class_id ?? 0,
  }))

  return {
    count: detections.length,
    detections,
    inferenceTime,
    imageSize: { width: originalWidth, height: originalHeight },
  }
}
