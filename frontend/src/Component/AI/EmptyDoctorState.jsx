import React from "react";
import {
  FaMapMarkerAlt,
  FaRedo,
  FaSearch,
  FaUserMd,
  FaVideo,
} from "react-icons/fa";
import "../../Styles/AI/EmptyDoctorState.css";

function EmptyDoctorState({ onRetry }) {
  return (
    <div className="empty-doctor-card">
      <div className="empty-doctor-glow"></div>

      <div className="empty-doctor-icon">
        <FaUserMd />
      </div>

      <div className="empty-doctor-content">
        <span>No Match Found</span>
        <h3>No Matching Doctors Found</h3>

        <p>
          We could not find doctors matching this recommendation right now. Try
          another city, visit type, or search again later.
        </p>
      </div>

      <div className="empty-doctor-suggestions">
        <div>
          <FaMapMarkerAlt />
          <span>Try another city</span>
        </div>

        <div>
          <FaVideo />
          <span>Switch online/offline visit</span>
        </div>

        <div>
          <FaSearch />
          <span>Use broader symptoms</span>
        </div>
      </div>

      {onRetry && (
        <button type="button" className="empty-doctor-btn" onClick={onRetry}>
          <FaRedo /> Try Again
        </button>
      )}
    </div>
  );
}

export default EmptyDoctorState;
