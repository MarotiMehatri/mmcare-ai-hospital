import React, { useEffect, useMemo, useState } from "react";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  deleteBill,
  getAllBills,
  updateBillPaymentStatus,
} from "../../services/Admin/AdminBillingApi";

import AdminBillingFilter from "../../Component/Admin/AdminBillingFilter";
import AdminBillingTable from "../../Component/tables/AdminBillingTable";

import "../../Styles/Admin/AdminBillingPage.css";

function AdminBillingPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All");

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      setLoading(true);

      const res = await getAllBills();

      setBills(res.data || []);
    } catch (error) {
      console.error("Failed to load bills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentStatusChange = async (id, newStatus) => {
    try {
      await updateBillPaymentStatus(id, newStatus);

      setBills((prev) =>
        prev.map((bill) =>
          bill.id === id
            ? {
                ...bill,
                paymentStatus: newStatus,
              }
            : bill,
        ),
      );
    } catch (error) {
      console.error("Failed to update bill status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?",
    );

    if (!confirmDelete) return;

    try {
      await deleteBill(id);

      setBills((prev) => prev.filter((bill) => bill.id !== id));
    } catch (error) {
      console.error("Failed to delete bill:", error);
    }
  };

  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        bill.patientName?.toLowerCase().includes(search) ||
        bill.doctorId?.toLowerCase().includes(search) ||
        bill.patientId?.toLowerCase().includes(search) ||
        bill.department?.toLowerCase().includes(search) ||
        bill.id?.toString().toLowerCase().includes(search);

      const matchesStatus =
        paymentStatusFilter === "All" ||
        bill.paymentStatus === paymentStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bills, searchTerm, paymentStatusFilter]);

  /* ================= STATS ================= */

  const totalBills = bills.length;

  const paidBills = bills.filter(
    (bill) => bill.paymentStatus === "Paid",
  ).length;

  const pendingBills = bills.filter(
    (bill) => bill.paymentStatus === "Pending",
  ).length;

  const overdueBills = bills.filter(
    (bill) => bill.paymentStatus === "Overdue",
  ).length;

  const totalRevenue = bills
    .filter((bill) => bill.paymentStatus === "Paid")
    .reduce((sum, bill) => sum + Number(bill.totalAmount || 0), 0);

  const pendingRevenue = bills
    .filter((bill) => bill.paymentStatus === "Pending")
    .reduce((sum, bill) => sum + Number(bill.totalAmount || 0), 0);

  return (
    <div className="admin-billing-page">
      {/* HERO */}

      <div className="admin-billing-hero">
        <div className="admin-billing-header">
          <div>
            <h1 className="admin-billing-title">
              Billing Management Dashboard
            </h1>

            <p className="admin-billing-subtitle">
              Manage patient bills, doctor consultations, payments, medicine
              charges and revenue across the hospital.
            </p>
          </div>
        </div>

        {/* STATS */}

        <div className="admin-billing-stats-grid">
          <div className="billing-stat-card total">
            <div className="stat-icon">
              <FaFileInvoiceDollar />
            </div>

            <div>
              <h4>Total Bills</h4>
              <h2>{totalBills}</h2>
            </div>
          </div>

          <div className="billing-stat-card paid">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>

            <div>
              <h4>Paid Bills</h4>
              <h2>{paidBills}</h2>
            </div>
          </div>

          <div className="billing-stat-card pending">
            <div className="stat-icon">
              <FaClock />
            </div>

            <div>
              <h4>Pending Bills</h4>
              <h2>{pendingBills}</h2>
            </div>
          </div>

          <div className="billing-stat-card revenue">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div>
              <h4>Total Revenue</h4>
              <h2>₹{totalRevenue.toLocaleString()}</h2>
            </div>
          </div>

          <div className="billing-stat-card warning">
            <div className="stat-icon">
              <FaExclamationTriangle />
            </div>

            <div>
              <h4>Overdue Bills</h4>
              <h2>{overdueBills}</h2>
            </div>
          </div>

          <div className="billing-stat-card pending-amount">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>

            <div>
              <h4>Pending Amount</h4>
              <h2>₹{pendingRevenue.toLocaleString()}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER */}

      <div className="admin-billing-filter-wrapper">
        <AdminBillingFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          paymentStatusFilter={paymentStatusFilter}
          setPaymentStatusFilter={setPaymentStatusFilter}
        />
      </div>

      {/* TABLE */}

      <div className="admin-billing-table-wrapper">
        {loading ? (
          <div className="admin-billing-loading">
            <div className="billing-loader"></div>

            <h3>Loading Billing Records...</h3>

            <p>Please wait</p>
          </div>
        ) : (
          <AdminBillingTable
            bills={filteredBills}
            onDelete={handleDelete}
            onPaymentStatusChange={handlePaymentStatusChange}
          />
        )}
      </div>
    </div>
  );
}

export default AdminBillingPage;
