import { motion } from 'framer-motion'

interface FigurePanelProps {
  src: string
  alt: string
  caption: string
  title?: string
}

export function FigurePanel({ src, alt, caption, title }: FigurePanelProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="p-4">
        {title && (
          <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
        )}
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg object-contain max-h-80"
        />
        <figcaption className="mt-3 text-sm text-text/70">{caption}</figcaption>
      </div>
    </motion.figure>
  )
}
