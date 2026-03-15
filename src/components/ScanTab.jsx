import UploadZone from './UploadZone';
import ResultsPanel from './ResultsPanel';

const steps = [
  {
    num: 1,
    title: 'Collect',
    desc: 'Collect 10mL of water from your source in a glass vial.',
  },
  {
    num: 2,
    title: 'Stain',
    desc: 'Add 0.5mL Nile Red solution, shake, wait 30 min in the dark.',
  },
  {
    num: 3,
    title: 'Image',
    desc: 'Pipette onto slide, illuminate with 470nm LED, photograph at 60x.',
  },
  {
    num: 4,
    title: 'Upload',
    desc: 'Upload your fluorescence image below for AI analysis.',
  },
  {
    num: 5,
    title: 'Results',
    desc: 'View particle count, confidence scores, and download report.',
  },
];

export default function ScanTab({
  image,
  imageUrl,
  onImageSelect,
  onImageClear,
  onAnalyze,
  isLoading,
  confidence,
  onConfidenceChange,
  error,
  predictions,
  onReset,
}) {
  return (
    <div className="py-10">
      {/* Quick steps bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8">
          Scan &amp; Detect
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex items-center gap-3 sm:flex-col sm:text-center flex-1 p-3 rounded-xl hover:bg-slate-800/40 transition-colors">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-sm font-bold shrink-0">
                  {step.num}
                </div>
                <div className="sm:mt-1">
                  <p className="text-sm font-semibold text-slate-200">{step.title}</p>
                  <p className="text-xs text-slate-500 leading-snug mt-0.5">{step.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <svg className="hidden sm:block w-5 h-5 text-slate-700 shrink-0 mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Upload Zone */}
      <UploadZone
        image={image}
        imageUrl={imageUrl}
        onImageSelect={onImageSelect}
        onImageClear={onImageClear}
        onAnalyze={onAnalyze}
        isLoading={isLoading}
        confidence={confidence}
        onConfidenceChange={onConfidenceChange}
        error={error}
      />

      {/* Results */}
      {predictions !== null && (
        <ResultsPanel
          imageUrl={imageUrl}
          predictions={predictions}
          imageName={image?.name}
          onReset={onReset}
        />
      )}
    </div>
  );
}
