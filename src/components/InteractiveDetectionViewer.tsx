import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Detection } from '../model/rfdetr_inference'
import { getConfidenceColor } from '../utils/boundingBoxes'

interface InteractiveDetectionViewerProps {
  imageUrl: string
  detections: Detection[]
  confidenceThreshold: number
  onThresholdChange?: (v: number) => void
}

type FilterMode = 'above' | 'all' | 'uncertain'

export function InteractiveDetectionViewer({
  imageUrl,
  detections,
  confidenceThreshold,
}: InteractiveDetectionViewerProps) {
  const [showBoxes, setShowBoxes] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [filterMode, setFilterMode] = useState<FilterMode>('above')
  const [hovered, setHovered] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [imgSize, setImgSize] = useState({ w: 640, h: 480 })
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered =
    filterMode === 'above'
      ? detections.filter((d) => d.confidence >= confidenceThreshold)
      : filterMode === 'uncertain'
      ? detections.filter((d) => d.confidence < 0.5)
      : detections

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      setScale((s) => Math.max(0.5, Math.min(3, s + (e.deltaY > 0 ? -0.1 : 0.1))))
    },
    []
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const start = { x: e.clientX, y: e.clientY }
    const handleMove = (ev: MouseEvent) => {
      setPan((p) => ({
        x: p.x + ev.clientX - start.x,
        y: p.y + ev.clientY - start.y,
      }))
      Object.assign(start, { x: ev.clientX, y: ev.clientY })
    }
    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showBoxes}
            onChange={(e) => setShowBoxes(e.target.checked)}
            className="accent-primary"
          />
          <span className="text-sm text-text/90">Show bounding boxes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={(e) => setShowLabels(e.target.checked)}
            className="accent-primary"
          />
          <span className="text-sm text-text/90">Show confidence labels</span>
        </label>
        <div className="flex gap-2">
          <span className="text-sm text-text/70">Filter:</span>
          {(['above', 'all', 'uncertain'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setFilterMode(m)}
              className={`text-sm px-3 py-1 rounded ${filterMode === m ? 'bg-primary text-bg' : 'glass'}`}
            >
              {m === 'above' ? 'Above threshold' : m === 'all' ? 'All' : 'Uncertain'}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl bg-black/50"
        style={{ minHeight: 400 }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <div
          className="relative origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          }}
        >
          <img
            onLoad={(e) => {
              const el = e.target as HTMLImageElement
              if (el.naturalWidth) setImgSize({ w: el.naturalWidth, h: el.naturalHeight })
            }}
            src={imageUrl}
            alt="Detection view"
            className="block max-w-full max-h-[70vh] object-contain"
            draggable={false}
          />
          {showBoxes && (
            <svg
              className="absolute left-0 top-0 w-full h-full"
              viewBox={`0 0 ${imgSize.w} ${imgSize.h}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {filtered.map((d, i) => {
                const { x, y, width, height } = d.bbox
                const color = getConfidenceColor(d.confidence)
                const isHover = hovered === i
                return (
                  <g
                    key={i}
                    transform={`translate(${x}, ${y})`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="pointer-events-auto cursor-pointer"
                  >
                    <rect
                      width={width}
                      height={height}
                      fill="none"
                      stroke={color}
                      strokeWidth={isHover ? 4 : 2}
                    />
                    {showLabels && (
                      <text
                        x={6}
                        y={14}
                        fill="#fff"
                        fontSize={12}
                        style={{ paintOrder: 'stroke', stroke: color, strokeWidth: 2 }}
                      >
                        {(d.confidence * 100).toFixed(1)}%
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          )}
          {showBoxes && filtered.map((d, i) => {
            if (hovered !== i) return null
            const { x, width } = d.bbox
            const cx = x + width / 2
            return (
              <AnimatePresence key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute z-10 px-3 py-2 rounded-lg glass border border-white/20 text-sm"
                  style={{ left: cx + 10, top: d.bbox.y - 60 }}
                >
                  <div>Microplastic detected</div>
                  <div>Confidence: {d.confidence.toFixed(2)}</div>
                  <div>Coordinates: ({Math.round(cx)}, {Math.round(d.bbox.y + d.bbox.height / 2)})</div>
                </motion.div>
              </AnimatePresence>
            )
          })}
        </div>
      </div>
    </div>
  )
}
