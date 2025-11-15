import { useState, useEffect } from 'react'
import XfireWindow from './components/XfireWindow'
import LoginPage from './components/LoginPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
  }

  // Expose logout function to window for easy access
  useEffect(() => {
    window.logout = handleLogout
  }, [])

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <XfireWindow />
    </div>
  )
}

export default App