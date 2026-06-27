import React from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFileMedical,
  FaHospital,
  FaMoneyBillWave,
  FaSpinner,
  FaUser,
  FaUserMd,
} from "react-icons/fa";
import "../../Styles/AI/BookingSummary.css";

function BookingSummary({
  selectedDoctor,
  selectedSlot,
  recommendation,
  formData,
  onConfirmBooking,
  bookingLoading,
  bookingResult,
}) {
  if (!selectedDoctor || !selectedSlot || !recommendation) return null;

  const appointmentDate =
    formData?.preferredDate || new Date().toISOString().split("T")[0];

  const summaryItems = [
    {
      label: "Patient ID",
      value: formData?.patientId || "N/A",
      icon: <FaUser />,
    },
    {
      label: "Doctor",
      value: selectedDoctor?.fullName || "N/A",
      icon: <FaUserMd />,
    },
    {
      label: "Department",
      value: recommendation?.department || "N/A",
      icon: <FaHospital />,
    },
    {
      label: "Date",
      value: appointmentDate,
      icon: <FaCalendarAlt />,
    },
    {
      label: "Time",
      value: selectedSlot || "N/A",
      icon: <FaClock />,
    },
    {
      label: "Visit Type",
      value: recommendation?.visitType || "N/A",
      icon: <FaFileMedical />,
    },
    {
      label: "Consultation Fee",
      value: `₹${selectedDoctor?.consultationFee || 0}`,
      icon: <FaMoneyBillWave />,
    },
    {
      label: "Urgency",
      value: recommendation?.urgency || "N/A",
      icon: <FaFileMedical />,
    },
  ];

  return (
    <div className="booking-summary-card">
      <div className="booking-summary-header">
        <div className="booking-summary-icon">
          <FaFileMedical />
        </div>

        <div>
          <span>Final Step</span>
          <h3>Booking Summary</h3>
          <p>Review details before confirming your appointment.</p>
        </div>
      </div>

      <div className="booking-summary-grid">
        {summaryItems.map((item) => (
          <div className="booking-summary-item" key={item.label}>
            <div className="booking-item-icon">{item.icon}</div>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="booking-confirm-btn"
        onClick={onConfirmBooking}
        disabled={bookingLoading}
      >
        {bookingLoading ? (
          <>
            <FaSpinner className="booking-spin" /> Booking Appointment...
          </>
        ) : (
          <>
            <FaCheckCircle /> Confirm Appointment
          </>
        )}
      </button>

      {bookingResult?.success && (
        <div className="booking-success-box">
          <div className="booking-success-icon">
            <FaCheckCircle />
          </div>

          <div>
            <h4>Appointment Booked Successfully</h4>
            <p>
              <strong>Appointment ID:</strong>{" "}
              {bookingResult?.appointment?.appointmentId || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {bookingResult?.appointment?.status || "Confirmed"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingSummary;
