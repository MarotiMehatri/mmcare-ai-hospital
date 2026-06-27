import React from "react";
import { FaHeartbeat } from "react-icons/fa";
import "../../Styles/AI/AbnormalValuesCard.css";

function AbnormalValuesCard({ abnormalValues = [] }) {
  if (!abnormalValues.length) return null;

  return (
    <div className="abnormal-values-card">
      <h3>
        <FaHeartbeat /> Abnormal Values
      </h3>

      <div className="abnormal-table">
        <div className="abnormal-head abnormal-row">
          <span>Test</span>
          <span>Value</span>
          <span>Normal Range</span>
          <span>Status</span>
          <span>Severity</span>
        </div>

        {abnormalValues.map((item, index) => (
          <div className="abnormal-row" key={index}>
            <span>{item.name}</span>
            <span>{item.value}</span>
            <span>{item.normalRange}</span>
            <span>{item.status}</span>
            <span className={`severity ${item.severity?.toLowerCase()}`}>
              {item.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AbnormalValuesCard;
