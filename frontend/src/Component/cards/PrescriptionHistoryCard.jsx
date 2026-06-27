import React, { useEffect, useState } from "react";
import { FaFilePrescription, FaCalendarAlt, FaUserMd } from "react-icons/fa";

import api from "../../api/axios";
import "../../Styles/Patient/PrescriptionHistoryCard.css";

function PrescriptionHistoryCard({ patientId }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        if (!patientId) return;

        setLoading(true);

        const res = await api.get("/prescriptions", {
          params: { patientId },
        });

        const records = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        const sorted = records
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.visitDate || 0) -
              new Date(a.createdAt || a.visitDate || 0),
          )
          .slice(0, 3);

        setPrescriptions(sorted);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setPrescriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  if (loading) {
    return (
      <div className="prescription-card-empty">Loading prescriptions...</div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="prescription-card-empty">No prescriptions found.</div>
    );
  }

  return (
    <div className="prescription-history-list">
      {prescriptions.map((item) => (
        <div className="prescription-history-item" key={item.id}>
          <div className="prescription-history-icon">
            <FaFilePrescription />
          </div>

          <div className="prescription-history-content">
            <h4>
              {item.medicineName ||
                item.medicines?.[0]?.name ||
                item.title ||
                "Prescription"}
            </h4>

            <p>
              <FaUserMd /> {item.doctorName || "Doctor"}
            </p>

            <p>
              <FaCalendarAlt />{" "}
              {item.createdAt || item.visitDate
                ? new Date(
                    item.createdAt || item.visitDate,
                  ).toLocaleDateString()
                : "No date"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PrescriptionHistoryCard;
