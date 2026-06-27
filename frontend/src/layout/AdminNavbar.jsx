import React, { useState } from "react";
import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Styles/Admin/AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin")) || {
    fullName: "Admin User",
    role: "Hospital Admin",
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-left">
        <div
          className="admin-navbar-logo"
          onClick={() => navigate("/admin")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/admin");
            }
          }}
        >
          <span className="admin-navbar-logo-main">MMCare</span>
          <span className="admin-navbar-logo-sub">-AI</span>
        </div>
      </div>

      <div className="admin-navbar-center">
        <div className="admin-navbar-search">
          <FaSearch className="admin-navbar-search-icon" />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            className="admin-navbar-search-input"
          />
        </div>
      </div>

      <div className="admin-navbar-right">
        <button
          className="admin-navbar-icon-btn"
          onClick={() => navigate("/admin/messages")}
          aria-label="Messages"
        >
          <FaEnvelope />
          <span className="admin-navbar-badge">2</span>
        </button>

        <button
          className="admin-navbar-icon-btn"
          onClick={() => navigate("/admin/notifications")}
          aria-label="Notifications"
        >
          <FaBell />
          <span className="admin-navbar-badge">5</span>
        </button>

        <button
          className="admin-navbar-icon-btn"
          onClick={() => navigate("/admin/settings")}
          aria-label="Settings"
        >
          <FaCog />
        </button>

        <div
          className="admin-navbar-profile"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FaUserCircle className="admin-navbar-profile-icon" />

          <div className="admin-navbar-profile-info">
            <h4>{admin.fullName}</h4>
            <p>{admin.role}</p>
          </div>

          {dropdownOpen && (
            <div className="admin-navbar-dropdown">
              <button onClick={() => navigate("/admin/profile")}>
                <FaUserCircle /> Profile
              </button>

              <button onClick={() => navigate("/admin/settings")}>
                <FaCog /> Settings
              </button>

              <button
                className="admin-navbar-logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
