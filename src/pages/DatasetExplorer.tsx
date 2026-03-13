import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEMO_IMAGES } from '../data/demoImages'

export function DatasetExplorer() {
  const [selected, setSelected] = useState<typeof DEMO_IMAGES[0] | null>(null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Dataset Explorer</h1>
      <p className="text-text/80 mb-8">
        Browse the microscope dataset used to train the RF-DETR model. Add sample images to{' '}
        <code className="text-primary/80">public/images/demo/</code> (demo-1.jpg … demo-10.jpg).
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {DEMO_IMAGES.map((img) => (
          <motion.div
            key={img.id}
            layout
            className="glass rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/50 transition"
            onClick={() => setSelected(img)}
          >
            <div className="aspect-square bg-black/30 relative">
              <img
                src={img.src}
                alt={`Sample ${img.id}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-xs">
                Particles: {img.groundTruth}
                {img.predicted != null && ` | Pred: ${img.predicted}`}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-2xl p-6 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-primary mb-4">{selected.id}</h2>
              <img
                src={selected.src}
                alt={selected.id}
                className="w-full max-h-[60vh] object-contain rounded-lg mb-4"
              />
              <div className="flex gap-6 text-sm">
                <div>Ground truth particles: <strong>{selected.groundTruth}</strong></div>
                {selected.predicted != null && (
                  <>
                    <div>Predicted: <strong>{selected.predicted}</strong></div>
                    <div>Error: <strong>{Math.abs(selected.predicted - selected.groundTruth)}</strong></div>
                  </>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-bg font-semibold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
