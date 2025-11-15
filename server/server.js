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

app.use(cors())
app.use(express.json())

// Path to JSON file
const RSVP_FILE = path.join(__dirname, 'rsvps.json')

// Serve built frontend
app.use(express.static(path.join(__dirname, 'public')))

// Initialize JSON file if it doesn't exist
async function initializeRSVPFile() {
  try {
    await fs.access(RSVP_FILE)
  } catch {
    await fs.writeFile(RSVP_FILE, JSON.stringify([]))
    console.log('Created rsvps.json file')
  }
}

// Read / write helpers...
async function readRSVPs() { /* unchanged */ }
async function writeRSVPs(rsvps) { /* unchanged */ }

// API routes
app.get('/api/rsvps', async (req, res) => { /* unchanged */ })
app.post('/api/rsvps', async (req, res) => { /* unchanged */ })
app.delete('/api/rsvps/:id', async (req, res) => { /* unchanged */ })
app.get('/api/rsvps/stats', async (req, res) => { /* unchanged */ })

app.post('/api/login', (req, res) => {
  const { password } = req.body
  const correct = process.env.PASSWORD

  if (!password || password !== correct) {
    return res.status(401).json({ success: false, message: 'Incorrect password' })
  }

  return res.json({ success: true })
})

// SPA fallback *last*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Start server
async function start() {
  await initializeRSVPFile()
  app.listen(PORT, () => {
    console.log(`🔥 RSVP Server running on http://localhost:${PORT}`)
    console.log(`📁 Saving to: ${RSVP_FILE}`)
  })
}

start()
