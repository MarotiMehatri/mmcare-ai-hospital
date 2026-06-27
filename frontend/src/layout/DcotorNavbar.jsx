import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaComments,
  FaRobot,
  FaVideo,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  getDoctorNotifications,
  getDoctorMessages,
} from "../services/Doctor/NavbarAPI";

import "../Styles/Doctor/DoctorNavbar.css";

function DoctorNavbar() {
  const navigate = useNavigate();

  const doctor = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("doctor")) || {};
    } catch {
      return {};
    }
  }, []);

  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    if (!doctor?.id) return;
    loadNavbarData();
  }, [doctor?.id]);

  const loadNavbarData = async () => {
    try {
      const [notificationRes, messageRes] = await Promise.all([
        getDoctorNotifications(doctor.id),
        getDoctorMessages(doctor.id),
      ]);

      const notificationData = Array.isArray(notificationRes?.data)
        ? notificationRes.data
        : notificationRes?.data?.data || [];

      const messageData = Array.isArray(messageRes?.data)
        ? messageRes.data
        : messageRes?.data?.data || [];

      setNotifications(notificationData);

      const unreadMessages = messageData.filter(
        (msg) =>
          msg.sender === "patient" &&
          String(msg.doctorId) === String(doctor.id) &&
          !msg.isRead,
      );

      setMessages(unreadMessages);
    } catch (error) {
      console.error("Navbar API Error:", error);
      setNotifications([]);
      setMessages([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/doctor/search?query=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  const unreadMessageCount = messages.length;

  const unreadNotificationCount = Array.isArray(notifications)
    ? notifications.filter((item) => !item.isRead).length
    : 0;

  // const doctorName =
  //   doctor?.name || doctor?.FullName || doctor?.doctorName || "Doctor";

  const doctorPhoto =
    doctor?.photo || doctor?.profilePhoto || "/default-doctor.png";

  return (
    <div className="doctor-navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => navigate("/doctor")}>
          🏥 MMCare-AI
        </div>

        <form className="search-box" onSubmit={handleSearch}>
          <FaSearch />

          <input
            type="text"
            placeholder="Search patients, reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="navbar-right">
        <div
          className="nav-icon"
          title="Notifications"
          onClick={() => navigate("/doctor/notifications")}
        >
          <FaBell />

          {unreadNotificationCount > 0 && (
            <span className="badge">{unreadNotificationCount}</span>
          )}
        </div>

        <div
          className="nav-icon"
          title="Chat"
          onClick={() => navigate("/doctor/chat")}
        >
          <FaComments />

          {unreadMessageCount > 0 && (
            <span className="badge">{unreadMessageCount}</span>
          )}
        </div>

        <div
          className="nav-icon"
          title="AI Health"
          onClick={() => navigate("/ai-health")}
        >
          <FaRobot />
        </div>

        <div
          className="nav-icon"
          title="Video Consultation"
          onClick={() => navigate("/doctor/video-consultation")}
        >
          <FaVideo />
        </div>

        <div className="profile-section">
          <div
            className="profile-main"
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            <img
              src={doctorPhoto}
              alt="Doctor"
              className="doctor-navbar-photo"
              onError={(e) => {
                e.currentTarget.src = "/default-doctor.png";
              }}
            />

            <span>{doctor?.FullName || "Doctor"}</span>
          </div>

          {openProfile && (
            <div className="profile-dropdown">
              <div onClick={() => navigate(`/doctor/profile/${doctor.id}`)}>
                My Profile
              </div>

              <div onClick={() => navigate("/doctor/schedule")}>
                My Schedule
              </div>

              <div className="logout" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorNavbar;
