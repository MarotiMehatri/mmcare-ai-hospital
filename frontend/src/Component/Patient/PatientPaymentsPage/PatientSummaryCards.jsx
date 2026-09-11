import React, { useMemo } from "react";
import {
  FaFileInvoiceDollar,
  FaRupeeSign,
  FaCheckCircle,
  FaClock,
  FaStethoscope,
  FaCapsules,
  FaReceipt,
  FaChartLine,
} from "react-icons/fa";

import "../../../Styles/Patient/PatientSummaryCards.css";

function PatientSummaryCards({ payments = [] }) {
  const safePayments = Array.isArray(payments)
    ? payments.filter(Boolean)
    : [];

  const summary = useMemo(() => {
    let totalAmount = 0;
    let paidAmount = 0;
    let pendingAmount = 0;
    let consultationAmount = 0;
    let medicalAmount = 0;

    let paidBills = 0;
    let pendingBills = 0;
    let cancelledBills = 0;

    safePayments.forEach((payment) => {
      const total = Number(
        payment?.totalAmount ||
          payment?.grandTotal ||
          payment?.total ||
          0,
      );

      const consultation = Number(payment?.consultationFee || 0);
      const medical = Number(payment?.medicalBill || 0);

      const status = String(
        payment?.paymentStatus || "Pending",
      ).toLowerCase();

      totalAmount += total;
      consultationAmount += consultation;
      medicalAmount += medical;

      if (status === "paid") {
        paidAmount += total;
        paidBills += 1;
      } else if (status === "cancelled" || status === "canceled") {
        cancelledBills += 1;
      } else {
        pendingAmount += total;
        pendingBills += 1;
      }
    });

    return {
      totalBills: safePayments.length,
      totalAmount,
      paidAmount,
      pendingAmount,
      consultationAmount,
      medicalAmount,
      paidBills,
      pendingBills,
      cancelledBills,
    };
  }, [safePayments]);

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      key: "total",
      title: "Total Bills",
      value: summary.totalBills,
      subtitle: `${summary.totalBills === 1 ? "Billing record" : "Billing records"}`,
      icon: <FaFileInvoiceDollar />,
      label: "All records",
    },
    {
      key: "amount",
      title: "Total Amount",
      value: formatMoney(summary.totalAmount),
      subtitle: "Overall billed amount",
      icon: <FaRupeeSign />,
      label: "Billing value",
    },
    {
      key: "paid",
      title: "Paid Amount",
      value: formatMoney(summary.paidAmount),
      subtitle: `${summary.paidBills} paid ${summary.paidBills === 1 ? "bill" : "bills"}`,
      icon: <FaCheckCircle />,
      label: "Completed",
    },
    {
      key: "pending",
      title: "Pending Amount",
      value: formatMoney(summary.pendingAmount),
      subtitle: `${summary.pendingBills} pending ${summary.pendingBills === 1 ? "bill" : "bills"}`,
      icon: <FaClock />,
      label: "Due amount",
    },
    {
      key: "consultation",
      title: "Consultation Fees",
      value: formatMoney(summary.consultationAmount),
      subtitle: "Doctor consultation",
      icon: <FaStethoscope />,
      label: "Consultation",
    },
    {
      key: "medical",
      title: "Medical Bills",
      value: formatMoney(summary.medicalAmount),
      subtitle: "Medicines & medical charges",
      icon: <FaCapsules />,
      label: "Medical",
    },
    {
      key: "paidBills",
      title: "Paid Bills",
      value: summary.paidBills,
      subtitle: "Successfully completed",
      icon: <FaReceipt />,
      label: "Completed",
    },
    {
      key: "activity",
      title: "Payment Activity",
      value:
        summary.totalBills > 0
          ? `${Math.round(
              (summary.paidBills / summary.totalBills) * 100,
            )}%`
          : "0%",
      subtitle: "Bills paid",
      icon: <FaChartLine />,
      label: "Payment progress",
    },
  ];

  return (
    <section className="patient-summary-section">
      <div className="patient-summary-heading">
        <div className="patient-summary-heading-left">
          <span className="patient-summary-eyebrow">
            <FaReceipt />
            Billing Overview
          </span>

          <div>
            <h2>Payment Summary</h2>
            <p>
              A quick overview of your hospital billing and payment
              activity.
            </p>
          </div>
        </div>

        <div className="patient-summary-total">
          <span>Current Billing Value</span>
          <strong>{formatMoney(summary.totalAmount)}</strong>
        </div>
      </div>

      <div className="patient-summary-grid">
        {cards.map((card) => (
          <article
            key={card.key}
            className={`patient-summary-card patient-summary-card--${card.key}`}
          >
            <div className="patient-summary-card-top">
              <div className="patient-summary-icon">
                {card.icon}
              </div>

              <span className="patient-summary-label">
                {card.label}
              </span>
            </div>

            <div className="patient-summary-card-content">
              <span className="patient-summary-title">
                {card.title}
              </span>

              <strong className="patient-summary-value">
                {card.value}
              </strong>

              <span className="patient-summary-subtitle">
                {card.subtitle}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PatientSummaryCards;