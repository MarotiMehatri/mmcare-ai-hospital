import React from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
  FaUserMd,
} from "react-icons/fa";

import "../../Styles/Patient/BookAppointmentSuccessCard.css";

function BookAppointmentSuccessCard({ appointment, onClose }) {
  if (!appointment) return null;

  return (
    <div className="book-success-overlay">
      <div className="book-success-card">
        <div className="book-success-card__icon">
          <FaCheckCircle />
        </div>

        <h2>Appointment Booked Successfully!</h2>
        <p>Your appointment request has been submitted.</p>

        <div className="book-success-card__details">
          <div>
            <FaUserMd />
            <span>{appointment.doctorName}</span>
          </div>

          <div>
            <FaCalendarAlt />
            <span>{appointment.appointmentDate}</span>
          </div>

          <div>
            <FaClock />
            <span>{appointment.appointmentTime}</span>
          </div>
        </div>

        <button onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

export default BookAppointmentSuccessCard;
