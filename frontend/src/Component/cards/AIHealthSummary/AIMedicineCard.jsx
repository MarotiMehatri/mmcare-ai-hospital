import React from "react";
import { FaCapsules, FaClock, FaPills, FaCheckCircle } from "react-icons/fa";

import "../../../Styles/AI/HealthSummary/AIMedicineCard.css";

function AIMedicineCard({ medicines, summary }) {
  const rawMedicines =
    medicines ||
    summary?.medications ||
    summary?.medicines ||
    summary?.currentMedicines ||
    summary?.currentMedications ||
    summary?.prescription?.medicines ||
    [];

  const medicineList = Array.isArray(rawMedicines)
    ? rawMedicines
    : rawMedicines
      ? [rawMedicines]
      : [];

  return (
    <div className="ai-medicine-card">
      <div className="ai-medicine-header">
        <div className="ai-medicine-icon">
          <FaCapsules />
        </div>

        <div>
          <h2>Current Medicines</h2>
          <p>{medicineList.length} active medicines detected</p>
        </div>
      </div>

      {medicineList.length > 0 ? (
        <div className="ai-medicine-list">
          {medicineList.map((medicine, index) => {
            const medicineName =
              medicine?.name ||
              medicine?.tabletName ||
              medicine?.medicineName ||
              medicine?.drugName ||
              `Medicine ${index + 1}`;

            const dosage =
              medicine?.dosage ||
              medicine?.dose ||
              medicine?.frequency ||
              medicine?.duration ||
              "Dosage not available";

            return (
              <div className="ai-medicine-item" key={index}>
                <div className="medicine-main">
                  <div className="medicine-pill-icon">
                    <FaPills />
                  </div>

                  <div>
                    <h3>{medicineName}</h3>

                    <p>
                      <FaClock />
                      {dosage}
                    </p>

                    {(medicine?.frequency ||
                      medicine?.duration ||
                      medicine?.timing) && (
                      <small>
                        {medicine?.frequency && `${medicine.frequency} `}
                        {medicine?.duration && `• ${medicine.duration} `}
                        {medicine?.timing && `• ${medicine.timing}`}
                      </small>
                    )}
                  </div>
                </div>

                <FaCheckCircle className="medicine-check" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="ai-no-medicine">
          <FaCheckCircle />
          <span>No medicines available</span>
        </div>
      )}
    </div>
  );
}

export default AIMedicineCard;
