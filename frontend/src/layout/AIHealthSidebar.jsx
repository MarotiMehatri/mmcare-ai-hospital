import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaRobot,
  FaComments,
  FaStethoscope,
  FaNotesMedical,
  FaCalendarCheck,
  FaPills,
  FaChartLine,
  FaFileMedical,
  FaExclamationTriangle,
  FaLightbulb,
  FaBrain,
  FaMapMarkedAlt,
  FaLink,
  FaBars,
  FaTimes,
  FaHeartbeat,
} from "react-icons/fa";
import "../Styles/AI/AIHealthSidebar.css";

function AIHealthSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Assistant Home",
      path: "/ai-health",
      icon: <FaRobot />,
    },
    {
      name: "AI Chat",
      path: "/ai-health/ai-chat",
      icon: <FaComments />,
    },
    {
      name: "Symptom Checker",
      path: "/ai-health/symptom-checker",
      icon: <FaStethoscope />,
    },
    {
      name: "Diagnosis",
      path: "/ai-health/diagnosis",
      icon: <FaNotesMedical />,
    },
    {
      name: "Appointments",
      path: "/ai-health/appointment",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Medicine Reminder",
      path: "/ai-health/medicine-reminder",
      icon: <FaPills />,
    },
    {
      name: "Health Trends",
      path: "/ai-health/health-trends",
      icon: <FaChartLine />,
    },
    {
      name: "Report Analyzer",
      path: "/ai-health/report-analyzer",
      icon: <FaFileMedical />,
    },
    {
      name: "Triage",
      path: "/ai-health/triage",
      icon: <FaExclamationTriangle />,
    },
    {
      name: "Suggestions",
      path: "/ai-health/suggestions",
      icon: <FaLightbulb />,
    },
    {
      name: "AI Memory",
      path: "/ai-health/memory",
      icon: <FaBrain />,
    },
    {
      name: "Nearby Services",
      path: "/ai-health/nearby-services",
      icon: <FaMapMarkedAlt />,
    },
    {
      name: "HMS Integration",
      path: "/ai-health/integration",
      icon: <FaLink />,
    },
  ];

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="ai-sidebar-mobile-toggle"
        onClick={() => setIsMobileOpen(true)}
      >
        <FaBars />
      </button>

      {/* Mobile OverLay */}
      {isMobileOpen && (
        <div
          className="ai-sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={`ai-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        {/* Top Brand */}
        <div className="ai-sidebar-top">
          <div className="ai-sidebar-brand">
            <div className="ai-sidebar-brand-icon">
              <FaHeartbeat onClick={() => navigate("/patient")} />
            </div>
            <div className="ai-sidebar-brand-text">
              <h2>AI Health</h2>
              <p>Smart Care Panel</p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            className="ai-sidebar-close"
            onClick={() => setIsMobileOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        {/* Welcome Card */}
        <div className="ai-sidebar-welcome-card">
          <div className="ai-sidebar-welcome-icon">
            <FaRobot />
          </div>
          <div>
            <h4>AI Assistant</h4>
            <p>Check symptoms, reports, reminders, and doctor support.</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="ai-sidebar-nav">
          <p className="ai-sidebar-section-title">Main Navigation</p>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/ai-health"}
              className={({ isActive }) =>
                isActive ? "ai-sidebar-link active" : "ai-sidebar-link"
              }
            >
              <span className="ai-sidebar-link-icon">{item.icon}</span>
              <span className="ai-sidebar-link-text">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Info */}
        <div className="ai-sidebar-footer-card">
          <h5>Health Tip</h5>
          <p>
            Stay hydrated, track symptoms early, and follow medicine reminders
            on time.
          </p>
        </div>
      </aside>
    </>
  );
}

export default AIHealthSidebar;
