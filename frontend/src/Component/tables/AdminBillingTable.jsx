import React from "react";
import { FaTrash, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

import "../../Styles/Admin/AdminBillingTables.css";

function AdminBillingTable({ bills, onPaymentStatusChange, onDelete }) {
  return (
    <div className="admin-billing-table-wrapper">
      <table className="admin-billing-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Patient</th>
            <th>Doctor ID</th>
            <th>Department</th>
            <th>Consultation</th>
            <th>Medical Bill</th>
            <th>Total</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bills.length > 0 ? (
            bills.map((item) => (
              <tr key={item.id}>
                <td>
                  <span className="billing-id">{item.id}</span>
                </td>

                <td>{item.patientName || "N/A"}</td>

                <td>{item.doctorId}</td>

                <td>{item.department}</td>

                <td>₹{item.consultationFee || 0}</td>

                <td>₹{item.medicalBill || 0}</td>

                <td className="billing-total">₹{item.totalAmount || 0}</td>

                <td>
                  <span className="billing-method">
                    {item.paymentMethod === "Cash" ? (
                      <FaMoneyBillWave />
                    ) : (
                      <FaCreditCard />
                    )}

                    {item.paymentMethod}
                  </span>
                </td>

                <td>
                  <span
                    className={`admin-billing-status ${item.paymentStatus?.toLowerCase()}`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>

                <td>{item.paymentDate}</td>

                <td>
                  <div className="admin-billing-actions">
                    <select
                      value={item.paymentStatus}
                      onChange={(e) =>
                        onPaymentStatusChange(item.id, e.target.value)
                      }
                    >
                      <option value="Paid">Paid</option>

                      <option value="Pending">Pending</option>

                      <option value="Overdue">Overdue</option>
                    </select>

                    <button
                      className="billing-delete-btn"
                      onClick={() => onDelete(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="admin-no-bills">
                No Billing Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBillingTable;
