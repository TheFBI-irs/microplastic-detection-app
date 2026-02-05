import React from 'react'

/**
 * InstructionsPanel Component
 * Provides step-by-step instructions for first-time users
 */
function InstructionsPanel({ onClose }) {
  return (
    <div className="instructions-panel">
      <div className="instructions-header">
        <h2>How to Use</h2>
        <button className="btn-close" onClick={onClose}>×</button>
      </div>
      <div className="instructions-content">
        <div className="instruction-step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Prepare Your Sample</h3>
            <p>Stain your water sample with Nile Red dye and capture an image using a microscope or smartphone camera.</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Upload Image</h3>
            <p>Click the upload area or use your device camera to capture a new image. Supported formats: JPEG, PNG, WebP.</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Add Sample Info (Optional)</h3>
            <p>Enter location, date, water source type, and sample volume for better record keeping.</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <div className="step-number">4</div>
          <div className="step-content">
            <h3>View Results</h3>
            <p>Review detected particles with bounding boxes, particle count, and particles per milliliter calculation.</p>
          </div>
        </div>
        
        <div className="instruction-step">
          <div className="step-number">5</div>
          <div className="step-content">
            <h3>Export & Compare</h3>
            <p>Download annotated images, export data as CSV/JSON, or compare multiple samples side-by-side.</p>
          </div>
        </div>
        
        <div className="instruction-tips">
          <h3>💡 Tips</h3>
          <ul>
            <li>Use good lighting and focus for best detection accuracy</li>
            <li>Adjust confidence threshold to filter false positives</li>
            <li>All processing happens in your browser - your data stays private</li>
            <li>Works offline after initial page load</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InstructionsPanel

