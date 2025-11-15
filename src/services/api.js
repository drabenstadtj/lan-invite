const API_BASE_URL = 'http://localhost:3001/api'

export const rsvpAPI = {
  // Get all RSVPs
  async getAllRSVPs() {
    const response = await fetch(`${API_BASE_URL}/rsvps`)
    if (!response.ok) throw new Error('Failed to fetch RSVPs')
    return response.json()
  },

  // Create new RSVP
  async createRSVP(rsvpData) {
    const response = await fetch(`${API_BASE_URL}/rsvps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvpData)
    })
    if (!response.ok) throw new Error('Failed to create RSVP')
    return response.json()
  },

  // Delete RSVP
  async deleteRSVP(id) {
    const response = await fetch(`${API_BASE_URL}/rsvps/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete RSVP')
    return response.json()
  },

  // Get stats
  async getStats() {
    const response = await fetch(`${API_BASE_URL}/rsvps/stats`)
    if (!response.ok) throw new Error('Failed to fetch stats')
    return response.json()
  }
}