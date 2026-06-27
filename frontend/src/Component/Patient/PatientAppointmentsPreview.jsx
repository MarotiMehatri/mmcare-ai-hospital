import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaArrowRight, FaCalendarTimes } from "react-icons/fa";
import { getRecentAppointmentsByPatientId } from "../../services/Patient/AppointmentAPI";
import EmptyState from "../common/EmptyState";

function PatientAppointmentsPreview({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        if (!patientId) {
          setAppointments([]);
          return;
        }

        setLoading(true);

        const data = await getRecentAppointmentsByPatientId(patientId);

        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load recent appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [patientId]);

  const getDoctorName = (item) => {
    return (
      item.doctorName || item.fullName || item.FullName || item.name || "Doctor"
    );
  };

  const getStatusClass = (status) => {
    return String(status || "scheduled")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <div className="patient-appointments-preview">
      <div className="patient-appointments-preview__head">
        <div className="patient-appointments-preview__title-wrap">
          <div className="patient-appointments-preview__icon">
            <FaCalendarCheck />
          </div>

          <div>
            <h3>My Appointments</h3>
            <p>Latest 3 appointment records</p>
          </div>
        </div>

        <Link
          to="/patient/appointments"
          className="patient-appointments-preview__view-btn"
        >
          Open Appointments <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="patient-appointments-preview__empty">
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <EmptyState
          icon={<FaCalendarTimes />}
          title="No Appointments Found"
          message="You have not booked any appointments yet."
          buttonText="Book Appointment"
          onClick={() => navigate("/patient/book-appointment")}
        />
      ) : (
        <div className="patient-appointments-preview__list">
          {appointments.map((item) => (
            <div
              className="patient-appointments-preview__item"
              key={item.id || item.appointmentId}
            >
              <div className="patient-appointments-preview__left">
                <h4>{getDoctorName(item)}</h4>
                <p>{item.department || "Department"}</p>
              </div>

              <div className="patient-appointments-preview__middle">
                <span>{item.appointmentDate || item.date || "-"}</span>
                <small>{item.appointmentTime || item.time || "-"}</small>
              </div>

              <div className="patient-appointments-preview__right">
                <span
                  className={`patient-appointments-preview__status ${getStatusClass(
                    item.status,
                  )}`}
                >
                  {item.status || "Scheduled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientAppointmentsPreview;
