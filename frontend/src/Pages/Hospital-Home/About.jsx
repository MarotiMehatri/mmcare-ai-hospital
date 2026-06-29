import React from "react";
import {
  FaHospital,
  FaBrain,
  FaUserMd,
  FaShieldAlt,
  FaHeartbeat,
  FaLaptopMedical,
} from "react-icons/fa";
import "../../Styles/Hospital Home/About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div>
          <span className="about-badge">About MMCare-AI Hospital</span>
          <h1>Transforming Healthcare with Artificial Intelligence</h1>
          <p>
            MMCare-AI Hospital is an AI-powered Hospital Management System
            designed to simplify healthcare for patients, doctors, and hospital
            administrators.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-card">
          <FaHospital />
          <h2>Our Mission</h2>
          <p>
            To improve healthcare accessibility by combining Artificial
            Intelligence with modern hospital management solutions.
          </p>
        </div>

        <div className="about-card">
          <FaHeartbeat />
          <h2>Our Vision</h2>
          <p>
            To become a leading AI-powered healthcare platform providing secure,
            intelligent, and patient-centered digital healthcare services.
          </p>
        </div>
      </section>

      <section className="why-section">
        <h2>Why Choose MMCare-AI?</h2>

        <div className="why-grid">
          <div className="why-card">
            <FaBrain />
            <h3>AI Health Analysis</h3>
            <p>Smart health insights and AI-powered recommendations.</p>
          </div>

          <div className="why-card">
            <FaUserMd />
            <h3>Smart Appointment</h3>
            <p>Book doctors based on department and availability.</p>
          </div>

          <div className="why-card">
            <FaLaptopMedical />
            <h3>Digital Records</h3>
            <p>Access prescriptions, reports, and medical history anytime.</p>
          </div>

          <div className="why-card">
            <FaShieldAlt />
            <h3>Secure Data</h3>
            <p>Role-based dashboards and secure patient information.</p>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div>
          <h2>25+</h2>
          <p>Departments</p>
        </div>
        <div>
          <h2>100+</h2>
          <p>Doctors</p>
        </div>
        <div>
          <h2>10K+</h2>
          <p>Patients</p>
        </div>
        <div>
          <h2>24/7</h2>
          <p>Emergency</p>
        </div>
      </section>
    </div>
  );
}

export default About;
