import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaArrowRight } from "react-icons/fa";
import { getRecentAppointmentsByDoctorId } from "../../services/Doctor/DoctorAppointmentAPI";

function DoctorAppointmentsPreview({ doctorId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        if (!doctorId) return;
        setLoading(true);
        const res = await getRecentAppointmentsByDoctorId(doctorId);
        setAppointments(res.data || []);
      } catch (error) {
        console.error("Failed to load recent doctor appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [doctorId]);

  return (
    <div className="doctor-appointments-preview">
      <div className="doctor-appointments-preview__head">
        <div className="doctor-appointments-preview__title-wrap">
          <div className="doctor-appointments-preview__icon">
            <FaCalendarCheck />
          </div>
          <div>
            <h3>My Appointments</h3>
            <p>Latest 3 assigned appointments</p>
          </div>
        </div>

        <Link
          to="/doctor/appointments"
          className="doctor-appointments-preview__view-btn"
        >
          Today's Schedule <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="doctor-appointments-preview__empty">
          Loading appointments...
        </div>
      ) : appointments.length === 0 ? (
        <div className="doctor-appointments-preview__empty">
          No appointments found
        </div>
      ) : (
        <div className="doctor-appointments-preview__list">
          {appointments.map((item) => (
            <div className="doctor-appointments-preview__item" key={item.id}>
              <div className="doctor-appointments-preview__left">
                <h4>{item.patientName}</h4>
                <p>{item.disease}</p>
              </div>

              <div className="doctor-appointments-preview__middle">
                <span>{item.appointmentDate}</span>
                <small>{item.appointmentTime}</small>
              </div>

              <div className="doctor-appointments-preview__right">
                <span
                  className={`doctor-appointments-preview__status ${item.status?.toLowerCase()}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorAppointmentsPreview;
