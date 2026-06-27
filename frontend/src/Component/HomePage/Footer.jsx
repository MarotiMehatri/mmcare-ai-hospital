import React from "react";
import {
  FaHospital,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaHeartbeat,
  FaClock,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import "../../Styles/Hospital Home/Footer.css";

const Footer = () => {
  return (
    <footer className="hospital-footer">
      <div className="hospital-footer__top">
        <div className="hospital-footer__brand">
          <div className="hospital-footer__logo">
            <FaHeartbeat />
          </div>

          <div>
            <h3>MMCare-AI Hospital</h3>
            <p>Smart Healthcare Powered by AI & Compassion.</p>
          </div>
        </div>

        <div className="hospital-footer__emergency">
          <FaPhoneAlt />
          <div>
            <span>Emergency Hotline</span>
            <strong>+91 9307249853</strong>
          </div>
        </div>
      </div>

      <div className="hospital-footer__container">
        <div className="hospital-footer__section">
          <h4>Hospital Info</h4>

          <p>
            <FaMapMarkerAlt /> Pune, Maharashtra
          </p>

          <p>
            <FaEnvelope /> support@mmcareai.com
          </p>

          <p>
            <FaPhoneAlt /> +91 9307249853
          </p>

          <p>
            <FaClock /> 24/7 Emergency Support
          </p>
        </div>

        <div className="hospital-footer__section">
          <h4>Quick Links</h4>

          <ul>
            <li>
              <FaArrowRight /> Home
            </li>
            <li>
              <FaArrowRight /> Book Appointment
            </li>
            <li>
              <FaArrowRight /> Doctors
            </li>
            <li>
              <FaArrowRight /> Departments
            </li>
            <li>
              <FaArrowRight /> Contact
            </li>
          </ul>
        </div>

        <div className="hospital-footer__section">
          <h4>Departments</h4>

          <ul>
            <li>
              <FaArrowRight /> Cardiology
            </li>
            <li>
              <FaArrowRight /> Neurology
            </li>
            <li>
              <FaArrowRight /> Orthopedics
            </li>
            <li>
              <FaArrowRight /> Pediatrics
            </li>
            <li>
              <FaArrowRight /> Radiology
            </li>
          </ul>
        </div>

        <div className="hospital-footer__section">
          <h4>Why MMCare-AI?</h4>

          <div className="hospital-footer__feature">
            <FaShieldAlt />
            <span>Secure patient records</span>
          </div>

          <div className="hospital-footer__feature">
            <FaHospital />
            <span>Modern hospital dashboard</span>
          </div>

          <div className="hospital-footer__social">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      <div className="hospital-footer__bottom">
        <p>© 2026 MMCare-AI. All rights reserved.</p>
        <span>Designed for AI-Powered Hospital Management System</span>
      </div>
    </footer>
  );
};

export default Footer;
