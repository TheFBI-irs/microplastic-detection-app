const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function validateFile(file: File): { ok: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: 'Image must be under 10MB' }
  }
  const allowed = ['image/jpeg', 'image/png', 'image/heic', 'image/webp']
  if (!allowed.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|heic|webp)$/i)) {
    return { ok: false, error: 'Supported formats: JPG, PNG, HEIC, WebP' }
  }
  return { ok: true }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
