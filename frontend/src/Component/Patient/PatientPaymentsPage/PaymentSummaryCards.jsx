import React from "react";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

import "../../../Styles/Patient/PaymentSummaryCards.css";

function PaymentSummaryCards({ payments = [] }) {
  const formatPrice = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const totalBills = payments.reduce(
    (sum, item) => sum + Number(item.totalAmount || item.total || 0),
    0,
  );

  const paidAmount = payments
    .filter((item) => item.paymentStatus === "Paid")
    .reduce(
      (sum, item) => sum + Number(item.totalAmount || item.total || 0),
      0,
    );

  const pendingAmount = payments
    .filter((item) => item.paymentStatus !== "Paid")
    .reduce(
      (sum, item) => sum + Number(item.totalAmount || item.total || 0),
      0,
    );

  const totalPayments = payments.length;

  const cards = [
    {
      title: "Total Bills",
      value: formatPrice(totalBills),
      subText: "Overall billing amount",
      icon: <FaFileInvoiceDollar />,
      className: "total-card",
    },
    {
      title: "Paid Amount",
      value: formatPrice(paidAmount),
      subText: "Successfully completed",
      icon: <FaCheckCircle />,
      className: "paid-card",
    },
    {
      title: "Pending Amount",
      value: formatPrice(pendingAmount),
      subText: "Waiting for payment",
      icon: <FaClock />,
      className: "pending-card",
    },
    {
      title: "Total Payments",
      value: totalPayments,
      subText: "Total invoice records",
      icon: <FaMoneyBillWave />,
      className: "payment-card",
    },
  ];

  return (
    <div className="payment-summary-cards">
      {cards.map((card, index) => (
        <div key={index} className={`summary-card ${card.className}`}>
          <div className="summary-card-glow"></div>

          <div className="summary-icon">{card.icon}</div>

          <div className="summary-content">
            <p>{card.title}</p>
            <h2>{card.value}</h2>
            <span>{card.subText}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentSummaryCards;
