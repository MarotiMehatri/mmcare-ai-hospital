import React, { useEffect, useMemo, useState } from "react";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaBuilding,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import AdminStatCard from "./AdminStatCard";

import {
  getPatients,
  getDoctors,
  getAppointments,
  getBills,
} from "../../services/Admin/adminApi";

import "../../Styles/Admin/AdminSummaryCards.css";

function AdminSummaryCards() {
  const [dashboardData, setDashboardData] = useState({
    patients: [],
    doctors: [],
    appointments: [],
    bills: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummaryData();
  }, []);

  const getArray = (res, key) => {
    if (Array.isArray(res?.data)) return res.data;

    return res?.data?.[key] || res?.data?.data || [];
  };

  const loadSummaryData = async () => {
    try {
      setLoading(true);

      const [patientsRes, doctorsRes, appointmentsRes, billsRes] =
        await Promise.all([
          getPatients(),
          getDoctors(),
          getAppointments(),
          getBills(),
        ]);

      setDashboardData({
        patients: getArray(patientsRes, "Patients"),
        doctors: getArray(doctorsRes, "doctors"),
        appointments: getArray(appointmentsRes, "appointments"),
        bills: getArray(billsRes, "doctorPayments"),
      });
    } catch (error) {
      console.error("Failed to load dashboard summary data:", error);

      setDashboardData({
        patients: [],
        doctors: [],
        appointments: [],
        bills: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const patients = Array.isArray(dashboardData.patients)
      ? dashboardData.patients
      : [];

    const doctors = Array.isArray(dashboardData.doctors)
      ? dashboardData.doctors
      : [];

    const appointments = Array.isArray(dashboardData.appointments)
      ? dashboardData.appointments
      : [];

    const bills = Array.isArray(dashboardData.bills) ? dashboardData.bills : [];

    const totalPatients = patients.length;

    const totalDoctors = doctors.length;

    const totalAppointments = appointments.length;

    const pendingAppointments = appointments.filter((item) => {
      const status = String(
        item.status || item.appointmentStatus || "",
      ).toLowerCase();

      return status === "pending" || status === "booked";
    }).length;

    const completedAppointments = appointments.filter((item) => {
      const status = String(
        item.status || item.appointmentStatus || "",
      ).toLowerCase();

      return status === "completed";
    }).length;

    const totalRevenue = bills.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0,
    );

    return {
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
      completedAppointments,
      totalRevenue,
    };
  }, [dashboardData]);

  const cards = [
    {
      id: 1,
      title: "Total Patients",
      value: stats.totalPatients,
      subtitle: "Registered patients",
      icon: <FaUserInjured />,
      trend: "+12%",
      progress: 82,
      variant: "blue",
    },

    {
      id: 2,
      title: "Total Doctors",
      value: stats.totalDoctors,
      subtitle: "Available doctors",
      icon: <FaUserMd />,
      trend: "+8%",
      progress: 75,
      variant: "purple",
    },

    {
      id: 3,
      title: "Total Appointments",
      value: stats.totalAppointments,
      subtitle: "Hospital appointments",
      icon: <FaCalendarCheck />,
      trend: "+15%",
      progress: 85,
      variant: "green",
    },

    {
      id: 4,
      title: "Pending Appointments",
      value: stats.pendingAppointments,
      subtitle: "Pending or booked",
      icon: <FaClock />,
      trend: "+5%",
      progress: 60,
      variant: "orange",
    },

    {
      id: 5,
      title: "Completed Appointments",
      value: stats.completedAppointments,
      subtitle: "Successfully completed",
      icon: <FaCheckCircle />,
      trend: "+18%",
      progress: 80,
      variant: "green",
    },

    {
      id: 6,
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
      subtitle: "Billing collection",
      icon: <FaMoneyBillWave />,
      trend: "+21%",
      progress: 88,
      variant: "pink",
    },
  ];

  return (
    <section className="admin-summary-cards-section">
      <div className="admin-summary-header">
        <div className="admin-summary-header-left">
          <h3>
            Dashboard <span>Overview</span>
          </h3>

          <p>
            Monitor hospital patients, doctors, appointments, revenue and
            department performance.
          </p>
        </div>

        <div className="admin-summary-header-right">
          <div className="header-badge">📊 Live Data</div>

          <div className="header-date">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="admin-summary-cards-grid">
        {cards.map((card) => (
          <AdminStatCard
            key={card.id}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
            trend={card.trend}
            progress={card.progress}
            variant={card.variant}
            loading={loading}
          />
        ))}
      </div>
    </section>
  );
}

export default AdminSummaryCards;
