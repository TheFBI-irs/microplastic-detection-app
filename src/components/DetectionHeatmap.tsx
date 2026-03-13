import { useState, useRef, useEffect } from 'react'
import type { Detection } from '../model/rfdetr_inference'

interface DetectionHeatmapProps {
  imageUrl: string
  detections: Detection[]
  className?: string
}

function gaussian(x: number, sigma: number): number {
  return Math.exp(-(x * x) / (2 * sigma * sigma))
}

function createHeatmap(width: number, height: number, points: { x: number; y: number }[], sigma = 40): number[][] {
  const grid: number[][] = Array(height)
    .fill(0)
    .map(() => Array(width).fill(0))

  points.forEach(({ x, y }) => {
    const cx = Math.round(x)
    const cy = Math.round(y)
    const r = Math.ceil(sigma * 3)
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        const nx = cx + dx
        const ny = cy + dy
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const d = Math.sqrt(dx * dx + dy * dy)
          grid[ny][nx] += gaussian(d / sigma, 1)
        }
      }
    }
  })

  return grid
}

function heatToColor(v: number, max: number): string {
  if (v <= 0) return 'rgba(59, 130, 246, 0)'
  const t = v / max
  if (t < 0.33) return `rgba(59, 130, 246, ${t * 1.5})`
  if (t < 0.66) return `rgba(234, 179, 8, ${0.5 + t * 0.5})`
  return `rgba(239, 68, 68, ${0.5 + t * 0.5})`
}

export function DetectionHeatmap({ imageUrl, detections, className }: DetectionHeatmapProps) {
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [showBoxes, setShowBoxes] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      if (showHeatmap && detections.length > 0) {
        const points = detections.map((d) => ({
          x: d.bbox.x + d.bbox.width / 2,
          y: d.bbox.y + d.bbox.height / 2,
        }))
        const grid = createHeatmap(img.width, img.height, points)
        const max = Math.max(...grid.flat(), 0.01)
        const overlay = ctx.getImageData(0, 0, img.width, img.height)
        for (let y = 0; y < img.height; y++) {
          for (let x = 0; x < img.width; x++) {
            const v = grid[y][x]
            if (v > 0) {
              const c = heatToColor(v, max)
              const [r, g, b, a] = c.match(/[\d.]+/g)!.map(Number)
              const i = (y * img.width + x) * 4
              overlay.data[i] = (overlay.data[i] * (1 - a) + r * a) | 0
              overlay.data[i + 1] = (overlay.data[i + 1] * (1 - a) + g * a) | 0
              overlay.data[i + 2] = (overlay.data[i + 2] * (1 - a) + b * a) | 0
            }
          }
        }
        ctx.putImageData(overlay, 0, 0)
      }

      if (showBoxes) {
        detections.forEach((d) => {
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)'
          ctx.lineWidth = 2
          ctx.strokeRect(d.bbox.x, d.bbox.y, d.bbox.width, d.bbox.height)
        })
      }
    }
    img.src = imageUrl
  }, [imageUrl, detections, showHeatmap, showBoxes])

  return (
    <div className={className}>
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showHeatmap}
            onChange={(e) => setShowHeatmap(e.target.checked)}
            className="accent-primary"
          />
          <span className="text-sm text-text/90">Show Heatmap</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showBoxes}
            onChange={(e) => setShowBoxes(e.target.checked)}
            className="accent-primary"
          />
          <span className="text-sm text-text/90">Show Bounding Boxes</span>
        </label>
      </div>
      <div className="rounded-xl overflow-hidden bg-black/30">
        <canvas ref={canvasRef} className="max-w-full rounded-lg" />
      </div>
      <p className="mt-2 text-xs text-text/60">Blue → low density, Yellow → medium, Red → high</p>
    </div>
  )
}
