import React from 'react'

/**
 * MetadataInput Component
 * Collects sample metadata: location, date, water source, and volume
 */
function MetadataInput({ metadata, onMetadataChange }) {
  const handleChange = (field, value) => {
    onMetadataChange({
      ...metadata,
      [field]: value
    })
  }

  return (
    <div className="metadata-container">
      <h3>Sample Information (Optional)</h3>
      <div className="metadata-grid">
        <div className="metadata-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="e.g., Pacific Ocean, Beach Name"
            value={metadata.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="metadata-field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={metadata.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>

        <div className="metadata-field">
          <label htmlFor="waterSource">Water Source Type</label>
          <select
            id="waterSource"
            value={metadata.waterSource}
            onChange={(e) => handleChange('waterSource', e.target.value)}
          >
            <option value="">Select source type</option>
            <option value="ocean">Ocean</option>
            <option value="river">River</option>
            <option value="lake">Lake</option>
            <option value="tap">Tap Water</option>
            <option value="bottled">Bottled Water</option>
            <option value="wastewater">Wastewater</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="metadata-field">
          <label htmlFor="sampleVolume">Sample Volume (mL)</label>
          <input
            id="sampleVolume"
            type="number"
            min="0.1"
            step="0.1"
            placeholder="1.0"
            value={metadata.sampleVolume}
            onChange={(e) => handleChange('sampleVolume', parseFloat(e.target.value) || 1.0)}
          />
          <small>Used for particles/mL calculation</small>
        </div>
      </div>
    </div>
  )
}

export default MetadataInput

