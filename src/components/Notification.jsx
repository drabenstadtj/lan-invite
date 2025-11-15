import { useEffect } from 'react'
import './Notification.css'

function Notification({ message, onClose, type = 'success' }) {
  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="notification-overlay">
      <div className={`notification-window ${type}`}>
        <div className="notification-title-bar">
          <span className="notification-title">
            {type === 'success' ? '✓ Success' : '⚠ Notice'}
          </span>
          <button className="notification-close" onClick={onClose}>×</button>
        </div>
        <div className="notification-content">
          <p>{message}</p>
        </div>
        <div className="notification-footer">
          <button className="notification-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification