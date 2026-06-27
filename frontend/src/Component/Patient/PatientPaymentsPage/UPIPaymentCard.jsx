import React, { useMemo, useState } from "react";
import {
  FaGooglePay,
  FaMoneyCheckAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaReceipt,
} from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import "../../../Styles/Patient/UPIPaymentCard.css";

function UPIPaymentCard({ totalAmount = 0, onPaymentSuccess, patient }) {
  const patientName =
    patient?.FullName || patient?.fullName || patient?.name || "patient";

  const generatedUpiId = patientName.toLowerCase().replace(/\s+/g, "") + "@upi";

  const amount = Number(totalAmount || 0);

  const [upiApp, setUpiApp] = useState("Google Pay");
  const [paymentData, setPaymentData] = useState({
    upiId: generatedUpiId,
    remarks: "Hospital Bill Payment",
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const upiApps = useMemo(
    () => [
      { name: "Google Pay", icon: <FaGooglePay /> },
      { name: "PhonePe", icon: <SiPhonepe /> },
      { name: "Paytm", icon: <SiPaytm /> },
    ],
    [],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;

    if (!paymentData.upiId.trim()) {
      alert("Please enter UPI ID");
      return;
    }

    if (!upiRegex.test(paymentData.upiId.trim())) {
      alert("Please enter valid UPI ID. Example: patient@upi");
      return;
    }

    if (amount <= 0) {
      alert("Invalid payment amount");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      const finalPaymentInfo = {
        transactionId: "TXN-" + Date.now(),
        paymentMode: "UPI",
        upiApp,
        upiId: paymentData.upiId.trim(),
        amount,
        remarks: paymentData.remarks || "Hospital Bill Payment",
        status: "Paid",
        date: new Date().toISOString(),
      };

      try {
        if (typeof onPaymentSuccess === "function") {
          await onPaymentSuccess(finalPaymentInfo);
        }

        setSuccessData(finalPaymentInfo);
      } catch (error) {
        console.error("UPI payment update failed:", error);
        alert("Payment failed. Bill was not updated.");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="upi-payment-card">
      <div className="upi-glow"></div>

      <div className="upi-header">
        <div>
          <span className="upi-badge">
            <FaShieldAlt />
            Secure UPI Payment
          </span>

          <h2>UPI Payment</h2>
          <p>Select your UPI app and complete hospital bill payment safely.</p>
        </div>

        <div className="upi-amount-box">
          <span>Payable</span>
          <strong>₹{amount}</strong>
        </div>
      </div>

      {successData ? (
        <div className="upi-success-box">
          <div className="upi-success-icon">
            <FaCheckCircle />
          </div>

          <h3>Payment Successful</h3>
          <p>Your hospital bill payment has been completed successfully.</p>

          <div className="upi-success-details">
            <div>
              <span>Transaction ID</span>
              <strong>{successData.transactionId}</strong>
            </div>

            <div>
              <span>Payment App</span>
              <strong>{successData.upiApp}</strong>
            </div>

            <div>
              <span>UPI ID</span>
              <strong>{successData.upiId}</strong>
            </div>

            <div>
              <span>Amount Paid</span>
              <strong>₹{successData.amount}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong className="success-text">{successData.status}</strong>
            </div>

            <div>
              <span>Date</span>
              <strong>{new Date(successData.date).toLocaleString()}</strong>
            </div>
          </div>

          <div className="upi-success-note">
            <FaReceipt />
            <span>You can now view the updated invoice below.</span>
          </div>
        </div>
      ) : (
        <>
          <div className="upi-apps">
            {upiApps.map((app) => (
              <button
                key={app.name}
                type="button"
                className={`upi-app ${upiApp === app.name ? "active-upi" : ""}`}
                onClick={() => setUpiApp(app.name)}
              >
                {app.icon}
                <span>{app.name}</span>
              </button>
            ))}
          </div>

          <div className="upi-form">
            <div className="upi-input">
              <label>UPI ID</label>
              <input
                type="text"
                name="upiId"
                placeholder="patient@upi"
                value={paymentData.upiId}
                onChange={handleChange}
              />
            </div>

            <div className="upi-input">
              <label>Amount</label>
              <input type="number" value={amount} readOnly />
            </div>

            <div className="upi-input full">
              <label>Remarks</label>
              <textarea
                rows="3"
                name="remarks"
                placeholder="Hospital Bill Payment"
                value={paymentData.remarks}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="upi-footer">
            <div className="upi-total">
              <FaMoneyCheckAlt />
              <div>
                <small>Total Payable</small>
                <span>₹{amount}</span>
              </div>
            </div>

            <button
              type="button"
              className="pay-btn"
              onClick={handlePayment}
              disabled={loading || amount <= 0}
            >
              {loading ? (
                <>
                  <span className="pay-loader"></span>
                  Processing...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  Pay ₹{amount}
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UPIPaymentCard;
