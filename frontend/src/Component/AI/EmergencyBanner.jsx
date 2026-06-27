import React from "react";
import {
  FaAmbulance,
  FaExclamationTriangle,
  FaHospital,
  FaPhoneAlt,
} from "react-icons/fa";
import "../../Styles/AI/EmergencyBanner.css";

function EmergencyBanner() {
  return (
    <div className="ai-emergency-banner">
      <div className="emergency-pulse"></div>

      <div className="ai-emergency-icon-wrap">
        <FaExclamationTriangle className="ai-emergency-icon" />
      </div>

      <div className="ai-emergency-content">
        <div className="emergency-badge">
          <FaAmbulance />
          Emergency Alert
        </div>

        <h4>Immediate Medical Attention Recommended</h4>

        <p>
          Your symptoms may indicate a potentially serious condition. Please
          seek emergency medical care or visit the nearest hospital as soon as
          possible.
        </p>

        <div className="emergency-actions">
          <button className="emergency-btn primary">
            <FaHospital />
            Find Hospital
          </button>

          <button className="emergency-btn secondary">
            <FaPhoneAlt />
            Call Emergency
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmergencyBanner;
