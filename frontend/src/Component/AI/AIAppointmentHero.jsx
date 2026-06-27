import React from "react";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
  FaRobot,
  FaShieldAlt,
  FaUserMd,
} from "react-icons/fa";
import "../../Styles/AI/AIAppointmentHero.css";

function AIAppointmentHero() {
  const steps = [
    "Enter symptoms",
    "Get AI recommendation",
    "Choose doctor & slot",
    "Confirm appointment",
  ];

  return (
    <section className="ai-appointment-hero">
      <div className="ai-hero-glow ai-hero-glow-one"></div>
      <div className="ai-hero-glow ai-hero-glow-two"></div>

      <div className="ai-appointment-hero-left">
        <div className="ai-hero-badge">
          <FaRobot />
          <span>AI Powered Hospital Booking</span>
        </div>

        <h1>AI Appointment Assistant</h1>

        <p>
          Describe your symptoms and get smart department recommendations,
          suggested doctors, and available appointment slots.
        </p>

        <div className="ai-hero-highlights">
          <div className="ai-hero-highlight">
            <FaCalendarCheck className="ai-hero-icon" />
            <span>Smart Booking Flow</span>
          </div>

          <div className="ai-hero-highlight">
            <FaUserMd className="ai-hero-icon" />
            <span>Right Doctor Matching</span>
          </div>

          <div className="ai-hero-highlight">
            <FaShieldAlt className="ai-hero-icon" />
            <span>Safe AI Guidance</span>
          </div>
        </div>
      </div>

      <div className="ai-appointment-hero-right">
        <div className="ai-hero-card">
          <div className="ai-hero-card-header">
            <div>
              <span>Process</span>
              <h3>How it works</h3>
            </div>
            <FaArrowRight />
          </div>

          <ul>
            {steps.map((step, index) => (
              <li key={step}>
                <span className="ai-step-number">{index + 1}</span>
                <span>{step}</span>
                <FaCheckCircle />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AIAppointmentHero;
