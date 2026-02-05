/**
 * Image Processing Utilities
 * Handles image manipulation, bounding box drawing, and downloads
 */

/**
 * Draw bounding boxes on canvas context
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
 * @param {Array} detections - Array of detection objects with bbox, confidence, class
 * @param {number} imageWidth - Original image width
 * @param {number} imageHeight - Original image height
 */
export function drawBoundingBoxes(ctx, detections, imageWidth, imageHeight) {
  if (!detections || detections.length === 0) {
    return
  }

  // Box styling
  const colors = {
    microplastic: '#00CED1', // Dark turquoise
    default: '#4CAF50' // Green
  }

  detections.forEach((detection, index) => {
    const { bbox, confidence, class: className } = detection
    
    // Get color for this class
    const color = colors[className] || colors.default
    
    // Draw bounding box
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.setLineDash([])
    ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height)
    
    // Draw label background
    const label = `${className || 'particle'} ${(confidence * 100).toFixed(1)}%`
    const labelWidth = ctx.measureText(label).width + 10
    const labelHeight = 20
    
    ctx.fillStyle = color
    ctx.fillRect(bbox.x, bbox.y - labelHeight, labelWidth, labelHeight)
    
    // Draw label text
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 12px Arial'
    ctx.fillText(label, bbox.x + 5, bbox.y - 5)
    
    // Draw particle number
    ctx.fillStyle = color
    ctx.font = 'bold 14px Arial'
    ctx.fillText(`${index + 1}`, bbox.x + bbox.width / 2 - 5, bbox.y + bbox.height / 2 + 5)
  })
}

/**
 * Download image as file
 * @param {string} dataUrl - Image data URL
 * @param {string} filename - Filename for download
 */
export function downloadImage(dataUrl, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Resize image while maintaining aspect ratio
 * @param {string} imageDataUrl - Source image data URL
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Promise<string>} Resized image data URL
 */
export function resizeImage(imageDataUrl, maxWidth = 1920, maxHeight = 1920) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height
      
      // Calculate new dimensions maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width = width * ratio
        height = height * ratio
      }
      
      canvas.width = width
      canvas.height = height
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      
      resolve(canvas.toDataURL('image/jpeg', 0.9))
    }
    img.onerror = reject
    img.src = imageDataUrl
  })
}

/**
 * Convert image to blob
 * @param {string} dataUrl - Image data URL
 * @returns {Promise<Blob>} Image blob
 */
export function dataUrlToBlob(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(resolve, 'image/png')
    }
    img.onerror = reject
    img.src = dataUrl
  })
}

