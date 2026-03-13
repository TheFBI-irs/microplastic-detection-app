import { motion } from 'framer-motion'

export function Impact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Scientific Impact</h1>
      <p className="text-text/80 mb-12">
        How this kit improves accessibility to microplastic detection.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="glass rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-accent mb-4">Traditional Microplastic Detection</h2>
          <ul className="space-y-2 text-text/90">
            <li>• Professional lab equipment required</li>
            <li>• Cost: <strong className="text-accent">$500–$1,000 per sample</strong></li>
            <li>• Limited to research institutions</li>
          </ul>
        </div>

        <div className="glass rounded-2xl p-8 border-2 border-primary/30">
          <h2 className="text-xl font-semibold text-primary mb-4">This Kit</h2>
          <ul className="space-y-2 text-text/90">
            <li>• Nile Red stain, LED, phone microscope</li>
            <li>• Cost: <strong className="text-primary">&lt; $50 per sample</strong></li>
            <li>• Accessible to schools, citizen science, developing regions</li>
          </ul>
        </div>

        <p className="text-text/80">
          By combining low-cost hardware with AI-powered analysis, this project demonstrates that
          accurate microplastic detection can be democratized for environmental monitoring and education.
        </p>
      </motion.div>
    </div>
  )
}
