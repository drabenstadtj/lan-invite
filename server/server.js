import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Path to JSON file
const RSVP_FILE = path.join(__dirname, 'rsvps.json')

// Serve built frontend (Vite build copied here by Dockerfile)
app.use(express.static(path.join(__dirname, 'public')))

// ---------- File helpers ----------

// Initialize JSON file if it doesn't exist
async function initializeRSVPFile() {
  try {
    await fs.access(RSVP_FILE)
  } catch {
    await fs.writeFile(RSVP_FILE, JSON.stringify([]))
    console.log('Created rsvps.json file')
  }
}

// Read RSVPs from file
async function readRSVPs() {
  try {
    const data = await fs.readFile(RSVP_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading RSVPs:', error)
    return []
  }
}

// Write RSVPs to file
async function writeRSVPs(rsvps) {
  try {
    await fs.writeFile(RSVP_FILE, JSON.stringify(rsvps, null, 2))
    return true
  } catch (error) {
    console.error('Error writing RSVPs:', error)
    return false
  }
}

// ---------- API routes ----------

// GET all RSVPs
app.get('/api/rsvps', async (req, res) => {
  const rsvps = await readRSVPs()
  res.json(rsvps)
})

// POST new RSVP
app.post('/api/rsvps', async (req, res) => {
  const { name, username, bringing, connection } = req.body

  if (!name && !username) {
    return res.status(400).json({ error: 'Name or username required' })
  }

  const rsvps = await readRSVPs()

  const newRSVP = {
    id: Date.now(),
    name,
    username,
    bringing,
    connection,
    timestamp: new Date().toISOString()
  }

  rsvps.push(newRSVP)

  const success = await writeRSVPs(rsvps)

  if (success) {
    res.status(201).json(newRSVP)
  } else {
    res.status(500).json({ error: 'Failed to save RSVP' })
  }
})

// DELETE RSVP by ID
app.delete('/api/rsvps/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const rsvps = await readRSVPs()

  const filteredRSVPs = rsvps.filter(rsvp => rsvp.id !== id)

  if (filteredRSVPs.length === rsvps.length) {
    return res.status(404).json({ error: 'RSVP not found' })
  }

  const success = await writeRSVPs(filteredRSVPs)

  if (success) {
    res.json({ message: 'RSVP deleted' })
  } else {
    res.status(500).json({ error: 'Failed to delete RSVP' })
  }
})

// GET RSVP stats
app.get('/api/rsvps/stats', async (req, res) => {
  const rsvps = await readRSVPs()

  const stats = {
    total: rsvps.length,
    wired: rsvps.filter(r => r.connection === 'wired').length,
    wifi: rsvps.filter(r => r.connection === 'wifi').length,
    withBringing: rsvps.filter(r => r.bringing && r.bringing.trim()).length
  }

  res.json(stats)
})

// Login route using server-side password
app.post('/api/login', (req, res) => {
  const { password } = req.body
  const correct = process.env.PASSWORD

  if (!password || password !== correct) {
    return res.status(401).json({ success: false, message: 'Incorrect password' })
  }

  return res.json({ success: true })
})

// ---------- SPA fallback (MUST be last) ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// ---------- Start server ----------
async function start() {
  await initializeRSVPFile()

  app.listen(PORT, () => {
    console.log(`🔥 RSVP Server running on http://localhost:${PORT}`)
    console.log(`📁 Saving to: ${RSVP_FILE}`)
  })
}

start()
