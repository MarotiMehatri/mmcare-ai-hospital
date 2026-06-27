import React from "react";
import {
  FaHeartbeat,
  FaTint,
  FaTemperatureHigh,
  FaLungs,
  FaWeight,
  FaCheckCircle,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIVitalsCard.css";

function AIVitalsCard({ vitals = {}, summary = {} }) {
  const data = vitals || summary?.vitals || {};

  const vitalItems = [
    {
      label: "Blood Pressure",
      value: data?.bloodPressure || data?.bp || data?.BP || "--",
      icon: <FaHeartbeat />,
      type: "bp",
      status: "Normal range check",
    },
    {
      label: "Blood Sugar",
      value: data?.bloodSugar || data?.sugar || data?.glucose || "--",
      icon: <FaTint />,
      type: "sugar",
      status: "Sugar level tracking",
    },
    {
      label: "Temperature",
      value: data?.temperature || data?.temp || "--",
      icon: <FaTemperatureHigh />,
      type: "temp",
      status: "Body temperature",
    },
    {
      label: "Oxygen Level",
      value:
        data?.oxygenLevel || data?.oxygen || data?.spo2 || data?.SpO2 || "--",
      icon: <FaLungs />,
      type: "oxygen",
      status: "Oxygen saturation",
    },
    {
      label: "BMI",
      value: data?.bmi || data?.BMI || "--",
      icon: <FaWeight />,
      type: "bmi",
      status: "Body mass index",
    },
  ];

  return (
    <section className="ai-vitals-card">
      <div className="ai-vitals-glow"></div>

      <div className="ai-vitals-header">
        <div className="ai-vitals-icon">
          <FaHeartbeat />
        </div>

        <div>
          <span>Live Health Metrics</span>
          <h2>Vitals Overview</h2>
          <p>AI-monitored patient vital health information.</p>
        </div>
      </div>

      <div className="ai-vitals-grid">
        {vitalItems.map((item) => (
          <div
            className={`ai-vital-item ai-vital-${item.type}`}
            key={item.label}
          >
            <div className="ai-vital-item-icon">{item.icon}</div>

            <div className="ai-vital-content">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>
                <FaCheckCircle />
                {item.status}
              </small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIVitalsCard;
