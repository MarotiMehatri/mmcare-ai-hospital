import React from "react";
import {
  FaBrain,
  FaExclamationTriangle,
  FaHeartbeat,
  FaShieldAlt,
  FaUserMd,
} from "react-icons/fa";

import SymptomChecker from "../../Component/AI/SymptomChecker";
import "../../Styles/AI/SymptomCheckerPage.css";

function SymptomCheckerPage() {
  return (
    <div className="symptom-page">
      <div className="symptom-page-header">
        <div className="symptom-page-badge">
          <FaBrain />
          AI Symptom Intelligence
        </div>

        <h2>Symptom Checker</h2>

        <p>
          Describe your symptoms, select severity, and get safe health guidance
          with doctor department suggestions.
        </p>
      </div>

      <div className="symptom-page-notice">
        <FaExclamationTriangle />
        <span>
          This tool gives only basic guidance. It is not a medical diagnosis.
          Please consult a qualified doctor.
        </span>
      </div>

      <div className="symptom-page-features">
        <div className="symptom-feature-card">
          <FaHeartbeat />
          <h4>Health Guidance</h4>
          <p>Get simple advice based on your selected symptoms.</p>
        </div>

        <div className="symptom-feature-card">
          <FaUserMd />
          <h4>Doctor Department</h4>
          <p>Find which specialist department may be suitable.</p>
        </div>

        <div className="symptom-feature-card">
          <FaShieldAlt />
          <h4>Emergency Alert</h4>
          <p>Detect warning signs like chest pain or breathing issues.</p>
        </div>
      </div>

      <SymptomChecker />
    </div>
  );
}

export default SymptomCheckerPage;
