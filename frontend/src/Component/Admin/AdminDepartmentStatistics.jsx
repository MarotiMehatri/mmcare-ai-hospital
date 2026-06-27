import React, { useEffect, useState } from "react";

import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaEye,
  FaStethoscope,
} from "react-icons/fa";

import { getAppointments, getDoctors } from "../../services/Admin/adminApi";

import "../../Styles/Admin/AdminDepartmentStatistics.css";

function AdminDepartmentStatistics() {
  const [departments, setDepartments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadDepartmentStats();
  }, []);

  const getDepartmentIcon = (department) => {
    switch (department?.toLowerCase()) {
      case "cardiology":
        return <FaHeartbeat />;

      case "neurology":
        return <FaBrain />;

      case "orthopedics":
        return <FaBone />;

      case "pediatrics":
        return <FaBaby />;

      case "ophthalmology":
        return <FaEye />;

      default:
        return <FaStethoscope />;
    }
  };

  const getArray = (res, key) => {
    if (Array.isArray(res?.data)) return res.data;

    return res?.data?.[key] || res?.data?.data || [];
  };

  const loadDepartmentStats = async () => {
    try {
      const [doctorsRes, appointmentsRes] = await Promise.all([
        getDoctors(),
        getAppointments(),
      ]);

      const doctors = getArray(doctorsRes, "doctors");
      const appointments = getArray(appointmentsRes, "appointments");

      // Get unique department names
      const uniqueDepartments = [
        ...new Set(doctors.map((doctor) => doctor.department).filter(Boolean)),
      ];

      const departmentStats = uniqueDepartments.map((department) => {
        // Appointments belonging to this department
        const departmentAppointments = appointments.filter(
          (appointment) => appointment.department === department,
        );

        // Unique patients in this department
        const uniquePatients = [
          ...new Set(
            departmentAppointments
              .map((appointment) => appointment.patientId)
              .filter(Boolean),
          ),
        ];

        return {
          department,

          doctorCount: doctors.filter(
            (doctor) => doctor.department === department,
          ).length,

          patientCount: uniquePatients.length,

          appointmentCount: departmentAppointments.length,
        };
      });

      setDepartments(departmentStats);
    } catch (error) {
      console.error("Failed to load department stats:", error);
      setDepartments([]);
    }
  };

  // Show oly first 3 cards initially

  const visibleDepartments = showAll ? departments : departments.slice(0, 3);

  return (
    <div className="admin-department-statistics">
      <div className="department-header">
        <h2>Department Statistics</h2>

        <p>Performance overview of hospital departments</p>
      </div>

      <div className="department-grid">
        {visibleDepartments.map((item) => (
          <div className="department-card" key={item.department}>
            <div className="department-icon">
              {getDepartmentIcon(item.department)}
            </div>

            <h3>{item.department}</h3>

            <div className="department-info">
              <div>
                <span>Doctors</span>
                <strong>{item.doctorCount}</strong>
              </div>

              <div>
                <span>Patients</span>
                <strong>{item.patientCount}</strong>
              </div>

              <div>
                <span>Appointments</span>
                <strong>{item.appointmentCount}</strong>
              </div>
            </div>

            <div className="department-progress">
              <div
                className="department-progress-fill"
                style={{
                  width: `${Math.min(item.appointmentCount * 3, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {departments.length > 3 && (
        <div className="department-button-container">
          <button
            className="department-view-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All Departments"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDepartmentStatistics;
