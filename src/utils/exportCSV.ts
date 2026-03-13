import type { Detection } from '../model/rfdetr_inference'

export function exportDetectionsCSV(detections: Detection[]): string {
  const header = 'particle_id,confidence,x,y,width,height'
  const rows = detections.map((d, i) =>
    [i + 1, d.confidence.toFixed(4), d.bbox.x.toFixed(1), d.bbox.y.toFixed(1), d.bbox.width.toFixed(1), d.bbox.height.toFixed(1)].join(',')
  )
  return [header, ...rows].join('\n')
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
