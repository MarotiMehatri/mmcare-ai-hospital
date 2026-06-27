import React from "react";
import {
  FaTemperatureHigh,
  FaHeartbeat,
  FaLungs,
  FaNotesMedical,
  FaExclamationTriangle,
  FaLightbulb,
  FaArrowRight,
} from "react-icons/fa";

import "../../Styles/AI/SuggestedQuestions.css";

const SuggestedQuestions = ({ onSelect }) => {
  const questions = [
    {
      text: "I have fever and headache. What should I do?",
      icon: <FaTemperatureHigh />,
      type: "symptom",
      label: "Symptom",
    },
    {
      text: "Which department should I visit for chest pain?",
      icon: <FaHeartbeat />,
      type: "department",
      label: "Department",
    },
    {
      text: "I have cough and weakness for 3 days. Is it serious?",
      icon: <FaLungs />,
      type: "respiratory",
      label: "Respiratory",
    },
    {
      text: "What precautions should I take for high blood pressure?",
      icon: <FaNotesMedical />,
      type: "precaution",
      label: "Precaution",
    },
    {
      text: "When should I go to emergency for stomach pain?",
      icon: <FaExclamationTriangle />,
      type: "emergency",
      label: "Emergency",
    },
  ];

  return (
    <section className="suggested-questions">
      <div className="suggested-header">
        <div>
          <span className="suggested-badge">
            <FaLightbulb />
            Smart Prompts
          </span>
          <h3>Suggested Questions</h3>
          <p>Start quickly with common health and hospital questions.</p>
        </div>
      </div>

      <div className="suggested-grid">
        {questions.map((q, index) => (
          <button
            key={index}
            className={`suggested-btn suggested-${q.type}`}
            onClick={() => onSelect?.(q.text)}
            type="button"
          >
            <span className="suggested-icon">{q.icon}</span>

            <span className="suggested-content">
              <small>{q.label}</small>
              <strong>{q.text}</strong>
            </span>

            <span className="suggested-arrow">
              <FaArrowRight />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SuggestedQuestions;
