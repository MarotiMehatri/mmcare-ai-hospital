import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaClock,
  FaDirections,
  FaCalendarCheck,
} from "react-icons/fa";

function NearbyServiceCard({ item }) {
  return (
    <div className="nearby-service-card">
      <div className="nearby-card-top">
        <div>
          <h3>{item.name}</h3>
          <p className="nearby-service-type">{item.type}</p>
        </div>
        <span
          className={`nearby-open-badge ${item.openNow ? "open" : "closed"}`}
        >
          {item.openNow ? "Open" : "Closed"}
        </span>
      </div>

      <div className="nearby-card-info">
        <p>
          <FaMapMarkerAlt /> {item.address}
        </p>
        <p>
          <FaClock /> {item.is24x7 ? "24/7 Available" : "Limited Hours"}
        </p>
        <p>
          <FaStar /> {item.rating || "N/A"} Rating
        </p>
        <p>
          Distance: <strong>{item.distanceKm || 0} km</strong>
        </p>
      </div>

      {item.aiReason && (
        <div className="nearby-ai-reason">
          <strong>AI Suggestion:</strong> {item.aiReason}
        </div>
      )}

      <div className="nearby-card-actions">
        <button>
          <FaPhoneAlt /> Call
        </button>
        <button>
          <FaDirections /> Directions
        </button>
        <button>
          <FaCalendarCheck /> Book
        </button>
      </div>
    </div>
  );
}

export default NearbyServiceCard;
