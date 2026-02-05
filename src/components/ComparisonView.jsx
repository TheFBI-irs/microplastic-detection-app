import React from 'react'
import { exportResults } from '../utils/export'

/**
 * ComparisonView Component
 * Displays multiple samples side-by-side for comparison
 */
function ComparisonView({ samples, onNewAnalysis, onClear }) {
  if (samples.length === 0) {
    return (
      <div className="comparison-empty">
        <h2>No samples to compare</h2>
        <p>Add samples from the results view to compare them side-by-side.</p>
        <button className="btn-primary" onClick={onNewAnalysis}>
          Start New Analysis
        </button>
      </div>
    )
  }

  const handleExportComparison = (format) => {
    const comparisonData = {
      timestamp: new Date().toISOString(),
      type: 'comparison',
      samples: samples.map(sample => ({
        metadata: sample.metadata,
        results: {
          totalParticles: sample.results.count,
          particlesPerML: sample.metadata.sampleVolume > 0
            ? (sample.results.count / sample.metadata.sampleVolume).toFixed(2)
            : sample.results.count
        }
      }))
    }
    exportResults(comparisonData, format)
  }

  return (
    <div className="comparison-container">
      <div className="comparison-header">
        <h2>Sample Comparison</h2>
        <div className="comparison-actions">
          <button className="btn-secondary" onClick={onClear}>
            Clear All
          </button>
          <button className="btn-primary" onClick={onNewAnalysis}>
            New Analysis
          </button>
        </div>
      </div>

      <div className="comparison-grid">
        {samples.map((sample, index) => (
          <div key={sample.id} className="comparison-card">
            <div className="comparison-image">
              <img src={sample.image} alt={`Sample ${index + 1}`} />
            </div>
            <div className="comparison-stats">
              <div className="comparison-stat">
                <span className="stat-label">Particles:</span>
                <span className="stat-value">{sample.results.count}</span>
              </div>
              <div className="comparison-stat">
                <span className="stat-label">Per mL:</span>
                <span className="stat-value">
                  {sample.metadata.sampleVolume > 0
                    ? (sample.results.count / sample.metadata.sampleVolume).toFixed(2)
                    : sample.results.count
                  }
                </span>
              </div>
            </div>
            <div className="comparison-meta">
              {sample.metadata.location && (
                <p><strong>Location:</strong> {sample.metadata.location}</p>
              )}
              {sample.metadata.waterSource && (
                <p><strong>Source:</strong> {sample.metadata.waterSource}</p>
              )}
              {sample.metadata.date && (
                <p><strong>Date:</strong> {sample.metadata.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-summary">
        <h3>Summary Statistics</h3>
        <div className="summary-stats">
          <div className="summary-item">
            <span className="summary-label">Total Samples:</span>
            <span className="summary-value">{samples.length}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Particles:</span>
            <span className="summary-value">
              {samples.reduce((sum, s) => sum + s.results.count, 0)}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Average per Sample:</span>
            <span className="summary-value">
              {(samples.reduce((sum, s) => sum + s.results.count, 0) / samples.length).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="comparison-export">
        <h3>Export Comparison</h3>
        <div className="export-buttons">
          <button className="btn-export" onClick={() => handleExportComparison('csv')}>
            Export as CSV
          </button>
          <button className="btn-export" onClick={() => handleExportComparison('json')}>
            Export as JSON
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComparisonView

