import React from "react";
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaCalendarDay,
  FaUtensils,
} from "react-icons/fa";
import "../../Styles/AI/TodaySchedule.css";

function TodaySchedule({ schedule = [], onLogAction }) {
  return (
    <div className="today-schedule-card">
      <div className="today-schedule-header">
        <div>
          <span className="today-label">
            <FaCalendarDay /> Medicine Plan
          </span>
          <h3>Today's Schedule</h3>
        </div>

        <span className="today-count">{schedule.length} Dose</span>
      </div>

      {schedule.length === 0 ? (
        <div className="today-empty-state">
          <FaClock />
          <h4>No medicines scheduled</h4>
          <p>You have no medicine reminders for today.</p>
        </div>
      ) : (
        <div className="schedule-list">
          {schedule.map((item, index) => (
            <div
              key={`${item.reminderId}-${item.time}-${index}`}
              className="schedule-item"
            >
              <div className="schedule-time">
                <FaClock />
                <span>{item.time || "N/A"}</span>
              </div>

              <div className="schedule-details">
                <h4>{item.medicineName || "Medicine Name"}</h4>
                <p>{item.dosage || "Dosage not added"}</p>
                <small>
                  <FaUtensils /> {item.mealTiming || "Meal timing not added"}
                </small>
              </div>

              <div className="schedule-actions">
                <button
                  className="schedule-btn taken-btn"
                  onClick={() =>
                    onLogAction(item.reminderId, item.time, "taken")
                  }
                >
                  <FaCheckCircle /> Taken
                </button>

                <button
                  className="schedule-btn skip-btn"
                  onClick={() =>
                    onLogAction(item.reminderId, item.time, "skipped")
                  }
                >
                  <FaTimesCircle /> Skip
                </button>

                <button
                  className="schedule-btn missed-btn"
                  onClick={() =>
                    onLogAction(item.reminderId, item.time, "missed")
                  }
                >
                  <FaExclamationCircle /> Missed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodaySchedule;
