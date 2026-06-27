import React from "react";
import {
  FaRobot,
  FaHeartbeat,
  FaBrain,
  FaShieldAlt,
  FaClock,
  FaStethoscope,
  FaNotesMedical,
} from "react-icons/fa";

import "../../Styles/AI/AIHeroSection.css";

const AIHeroSection = () => {
  const quickFeatures = [
    {
      icon: <FaStethoscope />,
      title: "Symptom Guidance",
      text: "Get basic AI-based health direction.",
    },
    {
      icon: <FaNotesMedical />,
      title: "Report Support",
      text: "Understand reports and patient history faster.",
    },
    {
      icon: <FaClock />,
      title: "24/7 Help",
      text: "Always available for hospital queries.",
    },
  ];

  return (
    <section className="ai-hero-section">
      <div className="ai-hero-glow ai-hero-glow-one"></div>
      <div className="ai-hero-glow ai-hero-glow-two"></div>

      <div className="ai-hero-content">
        <div className="ai-hero-badge">
          <FaRobot />
          <span>AI Healthcare Dashboard</span>
        </div>

        <h1 className="ai-hero-title">
          AI Health Assistant for Smart Hospital Care
        </h1>

        <p className="ai-hero-text">
          A centralized healthcare intelligence dashboard for patient support,
          symptom guidance, diagnosis suggestions, appointment help, medical
          reports, reminders, and smart recommendations.
        </p>

        <div className="ai-hero-actions">
          <a href="/ai-health/ai-chat" className="ai-hero-primary-btn">
            Start AI Chat
          </a>
          <a href="#ai-tools" className="ai-hero-secondary-btn">
            Explore Tools
          </a>
        </div>

        <div className="ai-hero-trust-row">
          <div>
            <strong>Smart</strong>
            <span>AI guidance</span>
          </div>
          <div>
            <strong>Fast</strong>
            <span>health insights</span>
          </div>
          <div>
            <strong>Secure</strong>
            <span>hospital workflow</span>
          </div>
        </div>
      </div>

      <div className="ai-hero-side">
        <div className="ai-hero-main-card">
          <div className="ai-hero-main-card-icon">
            <FaHeartbeat />
          </div>
          <h3>Live Health Intelligence</h3>
          <p>
            Analyze patient data, reports, symptoms, and hospital activity with
            a clean AI-powered dashboard.
          </p>

          <div className="ai-hero-pulse-line">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="ai-hero-mini-card">
          <FaHeartbeat />
          <div>
            <h4>Patient Guidance</h4>
            <p>Interactive health support</p>
          </div>
        </div>

        <div className="ai-hero-mini-card">
          <FaBrain />
          <div>
            <h4>Smart Intelligence</h4>
            <p>Connected AI features</p>
          </div>
        </div>

        <div className="ai-hero-mini-card">
          <FaShieldAlt />
          <div>
            <h4>Safe Suggestions</h4>
            <p>Helpful AI-based support</p>
          </div>
        </div>
      </div>

      <div className="ai-hero-feature-strip">
        {quickFeatures.map((item, index) => (
          <div className="ai-hero-feature-item" key={index}>
            <div className="ai-hero-feature-icon">{item.icon}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIHeroSection;
