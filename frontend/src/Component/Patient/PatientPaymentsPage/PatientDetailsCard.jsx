import React from "react";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaBirthdayCake,
  FaTint,
  FaVenusMars,
  FaUserMd,
  FaHospital,
  FaHeartbeat,
  FaCalendarCheck,
  FaMoneyCheckAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import "../../../Styles/Patient/PatientDetailsCard.css";

function PatientDetailsCard({ patient = {}, payment = {}, prescription = {} }) {
  const isPaid = payment?.paymentStatus === "Paid";

  const patientName =
    patient?.fullName ||
    patient?.FullName ||
    patient?.name ||
    payment?.patientName ||
    "N/A";

  const details = [
    {
      label: "Patient ID",
      value:
        patient?.patientID || patient?.patientId || payment?.patientId || "N/A",
      icon: <FaIdCard />,
    },
    {
      label: "Patient Name",
      value: patientName,
      icon: <FaUser />,
    },
    {
      label: "Age",
      value: patient?.age ? `${patient.age} Years` : "N/A",
      icon: <FaBirthdayCake />,
    },
    {
      label: "Gender",
      value: patient?.gender || "N/A",
      icon: <FaVenusMars />,
    },
    {
      label: "Blood Group",
      value: patient?.bloodGroup || "N/A",
      icon: <FaTint />,
    },
    {
      label: "Phone Number",
      value: patient?.mobile || patient?.phone || "N/A",
      icon: <FaPhone />,
    },
    {
      label: "Email Address",
      value: patient?.email || "N/A",
      icon: <FaEnvelope />,
    },
    {
      label: "Appointment ID",
      value: payment?.appointmentId || "N/A",
      icon: <FaCalendarCheck />,
    },
    {
      label: "Doctor ID",
      value: prescription?.doctorId || payment?.doctorId || "N/A",
      icon: <FaUserMd />,
    },
    {
      label: "Department",
      value: payment?.department || prescription?.department || "N/A",
      icon: <FaHospital />,
    },
    {
      label: "Disease",
      value: prescription?.disease || payment?.disease || "N/A",
      icon: <FaHeartbeat />,
    },
    {
      label: "Payment Status",
      value: payment?.paymentStatus || "Pending",
      icon: <FaMoneyCheckAlt />,
      status: true,
    },
  ];

  return (
    <div className="patient-details-card">
      <div className="patient-details-glow"></div>

      <div className="details-header">
        <div>
          <span className="details-badge">
            <FaClipboardCheck />
            Billing Profile
          </span>

          <h2>Patient Information</h2>
          <p>Complete patient, appointment, doctor, and payment details.</p>
        </div>

        <div
          className={isPaid ? "details-status paid" : "details-status pending"}
        >
          {payment?.paymentStatus || "Pending"}
        </div>
      </div>

      <div className="patient-mini-profile">
        <div className="patient-avatar">
          {patientName !== "N/A" ? patientName.charAt(0).toUpperCase() : "P"}
        </div>

        <div>
          <h3>{patientName}</h3>
          <p>
            {patient?.email ||
              patient?.mobile ||
              patient?.phone ||
              "Patient Record"}
          </p>
        </div>
      </div>

      <div className="details-grid">
        {details.map((item, index) => (
          <div key={index} className="detail-item">
            <div className="detail-icon">{item.icon}</div>

            <div>
              <span>{item.label}</span>

              <h4
                className={
                  item.status ? (isPaid ? "status-paid" : "status-pending") : ""
                }
              >
                {item.value}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientDetailsCard;
