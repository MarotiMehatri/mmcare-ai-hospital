import React from "react";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaStar,
  FaUserMd,
} from "react-icons/fa";
import "../../Styles/AI/RecommendDoctorCard.css";

function RecommendDoctorCard({ doctor, isSelected, onSelectDoctor }) {
  return (
    <div className={`ai-doctor-card ${isSelected ? "selected-doctor" : ""}`}>
      {isSelected && (
        <div className="doctor-selected-ribbon">
          <FaCheckCircle /> Selected
        </div>
      )}

      <div className="ai-doctor-image-wrap">
        <img
          src={doctor.profilePhoto || "/AIDoctors/default-doctor.png"}
          alt={doctor.fullName || "Doctor"}
          className="ai-doctor-image"
          onError={(e) => {
            e.currentTarget.src = "/AIDoctors/default-doctor.png";
          }}
        />
      </div>

      <div className="ai-doctor-content">
        <div className="doctor-name-row">
          <div>
            <h4>{doctor.fullName || "Doctor Name"}</h4>
            <p className="doctor-specialization">
              <FaUserMd /> {doctor.specialization || "Specialist"}
            </p>
          </div>

          <span className="doctor-rating-pill">
            <FaStar /> {doctor.rating || "4.5"}
          </span>
        </div>

        <div className="doctor-meta-grid">
          <div className="doctor-meta-item">
            <span>Department</span>
            <strong>{doctor.department || "General"}</strong>
          </div>

          <div className="doctor-meta-item">
            <span>Experience</span>
            <strong>{doctor.experience || 0} years</strong>
          </div>
        </div>

        <div className="doctor-detail-list">
          <p>
            <FaMapMarkedAlt /> {doctor.city || "City"},{" "}
            {doctor.state || "State"}
          </p>

          <p>
            <FaMoneyBillWave /> ₹{doctor.consultationFee || 0}
          </p>

          <p>
            <FaCalendarCheck /> {doctor.consultationMode || "Offline"}
          </p>
        </div>

        <button
          type="button"
          className={`doctor-select-btn ${isSelected ? "selected" : ""}`}
          onClick={() => onSelectDoctor(doctor)}
        >
          {isSelected ? (
            <>
              <FaCheckCircle /> Selected Doctor
            </>
          ) : (
            "Choose Doctor"
          )}
        </button>
      </div>
    </div>
  );
}

export default RecommendDoctorCard;
