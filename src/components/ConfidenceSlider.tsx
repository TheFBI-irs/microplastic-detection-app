interface ConfidenceSliderProps {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}

export function ConfidenceSlider({ value, onChange, min = 0.1, max = 0.9 }: ConfidenceSliderProps) {
  return (
    <div>
      <label htmlFor="confidence-slider" className="block text-sm font-medium text-text mb-2">
        Confidence Threshold: {value.toFixed(2)} (recommended: 0.35)
      </label>
      <input
        id="confidence-slider"
        type="range"
        min={min}
        max={max}
        step={0.05}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full max-w-md h-2 rounded-lg appearance-none cursor-pointer accent-primary"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  )
}
