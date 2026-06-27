import React, { useMemo } from "react";
import {
  FaUserCircle,
  FaHeartbeat,
  FaIdCard,
  FaTint,
  FaBirthdayCake,
  FaVenusMars,
  FaShieldAlt,
} from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIPatientHeader.css";

function AIPatientHeader({ patient = {} }) {
  const localPatient = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || {};
    } catch {
      return {};
    }
  }, []);

  const localUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const p = {
    ...localUser,
    ...localPatient,
    ...patient,
  };

  const name =
    p.fullName ||
    p.FullName ||
    p.name ||
    p.patientName ||
    p.username ||
    "Patient";

  const patientId =
    p.patientID || p.patientId || p.patientCode || p.id || p.userId || "N/A";

  const photo =
    p.photo || p.image || p.profileImage || p.profilePhoto || p.avatar || "";

  const blood = p.bloodGroup || p.bloodGrop || p.blood_group || "Unknown";

  return (
    <section className="ai-patient-header">
      <div className="ai-patient-glow"></div>

      <div className="ai-patient-left">
        <div className="ai-patient-avatar">
          {photo ? <img src={photo} alt={name} /> : <FaUserCircle />}
        </div>

        <div className="ai-patient-info">
          <span className="ai-patient-badge">
            <FaShieldAlt />
            AI Verified Patient
          </span>

          <h2>{name}</h2>

          <p>
            <FaIdCard />
            Patient ID : {patientId}
          </p>

          <div className="ai-patient-status">
            <FaHeartbeat />
            AI Monitoring Active
          </div>
        </div>
      </div>

      <div className="ai-patient-right">
        <div className="ai-patient-item">
          <FaBirthdayCake />
          <span>Age</span>
          <strong>{p.age || "--"} Years</strong>
        </div>

        <div className="ai-patient-item">
          <FaVenusMars />
          <span>Gender</span>
          <strong>{p.gender || "--"}</strong>
        </div>

        <div className="ai-patient-item">
          <FaTint />
          <span>Blood Group</span>
          <strong>{blood}</strong>
        </div>

        <div className="ai-patient-item">
          <FaHeartbeat />
          <span>Health Status</span>
          <strong>{p.healthStatus || "Stable"}</strong>
        </div>
      </div>
    </section>
  );
}

export default AIPatientHeader;
