import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaFileMedical, FaArrowRight } from "react-icons/fa";

import { getRecentMedicalHistoryByPatientId } from "../../services/Patient/medicalHistoryAPI";

import "../../Styles/Patient/MedicalHistoryPreview.css";

function MedicalHistoryPreview({ patientId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        if (!patientId) return;
        setLoading(true);
        const data = await getRecentMedicalHistoryByPatientId(patientId);
        setHistory(data);
      } catch (error) {
        console.error("Failed to load recent medical history:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [patientId]);

  return (
    <div className="medical-history-preview">
      <div className="medical-history-preview__head">
        <div className="medical-history-preview__title-wrap">
          <div className="medical-history-preview__icon">
            <FaFileMedical />
          </div>
          <div>
            <h3>Medical History</h3>
            <p>Latest 5 hospital visit records</p>
          </div>
        </div>

        <Link
          to="/patient/medical-history"
          className="medical-history-preview__view-btn"
        >
          View All <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="medical-history-preview__empty">Loading history...</div>
      ) : history.length === 0 ? (
        <div className="medical-history-preview__empty">
          No medical history found
        </div>
      ) : (
        <div className="medical-history-preview__list">
          {history.map((item) => (
            <div className="medical-history-preview__item" key={item.id}>
              <div className="medical-history-preview__left">
                <h4>{item.diagnosis}</h4>
                <p>{item.doctorName}</p>
              </div>

              <div className="medical-history-preview__middle">
                <span>{item.department}</span>
                <small>{item.visitDate}</small>
              </div>

              <div className="medical-history-preview__right">
                <span
                  className={`medical-history-preview__status ${item.status
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MedicalHistoryPreview;
