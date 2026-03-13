import { motion } from 'framer-motion'

export function ModelArchitecture() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Model Architecture</h1>
      <p className="text-text/80 mb-12">How the RF-DETR model processes microscope images.</p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-primary mb-4">1. Feature Extraction</h2>
          <p className="text-text/90 mb-4">
            The input image is processed by a convolutional backbone (e.g., ResNet) that extracts
            multi-scale features. This stage captures low-level patterns like edges and textures.
          </p>
          <div className="h-24 rounded-xl bg-white/5 flex items-center justify-center text-text/50 border border-white/10">
            Image → Conv Backbone → Feature Maps
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-primary mb-4">2. Transformer Encoder</h2>
          <p className="text-text/90 mb-4">
            A transformer encoder captures global image context through self-attention. This allows
            the model to relate distant regions (e.g., multiple microplastic particles) in the image.
          </p>
          <div className="h-24 rounded-xl bg-white/5 flex items-center justify-center text-text/50 border border-white/10">
            Feature Maps → Transformer → Global Context
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-primary mb-4">3. Detection Head</h2>
          <p className="text-text/90 mb-4">
            The detection head predicts bounding boxes, class labels, and confidence scores for
            each candidate region. RF-DETR uses a DETR-style decoder for set-based prediction.
          </p>
          <div className="h-24 rounded-xl bg-white/5 flex items-center justify-center text-text/50 border border-white/10">
            Encoded Features → Decoder → Bounding Boxes + Confidence
          </div>
        </div>

        <p className="text-sm text-text/60">
          RF-DETR (Resolution-adaptive Feature DETR) is optimized for small-object detection in
          fluorescence microscopy, outperforming YOLO on microplastic datasets.
        </p>
      </motion.div>
    </div>
  )
}
