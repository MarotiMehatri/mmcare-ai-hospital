import React from "react";
import { FaCircle, FaSearch, FaCheckDouble } from "react-icons/fa";
import "../../Styles/Doctor/DoctorChatSidebar.css";
function DoctorChatSidebar({
  patients = [],
  selectedPatient,
  onSelectPatient,
  searchTerm,
  setSearchTerm,
  unreadCounts = {},
  typingPatients = {},
}) {
  /* =========================================
      FORMAT LAST SEEN
  ========================================= */

  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return "Offline";

    const date = new Date(lastSeen);

    return `Last seen ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="doctor-chat-sidebar">
      {/* =========================================
          SIDEBAR TOP
      ========================================= */}

      <div className="doctor-chat-sidebar__top">
        <div className="doctor-chat-sidebar__top-header">
          <h2 className="doctor-chat-sidebar__title">Patients</h2>

          <span className="doctor-chat-sidebar__count">{patients.length}</span>
        </div>

        {/* SEARCH */}

        <div className="doctor-chat-sidebar__search-wrap">
          <FaSearch className="doctor-chat-sidebar__search-icon" />

          <input
            type="text"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="doctor-chat-sidebar__search"
          />
        </div>
      </div>

      {/* =========================================
          PATIENT LIST
      ========================================= */}

      <div className="doctor-chat-sidebar__list">
        {patients.length > 0 ? (
          patients.map((patient, index) => {
            const unreadCount = unreadCounts?.[patient.id] || 0;

            const isTyping = typingPatients?.[patient.id] || false;

            return (
              <button
                key={patient.id || index}
                className={`doctor-chat-sidebar__item ${
                  Number(selectedPatient?.id) === Number(patient.id)
                    ? "active"
                    : ""
                }`}
                onClick={() => onSelectPatient(patient)}
              >
                {/* =========================================
                    AVATAR
                ========================================= */}

                <div className="doctor-chat-sidebar__avatar-wrap">
                  <img
                    src={patient.photo || "/patients/default.png"}
                    alt={patient.fullName || "Patient"}
                    className="doctor-chat-sidebar__avatar"
                  />

                  {/* ONLINE STATUS */}

                  <span
                    className={`doctor-chat-sidebar__online ${
                      patient.isOnline ? "online" : "offline"
                    }`}
                  >
                    <FaCircle />
                  </span>
                </div>

                {/* =========================================
                    INFO
                ========================================= */}

                <div className="doctor-chat-sidebar__info">
                  <div className="doctor-chat-sidebar__name-row">
                    <h4>
                      {patient.fullName ||
                        patient.name ||
                        patient.patientName ||
                        "Unknown Patient"}
                    </h4>

                    {/* UNREAD BADGE */}

                    {unreadCount > 0 && (
                      <span className="doctor-chat-sidebar__badge">
                        {unreadCount}
                      </span>
                    )}
                  </div>

                  {/* TYPING */}

                  {isTyping ? (
                    <p className="doctor-chat-sidebar__typing">Typing...</p>
                  ) : (
                    <div className="doctor-chat-sidebar__meta">
                      <span>
                        {patient.isOnline
                          ? "Online"
                          : formatLastSeen(patient.lastSeen)}
                      </span>

                      <small className="doctor-chat-sidebar__seen">
                        <FaCheckDouble />
                      </small>
                    </div>
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <div className="doctor-chat-sidebar__empty">
            <div className="doctor-chat-sidebar__empty-icon">
              <FaSearch />
            </div>

            <h3>No Patients Found</h3>

            <p>No patients are available for chat right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorChatSidebar;
