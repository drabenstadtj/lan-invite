import { useState } from 'react'
import Dropdown from './Dropdown'
import './StatusBar.css'

function StatusBar({ username, initialStatus = 'Online' }) {
  const [status, setStatus] = useState(initialStatus)
  const statusOptions = ['Online', 'Away', 'Busy']
  
  return (
    <div className="status-bar">
      <span className="username">{username}</span>
      <Dropdown 
        value={status}
        onChange={setStatus}
        options={statusOptions}
        statusColor={status}
      />
    </div>
  )
}

export default StatusBar