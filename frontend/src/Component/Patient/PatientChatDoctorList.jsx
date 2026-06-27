import React, { useMemo, useState } from "react";
import { FaCircle, FaSearch } from "react-icons/fa";
import "../../Styles/Patient/PatientChatDoctorList.css";

function PatientChatDoctorList({
  doctors = [],
  selectedDoctor,
  onSelectDoctor,
  loading,
}) {
  const [search, setSearch] = useState("");

  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  const getDoctorName = (doctor) => {
    return (
      doctor.fullName ||
      doctor.FullName ||
      doctor.name ||
      doctor.doctorName ||
      "Doctor"
    );
  };

  const filteredDoctors = useMemo(() => {
    const searchText = search.toLowerCase();

    return safeDoctors.filter((doctor) => {
      const name = getDoctorName(doctor).toLowerCase();
      const department = String(doctor.department || "").toLowerCase();
      const specialization = String(doctor.specialization || "").toLowerCase();

      return (
        name.includes(searchText) ||
        department.includes(searchText) ||
        specialization.includes(searchText)
      );
    });
  }, [safeDoctors, search]);

  if (loading) {
    return (
      <div className="patient-chat-sidebar-loading">Loading Doctors...</div>
    );
  }

  return (
    <div className="patient-chat-sidebar">
      <div className="patient-chat-search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredDoctors.length === 0 && (
        <div className="patient-chat-empty">No doctors found</div>
      )}

      <div className="patient-chat-doctor-list">
        {filteredDoctors.map((doctor) => {
          const isActive = String(selectedDoctor?.id) === String(doctor.id);

          const doctorName = getDoctorName(doctor);

          return (
            <div
              key={doctor.id || doctor.doctorId}
              className={`patient-chat-doctor-card ${isActive ? "active" : ""}`}
              onClick={() => onSelectDoctor(doctor)}
            >
              <div className="patient-chat-doctor-image-wrapper">
                <img
                  src={
                    doctor.profilePhoto ||
                    doctor.photo ||
                    doctor.image ||
                    "/default-doctor.png"
                  }
                  alt={doctorName}
                  className="patient-chat-doctor-image"
                />

                <span
                  className={`patient-chat-status-dot ${
                    doctor.isOnline ? "online" : "offline"
                  }`}
                >
                  <FaCircle />
                </span>
              </div>

              <div className="patient-chat-doctor-info">
                <div className="patient-chat-top">
                  <h4>{doctorName}</h4>

                  <span className="patient-chat-time">
                    {doctor.lastMessageTime || ""}
                  </span>
                </div>

                <p>{doctor.department || "Department"}</p>

                <div className="patient-chat-bottom">
                  {doctor.isTyping ? (
                    <span className="typing">Typing...</span>
                  ) : (
                    <span className="last-message">
                      {doctor.lastMessage ||
                        doctor.specialization ||
                        "Specialist"}
                    </span>
                  )}

                  {Number(doctor.unreadCount) > 0 && (
                    <span className="patient-chat-unread">
                      {doctor.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatientChatDoctorList;
