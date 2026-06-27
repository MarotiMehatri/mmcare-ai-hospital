import React from "react";
import { FaPrint } from "react-icons/fa";
import "../../../Styles/Patient/InvoiceCard.css";

function InvoiceCard({ payment = null }) {
  if (!payment) return null;

  const medicines = Array.isArray(payment?.medicines) ? payment.medicines : [];

  const consultationFee = Number(payment.consultationFee || 0);
  const medicalBill = Number(payment.medicalBill || 0);
  const totalAmount =
    Number(payment.totalAmount || payment.grandTotal || payment.total || 0) ||
    consultationFee + medicalBill;

  const isPaid = payment.paymentStatus === "Paid";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-card">
      <div className="invoice-bg-shape"></div>

      <div className="invoice-header">
        <div>
          <span className="invoice-label">Official Receipt</span>
          <h2>Hospital Invoice</h2>
          <p>Invoice ID: #{payment.id || "N/A"}</p>
        </div>

        <span
          className={isPaid ? "invoice-status paid" : "invoice-status pending"}
        >
          {payment.paymentStatus || "Pending"}
        </span>
      </div>

      <div className="invoice-grid">
        <div className="invoice-info-box">
          <h4>Patient Details</h4>
          <p>
            <b>Name:</b> {payment.patientName || "N/A"}
          </p>
          <p>
            <b>Patient ID:</b> {payment.patientId || "N/A"}
          </p>
          <p>
            <b>Appointment ID:</b> {payment.appointmentId || "N/A"}
          </p>
        </div>

        <div className="invoice-info-box">
          <h4>Doctor Details</h4>
          <p>
            <b>Doctor ID:</b> {payment.doctorId || "N/A"}
          </p>
          <p>
            <b>Department:</b> {payment.department || "N/A"}
          </p>
          <p>
            <b>Disease:</b> {payment.disease || "N/A"}
          </p>
        </div>

        <div className="invoice-info-box">
          <h4>Payment Details</h4>
          <p>
            <b>Date:</b> {payment.paymentDate || payment.paidDate || "N/A"}
          </p>
          <p>
            <b>Method:</b> {payment.paymentMethod || "N/A"}
          </p>
          <p>
            <b>Status:</b> {payment.paymentStatus || "Pending"}
          </p>
        </div>
      </div>

      <div className="invoice-medicine">
        <div className="invoice-section-title">
          <h4>Medicine Bill</h4>
          <span>{medicines.length} Items</span>
        </div>

        {medicines.length > 0 ? (
          <div className="invoice-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {medicines.map((item, index) => {
                  const quantity = Number(item.quantity || 0);
                  const price = Number(item.price || 0);
                  const total = quantity * price;

                  return (
                    <tr key={index}>
                      <td>{item.tabletName || item.name || "N/A"}</td>
                      <td>{quantity}</td>
                      <td>₹{price}</td>
                      <td className="medicine-total">₹{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="invoice-empty">No medicines added</p>
        )}
      </div>

      <div className="invoice-bill-summary">
        <div>
          <span>Consultation Fee</span>
          <strong>₹{consultationFee}</strong>
        </div>

        <div>
          <span>Medical Bill</span>
          <strong>₹{medicalBill}</strong>
        </div>

        <div className="grand-total">
          <span>Total Amount</span>
          <strong>₹{totalAmount}</strong>
        </div>
      </div>
      <div className="invoice-header-right">
        <span
          className={isPaid ? "invoice-status paid" : "invoice-status pending"}
        >
          {payment.paymentStatus || "Pending"}
        </span>

        <button className="invoice-print-btn" onClick={handlePrint}>
          <FaPrint />
          Print Invoice
        </button>
      </div>
    </div>
  );
}

export default InvoiceCard;
