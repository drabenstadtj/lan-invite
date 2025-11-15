import { useState } from 'react'
import { rsvpAPI } from '../services/api'
import './RsvpForm.css'

function RSVPForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bringing: '',
    connection: 'wired'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Save to backend
      await rsvpAPI.createRSVP(formData)
      
      // Save username to localStorage for status bar
      const displayName = formData.username || formData.name
      localStorage.setItem('currentUsername', displayName)
      
      onSubmit(formData)
    } catch (err) {
      setError('Failed to save RSVP. Is the server running?')
      console.error('RSVP submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="rsvp-form-window">
        {/* Title Bar */}
        <div className="form-title-bar">
          <span className="form-title">LAN Party Registration</span>
          <button className="form-close" onClick={onClose}>×</button>
        </div>

        {/* Form Content */}
        <div className="form-content">
          <div className="form-header">
            <h2>Join the Party</h2>
            <p>Fill out your details to confirm your spot.</p>
            {error && <div className="form-error">{error}</div>}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Real Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Gamer Tag / Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="xXFragMasterXx"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bringing">What are you bringing?</label>
              <textarea
                id="bringing"
                name="bringing"
                value={formData.bringing}
                onChange={handleChange}
                rows="3"
                placeholder="Drinks, snacks, equipment..."
              />
            </div>

            <div className="form-group">
              <label>Network Connection *</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="connection"
                    value="wired"
                    checked={formData.connection === 'wired'}
                    onChange={handleChange}
                  />
                  <span>Wired (Ethernet)</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="connection"
                    value="wifi"
                    checked={formData.connection === 'wifi'}
                    onChange={handleChange}
                  />
                  <span>WiFi Only</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RSVPForm