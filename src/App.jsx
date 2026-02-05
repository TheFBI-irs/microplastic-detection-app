import React, { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import ResultsDisplay from './components/ResultsDisplay'
import HistoryPanel from './components/HistoryPanel'
import InstructionsPanel from './components/InstructionsPanel'
import MetadataInput from './components/MetadataInput'
import ComparisonView from './components/ComparisonView'
import { detectMicroplastics } from './utils/modelInference'
import { saveToHistory, getHistory } from './utils/storage'

/**
 * Main Application Component
 * Manages application state and workflow between upload, analysis, and results
 */
function App() {
  // Application state
  const [currentStep, setCurrentStep] = useState('upload') // 'upload', 'analyzing', 'results', 'comparison'
  const [uploadedImage, setUploadedImage] = useState(null)
  const [detectionResults, setDetectionResults] = useState(null)
  const [metadata, setMetadata] = useState({
    location: '',
    date: new Date().toISOString().split('T')[0],
    waterSource: '',
    sampleVolume: 1.0 // Default 1 mL
  })
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5)
  const [showInstructions, setShowInstructions] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState(getHistory())
  const [comparisonSamples, setComparisonSamples] = useState([])

  /**
   * Handle image upload from file input or camera
   */
  const handleImageUpload = (imageFile) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target.result
      setUploadedImage(imageData)
      setCurrentStep('analyzing')
      
      // Run inference on the uploaded image
      analyzeImage(imageData)
    }
    reader.readAsDataURL(imageFile)
  }

  /**
   * Analyze uploaded image using YOLOv12 model
   */
  const analyzeImage = async (imageData) => {
    try {
      const results = await detectMicroplastics(imageData, confidenceThreshold)
      setDetectionResults(results)
      setCurrentStep('results')
      
      // Save to history
      const historyEntry = {
        id: Date.now(),
        image: imageData,
        results: results,
        metadata: { ...metadata },
        timestamp: new Date().toISOString()
      }
      saveToHistory(historyEntry)
      setHistory(getHistory())
    } catch (error) {
      console.error('Error during analysis:', error)
      alert('Error analyzing image. Please try again or check console for details.')
      setCurrentStep('upload')
    }
  }

  /**
   * Handle new analysis - reset to upload step
   */
  const handleNewAnalysis = () => {
    setCurrentStep('upload')
    setUploadedImage(null)
    setDetectionResults(null)
    setMetadata({
      location: '',
      date: new Date().toISOString().split('T')[0],
      waterSource: '',
      sampleVolume: 1.0
    })
  }

  /**
   * Handle confidence threshold change
   */
  const handleThresholdChange = (newThreshold) => {
    setConfidenceThreshold(newThreshold)
    if (uploadedImage && detectionResults) {
      // Re-analyze with new threshold
      analyzeImage(uploadedImage)
    }
  }

  /**
   * Add sample to comparison view
   */
  const handleAddToComparison = () => {
    if (detectionResults) {
      const sample = {
        id: Date.now(),
        image: uploadedImage,
        results: detectionResults,
        metadata: { ...metadata }
      }
      setComparisonSamples([...comparisonSamples, sample])
      setCurrentStep('comparison')
    }
  }

  /**
   * Load sample from history
   */
  const handleLoadFromHistory = (historyEntry) => {
    setUploadedImage(historyEntry.image)
    setDetectionResults(historyEntry.results)
    setMetadata(historyEntry.metadata)
    setCurrentStep('results')
    setShowHistory(false)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>🌊 Microplastics Detection</h1>
        <p className="subtitle">AI-Powered Water Sample Analysis</p>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            {showInstructions ? 'Hide' : 'Show'} Instructions
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setShowHistory(!showHistory)}
          >
            History ({history.length})
          </button>
        </div>
      </header>

      {/* Instructions Panel */}
      {showInstructions && (
        <InstructionsPanel onClose={() => setShowInstructions(false)} />
      )}

      {/* History Panel */}
      {showHistory && (
        <HistoryPanel 
          history={history}
          onLoad={handleLoadFromHistory}
          onClose={() => setShowHistory(false)}
          onClear={() => {
            localStorage.removeItem('microplastic_history')
            setHistory([])
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="main-content">
        {currentStep === 'upload' && (
          <div className="step-container">
            <ImageUpload 
              onImageUpload={handleImageUpload}
              metadata={metadata}
              onMetadataChange={setMetadata}
            />
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="step-container">
            <div className="loading-container">
              <div className="spinner"></div>
              <h2>Analyzing Image...</h2>
              <p>Running AI detection model on your sample</p>
            </div>
          </div>
        )}

        {currentStep === 'results' && detectionResults && (
          <div className="step-container">
            <ResultsDisplay
              originalImage={uploadedImage}
              results={detectionResults}
              metadata={metadata}
              confidenceThreshold={confidenceThreshold}
              onThresholdChange={handleThresholdChange}
              onNewAnalysis={handleNewAnalysis}
              onAddToComparison={handleAddToComparison}
            />
          </div>
        )}

        {currentStep === 'comparison' && (
          <div className="step-container">
            <ComparisonView
              samples={comparisonSamples}
              onNewAnalysis={handleNewAnalysis}
              onClear={() => setComparisonSamples([])}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Powered by TensorFlow.js & YOLOv12 | Client-Side Processing</p>
      </footer>
    </div>
  )
}

export default App

