import React from "react";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaHospitalUser,
  FaNotesMedical,
} from "react-icons/fa";
import "../../Styles/AI/DepartmentRecommendation.css";

function DepartmentRecommendation({ department, action }) {
  return (
    <div className="department-recommendation-card">
      <div className="department-recommendation-top">
        <div className="department-icon">
          <FaHospitalUser />
        </div>

        <div>
          <span className="diagnosis-section-label">
            Recommended Department
          </span>
          <h4>{department || "General Physician"}</h4>
        </div>
      </div>

      <div className="department-action-box">
        <div className="department-action-title">
          <FaNotesMedical />
          <span>Recommended Action</span>
        </div>

        <p>
          {action ||
            "Monitor symptoms and consult a qualified doctor if the issue continues."}
        </p>
      </div>

      <div className="department-footer">
        <span>
          <FaCalendarCheck /> Suggested for appointment booking
        </span>

        <button type="button">
          View Doctors <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default DepartmentRecommendation;
