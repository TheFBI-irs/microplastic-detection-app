import { useRef, useEffect } from 'react'
import type { Detection } from '../model/rfdetr_inference'
import { drawBoundingBoxes } from '../utils/boundingBoxes'

interface DetectionCanvasProps {
  imageUrl: string
  detections: Detection[]
  className?: string
}

export function DetectionCanvas({ imageUrl, detections, className }: DetectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const img = new Image()
    img.onload = () => {
      if (!canvas) return
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      drawBoundingBoxes(ctx, detections, img.width, img.height)
    }
    img.src = imageUrl
  }, [imageUrl, detections])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Image with detected microplastic bounding boxes"
    />
  )
}
