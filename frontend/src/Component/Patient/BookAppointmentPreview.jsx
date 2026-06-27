import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaArrowRight, FaUserMd } from "react-icons/fa";
import { getRecentDoctors } from "../../services/Patient/doctorAPI";
import "../../Styles/Patient/BookAppointmentPreview.css";

function BookAppointmentPreview() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const doctors = await getRecentDoctors();
        setDoctors(doctors);
      } catch (error) {
        console.error("Failed to load doctors preview:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  return (
    <div className="book-appointment-preview">
      <div className="book-appointment-preview__head">
        <div className="book-appointment-preview__title-wrap">
          <div className="book-appointment-preview__icon">
            <FaCalendarCheck />
          </div>
          <div>
            <h3>Book Appointment</h3>
            <p>Choose from 3 quick doctor options</p>
          </div>
        </div>

        <Link
          to="/patient/book-appointment"
          className="book-appointment-preview__view-btn"
        >
          Open Booking <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="book-appointment-preview__empty">
          Loading doctors...
        </div>
      ) : doctors.length === 0 ? (
        <div className="book-appointment-preview__empty">No doctors found</div>
      ) : (
        <div className="book-appointment-preview__list">
          {doctors.map((doctor) => (
            <Link
              to="/patient/book-appointment"
              className="book-appointment-preview__item"
              key={doctor.id}
            >
              <div className="book-appointment-preview__doctor-icon">
                <FaUserMd />
              </div>

              <div className="book-appointment-preview__info">
                <h4>{doctor.fullName}</h4>
                <p>{doctor.department}</p>
                <small>{doctor.specialization}</small>
              </div>

              <div className="book-appointment-preview__meta">
                <span>₹{doctor.consultationFee}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookAppointmentPreview;
