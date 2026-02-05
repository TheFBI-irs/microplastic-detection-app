/**
 * Export Utilities
 * Handles exporting analysis results as CSV or JSON
 */

/**
 * Export results as CSV file
 * @param {Object} data - Data to export
 * @param {string} filename - Optional filename
 */
export function exportToCSV(data, filename = null) {
  try {
    let csvContent = ''
    
    if (data.type === 'comparison') {
      // Comparison export format
      csvContent = 'Sample,Location,Date,Water Source,Volume (mL),Total Particles,Particles per mL\n'
      
      data.samples.forEach((sample, index) => {
        const row = [
          `Sample ${index + 1}`,
          sample.metadata.location || '',
          sample.metadata.date || '',
          sample.metadata.waterSource || '',
          sample.metadata.sampleVolume || '',
          sample.results.totalParticles,
          sample.results.particlesPerML
        ]
        csvContent += row.map(field => `"${field}"`).join(',') + '\n'
      })
    } else {
      // Single result export format
      csvContent = 'Field,Value\n'
      csvContent += `Timestamp,"${data.timestamp}"\n`
      csvContent += `Location,"${data.metadata.location || ''}"\n`
      csvContent += `Date,"${data.metadata.date || ''}"\n`
      csvContent += `Water Source,"${data.metadata.waterSource || ''}"\n`
      csvContent += `Sample Volume (mL),"${data.metadata.sampleVolume || ''}"\n`
      csvContent += `Total Particles,"${data.results.totalParticles}"\n`
      csvContent += `Particles per mL,"${data.results.particlesPerML}"\n`
      csvContent += `Confidence Threshold,"${data.results.confidenceThreshold}"\n`
      csvContent += '\nDetection Details\n'
      csvContent += 'Index,X,Y,Width,Height,Confidence,Class\n'
      
      data.results.detections.forEach((detection, index) => {
        const row = [
          index + 1,
          detection.bbox.x.toFixed(2),
          detection.bbox.y.toFixed(2),
          detection.bbox.width.toFixed(2),
          detection.bbox.height.toFixed(2),
          detection.confidence.toFixed(3),
          detection.class
        ]
        csvContent += row.join(',') + '\n'
      })
    }
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', filename || `microplastic-analysis-${Date.now()}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting CSV:', error)
    alert('Error exporting CSV file. Please try again.')
  }
}

/**
 * Export results as JSON file
 * @param {Object} data - Data to export
 * @param {string} filename - Optional filename
 */
export function exportToJSON(data, filename = null) {
  try {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', filename || `microplastic-analysis-${Date.now()}.json`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error exporting JSON:', error)
    alert('Error exporting JSON file. Please try again.')
  }
}

/**
 * Main export function - routes to appropriate format
 * @param {Object} data - Data to export
 * @param {string} format - 'csv' or 'json'
 */
export function exportResults(data, format = 'json') {
  if (format === 'csv') {
    exportToCSV(data)
  } else if (format === 'json') {
    exportToJSON(data)
  } else {
    console.error('Unknown export format:', format)
    alert('Unknown export format. Please use CSV or JSON.')
  }
}

