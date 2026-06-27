import React, { useEffect, useState } from "react";
import {
  FaNotesMedical,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getPrescriptionsByDoctor } from "../../Pages/Doctor-Dashboard/services/Presscription/PresscriptionApi";
import { getPrescriptionDashboardStats } from "../../utils/presscriptionHelpers";
import "../../Styles/pages/Presscription/PrescriptionCard.css";

function PrescriptionCard() {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("doctor")) || {
    id: "DOC_0001",
  };

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalToday: 0,
    pending: 0,
    completed: 0,
    sent: 0,
    latestPrescription: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getPrescriptionsByDoctor(doctor.id);
        setStats(getPrescriptionDashboardStats(data));
      } catch (error) {
        console.error("Error loading prescription card:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [doctor.id]);

  return (
    <div
      className="prescription-card"
      onClick={() => navigate("/doctor/prescriptions")}
    >
      <div className="prescription-card-top">
        <div className="prescription-card-icon">
          <FaNotesMedical />
        </div>
        <div className="prescription-card-badge">{stats.totalToday} Today</div>
      </div>

      <div className="prescription-card-content">
        <h3>Prescriptions</h3>
        <p>
          Track pending prescriptions, view latest prescriptions, and manage
          patient medicines quickly.
        </p>
      </div>

      {loading ? (
        <div className="prescription-card-loading">Loading...</div>
      ) : (
        <>
          <div className="prescription-card-stats">
            <div className="prescription-stat pending">
              <FaClock />
              <span>{stats.pending} Pending</span>
            </div>
            <div className="prescription-stat completed">
              <FaCheckCircle />
              <span>{stats.completed} Completed</span>
            </div>
            <div className="prescription-stat sent">
              <FaPaperPlane />
              <span>{stats.sent} Sent</span>
            </div>
          </div>

          {stats.latestPrescription ? (
            <div className="prescription-latest-box">
              <div className="prescription-latest-header">
                <img
                  src={
                    stats.latestPrescription.patientPhoto ||
                    "/images/default-patient.png"
                  }
                  alt={stats.latestPrescription.patientName}
                  onError={(e) => {
                    e.currentTarget.src = "/images/default-patient.png";
                  }}
                />
                <div>
                  <h4>{stats.latestPrescription.patientName}</h4>
                  <p>{stats.latestPrescription.diagnosis}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="prescription-empty-box">
              No prescriptions available
            </div>
          )}
        </>
      )}

      <button
        className="prescription-card-btn"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/doctor/prescriptions");
        }}
      >
        Open
      </button>
    </div>
  );
}

export default PrescriptionCard;
