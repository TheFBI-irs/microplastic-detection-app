export default function ConfidenceSlider({ value, onChange }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="confidence-slider"
          className="text-sm font-medium text-slate-300"
        >
          Detection Confidence Threshold
        </label>
        <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-2.5 py-0.5">
          {value.toFixed(2)}
        </span>
      </div>

      <input
        id="confidence-slider"
        type="range"
        min="0.10"
        max="0.90"
        step="0.05"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer
          bg-slate-700 accent-cyan-500
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400
          [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/30
          [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-400
          [&::-moz-range-thumb]:border-0"
      />

      <p className="text-xs text-slate-500 mt-2">
        <span className="font-medium text-slate-400">0.35 recommended:</span> Lower = catches more particles (more false positives). Higher = more selective.
      </p>
    </div>
  );
}
