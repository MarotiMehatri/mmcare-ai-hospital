import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRecentAppointments } from "../../services/Admin/adminAppointmentApi";
import { getAllDoctors } from "../../services/Admin/adminDoctorApi";

import "../../Styles/Admin/AdminRecentAppointments.css";

function AdminRecentAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getArray = (res, key) => {
    if (Array.isArray(res?.data)) return res.data;

    return res?.data?.[key] || res?.data?.data || [];
  };

  useEffect(() => {
    loadRecentAppointments();
  }, []);

  const loadRecentAppointments = async () => {
    try {
      setLoading(true);

      const [appointmentsRes, doctorsRes] = await Promise.all([
        getRecentAppointments(),
        getAllDoctors(),
      ]);

      const appointmentsData = getArray(appointmentsRes, "appointments");
      const doctorsData = getArray(doctorsRes, "doctors");

      const mergedAppointments = appointmentsData.map((appointment) => {
        const doctor = doctorsData.find(
          (doc) =>
            String(doc.id) === String(appointment.doctorId) ||
            String(doc.doctorId) === String(appointment.doctorId),
        );

        return {
          ...appointment,
          doctorName:
            appointment.doctorName ||
            doctor?.FullName ||
            doctor?.fullName ||
            doctor?.name ||
            "Unknown Doctor",
        };
      });

      setAppointments(mergedAppointments);
    } catch (error) {
      console.error("Failed to load recent appointments:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-recent-appointments">
      <div className="admin-recent-appointments-top">
        <div>
          <h3>Recent Appointments</h3>
          <p>Latest 3 appointments from hospital booking system</p>
        </div>

        <button
          className="admin-view-all-appointments-btn"
          onClick={() => navigate("/admin/appointments")}
        >
          View All
        </button>
      </div>

      {loading ? (
        <div className="admin-recent-appointments-message">
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <div className="admin-recent-appointments-message">
          No appointments found
        </div>
      ) : (
        <div className="admin-recent-appointments-list">
          {appointments.map((appointment) => (
            <div className="admin-recent-appointment-card" key={appointment.id}>
              <div className="admin-recent-appointment-left">
                <h4>{appointment.patientName || "Unknown Patient"}</h4>
                <p>{appointment.doctorName || "Unknown Doctor"}</p>
                <span>{appointment.department || "No Department"}</span>
              </div>

              <div className="admin-recent-appointment-middle">
                <p>{appointment.appointmentDate || "No Date"}</p>
                <span>{appointment.appointmentTime || "No Time"}</span>
              </div>

              <div className="admin-recent-appointment-right">
                <span
                  className={`admin-appointment-badge ${appointment.status?.toLowerCase() || "booked"}`}
                >
                  {appointment.status || "Booked"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRecentAppointments;
