import { useRef, useState, useCallback } from 'react'

interface CameraCaptureProps {
  onCapture: (dataUrl: string) => void
  onError?: (msg: string) => void
}

export function CameraCapture({ onCapture, onError }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [active, setActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) videoRef.current.srcObject = stream
      setActive(true)
    } catch (e) {
      const msg = 'Camera access denied or unavailable'
      setError(msg)
      onError?.(msg)
    }
  }, [onError])

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
    setActive(false)
  }, [])

  const capture = useCallback(() => {
    const video = videoRef.current
    if (!video || !active || video.readyState !== 4) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0)
    onCapture(canvas.toDataURL('image/jpeg', 0.9))
  }, [active, onCapture])

  return (
    <div>
      {!active ? (
        <button
          type="button"
          onClick={start}
          className="rounded-lg glass px-6 py-3 font-semibold text-primary transition hover:bg-white/10"
        >
          Open Camera
        </button>
      ) : (
        <div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-w-lg rounded-lg bg-black aspect-video object-cover"
          />
          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={capture}
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-bg"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={stop}
              className="rounded-lg glass px-6 py-3 font-semibold text-text"
            >
              Stop Camera
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-accent">{error}</p>}
    </div>
  )
}
