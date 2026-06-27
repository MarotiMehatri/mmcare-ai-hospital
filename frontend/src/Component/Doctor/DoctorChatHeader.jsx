import React, { useState } from "react";
import {
  FaCircle,
  FaPhoneAlt,
  FaVideo,
  FaBars,
  FaSearch,
  FaUserCircle,
  FaEllipsisV,
} from "react-icons/fa";
import "../../Styles/Doctor/DoctorChatHeader.css";

function DoctorChatHeader({
  patient,
  typing,
  onToggleSidebar,
  onSearch,
  onViewProfile,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="doctor-chat-header">
      {/* LEFT */}

      <div className="doctor-chat-header-left">
        <button className="doctor-chat-mobile-btn" onClick={onToggleSidebar}>
          <FaBars />
        </button>

        <div className="doctor-chat-user">
          <img
            src={patient?.photo || "/default-patient.png"}
            alt={patient?.fullName}
            className="doctor-chat-avatar"
          />

          <div className="doctor-chat-user-info">
            <h3>{patient?.fullName || "Patient"}</h3>

            <p>
              {typing
                ? "Typing..."
                : patient?.isOnline
                  ? "Online"
                  : patient?.lastSeen
                    ? `Last seen ${patient.lastSeen}`
                    : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <div className="doctor-chat-header-actions">
        <button className="doctor-chat-action-btn" title="Voice Call">
          <FaPhoneAlt />
        </button>

        <button className="doctor-chat-action-btn" title="Video Call">
          <FaVideo />
        </button>

        <button
          className="doctor-chat-action-btn"
          title="Search Message"
          onClick={onSearch}
        >
          <FaSearch />
        </button>

        <button
          className="doctor-chat-action-btn"
          title="Patient Profile"
          onClick={onViewProfile}
        >
          <FaUserCircle />
        </button>

        <div className="doctor-chat-menu-wrapper">
          <button
            className="doctor-chat-action-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaEllipsisV />
          </button>

          {showMenu && (
            <div className="doctor-chat-dropdown">
              <button>View Reports</button>
              <button>Medical History</button>
              <button>Clear Chat</button>
              <button>Block Patient</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorChatHeader;
