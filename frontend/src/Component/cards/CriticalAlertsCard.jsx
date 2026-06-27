import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "../../Styles/AI/CriticalAlertsCard.css";

function CriticalAlertsCard({ criticalAlerts = [] }) {
  if (!criticalAlerts.length) return null;

  return (
    <div className="critical-alerts-card">
      <h3>
        <FaExclamationTriangle /> Critical Alerts
      </h3>

      <ul>
        {criticalAlerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}

export default CriticalAlertsCard;
