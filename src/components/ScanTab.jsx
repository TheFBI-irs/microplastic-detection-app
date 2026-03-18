import { useState } from 'react';
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

const SAMPLE_IMAGES = [
  { id: 'sample1', name: 'Low Concentration', path: '/images/demo/demo-1.jpg' },
  { id: 'sample2', name: 'High Concentration', path: '/images/demo/demo-9.jpg' },
  { id: 'sample3', name: 'Mixed Sizes', path: '/images/demo/demo-3.jpg' },
  { id: 'sample4', name: 'Very High Density', path: '/images/demo/IMG_7849_jpg.rf.14ef3fb49ac8dfd9ab7955c0c7a0db76.jpg' },
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
  const [isSampleLoading, setIsSampleLoading] = useState(false);

  const handleSampleSelect = async (sample) => {
    setIsSampleLoading(true);
    try {
      const response = await fetch(sample.path);
      const blob = await response.blob();
      const file = new File([blob], `${sample.id}.jpg`, { type: 'image/jpeg' });
      onImageSelect(file);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    } finally {
      setIsSampleLoading(false);
    }
  };

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

      {/* Sample Images Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Try a Sample Image
          </h3>
          {isSampleLoading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <div className="w-3 h-3 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              Loading sample...
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleSampleSelect(sample)}
              disabled={isSampleLoading || isLoading}
              className={`
                group relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200
                ${image?.name === `${sample.id}.jpg`
                  ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
                  : 'border-slate-800 hover:border-slate-700'
                }
              `}
            >
              <img
                src={sample.path}
                alt={sample.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2 sm:p-3">
                <span className="text-[10px] sm:text-xs font-medium text-slate-200">
                  {sample.name}
                </span>
              </div>
            </button>
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
