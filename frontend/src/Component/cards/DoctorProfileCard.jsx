import React from "react";
import {
  FaPhoneAlt,
  FaUserMd,
  FaStethoscope,
  FaUserCircle,
} from "react-icons/fa";
import { FaEnvelope, FaIdBadge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../../Styles/Doctor/DoctorProfileCards.css";
function DoctorProfileCard({ doctor }) {
  if (!doctor) return null;

  return (
    <div className="doctor-small-card">
      <div className="doctor-small-top">
        <div className="doctor-small-image-box">
          {doctor?.profilePhoto ? (
            <img
              src={doctor.profilePhoto}
              alt={doctor.FullName}
              className="doctor-small-image"
            />
          ) : (
            <FaUserMd className="doctor-small-icon" />
          )}
        </div>
        <div className="doctor-small-info">
          <h3 className="doctor-small-name">
            {doctor.FullName || "Doctor Name"}
          </h3>
          <p className="doctor-small-department">
            {doctor.department || "Department"}
          </p>
        </div>
      </div>

      <div className="doctor-small-details">
        <div className="doctor-detail-row">
          <FaIdBadge className="detail-icon" />
          <span>{doctor.id || doctor.doctorId || "N/A"}</span>
        </div>

        <div className="doctor-detail-row">
          <FaPhoneAlt className="detail-icon" />
          <span>{doctor.mobile || doctor.phone || "N/A"}</span>
        </div>

        <div className="doctor-detail-row">
          <FaEnvelope className="detail-icon" />
          <span>{doctor.email || "N/A"}</span>
        </div>
        <p className="doctor-small-department">
          <FaStethoscope />
          {doctor?.specialization || "General Physician"}
        </p>
      </div>

      <Link to={`/doctor/profile/${doctor.id}`} className="doctor-view-btn">
        <FaUserCircle />
        Profile
      </Link>
    </div>
  );
}

export default DoctorProfileCard;
