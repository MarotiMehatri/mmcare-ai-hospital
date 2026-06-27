import React, { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaHospital,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";
import "../../Styles/Admin/AdminWelcomeBanner.css";
import {
  getAppointments,
  getPatients,
  getDoctors,
} from "../../services/Admin/adminApi";
function AdminWelcomeBanner() {
  const admin = JSON.parse(localStorage.getItem("admin")) || {
    fullName: "Admin User",
  };
  const [stats, setStats] = useState({
    patientsCount: 0,
    doctorsCount: 0,
    appointmentsCount: 0,
    departmentsCount: 0,
  });

  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const getArray = (res, key) => {
      if (Array.isArray(res?.data)) return res.data;

      return res?.data?.[key] || res?.data?.data || [];
    };

    const loadBannerStats = async () => {
      try {
        setLoading(true);

        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          getPatients(),
          getDoctors(),
          getAppointments(),
        ]);

        const patientsData = getArray(patientsRes, "patients");
        const doctorsData = getArray(doctorsRes, "doctors");
        const appointmentsData = getArray(appointmentsRes, "appointments");

        const uniqueDepartments = [
          ...new Set(
            doctorsData.map((doctor) => doctor.department).filter(Boolean),
          ),
        ];

        setStats({
          patientsCount: patientsData.length,
          doctorsCount: doctorsData.length,
          appointmentsCount: appointmentsData.length,
          departmentsCount: uniqueDepartments.length,
        });
      } catch (error) {
        console.error("Failed to load admin banner stats:", error);

        setStats({
          patientsCount: 0,
          doctorsCount: 0,
          appointmentsCount: 0,
          departmentsCount: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    loadBannerStats();
  }, []);
  return (
    <div className="admin-welcome-banner">
      {/* Left content */}
      <div className="admin-banner-left">
        <div className="admin-banner-text">
          <h3>
            MMCare-AI <span>{admin.fullName || "Admin"}</span>
          </h3>

          <p>
            Manage your hospital operations, monitor performance, and ensure
            smooth patient care from your dashboard.
          </p>

          <div className="admin-banner-date">{today}</div>
        </div>
      </div>

      {/* Right Cards */}
      <div className="admin-banner-right">
        <div className="banner-mini-card">
          <FaUserInjured />
          <div>
            <h4>Patients</h4>
            <p>{loading ? "..." : stats.patientsCount}</p>
          </div>
        </div>
        <div className="banner-mini-card">
          <FaUserMd />
          <div>
            <h4>Doctor</h4>
            <p>{loading ? "..." : stats.doctorsCount}</p>
          </div>
        </div>

        <div className="banner-mini-card">
          <FaCalendarCheck />
          <div>
            <h4>Appointments</h4>
            <p>{loading ? "..." : stats.appointmentsCount}</p>
          </div>
        </div>

        <div className="banner-mini-card">
          <FaHospital />
          <h4>Departments</h4>
          <p>{loading ? "..." : stats.departmentsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminWelcomeBanner;
