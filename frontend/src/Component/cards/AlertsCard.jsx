import React from "react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import "../../Styles/AI/AlertsCard.css";

function AlertsCard({ alerts = [] }) {
  const getIcon = (severity) => {
    if (severity === "high") return <FaExclamationTriangle />;
    if (severity === "medium") return <FaShieldAlt />;
    return <FaCheckCircle />;
  };

  return (
    <div className="alerts-card">
      <div className="alerts-card__header">
        <div>
          <h3>Risk Alerts</h3>
          <p>Important health warnings and safety updates</p>
        </div>

        <span className="alerts-card__count">
          {alerts.length} Alert{alerts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="alerts-empty">
          <FaCheckCircle />
          <h4>No major alerts</h4>
          <p>Your health status looks stable right now.</p>
        </div>
      ) : (
        <div className="alerts-list">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`alert-item alert-item--${alert.severity || "low"}`}
            >
              <div className="alert-item__icon">{getIcon(alert.severity)}</div>

              <div className="alert-item__content">
                <div className="alert-item__top">
                  <h4>{alert.title}</h4>
                  <span>{alert.severity || "low"}</span>
                </div>

                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertsCard;
