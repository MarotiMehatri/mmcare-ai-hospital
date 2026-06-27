import React from "react";
import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaUserInjured,
} from "react-icons/fa";

import "../../Styles/Doctor/DoctorPaymentsTable.css";

function DoctorPaymentsTable({ payments = [] }) {
  const formatMoney = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const totalAmount = payments.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0,
  );

  const paidAmount = payments
    .filter((item) => item.paymentStatus === "Paid")
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  const pendingAmount = payments
    .filter((item) => item.paymentStatus !== "Paid")
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  const cards = [
    {
      title: "Total Amount",
      value: formatMoney(totalAmount),
      icon: <FaMoneyBillWave />,
      className: "total",
    },
    {
      title: "Paid Amount",
      value: formatMoney(paidAmount),
      icon: <FaCheckCircle />,
      className: "paid",
    },
    {
      title: "Pending Amount",
      value: formatMoney(pendingAmount),
      icon: <FaClock />,
      className: "pending",
    },
  ];

  return (
    <div className="doctor-payments-box">
      <div className="doctor-payment-summary">
        {cards.map((card, index) => (
          <div key={index} className={`doctor-payment-card ${card.className}`}>
            <div className="doctor-payment-icon">{card.icon}</div>

            <div>
              <span>{card.title}</span>
              <strong>{card.value}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="doctor-payments-table-wrapper">
        <div className="doctor-table-header">
          <div>
            <h2>Payment Records</h2>
            <p>Track patient billing, doctor share, and payment status.</p>
          </div>

          <div className="doctor-record-count">
            <FaUserInjured />
            <span>{payments.length} Records</span>
          </div>
        </div>

        <div className="doctor-table-scroll">
          <table className="doctor-payments-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Patient</th>
                <th>Appointment</th>
                <th>Disease</th>
                <th>Department</th>
                <th>Consultation</th>
                <th>Medical Bill</th>
                <th>Total Amount</th>
                <th>Doctor Share</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Payment Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => {
                  const status = payment.paymentStatus || "Pending";

                  return (
                    <tr key={payment.paymentId || payment.id}>
                      <td>
                        <span className="payment-id">
                          {payment.paymentId || payment.id || "-"}
                        </span>
                      </td>

                      <td>{payment.patientName || "-"}</td>
                      <td>{payment.appointmentId || "-"}</td>
                      <td>{payment.disease || "-"}</td>
                      <td>{payment.department || "-"}</td>
                      <td>{formatMoney(payment.consultationFee)}</td>
                      <td>{formatMoney(payment.medicalBill)}</td>
                      <td className="total-amount">
                        {formatMoney(payment.totalAmount)}
                      </td>

                      <td className="doctor-share">
                        {formatMoney(payment.doctorShare)}
                      </td>

                      <td>{payment.paymentMethod || "-"}</td>

                      <td>
                        <span
                          className={`payment-status ${status.toLowerCase()}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td>{payment.paidDate || payment.paymentDate || "-"}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12" className="no-payments">
                    No payment records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DoctorPaymentsTable;
