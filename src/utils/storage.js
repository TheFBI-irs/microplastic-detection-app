/**
 * Local Storage Utilities
 * Manages saving and retrieving analysis history from browser localStorage
 */

const STORAGE_KEY = 'microplastic_history'
const MAX_HISTORY_ITEMS = 50 // Limit history size

/**
 * Save analysis result to history
 * @param {Object} entry - History entry with id, image, results, metadata, timestamp
 */
export function saveToHistory(entry) {
  try {
    const history = getHistory()
    
    // Add new entry at the beginning
    history.unshift(entry)
    
    // Limit history size
    if (history.length > MAX_HISTORY_ITEMS) {
      history.splice(MAX_HISTORY_ITEMS)
    }
    
    // Save to localStorage
    // Note: Images are stored as data URLs, which can be large
    // For production, consider compressing or using IndexedDB for larger storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    
    return true
  } catch (error) {
    console.error('Error saving to history:', error)
    
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      // Try to clear old entries and retry
      const history = getHistory()
      if (history.length > 10) {
        const reducedHistory = history.slice(0, 10)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedHistory))
          // Retry saving new entry
          reducedHistory.unshift(entry)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedHistory))
          return true
        } catch (retryError) {
          console.error('Error after reducing history:', retryError)
          alert('Storage limit reached. Please clear some history entries.')
        }
      }
    }
    
    return false
  }
}

/**
 * Get all history entries
 * @returns {Array} Array of history entries
 */
export function getHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return []
    }
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error reading history:', error)
    return []
  }
}

/**
 * Remove specific entry from history
 * @param {number} entryId - ID of entry to remove
 */
export function removeFromHistory(entryId) {
  try {
    const history = getHistory()
    const filtered = history.filter(entry => entry.id !== entryId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Error removing from history:', error)
    return false
  }
}

/**
 * Clear all history
 */
export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing history:', error)
    return false
  }
}

/**
 * Get storage usage estimate
 * @returns {Object} Storage info with used and available space
 */
export function getStorageInfo() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const size = stored ? new Blob([stored]).size : 0
    return {
      used: size,
      usedMB: (size / (1024 * 1024)).toFixed(2),
      items: getHistory().length
    }
  } catch (error) {
    console.error('Error getting storage info:', error)
    return { used: 0, usedMB: '0.00', items: 0 }
  }
}

