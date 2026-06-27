import React, { useEffect, useMemo, useState } from "react";
import {
  FaMoneyBillWave,
  FaWallet,
  FaClock,
  FaUserMd,
  FaUsers,
  FaFileInvoiceDollar,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import DoctorPaymentCard from "../../Component/cards/DoctorPaymentCard";
import DoctorPaymentsTable from "../../Component/tables/DoctorPaymentsTable";
import { getDoctorPayments } from "../../services/Doctor/DoctorPaymentsAPI";

import "../../Styles/Doctor/DoctorPayments.css";

function DoctorPayments() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      const data = await getDoctorPayments();

      const paymentList = Array.isArray(data)
        ? data
        : data?.doctorPayments || data?.DoctorPayments || data?.data || [];

      setPayments(paymentList);
    } catch (error) {
      console.error("Failed to load doctor payments:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();

    const interval = setInterval(loadPayments, 3000);

    const refreshOnFocus = () => loadPayments();
    window.addEventListener("focus", refreshOnFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", refreshOnFocus);
    };
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        String(payment.patientName || "")
          .toLowerCase()
          .includes(searchText) ||
        String(payment.paymentId || payment.id || "")
          .toLowerCase()
          .includes(searchText) ||
        String(payment.patientId || "")
          .toLowerCase()
          .includes(searchText) ||
        String(payment.appointmentId || "")
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" || payment.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const today = new Date().toISOString().split("T")[0];

  const paidPayments = payments.filter((item) => item.paymentStatus === "Paid");
  const pendingPayments = payments.filter(
    (item) => item.paymentStatus !== "Paid",
  );

  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0,
  );

  const paidRevenue = paidPayments.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0,
  );

  const pendingRevenue = pendingPayments.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0,
  );

  const consultationRevenue = payments.reduce(
    (sum, item) => sum + Number(item.consultationFee || 0),
    0,
  );

  const medicalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.medicalBill || 0),
    0,
  );

  const todaysPayments = payments.filter((item) => {
    const date = item.paidDate || item.paymentDate || "";
    return String(date).startsWith(today);
  });

  const todaysEarnings = todaysPayments
    .filter((item) => item.paymentStatus === "Paid")
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  return (
    <div className="doctor-payments">
      <div className="doctor-payments-header">
        <div>
          <h1>Doctor Payments Dashboard</h1>
          <p>
            Live payment records, paid amount, pending amount, and earnings.
          </p>
        </div>

        <button
          className="create-payment-btn"
          onClick={() => navigate("/doctor/create-payment")}
        >
          <FaPlus />
          Create Payment
        </button>
      </div>

      <div className="doctor-payments__cards">
        <DoctorPaymentCard
          title="Today's Paid Earnings"
          value={`₹${todaysEarnings.toLocaleString("en-IN")}`}
          subtitle={`${todaysPayments.length} payments today`}
          icon={<FaMoneyBillWave />}
        />

        <DoctorPaymentCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          subtitle="All generated bills"
          icon={<FaWallet />}
        />

        <DoctorPaymentCard
          title="Paid Amount"
          value={`₹${paidRevenue.toLocaleString("en-IN")}`}
          subtitle={`${paidPayments.length} paid bills`}
          icon={<FaCheckCircle />}
        />

        <DoctorPaymentCard
          title="Pending Amount"
          value={`₹${pendingRevenue.toLocaleString("en-IN")}`}
          subtitle={`${pendingPayments.length} pending bills`}
          icon={<FaClock />}
        />

        <DoctorPaymentCard
          title="Consultation Revenue"
          value={`₹${consultationRevenue.toLocaleString("en-IN")}`}
          subtitle="Doctor consultation fees"
          icon={<FaUserMd />}
        />

        <DoctorPaymentCard
          title="Medical Revenue"
          value={`₹${medicalRevenue.toLocaleString("en-IN")}`}
          subtitle="Medicines and tests"
          icon={<FaFileInvoiceDollar />}
        />

        <DoctorPaymentCard
          title="Patients Treated"
          value={new Set(payments.map((item) => item.patientId)).size}
          subtitle="Unique patients"
          icon={<FaUsers />}
        />
      </div>

      <div className="doctor-payments__search">
        <input
          type="text"
          placeholder="Search patient, payment ID, appointment ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <button type="button" onClick={loadPayments}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="payments-loading-text">Loading payments...</p>
      ) : (
        <DoctorPaymentsTable payments={filteredPayments} />
      )}
    </div>
  );
}

export default DoctorPayments;
