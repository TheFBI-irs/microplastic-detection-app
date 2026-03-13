/**
 * Demo dataset images. Add sample microscope images to public/images/demo/
 * e.g. demo-1.jpg, demo-2.jpg, ... demo-10.jpg
 */
const base = import.meta.env.BASE_URL || '/'
const demoBase = `${base.replace(/\/$/, '')}/images/demo/`

export interface DemoImage {
  id: string
  src: string
  groundTruth: number
  predicted?: number
}

// Fixed ground truth for display (deterministic for science fair)
const GROUND_TRUTHS = [3, 7, 12, 5, 9, 4, 11, 6, 8, 10]

export const DEMO_IMAGES: DemoImage[] = Array.from({ length: 10 }, (_, i) => ({
  id: `demo-${i + 1}`,
  src: `${demoBase}demo-${i + 1}.jpg`,
  groundTruth: GROUND_TRUTHS[i] ?? 5,
  predicted: undefined,
}))
