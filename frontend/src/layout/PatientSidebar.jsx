import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../Styles/Patient/PatientSidebar.css";

import {
  FaCalendarCheck,
  FaNotesMedical,
  FaCalendarPlus,
  FaFileInvoiceDollar,
  FaRobot,
  FaHome,
  FaUserEdit,
  FaUserCircle,
  FaComments,
} from "react-icons/fa";

import { getPatientByUserId } from "../services/Patient/PatientAPI";

function PatientSidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  const menu = [
    { name: "Home", path: "/patient", icon: <FaHome /> },
    { name: "Patient Form", path: "/patient/form", icon: <FaUserEdit /> },
    {
      name: "Patient Chat",
      path: "/patient/chat",
      icon: <FaComments />,
    },
    {
      name: "My Appointment",
      path: "/patient/appointments",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Medical History",
      path: "/patient/medical-history",
      icon: <FaNotesMedical />,
    },
    {
      name: "Book Appointment",
      path: "/patient/book-appointments",
      icon: <FaCalendarPlus />,
    },
    {
      name: "Billing",
      path: "/patient/billing",
      icon: <FaFileInvoiceDollar />,
    },
    { name: "AI Chat", path: "/patient/ai-chat", icon: <FaRobot /> },
  ];

  useEffect(() => {
    const loadPatient = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/login");
        return;
      }

      const res = await getPatientByUserId(user.id);

      if (res.data.length === 0) {
        navigate("/patient/form");
      } else {
        setPatient(res.data[0]);
      }
    };

    loadPatient();
  }, [navigate]);

  return (
    <aside className={`Sidebar-container ${isOpen ? "open" : ""}`}>
      {/* Patient Sidebar Profile */}
      <div className="patient-sidebar-profile">
        {patient ? (
          <Link
            to={`/patient/profile/${patient.id}`}
            className="patient-sidebar-profile__card"
          >
            <div className="patient-sidebar-profile__image-wrap">
              {patient.photo ? (
                <img
                  src={patient.photo}
                  alt={patient.fullName}
                  className="patient-sidebar-profile__image"
                />
              ) : (
                <div className="patient-sidebar-profile__placeholder">
                  <FaUserCircle className="patient-sidebar-profile__placeholder-icon" />
                </div>
              )}
            </div>

            <h4 className="patient-sidebar-profile__name">
              {patient.fullName || "Patient Name"}
            </h4>

            <p className="patient-sidebar-profile__role">Patient</p>
          </Link>
        ) : (
          <div className="patient-sidebar-profile__loading">Loading...</div>
        )}
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 992) closeSidebar();
            }}
            className={({ isActive }) =>
              isActive ? "sidebar-menu-item active-menu" : "sidebar-menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default PatientSidebar;
