import {
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaUserCircle,
  FaIdBadge,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Patient/ProfileCard.css";

function ProfileCard({ patient }) {
  const navigate = useNavigate();
  if (!patient) {
    return <p className="loading">Loading profile</p>;
  }
  return (
    <div className="patient-profile-card">
      {/* HEADER */}
      <div className="patient-profile-card__header">
        <div className="patient-profile-card__avatar">
          <div to={`/patient/profile/${patient.id}`}>
            {patient.photo ? (
              <img
                src={patient.photo}
                alt="patient"
                className="patient-profile-card__img"
              />
            ) : (
              <FaUserCircle className="patient-profile-card__default-icon" />
            )}
          </div>
        </div>

        <div className="patient-profile-card__info">
          <h3 className="patient-profile-card__name">
            {patient.fullName || patient.name || "No Name"}
          </h3>

          <p className="patient-profile-card__meta">
            {patient.age} yrs • {patient.gender}
          </p>

          <p className="patient-profile-card__id">
            <FaIdBadge className="card-inline-icon" />
            {patient.patientID}
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="patient-profile-card__divider"></div>

      {/* CONTACT */}
      <div className="patient-profile-card__contact">
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <span>{patient.mobile || "N/A"}</span>
        </div>

        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <span>{patient.email || "N/A"}</span>
        </div>

        <div className="contact-item">
          <FaMapMarkerAlt className="contact-icon" />
          <span>{patient.address || "N/A"}</span>
        </div>
      </div>

      {/* BUTTON */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          navigate("/patient/form");
        }}
        className="patient-profile-card__btn"
      >
        <FaEdit className="btn-icon" />
        Update Profile
      </button>
    </div>
  );
}

export default ProfileCard;
