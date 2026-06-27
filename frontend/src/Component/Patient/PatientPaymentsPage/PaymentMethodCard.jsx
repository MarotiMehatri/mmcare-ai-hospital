import React from "react";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaUniversity,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";

import "../../../Styles/Patient/PaymentMethodCard.css";

function PaymentMethodCard({
  payment,
  paymentMethod,
  setPaymentMethod,
  handlePayBill,
  paying = false,
}) {
  const amount = Number(
    payment?.totalAmount || payment?.grandTotal || payment?.total || 0,
  );

  const methods = [
    {
      name: "Cash",
      title: "Cash",
      desc: "Pay directly at hospital counter",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Card",
      title: "Credit / Debit Card",
      desc: "Visa, MasterCard, RuPay",
      icon: <FaCreditCard />,
    },
    {
      name: "UPI",
      title: "UPI Payment",
      desc: "Google Pay, PhonePe, Paytm",
      icon: <SiGooglepay />,
    },
    {
      name: "Net Banking",
      title: "Net Banking",
      desc: "Secure online transfer",
      icon: <FaUniversity />,
    },
  ];

  const isPaid = payment?.paymentStatus === "Paid";

  return (
    <div className="payment-method-card">
      <div className="payment-method-glow"></div>

      <div className="payment-header">
        <div>
          <span className="payment-method-badge">
            <FaLock />
            Secure Checkout
          </span>

          <h2>Select Payment Method</h2>
          <p>Choose your preferred payment option to complete your bill.</p>
        </div>

        <div className="payment-amount-box">
          <span>Amount to Pay</span>
          <strong>₹{amount.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {isPaid ? (
        <div className="already-paid-box">
          <FaCheckCircle />
          <div>
            <h3>Payment Already Completed</h3>
            <p>This invoice has been successfully paid.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="payment-method-grid">
            {methods.map((method) => (
              <button
                key={method.name}
                type="button"
                className={`method-box ${
                  paymentMethod === method.name ? "active-method" : ""
                }`}
                onClick={() => setPaymentMethod(method.name)}
              >
                <div className="method-icon">{method.icon}</div>

                <div>
                  <h3>{method.title}</h3>
                  <p>{method.desc}</p>
                </div>

                {paymentMethod === method.name && (
                  <span className="method-selected">
                    <FaCheckCircle />
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="payment-footer">
            <div className="secure-payment">
              <FaLock />
              <span>100% Secure Payment</span>
            </div>

            {paymentMethod !== "UPI" && (
              <button
                type="button"
                className="pay-now-btn"
                disabled={!paymentMethod || paying || amount <= 0}
                onClick={() =>
                  handlePayBill({
                    paymentMode: paymentMethod,
                    amount,
                    remarks: `${paymentMethod} hospital bill payment`,
                    date: new Date().toISOString(),
                  })
                }
              >
                {paying
                  ? "Processing..."
                  : `Pay ₹${amount.toLocaleString("en-IN")}`}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentMethodCard;
