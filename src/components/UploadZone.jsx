import { useState, useRef } from 'react';
import ConfidenceSlider from './ConfidenceSlider';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export default function UploadZone({
  image,
  imageUrl,
  onImageSelect,
  onImageClear,
  onAnalyze,
  isLoading,
  confidence,
  onConfidenceChange,
  error,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [sizeError, setSizeError] = useState(null);
  const fileInputRef = useRef(null);

  const validateAndSet = (file) => {
    setSizeError(null);
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png|jpg)$/)) {
      setSizeError('Please upload a JPG or PNG image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSizeError('Image too large. Please use a photo under 20MB.');
      return;
    }

    onImageSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    validateAndSet(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!image) fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndSet(file);
    e.target.value = ''; // reset so same file can be re-selected
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Drop zone */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative rounded-2xl border-2 border-dashed transition-all duration-200
          ${isDragging
            ? 'border-cyan-400 bg-cyan-500/5'
            : image
              ? 'border-slate-700/50 bg-slate-900/60'
              : 'border-cyan-500/40 hover:border-cyan-400/60 bg-slate-900/40 cursor-pointer'
          }
          min-h-[200px] md:min-h-[300px] flex items-center justify-center overflow-hidden
        `}
      >
        {image && imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Uploaded fluorescence image"
              className="max-w-full max-h-[400px] object-contain"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageClear();
                setSizeError(null);
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-800/90 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
              aria-label="Remove image"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            {/* Microscope icon */}
            <svg
              className="w-12 h-12 text-cyan-500/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
              <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
              <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
            </svg>
            <p className="text-lg font-medium text-slate-200">
              Drop your fluorescence image here
            </p>
            <p className="text-sm text-slate-400">or click to browse</p>
            <p className="text-xs text-slate-500">Accepts JPG, PNG up to 20MB</p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Size error */}
      {sizeError && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {sizeError}
        </div>
      )}

      {/* API error */}
      {error && (
        <div className="mt-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <p className="text-red-400 text-sm mb-2">{error}</p>
          <button
            onClick={onAnalyze}
            className="text-sm font-medium text-red-300 hover:text-red-200 underline underline-offset-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="mt-6 space-y-5">
        <ConfidenceSlider value={confidence} onChange={onConfidenceChange} />

        <button
          onClick={onAnalyze}
          disabled={!image || isLoading}
          className={`
            w-full sm:w-auto btn-primary flex items-center justify-center gap-2
            ${(!image || isLoading) ? 'opacity-50 cursor-not-allowed hover:bg-cyan-500 hover:shadow-none' : ''}
          `}
        >
          {isLoading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Analyzing with RF-DETR...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Analyze Image
            </>
          )}
        </button>
      </div>
    </section>
  );
}
