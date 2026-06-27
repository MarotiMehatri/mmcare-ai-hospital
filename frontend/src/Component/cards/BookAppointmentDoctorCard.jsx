import React from "react";
import { FaUserMd, FaStar, FaCalendarCheck } from "react-icons/fa";
import "../../Styles/Patient/BookAppointmentDoctorCard.css";

function BookAppointmentDoctorCard({ doctor, selectedDoctor, onSelect }) {
  const doctorName =
    doctor?.FullName || doctor?.name || doctor?.doctorName || "Doctor Name";

  const isSelected = selectedDoctor?.id === doctor?.id;

  return (
    <div
      className={`book-doctor-card ${isSelected ? "active" : ""}`}
      onClick={() => onSelect(doctor)}
    >
      <div className="book-doctor-card__image">
        {doctor?.image || doctor?.profilePhoto ? (
          <img src={doctor.image || doctor.profilePhoto} alt={doctorName} />
        ) : (
          <FaUserMd />
        )}
      </div>

      <div className="book-doctor-card__content">
        <h3>{doctorName}</h3>
        <p>{doctor?.department || "General Department"}</p>
        <span>{doctor?.specialization || "Specialist"}</span>

        <div className="book-doctor-card__meta">
          <small>
            <FaStar /> {doctor?.rating || "4.8"}
          </small>
          <small>{doctor?.experience || "5+ Years"}</small>
        </div>

        <button type="button">
          <FaCalendarCheck /> {isSelected ? "Selected" : "Book Now"}
        </button>
      </div>
    </div>
  );
}

export default BookAppointmentDoctorCard;
