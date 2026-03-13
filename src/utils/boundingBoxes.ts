import type { Detection } from '../model/rfdetr_inference'

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.7) return '#22c55e' // green
  if (confidence >= 0.5) return '#eab308' // yellow
  return '#ef4444' // red
}

export function drawBoundingBoxes(
  ctx: CanvasRenderingContext2D,
  detections: Detection[],
  _imageWidth: number,
  _imageHeight: number
): void {
  if (!detections?.length) return

  detections.forEach((d) => {
    const color = getConfidenceColor(d.confidence)
    const { x, y, width, height } = d.bbox

    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.setLineDash([])
    ctx.strokeRect(x, y, width, height)

    const label = `Microplastic ${(d.confidence * 100).toFixed(1)}%`
    const labelW = ctx.measureText(label).width + 12
    const labelH = 20

    ctx.fillStyle = color
    ctx.fillRect(x, y - labelH, labelW, labelH)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 12px Inter, sans-serif'
    ctx.fillText(label, x + 6, y - 5)
  })
}
