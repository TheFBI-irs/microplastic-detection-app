export function References() {
  const refs = [
    { id: 1, text: 'Nile Red staining for microplastic identification', url: '#' },
    { id: 2, text: 'RF-DETR: Resolution-adaptive Feature DETR', url: '#' },
    { id: 3, text: 'Roboflow Computer Vision Platform', url: 'https://roboflow.com' },
    { id: 4, text: 'Microplastics in water: detection methods', url: '#' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">References</h1>
      <p className="text-text/80 mb-12">Scientific and technical references for this project.</p>

      <ol className="space-y-4">
        {refs.map((r) => (
          <li key={r.id} className="glass rounded-xl p-4 text-text/90">
            [{r.id}] {r.text}{' '}
            {r.url !== '#' && (
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {r.url}
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
