import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUsers,
  FaPrescriptionBottleAlt,
  FaFileMedical,
  FaClock,
  FaRobot,
  FaVideo,
  FaBell,
  FaUserMd,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../Styles/layout/DoctorSidebar.css";

function DoctorSidebar() {
  const sidebarMenu = [
    { name: "Home", path: "/doctor", icon: <FaTachometerAlt /> },
    { name: "DoctorProfile", path: "/doctor/profile/:id", icon: <FaUserMd /> },
    {
      name: "My Appointments",
      path: "/doctor/appointments",
      icon: <FaCalendarCheck />,
    },
    { name: "Patient List", path: "/doctor/patients", icon: <FaUsers /> },
    {
      name: "Prescriptions",
      path: "/doctor/prescriptions",
      icon: <FaPrescriptionBottleAlt />,
    },
    {
      name: "Medical Reports",
      path: "/doctor/medical-reports",
      icon: <FaFileMedical />,
    },
    { name: "Doctor Schedule", path: "/doctor/schedule", icon: <FaClock /> },
    { name: "AI Assistant", path: "/doctor/ai", icon: <FaRobot /> },
    {
      name: "Telemedicine",
      path: "/doctor/video-consultation",
      icon: <FaVideo />,
    },
    { name: "Notifications", path: "/doctor/notifications", icon: <FaBell /> },
    { name: "Analytics", path: "/doctor/analytics", icon: <FaChartLine /> },
    { name: "Calender", path: "calender", icon: <FaCalendarCheck /> },
    { name: "Settings", path: "/doctor/settings", icon: <FaCog /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ];
  return (
    <div className="doctor-sidebar">
      <div className="sidebar-logo">MMCare-AI</div>
      <div className="sidebar-menu">
        {sidebarMenu.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <span className="sidebar-icon">{menu.icon}</span>
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default DoctorSidebar;
