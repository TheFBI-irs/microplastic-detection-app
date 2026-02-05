import React, { useRef, useState } from 'react'
import { drawBoundingBoxes, downloadImage } from '../utils/imageUtils'
import { exportResults } from '../utils/export'

/**
 * ResultsDisplay Component
 * Shows detection results with annotated image, statistics, and export options
 */
function ResultsDisplay({ 
  originalImage, 
  results, 
  metadata, 
  confidenceThreshold,
  onThresholdChange,
  onNewAnalysis,
  onAddToComparison
}) {
  const canvasRef = useRef(null)
  const [annotatedImage, setAnnotatedImage] = useState(null)

  // Calculate particles per milliliter
  const particlesPerML = metadata.sampleVolume > 0 
    ? (results.count / metadata.sampleVolume).toFixed(2)
    : results.count

  // Draw bounding boxes on image when component mounts or results change
  React.useEffect(() => {
    if (originalImage && results && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width
        canvas.height = img.height
        
        // Draw original image
        ctx.drawImage(img, 0, 0)
        
        // Draw bounding boxes
        drawBoundingBoxes(ctx, results.detections, img.width, img.height)
        
        // Convert to data URL for display
        setAnnotatedImage(canvas.toDataURL('image/png'))
      }
      
      img.src = originalImage
    }
  }, [originalImage, results])

  /**
   * Handle confidence threshold slider change
   */
  const handleThresholdSlider = (e) => {
    onThresholdChange(parseFloat(e.target.value))
  }

  /**
   * Handle download annotated image
   */
  const handleDownloadImage = () => {
    if (annotatedImage) {
      downloadImage(annotatedImage, `microplastic-detection-${Date.now()}.png`)
    }
  }

  /**
   * Handle export results
   */
  const handleExport = (format) => {
    const exportData = {
      timestamp: new Date().toISOString(),
      metadata: metadata,
      results: {
        totalParticles: results.count,
        particlesPerML: particlesPerML,
        confidenceThreshold: confidenceThreshold,
        detections: results.detections
      }
    }
    exportResults(exportData, format)
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Analysis Results</h2>
        <div className="results-actions">
          <button className="btn-primary" onClick={onNewAnalysis}>
            New Analysis
          </button>
          <button className="btn-secondary" onClick={onAddToComparison}>
            Add to Comparison
          </button>
        </div>
      </div>

      {/* Confidence Threshold Slider */}
      <div className="threshold-control">
        <label htmlFor="confidence-threshold">
          Confidence Threshold: {confidenceThreshold.toFixed(2)}
        </label>
        <input
          id="confidence-threshold"
          type="range"
          min="0.1"
          max="1.0"
          step="0.05"
          value={confidenceThreshold}
          onChange={handleThresholdSlider}
          className="slider"
        />
        <small>Adjust to filter detections by confidence level</small>
      </div>

      {/* Statistics Panel */}
      <div className="statistics-panel">
        <div className="stat-card">
          <div className="stat-value">{results.count}</div>
          <div className="stat-label">Total Particles Detected</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{particlesPerML}</div>
          <div className="stat-label">Particles per mL</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {results.detections.length > 0 
              ? (results.detections.reduce((sum, d) => sum + d.confidence, 0) / results.detections.length).toFixed(2)
              : '0.00'
            }
          </div>
          <div className="stat-label">Average Confidence</div>
        </div>
      </div>

      {/* Image Comparison */}
      <div className="image-comparison">
        <div className="image-panel">
          <h3>Original Image</h3>
          <img src={originalImage} alt="Original sample" className="result-image" />
        </div>
        <div className="image-panel">
          <h3>Annotated Image</h3>
          <canvas ref={canvasRef} className="result-image" style={{ display: 'none' }} />
          {annotatedImage && (
            <img src={annotatedImage} alt="Annotated detection" className="result-image" />
          )}
          <button className="btn-download" onClick={handleDownloadImage}>
            📥 Download Annotated Image
          </button>
        </div>
      </div>

      {/* Metadata Display */}
      {metadata.location || metadata.waterSource ? (
        <div className="metadata-display">
          <h3>Sample Information</h3>
          <div className="metadata-info">
            {metadata.location && <p><strong>Location:</strong> {metadata.location}</p>}
            {metadata.date && <p><strong>Date:</strong> {metadata.date}</p>}
            {metadata.waterSource && <p><strong>Water Source:</strong> {metadata.waterSource}</p>}
            {metadata.sampleVolume && <p><strong>Sample Volume:</strong> {metadata.sampleVolume} mL</p>}
          </div>
        </div>
      ) : null}

      {/* Export Options */}
      <div className="export-section">
        <h3>Export Results</h3>
        <div className="export-buttons">
          <button className="btn-export" onClick={() => handleExport('csv')}>
            Export as CSV
          </button>
          <button className="btn-export" onClick={() => handleExport('json')}>
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsDisplay

