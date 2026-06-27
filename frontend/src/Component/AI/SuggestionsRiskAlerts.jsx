import React from "react";
import { FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import "../../Styles/AI/SuggestionsRiskAlerts.css";

function SuggestionsRiskAlerts({ riskAlerts = [] }) {
  if (!riskAlerts || riskAlerts.length === 0) {
    return (
      <div className="suggestions-risk-alerts">
        <div className="suggestions-risk-alerts__head">
          <FaShieldAlt />
          <h3>Risk Alerts</h3>
        </div>

        <p className="suggestions-risk-alerts__empty">
          No major risk alerts detected.
        </p>
      </div>
    );
  }

  return (
    <div className="suggestions-risk-alerts">
      <div className="suggestions-risk-alerts__head">
        <FaExclamationTriangle />
        <h3>Risk Alerts</h3>
      </div>

      <ul className="suggestions-risk-alerts__list">
        {riskAlerts.map((alert, index) => (
          <li
            key={alert.id || index}
            className={`risk-alert-item ${alert.level?.toLowerCase() || ""}`}
          >
            <strong>{alert.title || "Health Alert"}</strong>
            <p>
              {alert.message || alert.description || "Please consult doctor."}
            </p>
            <span>{alert.level || "Medium"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionsRiskAlerts;
