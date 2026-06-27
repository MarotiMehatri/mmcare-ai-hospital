import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaComments,
  FaUserInjured,
  FaCircle,
  FaNotesMedical,
  FaClipboardList,
  FaFileMedical,
  FaClock,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import WelcomeBanner from "../../Component/Doctor/WelcomeBanner";
import DoctorProfileCard from "../../Component/cards/DoctorProfileCard";
import "../../Styles/Doctor/DoctorHome.css";
import AIAssistantCard from "../../Component/cards/AIAssistantCard";
import HealthAnalyticsCard from "../../Component/cards/HealthAnalyticsCard";
import DoctorAppointmentsPreview from "../../Component/Doctor/DoctorAppointmentsPreview";
import DoctorChatPreview from "../../Component/Doctor/DoctorChatPreview";
//import DoctorPaymentCard from "../../component/cards/DoctorPaymentCard";

import { getDoctorPayments } from "../../services/Doctor/DoctorPaymentsAPI";

function DoctorHome() {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await getDoctorPayments();

        const paymentList = Array.isArray(data)
          ? data
          : data.doctorPayments || data.data || [];

        setPayments(paymentList);
      } catch (error) {
        console.error("Failed to load doctor payments:", error);
        setPayments([]);
      }
    };

    loadPayments();
  }, []);

  const unreadMessages = 8;
  const onlinePatients = 3;
  const totalPrescriptions = 24;
  //const todayPrescriptions = 5;

  const openChat = () => {
    navigate("doctor/chat");
  };

  //Doctor Payments
  const doctorPayments = payments || [];

  const totalPaymentAmount = doctorPayments.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0,
  );

  const today = new Date().toISOString().split("T")[0];

  const todayAmount = doctorPayments
    .filter((item) => item.paymentDate === today)
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  const completedPayments = doctorPayments.filter(
    (item) => item.paymentStatus === "Paid",
  ).length;

  const pendingPayments = doctorPayments.filter(
    (item) => item.paymentStatus === "Pending",
  ).length;

  const handlePayments = () => {
    navigate("/doctor/payments");
  };

  return (
    <div className="doctor-home-page">
      <div className="doctor-home-banner">
        <WelcomeBanner DoctorName={doctor?.name || doctor?.FullName} />
      </div>
      <div className="doctor-home-content">
        <div className="doctor-home-left">
          <DoctorProfileCard doctor={doctor} />

          {/* Doctor Payments */}

          <div
            className="doctor-home-card doctor-home-payments-card"
            onClick={handlePayments}
          >
            <div className="doctor-home-card-top">
              <div className="doctor-home-card-icon payments-icon">
                <FaWallet />
              </div>

              <div className="doctor-home-payment-badge">
                ₹{totalPaymentAmount.toLocaleString()} Total
              </div>
            </div>

            <div className="doctor-home-card-content">
              <h3>Doctor Payments</h3>
              <p>
                Monitor daily earnings, consultation fees, medical bills,
                completed transactions and pending patient payments.
              </p>
            </div>

            <div className="doctor-home-payment-stats">
              <div className="doctor-home-payment-stat">
                <FaCalendarCheck />
                <span>₹{todayAmount.toLocaleString()} Today</span>
              </div>

              <div className="doctor-home-payment-stat">
                <FaCheckCircle />
                <span>{completedPayments} Completed</span>
              </div>

              <div className="doctor-home-payment-stat pending-stat">
                <FaClock />
                <span>{pendingPayments} Pending</span>
              </div>
            </div>

            <button
              className="doctor-home-card-btn payments-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/doctor/payments");
              }}
            >
              Manage Payments
            </button>
          </div>
        </div>

        <div className="doctor-home-right">
          <div className="doctor-home-cards-grid">
            {/* Medical Reports */}
            <div
              className="doctor-home-card doctor-home-reports-card"
              onClick={() => navigate("/doctor/medical-reports")}
            >
              <div className="doctor-home-card-top">
                <div className="doctor-home-card-icon reports-icon">
                  <FaFileMedical />
                </div>

                <div className="doctor-home-report-badge">6 Pending</div>
              </div>

              <div className="doctor-home-card-content">
                <h3>Healthcare Reports Dashboard</h3>
                <p>
                  Review patient reports, laboratory findings, diagnostic
                  results, and clinical documents. Track pending reviews, manage
                  medical records, and ensure accurate patient care.
                </p>
              </div>

              <div className="doctor-home-report-stats">
                <div className="doctor-home-report-stat">
                  <FaClock />
                  <span>Pending Reviews</span>
                </div>

                <div className="doctor-home-report-stat">
                  <FaCheckCircle />
                  <span>Completed Reviews</span>
                </div>
              </div>

              <button
                className="doctor-home-card-btn reports-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/doctor/medical-reports");
                }}
              >
                Access Reports Center →
              </button>
            </div>

            <div className="doctor-home-section">
              <DoctorAppointmentsPreview doctorId={doctor?.id} />
            </div>

            {/* Doctor Chat */}
            <div
              className="doctor-home-card doctor-home-chat-card"
              onClick={openChat}
            >
              <div className="doctor-home-card-top">
                <div className="doctor-home-card-icon chat-icon">
                  <FaComments />
                </div>

                <div className="doctor-home-chat-badge">
                  {unreadMessages} New
                </div>
              </div>

              <div className="doctor-home-card-content">
                <h3>Doctor Chat</h3>
                <p>
                  Open patient chats, reply to messages, and manage real-time
                  conversations from one place.
                </p>
              </div>

              <div className="doctor-home-chat-stats">
                <div className="doctor-home-chat-stat">
                  <FaUserInjured />
                  <span>{unreadMessages} unread messages</span>
                </div>

                <div className="doctor-home-chat-stat online">
                  <FaCircle />
                  <span>{onlinePatients} patients online</span>
                </div>
              </div>

              <button
                className="doctor-home-card-btn chat-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/doctor/chat");
                }}
              >
                Patient Messages
              </button>
            </div>

            {/* Doctor Prescriptions */}
            <div
              className="doctor-home-card doctor-home-prescriptions-card"
              onClick={() => navigate("/doctor/prescriptions")}
            >
              <div className="doctor-home-card-icon prescriptions-icon">
                <FaNotesMedical />
              </div>

              <div className="doctor-home-card-content">
                <h3>Doctor Prescriptions</h3>
                <p>
                  View all prescription records, patient medicine history, and
                  previous treatment instructions.
                </p>
              </div>

              <div className="doctor-home-prescription-stats">
                <div className="doctor-home-prescription-stat">
                  <FaClipboardList />
                  <span>{totalPrescriptions} total prescriptions</span>
                </div>
              </div>

              <button
                className="doctor-home-card-btn history-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/doctor/prescriptions");
                }}
              >
                Manage Prescriptions
              </button>
            </div>
          </div>
          {/* AI Assistant Card */}
          <div className="doctor-home-ai-section">
            <div className="doctor-section-header">
              <h3 className="doctor-section-title">AI Assistant</h3>
              <p className="doctor-section-subtitle">
                Amart tools for diagnosis, reports, and patient insisghts
              </p>
            </div>
            <AIAssistantCard />
          </div>

          <div className="doctor-home-analytics-section">
            <HealthAnalyticsCard />
          </div>
          <div className="doctor-home-section">
            <DoctorChatPreview doctorId={doctor?.id} />
          </div>
        </div>
      </div>

      {/* <DoctorHealthSummaryCard /> */}
    </div>
  );
}

export default DoctorHome;
