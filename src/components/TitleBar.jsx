import './TitleBar.css'

function TitleBar({ onDragStart }) {
  return (
    <div 
      className="title-bar" 
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    >
      <div className="title-bar-logo">
        <span className="logo-text">LAN PARTY</span>
      </div>
      <div className="window-controls">
        <button className="btn-minimize">_</button>
        <button className="btn-close">×</button>
      </div>
    </div>
  )
}

export default TitleBar