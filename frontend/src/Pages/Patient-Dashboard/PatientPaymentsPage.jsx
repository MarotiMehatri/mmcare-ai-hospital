import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

import PatientSummaryCards from "../../Component/Patient/PatientPaymentsPage/PatientSummaryCards";
import PatientBillingFilters from "../../Component/Patient/PatientPaymentsPage/PatientBillingFilters";
import PatientHistoryTable from "../../Component/tables/PatientHistoryTable";
import PatientDetailsCard from "../../Component/Patient/PatientPaymentsPage/PatientDetailsCard";
import PatientMethodCard from "../../Component/Patient/PatientPaymentsPage/PaymentMethodCard";
import UPIPaymentCard from "../../Component/Patient/PatientPaymentsPage/UPIPaymentCard";
import MedicineBillTable from "../../Component/tables/MedicineBillTables";
import InvoiceCard from "../../Component/Patient/PatientPaymentsPage/InvoiceCard";

import "../../Styles/Patient/PatientPaymentsPage.css";

function PatientPaymentsPage() {
  const patient = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || {};
    } catch {
      return {};
    }
  }, []);

  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const getArrayData = (res, key) => {
    const data = res?.data?.data || res?.data?.[key] || res?.data || [];
    return Array.isArray(data) ? data : [];
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);

      const [paymentsRes, prescriptionsRes] = await Promise.all([
        api.get("/doctorPayments"),
        api.get("/prescriptions"),
      ]);

      const paymentList = getArrayData(paymentsRes, "doctorPayments");
      const prescriptionList = getArrayData(prescriptionsRes, "prescriptions");

      const patientPayments = paymentList.filter(
        (item) => String(item.patientId) === String(patient?.id),
      );

      setPayments(patientPayments);
      setFilteredPayments(patientPayments);
      setPrescriptions(prescriptionList);
      setSelectedPayment(patientPayments[0] || null);
    } catch (error) {
      console.error("Failed to load payment page:", error);
      setPayments([]);
      setFilteredPayments([]);
      setPrescriptions([]);
      setSelectedPayment(null);
    } finally {
      setLoading(false);
    }
  };

  const patientPrescriptions = useMemo(() => {
    if (!selectedPayment?.patientId) return [];

    return prescriptions.filter(
      (item) => String(item.patientId) === String(selectedPayment.patientId),
    );
  }, [prescriptions, selectedPayment]);

  const selectedPrescription =
    patientPrescriptions.length > 0
      ? patientPrescriptions[patientPrescriptions.length - 1]
      : null;

  const handleFilter = (search = searchTerm) => {
    const value = String(search || "").toLowerCase();

    const filtered = payments.filter((item) => {
      const doctor = String(item.doctorName || "").toLowerCase();
      const department = String(item.department || "").toLowerCase();
      const status = String(item.paymentStatus || "").toLowerCase();
      const method = String(item.paymentMethod || "").toLowerCase();
      const date = String(item.paymentDate || item.date || "").toLowerCase();

      const matchesSearch =
        !value ||
        doctor.includes(value) ||
        department.includes(value) ||
        status.includes(value) ||
        method.includes(value);

      const matchesDoctor =
        !doctorName || doctor.includes(doctorName.toLowerCase());

      const matchesStatus =
        !selectedStatus || status === String(selectedStatus).toLowerCase();

      const matchesMethod =
        !selectedMethod || method === String(selectedMethod).toLowerCase();

      const matchesDepartment =
        !selectedDepartment ||
        department === String(selectedDepartment).toLowerCase();

      const matchesDate =
        !selectedDate || date.includes(String(selectedDate).toLowerCase());

      return (
        matchesSearch &&
        matchesDoctor &&
        matchesStatus &&
        matchesMethod &&
        matchesDepartment &&
        matchesDate
      );
    });

    setFilteredPayments(filtered);
    setSelectedPayment(filtered[0] || null);
  };

  useEffect(() => {
    handleFilter(searchTerm);
  }, [
    searchTerm,
    doctorName,
    selectedStatus,
    selectedMethod,
    selectedDepartment,
    selectedDate,
    payments,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setDoctorName("");
    setSelectedStatus("");
    setSelectedMethod("");
    setSelectedDepartment("");
    setSelectedDate("");
    setFilteredPayments(payments);
    setSelectedPayment(payments[0] || null);
  };

  const handlePayBill = async (paymentInfo = {}) => {
    try {
      if (!selectedPayment?.id) return;

      setPaying(true);

      const updatedPayment = {
        ...selectedPayment,
        paymentStatus: "Paid",
        paymentMethod: paymentInfo.paymentMode || paymentMethod || "UPI",
        transactionId: paymentInfo.transactionId || `TXN-${Date.now()}`,
        paidAmount: paymentInfo.amount || selectedPayment.totalAmount || 0,
        paidDate: paymentInfo.date || new Date().toISOString(),
        upiApp: paymentInfo.upiApp || "",
        upiId: paymentInfo.upiId || "",
        remarks: paymentInfo.remarks || "",
      };

      //const paymentId = selectedPayment._id || selectedPayment.id;

      await api.patch(`/doctorPayments/${selectedPayment.id}`, updatedPayment);

      setPayments((prev) =>
        prev.map((item) =>
          String(item.id) === String(selectedPayment.id)
            ? updatedPayment
            : item,
        ),
      );


      setSelectedPayment(updatedPayment);
      setPaymentMethod("");

      alert("Payment Successful");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Check doctorPayments route and ID.");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="patient-payments-page">
        <div className="payments-loading-card">
          <div className="payments-loader"></div>
          <h2>Loading Billing Details...</h2>
          <p>Please wait while we fetch your payment records.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-payments-page">
      <div className="payments-hero">
        <div>
          <p className="payments-eyebrow">Patient Portal</p>
          <h1>Billing & Payments</h1>
          <p>
            View consultation bills, medicine charges, invoices, and complete
            your payment securely.
          </p>
        </div>

        <div className="payments-hero-badge">
          <span>{payments.length}</span>
          <p>Total Bills</p>
        </div>
      </div>

      <PatientSummaryCards payments={payments} />

      <div className="payments-section-card">
        <PatientBillingFilters
          onSearch={handleFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          doctorName={doctorName}
          setDoctorName={setDoctorName}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          clearFilters={clearFilters}
        />
      </div>

      {filteredPayments.length === 0 ? (
        <div className="payments-empty-card">
          <h2>No Payment Records Found</h2>
          <p>No billing records match your selected filters.</p>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      ) : (
        <div className="payments-content-grid">
          <div className="payments-left-panel">
            <PatientHistoryTable
              payments={filteredPayments}
              onSelectPayment={setSelectedPayment}
              prescription={selectedPrescription}
            />

            <MedicineBillTable medicines={selectedPayment.medicines || []} />
            <InvoiceCard
              payment={selectedPayment}
              prescription={selectedPrescription}
            />
          </div>

          <div className="payments-right-panel">
            {selectedPayment && (
              <>
                <PatientDetailsCard
                  patient={patient}
                  payment={selectedPayment}
                  prescription={selectedPrescription}
                />

                <PatientMethodCard
                  payment={selectedPayment}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  handlePayBill={handlePayBill}
                  paying={paying}
                />

                {paymentMethod === "UPI" && (
                  <UPIPaymentCard
                    patient={patient}
                    totalAmount={
                      selectedPayment.totalAmount ||
                      selectedPayment.total ||
                      selectedPayment.amount ||
                      selectedPayment.grandTotal ||
                      0
                    }
                    //paymentInfo={handlePayBill}
                    onPaymentSuccess={handlePayBill}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientPaymentsPage;
