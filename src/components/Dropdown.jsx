import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

function Dropdown({ value, onChange, options, statusColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Get status class
  const statusClass = statusColor ? `status-${statusColor.toLowerCase()}` : '';

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-selected ${isOpen ? "open" : ""} ${statusClass}`}
        onClick={handleToggle}
      >
        <span className="dropdown-value">{value}</span>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className={`dropdown-option ${
                option === value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;