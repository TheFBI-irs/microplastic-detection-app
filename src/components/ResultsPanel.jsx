import { useRef, useEffect, useCallback } from 'react';
import { drawBoundingBoxes } from '../utils/drawBoundingBoxes';
import BenchmarkAlert from './BenchmarkAlert';

export default function ResultsPanel({ imageUrl, predictions, imageName, onReset }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const meanConfidence =
    predictions.length > 0
      ? predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length
      : 0;

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const rect = img.getBoundingClientRect();
    drawBoundingBoxes(canvas, predictions, rect.width, rect.height);
  }, [predictions]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      redraw();
    } else {
      img.addEventListener('load', redraw);
      return () => img.removeEventListener('load', redraw);
    }
  }, [redraw]);

  useEffect(() => {
    window.addEventListener('resize', redraw);
    return () => window.removeEventListener('resize', redraw);
  }, [redraw]);

  const handleDownloadReport = () => {
    const timestamp = new Date().toISOString();
    const lines = [
      `Low-cost AI-Powered Microplastic Detection Kit Report`,
      `============================`,
      `Timestamp: ${timestamp}`,
      `Image: ${imageName || 'unknown'}`,
      `Particles Detected: ${predictions.length}`,
      `Mean Confidence: ${(meanConfidence * 100).toFixed(1)}%`,
      ``,
      `Model Performance (validated):`,
      `  Precision: 86.8%`,
      `  Recall:    87.0%`,
      `  mAP@50:    89.4%`,
      ``,
      `Individual Detections:`,
      `---`,
    ];

    predictions.forEach((p, i) => {
      lines.push(
        `  #${i + 1}: confidence=${(p.confidence * 100).toFixed(1)}%, ` +
        `class=${p.class || 'microplastic'}, ` +
        `center=(${p.x.toFixed(4)}, ${p.y.toFixed(4)}), ` +
        `size=(${p.width.toFixed(4)} × ${p.height.toFixed(4)})`
      );
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detection-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Detection Results</h2>

      {predictions.length === 0 ? (
        /* Zero detections message */
        <div className="card p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-slate-200 font-medium mb-1">No microplastics detected</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                No microplastics detected at this confidence threshold. Try lowering the
                threshold slider, or verify your Nile Red staining was successful — particles
                should glow bright orange under blue LED light.
              </p>
            </div>
          </div>
          <button onClick={onReset} className="btn-secondary mt-4">
            Reset / Analyze Another
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Annotated image */}
          <div className="lg:col-span-2 card p-4">
            <div className="relative inline-block w-full">
              <img
                ref={imgRef}
                src={imageUrl}
                alt="Analyzed fluorescence image"
                className="w-full h-auto rounded-lg"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
              />
            </div>
          </div>

          {/* Stats panel */}
          <div className="card p-6 flex flex-col gap-6">
            {/* Particle count */}
            <div>
              <p className="text-5xl font-bold text-cyan-400">{predictions.length}</p>
              <p className="text-sm text-slate-400 mt-1">Microplastics Detected</p>
            </div>

            {/* Mean confidence */}
            <div>
              <p className="text-2xl font-bold text-slate-100">
                {(meanConfidence * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-slate-400 mt-1">Mean Confidence</p>
            </div>

            {/* Model stats table */}
            <div className="border-t border-slate-700/50 pt-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Model Metrics (Validated)
              </p>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-slate-400">Precision</td>
                    <td className="py-2 text-right text-slate-200 font-medium">86.8%</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 text-slate-400">Recall</td>
                    <td className="py-2 text-right text-slate-200 font-medium">87.0%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-slate-400">mAP@50</td>
                    <td className="py-2 text-right text-slate-200 font-medium">89.4%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              <button onClick={handleDownloadReport} className="btn-primary text-center">
                Download Report
              </button>
              <button onClick={onReset} className="btn-secondary text-center">
                Reset / Analyze Another
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Concentration Benchmark Analysis */}
      {predictions.length > 0 && (
        <BenchmarkAlert particleCount={predictions.length} />
      )}
    </section>
  );
}
