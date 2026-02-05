import React from 'react'

/**
 * HistoryPanel Component
 * Displays analysis history stored in browser localStorage
 */
function HistoryPanel({ history, onLoad, onClose, onClear }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <div className="history-panel-overlay" onClick={onClose}>
      <div className="history-panel" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <h2>Analysis History</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        
        {history.length === 0 ? (
          <div className="history-empty">
            <p>No analysis history yet.</p>
            <p>Your analyses will be saved here automatically.</p>
          </div>
        ) : (
          <>
            <div className="history-actions">
              <button className="btn-clear" onClick={onClear}>
                Clear All History
              </button>
            </div>
            <div className="history-list">
              {history.map((entry) => (
                <div key={entry.id} className="history-item">
                  <div className="history-thumbnail">
                    <img src={entry.image} alt="Sample" />
                  </div>
                  <div className="history-info">
                    <div className="history-stats">
                      <span className="stat-badge">{entry.results.count} particles</span>
                      {entry.metadata.sampleVolume > 0 && (
                        <span className="stat-badge">
                          {(entry.results.count / entry.metadata.sampleVolume).toFixed(2)}/mL
                        </span>
                      )}
                    </div>
                    <div className="history-meta">
                      {entry.metadata.location && (
                        <span className="meta-tag">📍 {entry.metadata.location}</span>
                      )}
                      {entry.metadata.waterSource && (
                        <span className="meta-tag">💧 {entry.metadata.waterSource}</span>
                      )}
                    </div>
                    <div className="history-date">
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                  <button 
                    className="btn-load"
                    onClick={() => onLoad(entry)}
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HistoryPanel

