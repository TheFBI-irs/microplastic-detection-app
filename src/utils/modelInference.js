/**
 * Model Inference Utilities
 * Handles running RF-DETR inference via Roboflow Hosted Inference API
 */

const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY || ''
const ROBOFLOW_MODEL_ID_RAW = import.meta.env.VITE_ROBOFLOW_MODEL_ID || ''

/**
 * Normalize model ID: if user pasted full app URL, extract workspace/project/version
 * e.g. "https://app.roboflow.com/ws/proj/models/proj/39" -> "ws/proj/39"
 */
function getModelId() {
  const raw = ROBOFLOW_MODEL_ID_RAW.trim()
  if (!raw) return ''
  // Already in correct format (no protocol)?
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) return raw
  try {
    const u = new URL(raw)
    // Path like /workspace/project/models/project/39 -> extract workspace/project/39
    const m = u.pathname.match(/^\/([^/]+)\/([^/]+)\/models\/[^/]+\/(\d+)$/)
    if (m) return `${m[1]}/${m[2]}/${m[3]}`
    // Fallback: last 3 path segments as workspace/project/version
    const parts = u.pathname.replace(/^\/|\/$/g, '').split('/')
    if (parts.length >= 3) return `${parts[0]}/${parts[1]}/${parts[parts.length - 1]}`
  } catch (_) {}
  return raw
}

const ROBOFLOW_MODEL_ID = getModelId()

/**
 * Run RF-DETR inference via Roboflow Hosted Inference API.
 * Docs: https://docs.roboflow.com/deploy/hosted-api/object-detection
 *
 * @param {string} imageDataUrl - base64 data URL of the image
 * @param {number} confidenceThreshold - 0–1, filters detections below this
 * @returns {{ count, detections, inferenceTime, imageSize }}
 */
export async function detectMicroplastics(imageDataUrl, confidenceThreshold = 0.35) {
  if (!ROBOFLOW_API_KEY) {
    throw new Error('No Roboflow API key set. Add VITE_ROBOFLOW_API_KEY to your .env file.')
  }
  if (!ROBOFLOW_MODEL_ID) {
    throw new Error('No Roboflow model ID set. Add VITE_ROBOFLOW_MODEL_ID to your .env file.')
  }

  // Get original image dimensions for scaling bounding boxes back
  const { width: originalWidth, height: originalHeight } = await getImageDimensions(imageDataUrl)

  // Roboflow Hosted API: raw base64 in body, per https://docs.roboflow.com/deploy/serverless/object-detection
  const base64Image = imageDataUrl.includes(',') ? imageDataUrl.split(',')[1] : imageDataUrl

  const startTime = performance.now()

  const url = `https://detect.roboflow.com/${ROBOFLOW_MODEL_ID}?api_key=${ROBOFLOW_API_KEY}&confidence=${Math.round(confidenceThreshold * 100)}`

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

  // Roboflow returns predictions with CENTER x/y, so convert to top-left for canvas drawing
  const detections = (data.predictions || []).map(pred => ({
    bbox: {
      x: pred.x - pred.width / 2,   // convert center → top-left
      y: pred.y - pred.height / 2,
      width: pred.width,
      height: pred.height,
    },
    confidence: pred.confidence,
    class: pred.class || 'microplastic',
    classId: pred.class_id ?? 0,
    detectionId: pred.detection_id,
  }))

  return {
    count: detections.length,
    detections,
    inferenceTime,
    imageSize: { width: originalWidth, height: originalHeight },
  }
}

function getImageDimensions(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.width, height: img.height })
    img.onerror = reject
    img.src = dataUrl
  })
}

// Keep this export so App.jsx doesn't break — it's now a no-op since there's no local model to warm up
export async function initializeModel() {
  // No-op: model is hosted on Roboflow, nothing to initialize locally
}
