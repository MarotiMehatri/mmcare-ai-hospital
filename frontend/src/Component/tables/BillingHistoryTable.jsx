import React from "react";

function BillingHistoryTable({ billings, onSelectBill, selectedBill }) {
  if (!billings.length) {
    return <p className="empty-state">No billing records found.</p>;
  }
  return (
    <div className="billing-table-wrapper">
      <table className="billing-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Service</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((bill) => (
            <tr
              key={bill.id}
              onClick={() => onSelectBill(bill)}
              className={selectedBill?.id === bill.id ? "active-row" : ""}
            >
              <td>{bill.billId}</td>
              <td>{bill.service}</td>
              <td>{bill.doctorName}</td>
              <td>{bill.billingDate}</td>
              <td>₹{bill.finalAmount}</td>
              <td>
                {" "}
                <span
                  className={`billing-status ${bill.paymentStatus.toLowerCase()}`}
                >
                  {bill.paymentStatus}
                </span>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillingHistoryTable;
