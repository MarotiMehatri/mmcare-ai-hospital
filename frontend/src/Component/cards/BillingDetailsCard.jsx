import React from "react";

function BillingDetailsCard({ bill }) {
  if (!bill) {
    return (
      <div className="billing-card">
        <h2 className="billing-card-title">Bill Details</h2>
        <p>Select a bill to view details.</p>
      </div>
    );
  }

  return (
    <div className="billing-card billing-details-card">
      <h2 className="billing-card-title">Bill Details</h2>

      <div className="billing-detail-item">
        <span>Bill ID</span>
        <strong>{bill.billId}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Patient Name</span>
        <strong>{bill.patientName}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Doctor</span>
        <strong>{bill.doctorName}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Department</span>
        <strong>{bill.department}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Service</span>
        <strong>{bill.service}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Appointment Date</span>
        <strong>{bill.appointmentDate}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Billing Date</span>
        <strong>{bill.billingDate}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Amount</span>
        <strong>₹{bill.amount}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Discount</span>
        <strong>₹{bill.discount}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Tax</span>
        <strong>₹{bill.tax}</strong>
      </div>

      <div className="billing-detail-item total">
        <span>Final Amount</span>
        <strong>₹{bill.finalAmount}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Payment Method</span>
        <strong>{bill.paymentMethod || "Not available"}</strong>
      </div>

      <div className="billing-detail-item">
        <span>Status</span>
        <strong className={bill.paymentStatus.toLowerCase()}>
          {bill.paymentStatus}
        </strong>
      </div>

      <div className="billing-detail-item">
        <span>Transaction ID</span>
        <strong>{bill.transactionId || "Pending"}</strong>
      </div>

      <div className="billing-detail-notes">
        <span>Notes</span>
        <p>{bill.notes || "No notes available."}</p>
      </div>
    </div>
  );
}

export default BillingDetailsCard;
