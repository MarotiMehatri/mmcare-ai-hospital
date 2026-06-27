import React, { useMemo } from "react";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

import "../../../Styles/Patient/PatientSummaryCards.css";

function PatientSummaryCards({ payments = [] }) {
  console.log("PatientSummaryCards payments:", payments);

  const safePayments = Array.isArray(payments) ? payments : [];

  const summary = useMemo(() => {
    const getAmount = (payment) =>
      Number(payment.totalAmount || payment.amount || payment.total || 0);

    const isPaid = (payment) =>
      String(payment.paymentStatus || payment.status || "")
        .toLowerCase()
        .trim() === "paid";

    const totalBills = safePayments.reduce(
      (sum, payment) => sum + getAmount(payment),
      0,
    );

    const paidAmount = safePayments
      .filter(isPaid)
      .reduce((sum, payment) => sum + getAmount(payment), 0);

    const pendingAmount = safePayments
      .filter((payment) => !isPaid(payment))
      .reduce((sum, payment) => sum + getAmount(payment), 0);

    return {
      totalBills,
      paidAmount,
      pendingAmount,
      totalPayments: safePayments.length,
    };
  }, [safePayments]);

  return (
    <div className="patient-summary-cards">
      <div className="summary-card total-card">
        <div className="summary-icon">
          <FaFileInvoiceDollar />
        </div>
        <div className="summary-content">
          <h4>Total Bills</h4>
          <h2>₹{summary.totalBills}</h2>
        </div>
      </div>

      <div className="summary-card paid-card">
        <div className="summary-icon">
          <FaCheckCircle />
        </div>
        <div className="summary-content">
          <h4>Paid Amount</h4>
          <h2>₹{summary.paidAmount}</h2>
        </div>
      </div>

      <div className="summary-card pending-card">
        <div className="summary-icon">
          <FaClock />
        </div>
        <div className="summary-content">
          <h4>Pending Amount</h4>
          <h2>₹{summary.pendingAmount}</h2>
        </div>
      </div>

      <div className="summary-card payment-card">
        <div className="summary-icon">
          <FaMoneyBillWave />
        </div>
        <div className="summary-content">
          <h4>Total Payments</h4>
          <h2>{summary.totalPayments}</h2>
        </div>
      </div>
    </div>
  );
}

export default PatientSummaryCards;
