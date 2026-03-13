import { Link } from 'react-router-dom'

export function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">About</h1>
      <p className="text-text/80 mb-8">
        AI-Powered Microplastic Detection Kit for environmental research and science education.
      </p>
      <div className="glass rounded-2xl p-8 space-y-4 text-text/90">
        <p>
          This application uses RF-DETR object detection via the Roboflow Hosted API to identify
          Nile Red–stained microplastics in microscope images of water samples.
        </p>
        <p>
          Designed for science fair projects and environmental research. The kit combines
          low-cost microscopy with AI for accessible microplastic analysis.
        </p>
        <Link to="/scan" className="inline-block text-primary hover:underline">
          Start a scan →
        </Link>
      </div>
    </div>
  )
}
