import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaArrowRight,
  FaUserMd,
  FaCalendarAlt,
  FaLungs,
  FaThermometerHalf,
} from "react-icons/fa";

import { getRecentHealthSummaryByPatientId } from "../../services/Patient/healthSummaryAPI";
import "../../Styles/Patient/HealthSummaryPreview.css";

function HealthSummaryPreview({ patientId }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        if (!patientId) return;

        setLoading(true);

        const res = await getRecentHealthSummaryByPatientId(patientId);

        // console.log("Health Summary Data:", res.data);

        setRecords(res.data || []);
      } catch (error) {
        console.error("Failed to load recent health summary:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [patientId]);

  return (
    <div className="health-summary-preview">
      <div className="health-summary-preview__head">
        <div className="health-summary-preview__title-wrap">
          <div className="health-summary-preview__icon">
            <FaHeartbeat />
          </div>

          <div>
            <h3>Health Summary</h3>
            <p>Latest 5 health records</p>
          </div>
        </div>

        <Link
          to="/patient/health-summary"
          className="health-summary-preview__view-btn"
        >
          View All
          <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="health-summary-preview__empty">Loading summary...</div>
      ) : records.length === 0 ? (
        <div className="health-summary-preview__empty">
          No health summary found
        </div>
      ) : (
        <div className="health-summary-preview__list">
          {records.map((item) => (
            <div className="health-summary-preview__item" key={item.id}>
              <div className="health-summary-preview__top">
                <div>
                  <h4>{item.date || "-"}</h4>

                  <p>
                    <FaUserMd />
                    {item.doctorName || "Doctor"}
                  </p>
                </div>

                <span
                  className={`health-summary-preview__status health-summary-preview__status--${item.status
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {item.status || "Healthy"}
                </span>
              </div>

              <div className="health-summary-preview__vitals">
                <div>
                  <span>BP</span>
                  <strong>{item.bloodPressure || "-"}</strong>
                </div>

                <div>
                  <span>Heart</span>
                  <strong>
                    <FaHeartbeat />
                    {item.heartRate || "-"}
                  </strong>
                </div>

                <div>
                  <span>Oxygen</span>
                  <strong>
                    <FaLungs />
                    {item.oxygenLevel || "-"}
                  </strong>
                </div>

                <div>
                  <span>Temp</span>
                  <strong>
                    <FaThermometerHalf />
                    {item.temperature || "-"}
                  </strong>
                </div>
              </div>

              <div className="health-summary-preview__diagnosis">
                <strong>Diagnosis</strong>

                <p>
                  {item.diagnosis || item.notes || "No diagnosis available"}
                </p>
              </div>

              <div className="health-summary-preview__footer">
                <span>
                  <FaCalendarAlt />
                  {item.department || "General"}
                </span>

                <span>Medicines: {item.medicines?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HealthSummaryPreview;
