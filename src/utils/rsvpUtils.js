// Utility functions for managing RSVP data

// Export RSVPs to downloadable JSON file
export const exportRSVPsToJSON = () => {
  const rsvps = JSON.parse(localStorage.getItem('lanPartyRSVPs') || '[]')
  const dataStr = JSON.stringify(rsvps, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `lan-party-rsvps-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  
  URL.revokeObjectURL(url)
}

// Import RSVPs from JSON file
export const importRSVPsFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const rsvps = JSON.parse(e.target.result)
        localStorage.setItem('lanPartyRSVPs', JSON.stringify(rsvps))
        window.dispatchEvent(new Event('rsvpUpdated'))
        resolve(rsvps)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

// Clear all RSVPs
export const clearAllRSVPs = () => {
  if (confirm('Are you sure you want to clear all RSVPs?')) {
    localStorage.removeItem('lanPartyRSVPs')
    window.dispatchEvent(new Event('rsvpUpdated'))
    return true
  }
  return false
}

// Get RSVP statistics
export const getRSVPStats = () => {
  const rsvps = JSON.parse(localStorage.getItem('lanPartyRSVPs') || '[]')
  
  return {
    total: rsvps.length,
    wired: rsvps.filter(r => r.connection === 'wired').length,
    wifi: rsvps.filter(r => r.connection === 'wifi').length,
    withBringing: rsvps.filter(r => r.bringing && r.bringing.trim()).length
  }
}