import React from "react";
import {
  FaExclamationTriangle,
  FaHeartbeat,
  FaLungs,
  FaTemperatureHigh,
} from "react-icons/fa";
import "../../Styles/AI/SymptomQuestionFlow.css";

const indicators = [
  {
    key: "hasFever",
    label: "Fever",
    hint: "High temperature, chills",
    icon: <FaTemperatureHigh />,
  },
  {
    key: "hasBreathingIssue",
    label: "Breathing Issue",
    hint: "Shortness of breath, wheezing",
    icon: <FaLungs />,
    danger: true,
  },
  {
    key: "hasChestPain",
    label: "Chest Pain",
    hint: "Tightness, pressure, heart pain",
    icon: <FaHeartbeat />,
    danger: true,
  },
];

function SymptomQuestionFlow({ formData, updateField }) {
  const selectedDanger = indicators.some(
    (item) => item.danger && formData[item.key],
  );

  return (
    <div className="symptom-form-group">
      <div className="indicator-header">
        <div>
          <label>Additional Indicators</label>
          <p>Select any warning signs you are currently experiencing.</p>
        </div>
      </div>

      <div className="symptom-checkbox-list">
        {indicators.map((item) => (
          <label
            key={item.key}
            className={`symptom-check-item ${
              formData[item.key] ? "active" : ""
            } ${item.danger ? "danger" : ""}`}
          >
            <input
              type="checkbox"
              checked={formData[item.key]}
              onChange={(e) => updateField(item.key, e.target.checked)}
            />

            <span className="indicator-icon">{item.icon}</span>

            <span className="indicator-text">
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </span>
          </label>
        ))}
      </div>

      {selectedDanger && (
        <div className="indicator-danger-alert">
          <FaExclamationTriangle />
          Chest pain or breathing issues may need urgent medical attention.
        </div>
      )}
    </div>
  );
}

export default SymptomQuestionFlow;
