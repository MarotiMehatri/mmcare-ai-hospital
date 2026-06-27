import React from "react";
import { FaCalendarAlt, FaClock, FaUserMd } from "react-icons/fa";
import "../../Styles/Patient/AppointmentCard.css";
const AppointmentCard = ({ appointment, onCancel }) => {
  return (
    <div className="appointment-card">
      {/* Header */}
      <div className="appointment-card__header">
        <FaUserMd className="appointment-card__doctor-icon" />
        <h3 className="appointment-card__doctor-name">
          {appointment.doctorName}
        </h3>
      </div>

      {/* Table Format */}
      <div className="appointment-card__table">
        <div className="appointment-row">
          <span className="label">Department</span>
          <span className="value">{appointment.department}</span>
        </div>

        <div className="appointment-row">
          <span className="label">Disease</span>
          <span className="value">{appointment.disease}</span>
        </div>

        <div className="appointment-row">
          <span className="label">Symptoms</span>
          <span className="value">
            {appointment.symptoms || "Not Provided"}
          </span>
        </div>

        <div className="appointment-row">
          <span className="label">Notes</span>
          <span className="value">{appointment.notes || "No Notes"}</span>
        </div>
      </div>

      {/* Time Section */}
      <div className="appointment-card__time">
        <div className="time-item">
          <FaCalendarAlt />
          <span>{appointment.appointmentDate}</span>
        </div>

        <div className="time-item">
          <FaClock />
          <span>{appointment.appointmentTime}</span>
        </div>
      </div>

      {/* Status */}
      <div className="appointment-card__status">
        <span className={`status-badge ${appointment.status}`}>
          {appointment.status}
        </span>
      </div>

      {/* Cancel Button */}
      {appointment.status === "Booked" && (
        <button
          className="appointment-card__cancel-btn"
          onClick={() => onCancel(appointment.id)}
        >
          Cancel Appointment
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;
