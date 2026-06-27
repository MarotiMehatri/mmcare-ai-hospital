import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaMoneyBillWave,
  FaUserInjured,
  FaCreditCard,
  FaCalendarAlt,
  FaUserMd,
} from "react-icons/fa";

import { getRecentBills } from "../../services/Admin/AdminBillingApi";

import "../../Styles/Admin/AdminRecentBill.css";

function AdminRecentBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadRecentBills();
  }, []);

  const loadRecentBills = async () => {
    try {
      setLoading(true);

      const res = await getRecentBills();

      setBills(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-recent-bills">
      <div className="admin-recent-bills-header">
        <div>
          <h2>Recent Bills</h2>

          <p>Latest billing transactions</p>
        </div>

        <button
          className="view-all-bills-btn"
          onClick={() => navigate("/admin/billing")}
        >
          View All
          <FaArrowRight />
        </button>
      </div>

      {loading ? (
        <div className="admin-bills-loading">Loading Bills...</div>
      ) : (
        <div className="admin-bills-grid">
          {bills.map((bill) => (
            <div className="admin-bill-card" key={bill.id}>
              <div className="bill-card-top">
                <div className="bill-icon">
                  <FaMoneyBillWave />
                </div>

                <span
                  className={`bill-status ${bill.paymentStatus.toLowerCase()}`}
                >
                  {bill.paymentStatus}
                </span>
              </div>

              <h3>{bill.patientName || "Unknown Patient"}</h3>

              <div className="bill-info">
                <p>
                  <FaUserMd />
                  {bill.doctorId}
                </p>

                <p>
                  <FaUserInjured />
                  {bill.department}
                </p>

                <p>
                  <FaCalendarAlt />
                  {bill.paymentDate}
                </p>

                <p>
                  <FaCreditCard />
                  {bill.paymentMethod}
                </p>
              </div>

              <div className="bill-price">
                ₹{bill.totalAmount?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRecentBills;
