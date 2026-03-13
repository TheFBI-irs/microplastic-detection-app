import { jsPDF } from 'jspdf'
import type { Detection, InferenceResult } from '../model/rfdetr_inference'
import { drawBoundingBoxes } from '../utils/boundingBoxes'

export async function generatePDFReport(
  imageDataUrl: string,
  result: InferenceResult,
  filtered: Detection[]
): Promise<void> {
  const img = new Image()
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = reject
    img.src = imageDataUrl
  })

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm' })
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()

  pdf.setFontSize(16)
  pdf.text('Microplastic Detection Report', 20, 20)
  pdf.setFontSize(10)
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 28)
  pdf.text(`Particles detected: ${filtered.length}`, 20, 34)
  pdf.text(`Average confidence: ${filtered.length > 0 ? (filtered.reduce((s, d) => s + d.confidence, 0) / filtered.length).toFixed(2) : 'N/A'}`, 20, 40)
  pdf.text(`Processing time: ${(result.inferenceTime / 1000).toFixed(2)}s`, 20, 46)

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.drawImage(img, 0, 0)
    drawBoundingBoxes(ctx, filtered, img.width, img.height)
  }

  const imgW = pageW - 40
  const imgH = (img.height / img.width) * imgW
  const maxImgH = pageH - 60
  const scale = imgH > maxImgH ? maxImgH / imgH : 1
  const finalW = imgW * scale
  const finalH = imgH * scale

  const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
  pdf.addImage(dataUrl, 'JPEG', 20, 55, finalW, finalH)

  pdf.save(`microplastic-report-${Date.now()}.pdf`)
}
