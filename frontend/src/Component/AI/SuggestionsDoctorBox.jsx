import React from "react";
import { FaUserMd, FaHospital } from "react-icons/fa";

function SuggestionsDoctorBox({
  recommendedDepartment,
  recommendedDoctorType,
}) {
  return (
    <div className="ai-doctor-box-card">
      <div className="section-title-row">
        <FaUserMd className="section-icon" />
        <h3>Doctor Recommendation</h3>
      </div>

      <div className="ai-doctor-rec-grid">
        <div className="ai-doctor-rec-item">
          <FaHospital />
          <div>
            <strong>Department</strong>
            <p>{recommendedDepartment || "General Medicine"}</p>
          </div>
        </div>

        <div className="ai-doctor-rec-item">
          <FaUserMd />
          <div>
            <strong>Doctor Type</strong>
            <p>{recommendedDoctorType || "General Physician"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuggestionsDoctorBox;
