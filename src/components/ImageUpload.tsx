import { useRef } from 'react'
import { validateFile } from '../utils/imageProcessing'

interface ImageUploadProps {
  onImage: (dataUrl: string) => void
  onError?: (msg: string) => void
  accept?: string
}

export function ImageUpload({ onImage, onError, accept = 'image/jpeg,image/png,image/heic,image/webp' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const { ok, error } = validateFile(file)
    if (!ok) {
      onError?.(error || 'Invalid file')
      return
    }

    const reader = new FileReader()
    reader.onload = () => onImage(reader.result as string)
    reader.onerror = () => onError?.('Failed to read file')
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        className="hidden"
        aria-label="Upload microscope image"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg glass px-6 py-3 font-semibold text-primary transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        Upload Image
      </button>
    </>
  )
}
