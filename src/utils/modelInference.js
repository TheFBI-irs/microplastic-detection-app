/**
 * Model Inference Utilities
 * Handles running RF-DETR inference via Roboflow Hosted Inference API
 */

const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY || ''
const ROBOFLOW_MODEL_ID = import.meta.env.VITE_ROBOFLOW_MODEL_ID || '' // e.g. "microplastics-detection/21"

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

  // Convert data URL to blob for FormData upload (avoids base64 encoding issues in browser)
  const imageBlob = await fetch(imageDataUrl).then(r => r.blob())

  const startTime = performance.now()

  const formData = new FormData()
  formData.append('file', imageBlob, 'image.jpg')

  const url = `https://detect.roboflow.com/${ROBOFLOW_MODEL_ID}?api_key=${ROBOFLOW_API_KEY}&confidence=${Math.round(confidenceThreshold * 100)}`

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errText = await response.text()
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
