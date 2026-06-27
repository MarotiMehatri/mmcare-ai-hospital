import React from "react";
import {
  FaBrain,
  FaEye,
  FaHeartbeat,
  FaHandPaper,
  FaNotesMedical,
  FaRunning,
  FaSmile,
  FaTimes,
} from "react-icons/fa";
import "../../Styles/AI/BodyPartSelector.css";
const bodyParts = [
  {
    label: "Head",
    icon: <FaBrain />,
    hint: "Headache, migraine, dizziness",
  },
  {
    label: "Eyes",
    icon: <FaEye />,
    hint: "Pain, redness, blurry vision",
  },
  {
    label: "Throat",
    icon: <FaSmile />,
    hint: "Cough, sore throat, swallowing pain",
  },
  {
    label: "Chest",
    icon: <FaHeartbeat />,
    hint: "Chest pain, tightness, heartbeat issue",
    emergency: true,
  },
  {
    label: "Lungs",
    icon: <FaNotesMedical />,
    hint: "Breathing issue, cough, wheezing",
    emergency: true,
  },
  {
    label: "Stomach",
    icon: <FaNotesMedical />,
    hint: "Pain, vomiting, acidity",
  },
  {
    label: "Hands",
    icon: <FaHandPaper />,
    hint: "Pain, swelling, numbness",
  },
  {
    label: "Legs",
    icon: <FaRunning />,
    hint: "Pain, weakness, swelling",
  },
];

function BodyPartSelector({ value, onChange }) {
  const clearSelection = () => {
    onChange("");
  };

  return (
    <div className="symptom-form-group">
      <div className="body-part-header">
        <div>
          <label>Affected Body Part</label>
          <p>Select the area where you feel the main problem.</p>
        </div>

        {value && (
          <button
            type="button"
            className="body-part-clear-btn"
            onClick={clearSelection}
          >
            <FaTimes /> Clear
          </button>
        )}
      </div>

      <div className="body-part-grid">
        {bodyParts.map((part) => (
          <button
            type="button"
            key={part.label}
            className={`body-part-card ${value === part.label ? "active" : ""}`}
            onClick={() => onChange(part.label)}
          >
            {part.emergency && <span className="body-risk-dot"></span>}

            <span className="body-part-icon">{part.icon}</span>

            <span className="body-part-name">{part.label}</span>

            <small>{part.hint}</small>
          </button>
        ))}
      </div>

      {value && (
        <div className="selected-body-part">
          Selected body part: <strong>{value}</strong>
        </div>
      )}
    </div>
  );
}

export default BodyPartSelector;
