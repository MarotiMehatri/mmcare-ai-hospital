import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorReports } from "../../Pages/Doctor-Dashboard/services/reportAPI";
import "../../Styles/pages/Doctor/MedicalReportsCard.css";

function MedicalReportsCard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem("doctor"));
    if (!doctor?.id) return;

    loadReports(doctor.id);
  }, []);

  const loadReports = async (doctorId) => {
    try {
      const res = await getDoctorReports(doctorId);
      setReports(res.data || []);
    } catch (error) {
      console.error("Error loading doctor reports:", error);
    }
  };

  const totalReports = reports.length;
  const pendingReports = reports.filter(
    (item) => item.status === "pending Review",
  ).length;
  const reviewedReports = reports.filter(
    (item) => item.status === "Critical",
  ).length;
  const criticalReports = reports.filter(
    (item) => item.status === "Critical",
  ).length;
  return (
    <div
      className="medical-reports-card"
      onClick={() => navigate("/doctor/medical-reports")}
    >
      <div className="medical-reports-card__header">
        <div className="medical-reports-card__icon">
          <FaFileMedical />
        </div>
        <div>
          <h3>Medical Reports</h3>
          <p>Manage lab reports and patient medical files</p>
        </div>
      </div>

      <div className="medical-reports-card__stats">
        <div className="medical-reports-card__stat">
          <FaFileMedical />
          <span>Total: {totalReports}</span>
        </div>
        <div className="medical-reports-card__stat">
          <FaClock />
          <span>Pending: {pendingReports}</span>
        </div>
        <div className="medical-reports-card__stat">
          <FaCheckCircle />
          <span>Reviewed: {reviewedReports}</span>
        </div>
        <div className="medical-reports-card__stat critical">
          <FaExclamationTriangle />
          <span>Critical: {criticalReports}</span>
        </div>
      </div>

      <button
        className="medical-reports-card__btn"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/doctor/medical-reports");
        }}
      >
        Open Reports
      </button>
    </div>
  );
}

export default MedicalReportsCard;
