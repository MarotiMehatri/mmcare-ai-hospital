import React from "react";
import { FaAmbulance, FaPhoneAlt } from "react-icons/fa";

function EmergencyBanner({ query }) {
  const emergencyKeywords = [
    "chest pain",
    "stroke",
    "breathing",
    "accident",
    "bleeding",
    "unconscious",
    "emergency",
  ];

  const isEmergency = emergencyKeywords.some((word) =>
    query.toLowerCase().includes(word),
  );

  if (!isEmergency) return null;

  return (
    <div className="emergency-banner">
      <div>
        <h3>
          <FaAmbulance /> Emergency Alert
        </h3>
        <p>
          Your search may indicate an urgent condition. Please contact emergency
          support or visit the nearest emergency hospital immediately.
        </p>
      </div>

      <button className="emergency-call-btn">
        <FaPhoneAlt /> Emergency Call
      </button>
    </div>
  );
}

export default EmergencyBanner;
