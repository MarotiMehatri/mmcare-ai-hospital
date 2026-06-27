import React from "react";
import "../../Styles/Patient/PatientHistoryTable.css";

function PatientHistoryTable({
  payments = [],
  onSelectPayment = () => {},
  prescription = null,
}) {
  const safePayments = payments.filter(Boolean);

  return (
    <div className="history-table-card">
      <div className="history-header">
        <h2>Payment History</h2>
        <p>Previous Billing & Payment Records</p>
      </div>

      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Disease</th>
              <th>Method</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {safePayments.length > 0 ? (
              safePayments.map((payment) => {
                const isPaid = payment.paymentStatus === "Paid";

                return (
                  <tr key={payment.id}>
                    <td>{payment.id || "N/A"}</td>

                    <td>{payment.paymentDate || payment.visitDate || "N/A"}</td>

                    <td>
                      {payment.doctorName ||
                        prescription?.doctorName ||
                        payment.FullName ||
                        payment.fullName ||
                        "N/A"}
                    </td>

                    <td>
                      {payment.department || prescription?.department || "N/A"}
                    </td>

                    <td>
                      {payment.disease ||
                        payment.diagnosis ||
                        prescription?.disease ||
                        prescription?.diagnosis ||
                        "N/A"}
                    </td>

                    <td>
                      <span className="method-badge">
                        {payment.paymentMethod || "Not Paid"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={isPaid ? "status-paid" : "status-pending"}
                      >
                        {payment.paymentStatus || "Pending"}
                      </span>
                    </td>

                    <td className="amount">
                      ₹{Number(payment.totalAmount || 0).toLocaleString()}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="view-btn"
                        onClick={() => onSelectPayment(payment)}
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="no-record">
                  No Payment History Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientHistoryTable;
