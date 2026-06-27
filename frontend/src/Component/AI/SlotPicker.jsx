import React from "react";
import { FaCalendarTimes, FaCheckCircle, FaClock } from "react-icons/fa";
import "../../Styles/AI/SlotPicker.css";

function SlotPicker({ slots = [], selectedSlot, onSelectSlot }) {
  return (
    <div className="slot-picker-card">
      <div className="slot-picker-header">
        <div className="slot-picker-icon">
          <FaClock />
        </div>

        <div>
          <span>Doctor Availability</span>
          <h3>Available Slots</h3>
          <p>Select your preferred appointment time.</p>
        </div>
      </div>

      {slots.length === 0 ? (
        <div className="slot-empty-state">
          <FaCalendarTimes />
          <h4>No slots selected yet</h4>
          <p>Please choose a doctor to view available appointment slots.</p>
        </div>
      ) : (
        <div className="ai-slot-list">
          {slots.map((slot) => (
            <button
              type="button"
              key={slot}
              className={`ai-slot-btn ${
                selectedSlot === slot ? "selected-slot" : ""
              }`}
              onClick={() => onSelectSlot(slot)}
            >
              <FaClock />
              <span>{slot}</span>

              {selectedSlot === slot && (
                <FaCheckCircle className="slot-check" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SlotPicker;
