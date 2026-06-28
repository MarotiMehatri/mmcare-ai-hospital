import React, { useEffect, useState } from "react";
import { FaBell, FaEnvelope, FaUserCircle, FaBars } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../Styles/Patient/PatientNavbar.css";

import { getNotifications } from "../services/Patient/notificationAPI";
import { getUserById } from "../api/UserAPI";
import { getMessages } from "../services/Patient/messageAPI";
import { getPatientByUserId } from "../services/Patient/PatientAPI";

function PatientNavbar() {
  const navigate = useNavigate();

  /* ======================================
      STATES
  ====================================== */

  const [user, setUser] = useState(null);

  const [patient, setPatient] = useState(null);

  const [notifications, setNotifications] = useState([]);

  const [messages, setMessages] = useState([]);

  const [dropdown, setDropdown] = useState(false);

  const [messageDropdown, setMessageDropdown] = useState(false);

  /* ======================================
      LOAD USER
  ====================================== */

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    loadUser(storedUser.id);
  }, [navigate]);

  /* ======================================
      LOAD PATIENT
  ====================================== */

  useEffect(() => {
    if (user?.id) {
      loadPatient(user.id);
    }
  }, [user?.id]);

  /* ======================================
      LOAD DATA
  ====================================== */

  useEffect(() => {
    if (patient?.id) {
      loadNotifications(patient.id);

      loadMessages(patient.id);

      const interval = setInterval(() => {
        loadMessages(patient.id);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [patient?.id]);

  /* ======================================
      USER API
  ====================================== */

  const loadUser = async (userId) => {
    try {
      //console.log("Calling user API with ID:", userId);

      const userData = await getUserById(userId);
      //console.log("USER RESPONSE:", res);

      setUser(userData);
    } catch (error) {
      console.error("User API Error:", error);
    }
  };

  /* ======================================
      PATIENT API
  ====================================== */

  const loadPatient = async (userId) => {
    try {
      const patientData = await getPatientByUserId(userId);

      if (patientData) {
        setPatient(patientData);
        localStorage.setItem("patient", JSON.stringify(patientData));
      } else {
        setPatient(null);
        localStorage.removeItem("patient");
      }
    } catch (error) {
      console.error("Patient API Error:", error);
    }
  };

  /* ======================================
      NOTIFICATION API
  ====================================== */

  const loadNotifications = async (patientId) => {
    try {
      const res = await getNotifications(patientId);

      const data = res?.data?.data || res?.data || [];

      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Notification API Error:", error);

      setNotifications([]);
    }
  };

  /* ======================================
      MESSAGE API
  ====================================== */

  const loadMessages = async (patientId) => {
    try {
      const res = await getMessages(patientId);

      const data = res?.data?.data || res?.data || res || [];

      const doctorMessages = Array.isArray(data)
        ? data.filter((msg) => msg.sender?.toLowerCase() === "doctor")
        : [];

      setMessages(doctorMessages);
    } catch (error) {
      console.error("Message API Error:", error);

      setMessages([]);
    }
  };

  /* ======================================
      PROFILE
  ====================================== */

  const handleProfile = () => {
    if (!patient?.id) return;

    navigate(`/patient/profile/${patient.id}`);

    setDropdown(false);
  };

  /* ======================================
      LOGOUT
  ====================================== */

  const handleLogout = () => {
    localStorage.removeItem("user");

    localStorage.removeItem("patient");

    navigate("/login");
  };

  /* ======================================
      PROFILE IMAGE
  ====================================== */

  const profileImage =
    patient?.photo && patient.photo.trim() !== "" ? patient.photo : null;

  return (
    <header className="patient-navbar">
      {/* ======================================
            LEFT SECTION
      ====================================== */}

      <div className="navbar-left">
        {/* <button className="navbar-menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button> */}

        <div className="navbar-logo" onClick={() => navigate("/patient")}>
          MMCare-AI
        </div>
      </div>

      {/* ======================================
            RIGHT SECTION
      ====================================== */}

      <div className="navbar-right">
        {/* ======================================
              NOTIFICATION
        ====================================== */}

        <div className="nav-icon">
          <FaBell />

          {notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
        </div>

        {/* ======================================
              MESSAGE ALERT
        ====================================== */}

        <div className="message-alert-wrapper">
          <div
            className="nav-icon"
            onClick={() => setMessageDropdown(!messageDropdown)}
          >
            <FaEnvelope />

            {messages.filter((msg) => !msg.isRead).length > 0 && (
              <span className="badge">
                {messages.filter((msg) => !msg.isRead).length}
              </span>
            )}
          </div>

          {/* ======================================
                MESSAGE DROPDOWN
          ====================================== */}

          {messageDropdown && (
            <div className="message-dropdown">
              <div className="message-header">Doctor Messages</div>

              {messages.length === 0 ? (
                <div className="no-message">No Messages Found</div>
              ) : (
                messages
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((msg) => (
                    <div className="message-item" key={msg.id}>
                      <div className="message-top">
                        <h4>{msg.FullName || "Doctor"}</h4>

                        <span>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <p>{msg.text || msg.message}</p>
                    </div>
                  ))
              )}

              <button
                className="view-all-btn"
                onClick={() => navigate("/patient/patient-chat")}
              >
                Open Chat
              </button>
            </div>
          )}
        </div>

        {/* ======================================
              SUPPORT
        ====================================== */}

        <div className="nav-support">24/7 Support</div>

        {/* ======================================
              PROFILE
        ====================================== */}

        <div className="nav-profile" onClick={() => setDropdown(!dropdown)}>
          {profileImage ? (
            <img src={profileImage} alt="profile" className="profile-img" />
          ) : (
            <FaUserCircle size={32} />
          )}

          <span>{user?.fullName || "Patient"}</span>
        </div>

        {/* ======================================
              PROFILE DROPDOWN
        ====================================== */}

        {dropdown && (
          <div className="profile-dropdown">
            <div onClick={handleProfile}>My Profile</div>

            <div onClick={() => navigate("/patient/settings")}>Settings</div>

            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default PatientNavbar;
