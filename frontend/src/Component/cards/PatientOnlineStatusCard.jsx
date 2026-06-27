import React, { useEffect, useState } from "react";
import {
  FaUserCheck,
  FaSyncAlt,
  FaWifi,
  FaExclamationTriangle,
} from "react-icons/fa";
import { getPatientOnlineStatus } from "../../services/Patient/patientOnlineStatusAPI";
import "../../Styles/Patient/PatientOnlineStatusCard.css";

function PatientOnlineStatusCard() {
  const [onlinePatients, setOnlinePatients] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOnlineStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getPatientOnlineStatus();

      setOnlinePatients(res.data?.onlinePatients || 0);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to fetch patient online status:", error);
      setError("Unable to load status");
      setOnlinePatients(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnlineStatus();

    const interval = setInterval(fetchOnlineStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="patient-online-status-card">
      <div className="patient-online-status-card__top">
        <div className="patient-online-status-card__icon">
          <FaUserCheck />
        </div>

        <button
          className="patient-online-refresh-btn"
          onClick={fetchOnlineStatus}
          disabled={loading}
          title="Refresh status"
        >
          <FaSyncAlt className={loading ? "spin" : ""} />
        </button>
      </div>

      <div className="patient-online-status-card__content">
        <span className="patient-online-label">
          <FaWifi /> Live Status
        </span>

        <h3>Online Patients</h3>

        {error ? (
          <p className="patient-online-error">
            <FaExclamationTriangle /> {error}
          </p>
        ) : (
          <h2>{loading ? "..." : onlinePatients}</h2>
        )}

        <small>
          {lastUpdated ? `Last updated: ${lastUpdated}` : "Checking status..."}
        </small>
      </div>
    </div>
  );
}

export default PatientOnlineStatusCard;
