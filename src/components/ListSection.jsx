import './ListSection.css'

function ListSection({ title, items }) {
  return (
    <div className="list-section">
      <div className="list-header">
        <span className="header-icon">▼</span>
        <span>{title}</span>
      </div>
      
      <div className="list-content">
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`list-item ${item.online ? 'online' : ''}`}
          >
            <img className="item-icon" src={item.icon} alt="" />
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="item-status">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSection