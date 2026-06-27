import React from "react";
import {
  FaCapsules,
  FaEdit,
  FaTrash,
  FaClock,
  FaUserMd,
  FaCalendarAlt,
  FaUtensils,
  FaSyncAlt,
  FaNotesMedical,
} from "react-icons/fa";
import "../../Styles/AI/ReminderCard.css";

function ReminderCard({ reminder, onEdit, onDelete }) {
  const isActive = reminder.status === "active";

  return (
    <div
      className={`reminder-card ${isActive ? "active-card" : "inactive-card"}`}
    >
      <div className="reminder-card-top">
        <div className="reminder-title-section">
          <div className="reminder-icon">
            <FaCapsules />
          </div>

          <div>
            <h4>{reminder.medicineName || "Medicine Name"}</h4>
            <p>{reminder.dosage || "Dosage not added"}</p>
          </div>
        </div>

        <span
          className={`reminder-status-badge ${isActive ? "active" : "inactive"}`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="reminder-meta">
        <div className="meta-item">
          <FaClock />
          <span>
            <strong>Times</strong>
            {reminder.times?.length ? reminder.times.join(", ") : "N/A"}
          </span>
        </div>

        <div className="meta-item">
          <FaSyncAlt />
          <span>
            <strong>Frequency</strong>
            {reminder.frequency || "N/A"}
          </span>
        </div>

        <div className="meta-item">
          <FaUtensils />
          <span>
            <strong>Meal</strong>
            {reminder.mealTiming || "N/A"}
          </span>
        </div>

        <div className="meta-item">
          <FaUserMd />
          <span>
            <strong>Doctor</strong>
            {reminder.prescribedBy || "Not mentioned"}
          </span>
        </div>

        <div className="meta-item">
          <FaCalendarAlt />
          <span>
            <strong>Start Date</strong>
            {reminder.startDate || "N/A"}
          </span>
        </div>

        <div className="meta-item">
          <FaCalendarAlt />
          <span>
            <strong>End Date</strong>
            {reminder.endDate || "N/A"}
          </span>
        </div>

        <div className="meta-item">
          <FaCapsules />
          <span>
            <strong>Refill Left</strong>
            {reminder.refillCount ?? 0}
          </span>
        </div>

        <div className="meta-item full-width">
          <FaNotesMedical />
          <span>
            <strong>Instructions</strong>
            {reminder.instructions || "No notes"}
          </span>
        </div>
      </div>

      <div className="reminder-card-actions">
        <button
          className="reminder-btn edit-btn"
          onClick={() => onEdit(reminder)}
        >
          <FaEdit /> Edit
        </button>

        <button
          className="reminder-btn delete-btn"
          onClick={() => onDelete(reminder.id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default ReminderCard;
