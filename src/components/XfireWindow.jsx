import { useState, useRef, useEffect } from "react";
import TitleBar from "./TitleBar";
import MenuBar from "./MenuBar";
import StatusBar from "./StatusBar";
import EventDetails from "./EventDetails";
import RSVPList from "./RsvpList";
import ActionBar from "./ActionBar";
import "./XfireWindow.css";

function XfireWindow() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [username, setUsername] = useState("Guest");
  const windowRef = useRef(null);

  // Load username from localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("currentUsername");
    if (savedUsername) {
      setUsername(savedUsername);
    }

    const handleUsernameUpdate = () => {
      const newUsername = localStorage.getItem("currentUsername");
      if (newUsername) {
        setUsername(newUsername);
      }
    };

    window.addEventListener("rsvpUpdated", handleUsernameUpdate);
    return () => {
      window.removeEventListener("rsvpUpdated", handleUsernameUpdate);
    };
  }, []);

  // Helper to normalize mouse/touch events
  const getPoint = (e) => {
    if (e.touches && e.touches.length > 0) {
      return e.touches[0];
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return e.changedTouches[0];
    }
    return e;
  };

  const handleDragStart = (e) => {
    e.preventDefault();

    const rect = windowRef.current.getBoundingClientRect();
    const point = getPoint(e);

    setIsDragging(true);
    setDragOffset({
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
    });
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    // Stop the page from scrolling while dragging
    if (e.cancelable) {
      e.preventDefault();
    }

    const point = getPoint(e);

    setPosition({
      x: point.clientX - dragOffset.x,
      y: point.clientY - dragOffset.y,
    });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    // Attach listeners to the whole document so drag continues
    // even if you move outside the window
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
    document.addEventListener("touchcancel", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
      document.removeEventListener("touchcancel", handleEnd);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      className="xfire-window"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Pass handleDragStart into TitleBar */}
      <TitleBar onDragStart={handleDragStart} />
      <MenuBar />

      <div className="content-wrapper">
        <StatusBar username={username} status="Online" />
        <EventDetails />
        <RSVPList />
      </div>

      <ActionBar />
    </div>
  );
}

export default XfireWindow;
