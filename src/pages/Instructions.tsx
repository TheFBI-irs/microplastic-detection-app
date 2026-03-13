export function Instructions() {
  const steps = [
    { n: 1, title: 'Prepare Nile Red solution', desc: 'Create a Nile Red staining solution for microplastic fluorescence.' },
    { n: 2, title: 'Add microplastics sample', desc: 'Add your water sample to the staining solution.' },
    { n: 3, title: 'Place between microscope slides', desc: 'Spread the sample thinly between glass slides for imaging.' },
    { n: 4, title: 'Illuminate with 470 nm blue LED', desc: 'Use a blue LED (470 nm) to excite Nile Red fluorescence.' },
    { n: 5, title: 'Attach phone microscope', desc: 'Mount your smartphone microscope attachment for magnification.' },
    { n: 6, title: 'Capture image', desc: 'Take a clear, focused image of the stained sample.' },
    { n: 7, title: 'Upload to AI scanner', desc: 'Upload the image to this application for automated detection.' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Procedure</h1>
      <p className="text-text/80 mb-12">
        Follow these steps to prepare and scan your water sample for microplastic detection.
      </p>

      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.n}
            className="glass rounded-xl p-6 flex gap-6"
            role="article"
            aria-labelledby={`step-${step.n}-title`}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {step.n}
            </div>
            <div>
              <h2 id={`step-${step.n}-title`} className="text-xl font-semibold text-text mb-2">
                Step {step.n}: {step.title}
              </h2>
              <p className="text-text/80">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
