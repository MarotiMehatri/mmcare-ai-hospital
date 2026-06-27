import React from "react";
import { FaCapsules, FaFileInvoiceDollar } from "react-icons/fa";
import "../../Styles/Patient/MedicineBillTable.css";

function MedicineBillTable({ medicines = [] }) {
  const formatPrice = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const grandTotal = medicines.reduce((sum, item) => {
    const quantity = Number(item.quantity || 0);
    const price = Number(item.price || 0);
    return sum + quantity * price;
  }, 0);

  return (
    <div className="medicine-bill-card">
      <div className="medicine-card-glow"></div>

      <div className="medicine-header">
        <div>
          <span className="medicine-badge">
            <FaCapsules />
            Prescription Items
          </span>

          <h3>Medicine Bill</h3>
          <p>View medicines, quantity, price, and total billing amount.</p>
        </div>

        <div className="medicine-total-box">
          <span>Total</span>
          <strong>{formatPrice(grandTotal)}</strong>
        </div>
      </div>

      <div className="medicine-table-wrap">
        <table className="medicine-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tablet Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length > 0 ? (
              medicines.map((medicine, index) => {
                const quantity = Number(medicine.quantity || 0);
                const price = Number(medicine.price || 0);
                const total = quantity * price;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="medicine-name">
                        <FaCapsules />
                        <span>
                          {medicine.tabletName || medicine.name || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>{quantity}</td>
                    <td>{formatPrice(price)}</td>
                    <td className="medicine-row-total">{formatPrice(total)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="empty-row">
                  No Medicines Available
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4">
                <span className="footer-title">
                  <FaFileInvoiceDollar />
                  Total Medicine Bill
                </span>
              </td>

              <td>
                <strong>{formatPrice(grandTotal)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default MedicineBillTable;
