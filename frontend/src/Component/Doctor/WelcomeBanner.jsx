import React from "react";
import {
  FaCalendarCheck,
  FaUserInjured,
  FaFileMedicalAlt,
  FaStethoscope,
  FaRobot,
} from "react-icons/fa";
import doctorImage from "../../assets/Doctor/Banner/Doctor.png";
import "../../Styles/Doctor/WelcomeBanner.css";
import { useNavigate } from "react-router-dom";

const WelcomeBanner = ({ DoctorName }) => {
  const navigate = useNavigate();
  return (
    <section className="doctor-welcome-banner">
      <div className="doctor-welcome-banner__shape shape-one"></div>
      <div className="doctor-welcome-banner__shape shape-two"></div>

      <div className="doctor-welcome-banner__content">
        <div className="doctor-welcome-banner__left">
          <span className="doctor-welcome-banner__tag">
            <FaStethoscope /> Doctor Dashboard
          </span>

          <h1>
            Welcome, <br />
            <strong>{DoctorName || "Doctor"}!</strong>
          </h1>

          <p>
            View appointments, manage patients, check reports, prescriptions and
            daily hospital activity from one smart dashboard.
          </p>

          <div className="doctor-welcome-banner__features">
            <div>
              <FaCalendarCheck />
              <span onClick={() => navigate("/doctor/appointments")}>
                Appointments
              </span>
            </div>

            <div>
              <FaRobot />
              <span onClick={() => navigate("/ai-health")}>AI Assistant</span>
            </div>

            <div>
              <FaFileMedicalAlt />
              <span onClick={() => navigate("/doctor/medical-reports")}>
                Reports
              </span>
            </div>
          </div>
        </div>

        <div className="doctor-welcome-banner__right">
          <div className="doctor-welcome-banner__image-wrapper">
            <div className="doctor-welcome-banner__glow"></div>

            <img
              src={doctorImage}
              alt="Doctor Dashboard"
              className="doctor-welcome-banner__img"
            />

            <div className="doctor-welcome-banner__card card-top">
              🩺 Active Duty
            </div>

            <div className="doctor-welcome-banner__card card-bottom">
              📋 Patient Care
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
