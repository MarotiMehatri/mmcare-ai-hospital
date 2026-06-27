import React from "react";
import { Link } from "react-router-dom";
import {
  FaBrain,
  FaHeartbeat,
  FaHospitalUser,
  FaShieldAlt,
  FaUserMd,
} from "react-icons/fa";

import DiagnosisSuggestions from "../../Component/AI/DiagnosisSuggestions";
import "../../Styles/AI/DiagnosisPage.css";

function DiagnosisPage() {
  return (
    <div className="diagnosis-page">
      <section className="diagnosis-hero">
        <div className="diagnosis-hero-content">
          <div className="diagnosis-page-badge">
            <FaBrain />
            AI Diagnosis Support
          </div>

          <h1>Diagnosis Suggestions</h1>

          <p>
            View possible conditions, risk level, recommended department, and
            safe next steps based on symptom analysis.
          </p>

          <div className="diagnosis-hero-actions">
            <Link
              to="/ai-health/symptom-checker"
              className="diagnosis-primary-btn"
            >
              Check Symptoms
            </Link>
            <Link
              to="/ai-health/appointment"
              className="diagnosis-secondary-btn"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        <div className="diagnosis-hero-card">
          <FaHospitalUser />
          <h3>Smart Patient Guidance</h3>
          <p>
            Helps patients understand urgency and choose the right department.
          </p>
        </div>
      </section>

      <section className="diagnosis-stats">
        <div className="diagnosis-stat-card">
          <FaHeartbeat />
          <h4>Risk Level</h4>
          <p>Low, moderate, and high urgency indicators.</p>
        </div>

        <div className="diagnosis-stat-card">
          <FaUserMd />
          <h4>Department Match</h4>
          <p>Suggests suitable medical department.</p>
        </div>

        <div className="diagnosis-stat-card">
          <FaShieldAlt />
          <h4>Safe Advice</h4>
          <p>Clear guidance with medical disclaimer.</p>
        </div>
      </section>

      <DiagnosisSuggestions />
    </div>
  );
}

export default DiagnosisPage;
