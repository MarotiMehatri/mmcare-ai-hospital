import React from "react";
import {
  FaHospitalUser,
  FaChartLine,
  FaUserMd,
  FaCalendarCheck,
} from "react-icons/fa";

import AdminWelcomeBanner from "../../Component/Admin/AdminWelcomeBanner";
import AdminSummaryCards from "../../Component/cards/AdminSummaryCards";
import AdminPatientPage from "./AdminPatientsPage";
import AdminDoctorsPage from "./AdminDoctorsPage";
import AdminRecentAppointments from "../../Component/Admin/AdminRecentAppointments";
import AdminRecentBills from "../../Component/Admin/AdminRecentBills";
import AdminRecentReports from "../../Pages/Admin-Dashboard/AdminReportsPage";
import AdminDepartmentStatistics from "../../Component/Admin/AdminDepartmentStatistics";

import "../../Styles/Admin/AdminHome.css";

function AdminHome() {
  return (
    <div className="admin-home">
      <div className="admin-home-glow admin-home-glow-one"></div>
      <div className="admin-home-glow admin-home-glow-two"></div>

      <section className="admin-hero-section">
        <div>
          <span className="admin-hero-badge">
            <FaHospitalUser />
            Hospital Control Center
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage patients, doctors, appointments, billing, reports and
            department performance from one smart healthcare workspace.
          </p>
        </div>

        <div className="admin-hero-actions">
          <div className="admin-hero-mini-card">
            <FaChartLine />
            <span>Live Overview</span>
          </div>

          <div className="admin-hero-mini-card">
            <FaCalendarCheck />
            <span>Today Activity</span>
          </div>

          <div className="admin-hero-mini-card">
            <FaUserMd />
            <span>Doctor Insights</span>
          </div>
        </div>
      </section>

      <section className="admin-section">
        <AdminWelcomeBanner />
      </section>

      <section className="admin-section">
        <AdminSummaryCards />
      </section>

      <div className="admin-card">
        <AdminPatientPage />
      </div>

      <div className="admin-card">
        <AdminDoctorsPage />
      </div>

      <div className="admin-card">
        <AdminRecentAppointments />
      </div>

      <div className="admin-card">
        <AdminRecentBills />
      </div>

      <div className="admin-card">
        <AdminRecentReports />
      </div>

      <div className="admin-card">
        <AdminDepartmentStatistics />
      </div>
    </div>
  );
}

export default AdminHome;
