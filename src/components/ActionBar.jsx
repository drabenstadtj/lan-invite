import { useState } from 'react'
import RSVPForm from './RsvpForm'
import Notification from './Notification'
import './ActionBar.css'

function ActionBar() {
  const [showRSVP, setShowRSVP] = useState(false)
  const [notification, setNotification] = useState(null)

  const handleRSVPSubmit = (formData) => {
    console.log('RSVP Data:', formData)
    setShowRSVP(false)
    
    // Show custom notification
    const name = formData.username || formData.name
    setNotification(`Thanks for registering, ${name}!`)
    
    // Trigger custom event to update RSVP list
    window.dispatchEvent(new Event('rsvpUpdated'))
  }

  return (
    <>
      <div className="action-bar">
        <button className="action-btn rsvp-btn" onClick={() => setShowRSVP(true)}>
          <span>RSVP NOW</span>
        </button>
        <button className="action-btn">
          <span className="btn-icon speech-icon">💬</span>
        </button>
        <button className="action-btn">
          <span className="btn-icon camera-icon">📋</span>
        </button>
        <button className="action-btn">
          <span className="btn-icon controller-icon">🎮</span>
        </button>
      </div>

      {showRSVP && (
        <RSVPForm 
          onClose={() => setShowRSVP(false)}
          onSubmit={handleRSVPSubmit}
        />
      )}

      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
          type="success"
        />
      )}
    </>
  )
}

export default ActionBar