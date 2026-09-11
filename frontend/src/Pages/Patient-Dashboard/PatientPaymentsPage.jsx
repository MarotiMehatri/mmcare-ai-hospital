
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  /* =========================================================
     PATIENT FROM LOCAL STORAGE
  ========================================================= */

  const patient = useMemo(() => {
    try {
      const storedPatient = localStorage.getItem("patient");

      if (!storedPatient) {
        return {};
      }

      return JSON.parse(storedPatient) || {};
    } catch (error) {
      console.error("Failed to read patient from localStorage:", error);
      return {};
    }
  }, []);

  /* =========================================================
     STATE
  ========================================================= */

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

  /* =========================================================
     HELPERS
  ========================================================= */

  const getArrayData = useCallback((res, key = "") => {
    const data =
      res?.data?.data ||
      res?.data?.[key] ||
      res?.data ||
      [];

    return Array.isArray(data) ? data : [];
  }, []);

  /*
   * Get every possible patient ID.
   *
   * This is important because:
   *
   * MongoDB:
   *   _id
   *
   * Legacy JSON:
   *   id
   *   patientId
   *   patientID
   *   patientCode
   */
  const getPatientIds = useCallback((patientData = {}) => {
    return [
      patientData?._id,
      patientData?.id,
      patientData?.patientId,
      patientData?.patientID,
      patientData?.patientCode,
    ]
      .filter(
        (value) =>
          value !== undefined &&
          value !== null &&
          String(value).trim() !== "",
      )
      .map((value) => String(value).trim());
  }, []);

  /*
   * Get every possible patient ID from a payment.
   */
  const getPaymentPatientIds = useCallback((payment = {}) => {
    return [
      payment?.patientId,
      payment?.patientID,
      payment?.patientCode,
      payment?.patient?._id,
      payment?.patient?.id,
      payment?.patient?.patientId,
      payment?.patient?._id?.toString?.(),
    ]
      .filter(
        (value) =>
          value !== undefined &&
          value !== null &&
          String(value).trim() !== "",
      )
      .map((value) => String(value).trim());
  }, []);

  /*
   * Get payment's MongoDB / legacy ID.
   */
  const getPaymentId = useCallback((payment = {}) => {
    return (
      payment?._id ||
      payment?.id ||
      payment?.paymentId ||
      null
    );
  }, []);

  /*
   * Check whether payment belongs to logged-in patient.
   */
  const paymentBelongsToPatient = useCallback(
    (payment, patientData) => {
      const loggedPatientIds = getPatientIds(patientData);
      const paymentPatientIds = getPaymentPatientIds(payment);

      if (
        loggedPatientIds.length === 0 ||
        paymentPatientIds.length === 0
      ) {
        return false;
      }

      return paymentPatientIds.some((paymentId) =>
        loggedPatientIds.some(
          (patientId) =>
            String(paymentId).trim() === String(patientId).trim(),
        ),
      );
    },
    [getPatientIds, getPaymentPatientIds],
  );

  /*
   * Convert dates into a sortable timestamp.
   */
  const getDateValue = useCallback((item = {}) => {
    const value =
      item?.createdAt ||
      item?.updatedAt ||
      item?.paymentDate ||
      item?.date ||
      item?.paidDate ||
      item?.appointmentDate ||
      "";

    const time = new Date(value).getTime();

    return Number.isNaN(time) ? 0 : time;
  }, []);

  /* =========================================================
     LOAD DATA
  ========================================================= */

  const loadPageData = useCallback(async () => {
    try {
      setLoading(true);

      console.log("==========================================");
      console.log("PATIENT PAYMENT PAGE");
      console.log("Logged patient:", patient);
      console.log("Patient IDs:", getPatientIds(patient));
      console.log("==========================================");

      const [paymentsRes, prescriptionsRes] =
        await Promise.all([
          api.get("/doctorPayments"),
          api.get("/prescriptions"),
        ]);

      console.log("Doctor Payments API:", paymentsRes);
      console.log("Prescriptions API:", prescriptionsRes);

      const paymentList = getArrayData(
        paymentsRes,
        "doctorPayments",
      );

      const prescriptionList = getArrayData(
        prescriptionsRes,
        "prescriptions",
      );

      console.log("All doctor payments:", paymentList);
      console.log(
        "Total doctor payments:",
        paymentList.length,
      );

      console.log(
        "Current patient IDs:",
        getPatientIds(patient),
      );

      /*
       * IMPORTANT:
       * Do not only compare item.patientId with patient.id.
       *
       * Use all possible IDs.
       */
      const patientPayments = paymentList
        .filter((payment) =>
          paymentBelongsToPatient(payment, patient),
        )
        .sort(
          (a, b) =>
            getDateValue(b) - getDateValue(a),
        );

      console.log(
        "Payments belonging to current patient:",
        patientPayments,
      );

      console.log(
        "Patient payment count:",
        patientPayments.length,
      );

      setPayments(patientPayments);
      setFilteredPayments(patientPayments);

      /*
       * Keep all prescriptions because the patient's
       * prescription page may need them.
       */
      setPrescriptions(prescriptionList);

      setSelectedPayment(
        patientPayments.length > 0
          ? patientPayments[0]
          : null,
      );
    } catch (error) {
      console.error(
        "Failed to load patient payment page:",
        error,
      );

      console.error(
        "API response:",
        error?.response?.data,
      );

      setPayments([]);
      setFilteredPayments([]);
      setPrescriptions([]);
      setSelectedPayment(null);
    } finally {
      setLoading(false);
    }
  }, [
    patient,
    getArrayData,
    getPatientIds,
    paymentBelongsToPatient,
    getDateValue,
  ]);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  /* =========================================================
     PATIENT PRESCRIPTIONS
  ========================================================= */

  const patientPrescriptions = useMemo(() => {
    if (!selectedPayment) {
      return [];
    }

    const paymentPatientIds =
      getPaymentPatientIds(selectedPayment);

    if (paymentPatientIds.length === 0) {
      return [];
    }

    return prescriptions
      .filter((prescription) => {
        const prescriptionPatientIds = [
          prescription?._id,
          prescription?.patientId,
          prescription?.patientID,
          prescription?.patientCode,
          prescription?.patient?._id,
          prescription?.patient?.id,
          prescription?.patient?.patientId,
        ]
          .filter(
            (value) =>
              value !== undefined &&
              value !== null &&
              String(value).trim() !== "",
          )
          .map((value) => String(value).trim());

        return prescriptionPatientIds.some(
          (prescriptionPatientId) =>
            paymentPatientIds.some(
              (paymentPatientId) =>
                String(paymentPatientId) ===
                String(prescriptionPatientId),
            ),
        );
      })
      .sort(
        (a, b) =>
          getDateValue(b) - getDateValue(a),
      );
  }, [
    prescriptions,
    selectedPayment,
    getPaymentPatientIds,
    getDateValue,
  ]);

  const selectedPrescription =
    patientPrescriptions.length > 0
      ? patientPrescriptions[0]
      : null;

  /* =========================================================
     FILTER PAYMENTS
  ========================================================= */

  const handleFilter = useCallback(
    (search = searchTerm) => {
      const value = String(search || "")
        .trim()
        .toLowerCase();

      const filtered = payments.filter((item) => {
        const doctor = String(
          item?.doctorName ||
          item?.doctor?.name ||
          item?.doctor?.FullName ||
          "",
        ).toLowerCase();

        const department = String(
          item?.department ||
          item?.departmentName ||
          "",
        ).toLowerCase();

        const status = String(
          item?.paymentStatus ||
          item?.status ||
          "Pending",
        ).toLowerCase();

        const method = String(
          item?.paymentMethod ||
          item?.paymentMode ||
          "",
        ).toLowerCase();

        const date = String(
          item?.paymentDate ||
          item?.date ||
          item?.paidDate ||
          item?.createdAt ||
          "",
        ).toLowerCase();

        const paymentId = String(
          item?.paymentId ||
          item?.id ||
          item?._id ||
          "",
        ).toLowerCase();

        const matchesSearch =
          !value ||
          doctor.includes(value) ||
          department.includes(value) ||
          status.includes(value) ||
          method.includes(value) ||
          paymentId.includes(value);

        const matchesDoctor =
          !doctorName ||
          doctor.includes(
            String(doctorName).toLowerCase(),
          );

        const matchesStatus =
          !selectedStatus ||
          status ===
          String(selectedStatus).toLowerCase();

        const matchesMethod =
          !selectedMethod ||
          method ===
          String(selectedMethod).toLowerCase();

        const matchesDepartment =
          !selectedDepartment ||
          department ===
          String(selectedDepartment).toLowerCase();

        const matchesDate =
          !selectedDate ||
          date.includes(
            String(selectedDate).toLowerCase(),
          );

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

      /*
       * Preserve selected payment if it is still in
       * the filtered list.
       */
      setSelectedPayment((current) => {
        if (!current) {
          return filtered[0] || null;
        }

        const currentId = String(
          getPaymentId(current) || "",
        );

        const stillExists = filtered.some(
          (item) =>
            String(getPaymentId(item) || "") ===
            currentId,
        );

        return stillExists
          ? current
          : filtered[0] || null;
      });
    },
    [
      payments,
      searchTerm,
      doctorName,
      selectedStatus,
      selectedMethod,
      selectedDepartment,
      selectedDate,
      getPaymentId,
    ],
  );

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
    handleFilter,
  ]);

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

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

  /* =========================================================
     PAYMENT AMOUNT
  ========================================================= */

  const selectedPaymentAmount = useMemo(() => {
    if (!selectedPayment) {
      return 0;
    }

    return Number(
      selectedPayment?.totalAmount ??
      selectedPayment?.total ??
      selectedPayment?.grandTotal ??
      selectedPayment?.amount ??
      0,
    );
  }, [selectedPayment]);

  /* =========================================================
     PAY BILL
  ========================================================= */

  const handlePayBill = async (paymentInfo = {}) => {
    try {
      if (!selectedPayment) {
        alert("Please select a payment record.");
        return;
      }

      const paymentId = getPaymentId(selectedPayment);

      if (!paymentId) {
        console.error(
          "Payment ID missing:",
          selectedPayment,
        );

        alert(
          "Payment ID not found. Please check the doctorPayments data.",
        );

        return;
      }

      setPaying(true);

      const updatedPayment = {
        ...selectedPayment,

        paymentStatus: "Paid",

        paymentMethod:
          paymentInfo?.paymentMode ||
          paymentInfo?.paymentMethod ||
          paymentMethod ||
          "UPI",

        transactionId:
          paymentInfo?.transactionId ||
          `TXN-${Date.now()}`,

        paidAmount:
          paymentInfo?.amount ||
          selectedPaymentAmount,

        paidDate:
          paymentInfo?.date ||
          new Date().toISOString(),

        upiApp:
          paymentInfo?.upiApp || "",

        upiId:
          paymentInfo?.upiId || "",

        remarks:
          paymentInfo?.remarks || "",
      };

      console.log(
        "Updating payment:",
        paymentId,
      );

      console.log(
        "Updated payment payload:",
        updatedPayment,
      );

      /*
       * IMPORTANT:
       * Use MongoDB _id when available.
       * getPaymentId() handles _id/id/paymentId.
       */
      const response = await api.patch(
        `/doctorPayments/${paymentId}`,
        updatedPayment,
      );

      console.log(
        "Payment update response:",
        response,
      );

      /*
       * Update local state.
       */
      setPayments((previous) =>
        previous.map((item) => {
          const itemId = getPaymentId(item);

          return String(itemId) === String(paymentId)
            ? {
              ...item,
              ...updatedPayment,
            }
            : item;
        }),
      );

      setFilteredPayments((previous) =>
        previous.map((item) => {
          const itemId = getPaymentId(item);

          return String(itemId) === String(paymentId)
            ? {
              ...item,
              ...updatedPayment,
            }
            : item;
        }),
      );

      setSelectedPayment(updatedPayment);
      setPaymentMethod("");

      alert("Payment Successful");
    } catch (error) {
      console.error(
        "Payment failed:",
        error,
      );

      console.error(
        "Payment error response:",
        error?.response?.data,
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Payment failed. Please try again.";

      alert(message);
    } finally {
      setPaying(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="patient-payments-page">
        <div className="payments-loading-card">
          <div className="payments-loader"></div>

          <h2>
            Loading Billing Details...
          </h2>

          <p>
            Please wait while we fetch your
            payment records.
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="patient-payments-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="payments-hero">
        <div>
          <p className="payments-eyebrow">
            Patient Portal
          </p>

          <h1>
            Billing & Payments
          </h1>

          <p>
            View consultation bills, medicine
            charges, invoices, and complete
            your payment securely.
          </p>
        </div>

        <div className="payments-hero-badge">
          <span>
            {payments.length}
          </span>

          <p>
            Total Bills
          </p>
        </div>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <PatientSummaryCards payments={filteredPayments} 
        // payments={payments}
      />

      {/* =====================================================
          FILTERS
      ===================================================== */}

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

          selectedDepartment={
            selectedDepartment
          }
          setSelectedDepartment={
            setSelectedDepartment
          }

          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}

          clearFilters={clearFilters}
        />

      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredPayments.length === 0 ? (

        <div className="payments-empty-card">

          <h2>
            No Payment Records Found
          </h2>

          <p>
            No billing records were found for
            your patient account.
          </p>

          <div
            style={{
              marginTop: "12px",
              fontSize: "13px",
              opacity: 0.75,
            }}
          >
            <strong>
              Debug information:
            </strong>

            <div>
              Patient ID:
              {" "}
              {patient?.id ||
                patient?._id ||
                patient?.patientId ||
                "Not found"}
            </div>

            <div>
              Loaded payment records:
              {" "}
              {payments.length}
            </div>
          </div>

          <button
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        /* =====================================================
           PAYMENT CONTENT
        ===================================================== */

        <div className="payments-content-grid">

          {/* ===================================================
              LEFT
          =================================================== */}

          <div className="payments-left-panel">

            <PatientHistoryTable
              payments={filteredPayments}
              onSelectPayment={
                setSelectedPayment
              }
              prescription={
                selectedPrescription
              }
            />

            {selectedPayment && (
              <MedicineBillTable
                medicines={
                  selectedPayment?.medicines ||
                  []
                }
              />
            )}

            <InvoiceCard
              payment={selectedPayment}
              prescription={
                selectedPrescription
              }
            />

          </div>

          {/* ===================================================
              RIGHT
          =================================================== */}

          <div className="payments-right-panel">

            {selectedPayment && (
              <>

                <PatientDetailsCard
                  patient={patient}
                  payment={selectedPayment}
                  prescription={
                    selectedPrescription
                  }
                />

                <PatientMethodCard
                  payment={selectedPayment}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={
                    setPaymentMethod
                  }
                  handlePayBill={
                    handlePayBill
                  }
                  paying={paying}
                />

                {paymentMethod === "UPI" && (
                  <UPIPaymentCard
                    patient={patient}

                    totalAmount={
                      Number(
                        selectedPayment?.totalAmount || 
                        selectedPayment?.grandTotal || 
                        selectedPayment?.total ||
                        0
                      )
                    }

                    onPaymentSuccess={
                      handlePayBill
                    }
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
