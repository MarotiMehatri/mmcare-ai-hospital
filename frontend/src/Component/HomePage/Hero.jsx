import React, { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Image from "../../../public/AIDoctors/MMCareDoctor.png";
import "../../Styles/Hospital Home/Hero.css";

const heroMessages = [
  "AI-Powered Smart Diagnosis for Faster Treatment.",
  "Compassionate Care Backed by Advanced Technology.",
  "Secure, Smart & Scalable Hospital Management.",
  "Real-Time Patient Monitoring with AI Assistance.",
  "Digital Healthcare Experience for Modern Patients.",
];

const Hero = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % heroMessages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      {/* <div className="hero__bg" style={{ Image }} /> */}

      <div className="hero__overlay" />

      <div className="hero__particles">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="hero__content">
        <div className="hero__left">
          <div className="hero__badge">
            <FaShieldAlt />
            Smart AI Hospital Management System
          </div>

          <h1>
            Smart Healthcare Powered by <span>AI & Compassion</span>
          </h1>

          <p className="hero__text">{heroMessages[messageIndex]}</p>

          <div className="hero__buttons">
            <button
              className="hero__btn hero__btn-primary"
              onClick={() => navigate("/login")}
            >
              <FaCalendarCheck />
              Book Appointment
            </button>

            <button className="hero__btn hero__btn-danger">
              <FaPhoneAlt />
              Emergency Call
            </button>
          </div>

          <div className="hero__stats">
            <div>
              <strong>24/7</strong>
              <span>Emergency Care</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Health Support</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Secure Records</span>
            </div>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__image-card">
            <img src={Image} alt="AI Hospital" />

            <div className="hero__floating-card top">
              <FaRobot />
              AI Diagnosis
            </div>

            <div className="hero__floating-card bottom">🩺 Smart Care</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
