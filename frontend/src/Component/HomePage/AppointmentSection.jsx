import React, { useState } from "react";
import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaUser,
  FaHospital,
  FaCheckCircle,
} from "react-icons/fa";
import "../../Styles/Hospital Home/Appointment.css";
import { bookAppointment } from "../../services/appointmentService";

const AppointmentSection = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    department: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "General Medicine",
    "AI Health Assistant",
  ];

  const handleChange = (e) => {
    setMessage("");
    setMessageType("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!/^[0-9]{10}$/.test(form.phone)) {
      setMessage("Phone number must be exactly 10 digits.");
      setMessageType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await bookAppointment(form);

      setMessage("Appointment booked successfully!");
      setMessageType("success");
      setForm({ name: "", phone: "", department: "", date: "" });
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="appointment-section">
      <div className="appointment-section__content">
        <div className="appointment-section__left">
          <span className="appointment-section__badge">
            <FaCalendarCheck />
            Quick Appointment
          </span>

          <h2>Book Your Appointment Online</h2>

          <p>
            Schedule your visit with our expert doctors. Choose your department,
            preferred date and our team will contact you shortly.
          </p>

          <div className="appointment-section__info">
            <div>
              <FaCheckCircle />
              <span>Easy online booking</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Expert specialists</span>
            </div>

            <div>
              <FaPhoneAlt />
              <span>Emergency: +91 9307249853</span>
            </div>
          </div>
        </div>

        <div className="appointment-section__right">
          <form className="appointment-form" onSubmit={handleSubmit}>
            <h3>Appointment Form</h3>

            {message && (
              <p className={`appointment-message ${messageType}`}>{message}</p>
            )}

            <div className="appointment-form__group">
              <FaUser />
              <input
                name="name"
                value={form.name}
                placeholder="Your Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="appointment-form__group">
              <FaPhoneAlt />
              <input
                name="phone"
                value={form.phone}
                placeholder="Phone Number"
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

            <div className="appointment-form__group">
              <FaHospital />
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <div className="appointment-form__group">
              <FaCalendarCheck />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
