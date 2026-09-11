import React, { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaUser,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import "../Styles/Admin/AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getAdminData = () => {
    try {
      const admin = JSON.parse(localStorage.getItem("admin"));

      const profile = JSON.parse(
        localStorage.getItem("mmcare_admin_profile")
      );

      return {
        fullName:
          profile?.firstName && profile?.lastName
            ? `${profile.firstName} ${profile.lastName}`
            : admin?.fullName || "Admin User",

        role:
          profile?.role ||
          admin?.role ||
          "Hospital Admin",

        email:
          profile?.email ||
          admin?.email ||
          "",
        
        avatar:
          profile?.avatar ||
          admin?.avatar ||
          "",
      };
    } catch (error) {
      console.error("Failed to read admin data:", error);

      return {
        fullName: "Admin User",
        role: "Hospital Admin",
        email: "",
        avatar: "",
      };
    }
  };

  const [admin, setAdmin] = useState(getAdminData);

  /*
  |--------------------------------------------------------------------------
  | Refresh admin profile whenever location changes
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    setAdmin(getAdminData());
    setDropdownOpen(false);
  }, [location.pathname]);

  /*
  |--------------------------------------------------------------------------
  | Listen for profile updates
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const handleProfileUpdate = () => {
      setAdmin(getAdminData());
    };

    window.addEventListener(
      "mmcare-admin-profile-updated",
      handleProfileUpdate
    );

    window.addEventListener(
      "storage",
      handleProfileUpdate
    );

    return () => {
      window.removeEventListener(
        "mmcare-admin-profile-updated",
        handleProfileUpdate
      );

      window.removeEventListener(
        "storage",
        handleProfileUpdate
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Close dropdown when clicking outside
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Navigation helper
  |--------------------------------------------------------------------------
  */
  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */
  const handleLogout = () => {
    setDropdownOpen(false);

    localStorage.removeItem("admin");

    navigate("/login", {
      replace: true,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Profile initials
  |--------------------------------------------------------------------------
  */
  const getInitials = (name) => {
    if (!name) return "AU";

    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const initials = getInitials(admin.fullName);

  /*
  |--------------------------------------------------------------------------
  | Profile keyboard accessibility
  |--------------------------------------------------------------------------
  */
  const handleProfileKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setDropdownOpen((previous) => !previous);
    }

    if (event.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  return (
    <header className="admin-navbar">

      {/* ================================================================
          LEFT
      ================================================================= */}
      <div className="admin-navbar-left">

        <div
          className="admin-navbar-logo"
          onClick={() => handleNavigation("/admin")}
          role="button"
          tabIndex={0}
          aria-label="Go to admin dashboard"
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              handleNavigation("/admin");
            }
          }}
        >
          <span className="admin-navbar-logo-main">
            MMCare
          </span>

          <span className="admin-navbar-logo-sub">
            -AI
          </span>
        </div>
      </div>

      {/* ================================================================
          CENTER SEARCH
      ================================================================= */}
      <div className="admin-navbar-center">

        <div className="admin-navbar-search">

          <FaSearch className="admin-navbar-search-icon" />

          <input
            type="search"
            placeholder="Search patients, doctors, appointments..."
            className="admin-navbar-search-input"
            aria-label="Search admin dashboard"
          />

          <span className="admin-navbar-search-shortcut">
            Ctrl K
          </span>

        </div>

      </div>

      {/* ================================================================
          RIGHT
      ================================================================= */}
      <div className="admin-navbar-right">

        {/* Messages */}
        <button
          type="button"
          className="admin-navbar-icon-btn"
          onClick={() =>
            handleNavigation("/admin/messages")
          }
          aria-label="Messages"
          title="Messages"
        >
          <FaEnvelope />

          <span className="admin-navbar-badge">
            2
          </span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="admin-navbar-icon-btn"
          onClick={() =>
            handleNavigation("/admin/notifications")
          }
          aria-label="Notifications"
          title="Notifications"
        >
          <FaBell />

          <span className="admin-navbar-badge">
            5
          </span>
        </button>

        {/* Settings */}
        <button
          type="button"
          className="admin-navbar-icon-btn"
          onClick={() =>
            handleNavigation("/admin/settings")
          }
          aria-label="Settings"
          title="Settings"
        >
          <FaCog />
        </button>

        {/* ============================================================
            ADMIN PROFILE
        ============================================================= */}
        <div
          ref={dropdownRef}
          className={`admin-navbar-profile ${
            dropdownOpen ? "is-open" : ""
          }`}
        >

          <button
            type="button"
            className="admin-navbar-profile-trigger"
            onClick={() =>
              setDropdownOpen((previous) => !previous)
            }
            onKeyDown={handleProfileKeyDown}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
          >

            {/* Avatar */}
            <div className="admin-navbar-avatar">

              {admin.avatar ? (
                <img
                  src={admin.avatar}
                  alt={admin.fullName}
                />
              ) : (
                <span>
                  {initials}
                </span>
              )}

            </div>

            {/* Information */}
            <div className="admin-navbar-profile-info">

              <h4>
                {admin.fullName}
              </h4>

              <p>
                {admin.role}
              </p>

            </div>

            {/* Arrow */}
            <FaChevronDown
              className={`admin-navbar-profile-arrow ${
                dropdownOpen ? "rotate" : ""
              }`}
            />

          </button>

          {/* ==========================================================
              DROPDOWN
          =========================================================== */}
          {dropdownOpen && (
            <div
              className="admin-navbar-dropdown"
              role="menu"
            >

              {/* Dropdown Header */}
              <div className="admin-navbar-dropdown-header">

                <div className="admin-navbar-dropdown-avatar">

                  {admin.avatar ? (
                    <img
                      src={admin.avatar}
                      alt={admin.fullName}
                    />
                  ) : (
                    <span>
                      {initials}
                    </span>
                  )}

                </div>

                <div>
                  <strong>
                    {admin.fullName}
                  </strong>

                  <span>
                    {admin.email ||
                      admin.role}
                  </span>
                </div>

              </div>

              <div className="admin-navbar-dropdown-divider" />

              {/* Profile */}
              <button
                type="button"
                role="menuitem"
                onClick={() =>
                  handleNavigation("/admin/profile")
                }
              >
                <span className="admin-navbar-dropdown-icon">
                  <FaUser />
                </span>

                <span>
                  Profile
                </span>
              </button>

              {/* Settings */}
              <button
                type="button"
                role="menuitem"
                onClick={() =>
                  handleNavigation("/admin/settings")
                }
              >
                <span className="admin-navbar-dropdown-icon">
                  <FaCog />
                </span>

                <span>
                  Settings
                </span>
              </button>

              <div className="admin-navbar-dropdown-divider" />

              {/* Logout */}
              <button
                type="button"
                role="menuitem"
                className="admin-navbar-logout-btn"
                onClick={handleLogout}
              >
                <span className="admin-navbar-dropdown-icon">
                  <FaSignOutAlt />
                </span>

                <span>
                  Logout
                </span>
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default AdminNavbar;