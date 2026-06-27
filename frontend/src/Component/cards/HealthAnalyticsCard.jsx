import React, { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaCalendarCheck,
  FaFileMedical,
  FaNotesMedical,
  FaChartLine,
  FaMars,
  FaVenus,
  FaUserAlt,
} from "react-icons/fa";

import {
  getAppointments,
  getPatients,
  getPrescriptions,
  getReports,
} from "../../services/Doctor/analyticsApi";

import "../../Styles/Doctor/HealthAnalyticsCard.css";

function HealthAnalyticsCard() {
  const doctor = JSON.parse(localStorage.getItem("doctor")) || {};
  const doctorId = doctor?.id || doctor?.doctorId || "";

  const [data, setData] = useState({
    patients: [],
    appointments: [],
    prescriptions: [],
    reports: [],
  });

  const [loading, setLoading] = useState(true);

  const getSafeArray = (res, key) => {
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.[key])) return res.data[key];
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);

        const [patientsRes, appointmentsRes, reportsRes, prescriptionsRes] =
          await Promise.all([
            getPatients().catch(() => ({ data: [] })),
            getAppointments().catch(() => ({ data: [] })),
            getReports().catch(() => ({ data: [] })),
            getPrescriptions().catch(() => ({ data: [] })),
          ]);

        setData({
          patients: getSafeArray(patientsRes, "patients"),
          appointments: getSafeArray(appointmentsRes, "appointments"),
          reports: getSafeArray(reportsRes, "medicalReports"),
          prescriptions: getSafeArray(prescriptionsRes, "prescriptions"),
        });
      } catch (error) {
        console.error("Failed to load analytics:", error);
        setData({
          patients: [],
          appointments: [],
          prescriptions: [],
          reports: [],
        });
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const doctorAppointments = useMemo(() => {
    return data.appointments.filter(
      (item) =>
        String(item.doctorId) === String(doctorId) ||
        String(item.doctor_id) === String(doctorId),
    );
  }, [data.appointments, doctorId]);

  const doctorReports = useMemo(() => {
    return data.reports.filter(
      (item) =>
        String(item.doctorId) === String(doctorId) ||
        String(item.doctor_id) === String(doctorId),
    );
  }, [data.reports, doctorId]);

  const doctorPrescriptions = useMemo(() => {
    return data.prescriptions.filter(
      (item) =>
        String(item.doctorId) === String(doctorId) ||
        String(item.doctor_id) === String(doctorId),
    );
  }, [data.prescriptions, doctorId]);

  const totalPatients = useMemo(() => {
    const patientIds = doctorAppointments
      .map((item) => item.patientId)
      .filter(Boolean);
    return new Set(patientIds.map(String)).size;
  }, [doctorAppointments]);

  const todayAppointments = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    return doctorAppointments.filter(
      (item) =>
        item.appointmentDate === today ||
        item.date === today ||
        item.appointment_date === today,
    ).length;
  }, [doctorAppointments]);

  const appointmentStatus = useMemo(() => {
    return doctorAppointments.reduce(
      (acc, item) => {
        const status = String(item.status || "").toLowerCase();

        if (status === "scheduled" || status === "pending") acc.scheduled += 1;
        else if (status === "completed") acc.completed += 1;
        else if (status === "cancelled" || status === "canceled")
          acc.cancelled += 1;

        return acc;
      },
      { scheduled: 0, completed: 0, cancelled: 0 },
    );
  }, [doctorAppointments]);

  const genderStats = useMemo(() => {
    const doctorPatientIds = new Set(
      doctorAppointments.map((item) => String(item.patientId)),
    );

    const doctorPatients = data.patients.filter((patient) =>
      doctorPatientIds.has(String(patient.id)),
    );

    return doctorPatients.reduce(
      (acc, patient) => {
        const gender = String(patient.gender || "").toLowerCase();

        if (gender === "male") acc.male += 1;
        else if (gender === "female") acc.female += 1;
        else acc.other += 1;

        return acc;
      },
      { male: 0, female: 0, other: 0 },
    );
  }, [data.patients, doctorAppointments]);

  const pendingReports = useMemo(() => {
    return doctorReports.filter((item) => {
      const status = String(item.status || "").toLowerCase();
      return status === "pending" || status === "uploaded";
    }).length;
  }, [doctorReports]);

  const totalPrescriptions = doctorPrescriptions.length;

  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = days.map((day) => ({ day, value: 0 }));

    doctorAppointments.forEach((item) => {
      const dateValue = item.appointmentDate || item.date || item.createdAt;
      if (!dateValue) return;

      const date = new Date(dateValue);
      if (!Number.isNaN(date.getTime())) {
        result[date.getDay()].value += 1;
      }
    });

    return result;
  }, [doctorAppointments]);

  const maxBarValue = Math.max(...weeklyData.map((item) => item.value), 1);

  const statsCards = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: <FaUsers />,
      className: "blue",
    },
    {
      title: "Today Appointments",
      value: todayAppointments,
      icon: <FaCalendarCheck />,
      className: "green",
    },
    {
      title: "Pending Reports",
      value: pendingReports,
      icon: <FaFileMedical />,
      className: "red",
    },
    {
      title: "Total Prescriptions",
      value: totalPrescriptions,
      icon: <FaNotesMedical />,
      className: "purple",
    },
  ];

  if (loading) {
    return (
      <div className="doctor-health-analytics-card">
        <div className="analytics-loading">
          <div className="analytics-loader"></div>
          <h3>Loading analytics...</h3>
          <p>Preparing doctor health insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-health-analytics-card">
      <div className="analytics-glow"></div>

      <div className="doctor-health-analytics-header">
        <div>
          <span className="analytics-badge">
            <FaChartLine />
            Live Health Insights
          </span>

          <h3>Health Analytics</h3>
          <p>Doctor-wise patients, appointments, reports, and weekly trends.</p>
        </div>

        <div className="doctor-health-analytics-icon">
          <FaChartLine />
        </div>
      </div>

      <div className="doctor-health-stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="doctor-health-stat-box">
            <div className={`stat-icon ${card.className}`}>{card.icon}</div>
            <div>
              <h4>{card.value}</h4>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="doctor-health-analytics-content">
        <div className="doctor-health-panel">
          <h4>Appointment Status</h4>

          <div className="doctor-health-list">
            <div className="doctor-health-list-row scheduled">
              <span>Scheduled</span>
              <strong>{appointmentStatus.scheduled}</strong>
            </div>

            <div className="doctor-health-list-row completed">
              <span>Completed</span>
              <strong>{appointmentStatus.completed}</strong>
            </div>

            <div className="doctor-health-list-row cancelled">
              <span>Cancelled</span>
              <strong>{appointmentStatus.cancelled}</strong>
            </div>
          </div>
        </div>

        <div className="doctor-health-panel">
          <h4>Patient Gender Stats</h4>

          <div className="doctor-health-list">
            <div className="doctor-health-list-row male">
              <span>
                <FaMars /> Male
              </span>
              <strong>{genderStats.male}</strong>
            </div>

            <div className="doctor-health-list-row female">
              <span>
                <FaVenus /> Female
              </span>
              <strong>{genderStats.female}</strong>
            </div>

            <div className="doctor-health-list-row other">
              <span>
                <FaUserAlt /> Other
              </span>
              <strong>{genderStats.other}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="doctor-health-chart-panel">
        <div className="chart-title-row">
          <div>
            <h4>Weekly Appointments Trend</h4>
            <p>Appointment distribution across the week.</p>
          </div>

          <span>{doctorAppointments.length} Total</span>
        </div>

        <div className="doctor-health-bar-chart">
          {weeklyData.map((item) => (
            <div key={item.day} className="doctor-health-bar-item">
              <span className="doctor-health-bar-value">{item.value}</span>

              <div className="bar-track">
                <div
                  className="doctor-health-bar"
                  style={{
                    height: `${(item.value / maxBarValue) * 120}px`,
                  }}
                ></div>
              </div>

              <p>{item.day}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthAnalyticsCard;
