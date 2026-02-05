import React, { useRef, useState } from 'react'
import MetadataInput from './MetadataInput'

/**
 * ImageUpload Component
 * Handles image upload via file input or camera capture
 * Includes metadata input for sample information
 */
function ImageUpload({ onImageUpload, metadata, onMetadataChange }) {
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)

  /**
   * Handle file selection from file input
   */
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      handleImageFile(file)
    }
  }

  /**
   * Handle camera capture on mobile devices
   */
  const handleCameraCapture = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.capture = 'environment' // Use back camera on mobile
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        handleImageFile(file)
      }
    }
    input.click()
  }

  /**
   * Process selected image file
   */
  const handleImageFile = (file) => {
    // Validate file type
    if (!file.type.match('image.*')) {
      alert('Please select a valid image file (JPEG, PNG, or WebP)')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image file is too large. Please use an image smaller than 10MB.')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
    reader.readAsDataURL(file)

    // Upload image
    onImageUpload(file)
  }

  /**
   * Handle drag and drop
   */
  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div className="upload-container">
      <h2>Upload Sample Image</h2>
      
      {/* Upload Area */}
      <div 
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button 
              className="btn-change-image"
              onClick={(e) => {
                e.stopPropagation()
                setPreview(null)
                fileInputRef.current.value = ''
              }}
            >
              Change Image
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <p className="upload-text">Click to upload or drag and drop</p>
            <p className="upload-hint">JPEG, PNG, or WebP (max 10MB)</p>
            <button 
              className="btn-camera"
              onClick={(e) => {
                e.stopPropagation()
                handleCameraCapture()
              }}
            >
              📱 Use Camera
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {/* Sample Image Examples */}
      <div className="sample-images">
        <h3>Sample Images</h3>
        <div className="sample-grid">
          <div className="sample-item">
            <div className="sample-placeholder">Sample 1</div>
            <p>Nile Red stained sample</p>
          </div>
          <div className="sample-item">
            <div className="sample-placeholder">Sample 2</div>
            <p>Microscope view</p>
          </div>
          <div className="sample-item">
            <div className="sample-placeholder">Sample 3</div>
            <p>Water sample</p>
          </div>
        </div>
      </div>

      {/* Metadata Input */}
      <MetadataInput 
        metadata={metadata}
        onMetadataChange={onMetadataChange}
      />
    </div>
  )
}

export default ImageUpload

