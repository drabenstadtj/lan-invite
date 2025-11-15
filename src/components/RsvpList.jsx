import { useState, useEffect } from "react";
import { rsvpAPI } from "../services/api";
import ListSection from "./ListSection";

function RSVPList() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load RSVPs from backend
  const loadRSVPs = async () => {
    try {
      const data = await rsvpAPI.getAllRSVPs();
      setRsvps(data);
    } catch (error) {
      console.error("Failed to load RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRSVPs();

    // Listen for new RSVPs
    window.addEventListener("rsvpUpdated", loadRSVPs);

    return () => {
      window.removeEventListener("rsvpUpdated", loadRSVPs);
    };
  }, []);

  // Transform RSVPs into list items
  const rsvpItems = rsvps.map((rsvp) => ({
    icon: "/images/player-icon.png",
    name: rsvp.username || rsvp.name,
    status: rsvp.bringing
      ? `Bringing: ${rsvp.bringing}`
      : `${rsvp.connection === "wired" ? "🔌 Wired" : "📶 WiFi"}`,
    online: true,
  }));

  if (loading) {
    return <ListSection title="Players Confirmed (Loading...)" items={[]} />;
  }

  return (
    <ListSection
      title={`Players Confirmed (${rsvps.length})`}
      items={rsvpItems}
    />
  );
}

export default RSVPList;
