import {
  FaCalendarCheck,
  FaRobot,
  FaShieldAlt,
  FaHeartbeat,
} from "react-icons/fa";
import doctorImage from "../../../public/AIDoctors/MMCareDoctor.png";
import "../../Styles/Patient/WelcomeBanner.css";
import { useNavigate } from "react-router-dom";

const WelcomeBanner = ({ patientName }) => {
  const navigate = useNavigate();
  return (
    <section className="welcome-banner">
      <div className="welcome-banner__bg-circle circle-one"></div>
      <div className="welcome-banner__bg-circle circle-two"></div>

      <div className="welcome-banner__content">
        <div className="welcome-banner__left">
          <span className="welcome-banner__tag">
            <FaShieldAlt /> Smart Hospital Patient Portal
          </span>

          <h1>
            Welcome, <br />
            <strong>{patientName || "Patient"}!</strong>
          </h1>

          <p>
            Manage appointments, medical records, billing, doctor chat and AI
            health support from one secure dashboard.
          </p>

          <div className="welcome-banner__features">
            <div>
              <FaCalendarCheck />
              <span onClick={() => navigate("/patient/book-appointment")}>
                {" "}
                Book Appointments
              </span>
            </div>

            <div>
              <FaHeartbeat />
              <span onClick={() => navigate("/patient/medical-reports")}>
                Health Records
              </span>
            </div>

            <div>
              <FaRobot />
              <span onClick={() => navigate("/ai-health")}>AI Assistant</span>
            </div>
          </div>
        </div>

        <div className="welcome-banner__right">
          <div className="welcome-banner__image-wrapper">
            <div className="welcome-banner__glow"></div>

            <img
              src={doctorImage}
              alt="Patient Care"
              className="welcome-banner__image"
            />

            <div className="welcome-banner__card card-top">💙 Trusted Care</div>

            <div className="welcome-banner__card card-bottom">
              🩺 24/7 Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
