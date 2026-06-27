import React, { useEffect, useMemo, useState } from "react";
import {
  FaBell,
  FaCog,
  FaSearch,
  FaRobot,
  FaHeartbeat,
  FaUserCircle,
  FaMicrophone,
  FaShieldAlt,
  FaCalendarCheck,
  FaFileMedical,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { getPatientByEmail } from "../services/Patient/PatientAPI";
import "../Styles/AI/AIHealthHeader.css";

function AIHealthHeader() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user")) || {};
        const localPatient = JSON.parse(localStorage.getItem("patient")) || {};

        if (
          localPatient?.id ||
          localPatient?.patientID ||
          localPatient?.email
        ) {
          setPatient(localPatient);
          return;
        }

        if (!user?.email) {
          setPatient(null);
          return;
        }

        const res = await getPatientByEmail(user.email);
        const patientData = Array.isArray(res?.data)
          ? res.data[0]
          : Array.isArray(res?.data?.data)
            ? res.data.data[0]
            : res?.data?.data || res?.data || null;

        setPatient(patientData);
      } catch (error) {
        console.error("Error fetching patient:", error);
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, []);

  const getPatientName = (p) =>
    p?.fullName || p?.FullName || p?.name || p?.patientName || "Patient";

  const getPatientId = (p) =>
    p?.patientID || p?.patientId || p?.patientCode || p?.id || "N/A";

  const getPatientPhoto = (p) =>
    p?.photo ||
    p?.image ||
    p?.profileImage ||
    p?.avatar ||
    p?.profilePhoto ||
    "";

  return (
    <header className="ai-health-header">
      <div className="ai-health-header-glow ai-health-header-glow-one"></div>
      <div className="ai-health-header-glow ai-health-header-glow-two"></div>

      <div className="ai-header-top">
        <div className="ai-header-title-box">
          <div className="ai-header-icon">
            <FaRobot />
          </div>

          <div>
            <span className="ai-header-kicker">AI Healthcare Workspace</span>
            <h1
              className="ai-header-title"
              onClick={() => navigate("/ai-health")}
            >
              MMCare-AI
            </h1>
            <p className="ai-header-subtitle">
              Smart symptom analysis, reports, reminders, appointments and
              hospital support.
            </p>
          </div>
        </div>

        <div className="ai-header-actions">
          <div className="ai-header-date-pill">{today}</div>

          <button type="button" className="ai-header-icon-btn" title="Alerts">
            <FaBell />
            <span className="ai-header-notification-dot"></span>
          </button>

          <button type="button" className="ai-header-icon-btn" title="Settings">
            <FaCog />
          </button>
        </div>
      </div>

      <div className="ai-header-bottom">
        <div className="ai-header-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search symptoms, reports, doctors, departments..."
          />
          <button type="button" title="Voice search">
            <FaMicrophone />
          </button>
        </div>

        <div className="ai-header-right">
          <div className="ai-status-card">
            <FaHeartbeat />
            <div>
              <span>System Status</span>
              <strong>AI Active</strong>
            </div>
          </div>

          <div className="ai-status-card ai-secure-card">
            <FaShieldAlt />
            <div>
              <span>Safety Mode</span>
              <strong>Enabled</strong>
            </div>
          </div>

          <div className="ai-patient-card">
            <div className="ai-avatar">
              {getPatientPhoto(patient) ? (
                <img
                  src={getPatientPhoto(patient)}
                  alt={getPatientPhoto(patient)}
                />
              ) : (
                <FaUserCircle />
              )}
            </div>

            <div className="ai-patient-info">
              {loading ? (
                <>
                  <h4>Loading patient...</h4>
                  <p>Please wait</p>
                </>
              ) : (
                <>
                  <h4>{getPatientName(patient)}</h4>
                  <p>Patient • {getPatientId(patient)}</p>
                  <span className="ai-badge">AI Active</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="ai-header-feature-row">
        <div>
          <FaHeartbeat />
          <span>Symptom Guidance</span>
        </div>
        <div>
          <FaFileMedical />
          <span>Report Support</span>
        </div>
        <div>
          <FaCalendarCheck />
          <span>Appointment Help</span>
        </div>
        <div>
          <FaShieldAlt />
          <span>Safe AI Advice</span>
        </div>
      </div>
    </header>
  );
}

export default AIHealthHeader;
