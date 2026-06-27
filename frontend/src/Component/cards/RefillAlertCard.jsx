import React from "react";
import {
  FaPrescriptionBottleAlt,
  FaExclamationTriangle,
  FaBell,
} from "react-icons/fa";
import "../../Styles/AI/RefillAlertCard.css";

function RefillAlertCard({ refillAlerts = [] }) {
  return (
    <div className="refill-alert-card">
      <div className="refill-alert-header">
        <div>
          <span className="refill-label">
            <FaBell /> Medicine Stock
          </span>
          <h3>Refill Alerts</h3>
        </div>

        <span className="refill-count">{refillAlerts.length} Alert</span>
      </div>

      {refillAlerts.length === 0 ? (
        <div className="refill-empty-state">
          <FaPrescriptionBottleAlt />
          <h4>No refill alerts</h4>
          <p>Your medicine stock is currently okay.</p>
        </div>
      ) : (
        <div className="refill-list">
          {refillAlerts.map((item) => (
            <div key={item.id} className="refill-item">
              <div className="refill-icon">
                <FaPrescriptionBottleAlt />
              </div>

              <div className="refill-content">
                <h4>{item.medicineName || "Medicine Name"}</h4>
                <p>{item.dosage || "Dosage not added"}</p>

                <small>
                  <FaExclamationTriangle />
                  Low stock: {item.refillCount ?? 0} left
                </small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RefillAlertCard;
