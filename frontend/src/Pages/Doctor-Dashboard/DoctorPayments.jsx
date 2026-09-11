

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
  FaFilePrescription,
  FaUserInjured,
  FaCreditCard,
  FaFlask,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import DoctorPaymentCard from "../../Component/cards/DoctorPaymentCard";
import DoctorPaymentsTable from "../../Component/tables/DoctorPaymentsTable";

import {
  getDoctorPayments,
} from "../../services/Doctor/DoctorPaymentsAPI";

import api from "../../api/axios";

import "../../Styles/Doctor/DoctorPayments1.css";

const DEFAULT_PATIENT_PHOTO =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

function DoctorPayments() {
  const navigate = useNavigate();

  const doctor =
    JSON.parse(
      localStorage.getItem("doctor"),
    ) || {};

  const [payments, setPayments] =
    useState([]);

  const [prescriptions, setPrescriptions] =
    useState([]);

  const [patients, setPatients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [prescriptionLoading, setPrescriptionLoading] =
    useState(true);

  // =========================================================
  // DOCTOR ID
  // =========================================================

  const doctorId =
    doctor?._id ||
    doctor?.id ||
    doctor?.doctorId ||
    doctor?.doctorID ||
    "";

  // =========================================================
  // GET PATIENT ID
  // =========================================================

  const getPatientId = (patient) => {
    return (
      patient?._id ||
      patient?.id ||
      patient?.patientId ||
      patient?.patientID ||
      patient?.patientCode ||
      ""
    );
  };

  // =========================================================
  // GET PATIENT NAME
  // =========================================================

  const getPatientName = (patient) => {
    return (
      patient?.FullName ||
      patient?.fullName ||
      patient?.name ||
      patient?.patientName ||
      "Unknown Patient"
    );
  };

  // =========================================================
  // NORMALIZE RESPONSE
  // =========================================================

  const extractList = (response) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.data)) {
      return response.data.data;
    }

    if (Array.isArray(response?.data?.doctorPayments)) {
      return response.data.doctorPayments;
    }

    if (Array.isArray(response?.data?.prescriptions)) {
      return response.data.prescriptions;
    }

    if (Array.isArray(response?.data?.patients)) {
      return response.data.patients;
    }

    return [];
  };

  // =========================================================
  // LOAD PAYMENTS
  // =========================================================

  const loadPayments = async () => {
    try {
      setLoading(true);

      const data =
        await getDoctorPayments();

      const paymentList =
        Array.isArray(data)
          ? data
          : data?.doctorPayments ||
          data?.DoctorPayments ||
          data?.data ||
          [];

      // Only this doctor's payments
      const doctorPayments =
        doctorId
          ? paymentList.filter(
            (item) =>
              String(
                item?.doctorId ||
                item?.doctor?._id ||
                item?.doctor?.id ||
                "",
              ) === String(doctorId),
          )
          : paymentList;

      setPayments(
        Array.isArray(
          doctorPayments,
        )
          ? doctorPayments
          : [],
      );
    } catch (error) {
      console.error(
        "Failed to load doctor payments:",
        error,
      );

      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD PRESCRIPTIONS + PATIENTS
  // =========================================================

  const loadPrescriptionPatients =
    async () => {
      try {
        setPrescriptionLoading(true);

        const [
          patientResponse,
          prescriptionResponse,
        ] = await Promise.all([
          api.get("/patients"),
          api.get("/prescriptions"),
        ]);

        const patientList =
          extractList(
            patientResponse,
          );

        const prescriptionList =
          extractList(
            prescriptionResponse,
          );


        setPatients(patientList);

        // Only this doctor's prescriptions
        const doctorPrescriptions =
          doctorId
            ? prescriptionList.filter(
              (item) =>
                String(
                  item?.doctorId ||
                  item?.doctor?._id ||
                  item?.doctor?.id ||
                  "",
                ) === String(
                  doctorId,
                ),
            )
            : prescriptionList;

        setPrescriptions(
          Array.isArray(
            doctorPrescriptions,
          )
            ? doctorPrescriptions
            : [],
        );
      } catch (error) {
        console.error(
          "Failed to load prescriptions:",
          error,
        );

        setPatients([]);
        setPrescriptions([]);
      } finally {
        setPrescriptionLoading(
          false,
        );
      }
    };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    loadPayments();
    loadPrescriptionPatients();

    const interval =
      setInterval(() => {
        loadPayments();
        loadPrescriptionPatients();
      }, 5000);

    const refreshOnFocus =
      () => {
        loadPayments();
        loadPrescriptionPatients();
      };

    window.addEventListener(
      "focus",
      refreshOnFocus,
    );

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "focus",
        refreshOnFocus,
      );
    };
  }, []);

  // =========================================================
  // MATCH PRESCRIPTION TO PATIENT
  // =========================================================

  const prescriptionPatientId =
    (prescription) => {
      return (
        prescription?.patientId ||
        prescription?.patientID ||
        prescription?.patientCode ||
        prescription?.patient?._id ||
        prescription?.patient?.id ||
        prescription?.patient?.patientId ||
        prescription?.patient?.patientID ||
        prescription?.patient?.patientCode ||
        ""
      );
    };

  // =========================================================
  // MATCH PAYMENT TO PATIENT
  // =========================================================

  const paymentPatientId =
    (payment) => {
      return (
        payment?.patientId ||
        payment?.patientID ||
        payment?.patientCode ||
        payment?.patient?._id ||
        payment?.patient?.id ||
        payment?.patient?.patientId ||
        payment?.patient?.patientID ||
        payment?.patient?.patientCode ||
        ""
      );
    };

  // =========================================================
  // PRESCRIPTION PATIENTS WITHOUT PAYMENT
  // =========================================================

  const prescriptionPatients =
    useMemo(() => {
      const result = [];

      prescriptions.forEach(
        (prescription) => {
          const pId =
            prescriptionPatientId(
              prescription,
            );

          if (!pId) return;

          const patient =
            patients.find((item) =>
              [
                item?._id,
                item?.id,
                item?.patientId,
                item?.patientID,
                item?.patientCode,
              ]
                .filter(Boolean)
                .map(String)
                .includes(
                  String(pId),
                ),
            );

          const alreadyPaid =
            payments.some(
              (payment) =>
                String(
                  paymentPatientId(
                    payment,
                  ),
                ) ===
                String(pId),
            );

          // Patient has prescription but
          // no payment yet
          if (!alreadyPaid) {
            const exists =
              result.some(
                (item) =>
                  String(
                    item.patientId,
                  ) ===
                  String(pId),
              );

            if (!exists) {
              result.push({
                patientId:
                  String(pId),

                patient,

                prescription,

                patientName:
                  patient
                    ? getPatientName(
                      patient,
                    )
                    : prescription
                      ?.patient
                      ?.fullName ||
                    prescription
                      ?.patient
                      ?.name ||
                    prescription
                      ?.patientName ||
                    "Unknown Patient",

                patientPhoto:
                  patient
                    ?.profilePhoto ||
                  patient
                    ?.patientPhoto ||
                  patient
                    ?.profileImage ||
                  prescription
                    ?.patient
                    ?.profilePhoto ||
                  DEFAULT_PATIENT_PHOTO,

                prescriptionId:
                  prescription
                    ?.prescriptionId ||
                  prescription
                    ?.id ||
                  prescription
                    ?._id ||
                  "",

                diagnosis:
                  prescription
                    ?.diagnosis ||
                  prescription
                    ?.disease ||
                  "",
              });
            }
          }
        },
      );

      return result;
    }, [
      prescriptions,
      patients,
      payments,
    ]);

  // =========================================================
  // SEARCH PAYMENTS
  // =========================================================

  const filteredPayments =
    useMemo(() => {
      return payments.filter(
        (payment) => {
          const searchText =
            search
              .toLowerCase()
              .trim();

          const matchesSearch =
            String(
              payment?.patientName ||
              "",
            )
              .toLowerCase()
              .includes(
                searchText,
              ) ||
            String(
              payment?.paymentId ||
              payment?.id ||
              payment?._id ||
              "",
            )
              .toLowerCase()
              .includes(
                searchText,
              ) ||
            String(
              payment?.patientId ||
              "",
            )
              .toLowerCase()
              .includes(
                searchText,
              ) ||
            String(
              payment?.appointmentId ||
              "",
            )
              .toLowerCase()
              .includes(
                searchText,
              );

          const matchesStatus =
            statusFilter === "All" ||
            String(
              payment?.paymentStatus ||
              "",
            ).toLowerCase() ===
            String(
              statusFilter,
            ).toLowerCase();

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      payments,
      search,
      statusFilter,
    ]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const paidPayments =
    payments.filter(
      (item) =>
        String(
          item?.paymentStatus ||
          "",
        ).toLowerCase() ===
        "paid",
    );

  const pendingPayments =
    payments.filter(
      (item) =>
        String(
          item?.paymentStatus ||
          "",
        ).toLowerCase() !==
        "paid",
    );

  const totalRevenue =
    payments.reduce(
      (sum, item) =>
        sum +
        Number(
          item?.totalAmount || 0,
        ),
      0,
    );

  const paidRevenue =
    paidPayments.reduce(
      (sum, item) =>
        sum +
        Number(
          item?.totalAmount || 0,
        ),
      0,
    );

  const pendingRevenue =
    pendingPayments.reduce(
      (sum, item) =>
        sum +
        Number(
          item?.totalAmount || 0,
        ),
      0,
    );

  const consultationRevenue =
    payments.reduce(
      (sum, item) =>
        sum +
        Number(
          item?.consultationFee ||
          0,
        ),
      0,
    );

  const medicalRevenue =
    payments.reduce(
      (sum, item) =>
        sum +
        Number(
          item?.medicalBill || 0,
        ),
      0,
    );

  const testRevenue =
    payments.reduce(
      (sum, item) =>
        sum +
        Number(
          item?.testBill || 0,
        ),
      0,
    );

  const todaysPayments =
    payments.filter(
      (item) => {
        const date =
          item?.paidDate ||
          item?.paymentDate ||
          "";

        return String(
          date,
        ).startsWith(today);
      },
    );

  const todaysEarnings =
    todaysPayments
      .filter(
        (item) =>
          String(
            item?.paymentStatus ||
            "",
          ).toLowerCase() ===
          "paid",
      )
      .reduce(
        (sum, item) =>
          sum +
          Number(
            item?.totalAmount ||
            0,
          ),
        0,
      );

  // =========================================================
  // IMAGE ERROR
  // =========================================================

  const handleImageError =
    (e) => {
      e.currentTarget.src =
        DEFAULT_PATIENT_PHOTO;
    };

  // =========================================================
  // CREATE PAYMENT
  // =========================================================

  const handleCreatePayment =
    (patientId) => {
      navigate(
        `/doctor/create-payment?patientId=${encodeURIComponent(
          patientId,
        )}`,
      );
    };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="doctor-payments">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="doctor-payments-header">
        <div>
          <h1>
            Doctor Payments Dashboard
          </h1>

          <p>
            Live payment records, paid
            amount, pending amount,
            and earnings.
          </p>
        </div>

        <button
          className="create-payment-btn"
          onClick={() =>
            navigate(
              "/doctor/create-payment",
            )
          }
        >
          <FaPlus />
          Create Payment
        </button>
      </div>

      {/* =====================================================
          PAYMENT CARDS
      ===================================================== */}

      <div className="doctor-payments__cards">

        <DoctorPaymentCard
          title="Today's Paid Earnings"
          value={`₹${todaysEarnings.toLocaleString(
            "en-IN",
          )}`}
          subtitle={`${todaysPayments.length} payments today`}
          icon={<FaMoneyBillWave />}
        />

        <DoctorPaymentCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString(
            "en-IN",
          )}`}
          subtitle="All generated bills"
          icon={<FaWallet />}
        />

        <DoctorPaymentCard
          title="Paid Amount"
          value={`₹${paidRevenue.toLocaleString(
            "en-IN",
          )}`}
          subtitle={`${paidPayments.length} paid bills`}
          icon={<FaCheckCircle />}
        />

        <DoctorPaymentCard
          title="Pending Amount"
          value={`₹${pendingRevenue.toLocaleString(
            "en-IN",
          )}`}
          subtitle={`${pendingPayments.length} pending bills`}
          icon={<FaClock />}
        />

        <DoctorPaymentCard
          title="Consultation Revenue"
          value={`₹${consultationRevenue.toLocaleString(
            "en-IN",
          )}`}
          subtitle="Doctor consultation fees"
          icon={<FaUserMd />}
        />

        <DoctorPaymentCard
          title="Medical Revenue"
          value={`₹${medicalRevenue.toLocaleString(
            "en-IN",
          )}`}
          subtitle="Medicines"
          icon={<FaFileInvoiceDollar />}
        />

        <DoctorPaymentCard
          title="Test Revenue"
          value={`₹${testRevenue.toLocaleString(
            "en-IN",
          )}`}
          subtitle="Laboratory tests"
          icon={<FaFlask />}
        />

        <DoctorPaymentCard
          title="Patients Treated"
          value={
            new Set(
              payments.map(
                (item) =>
                  paymentPatientId(
                    item,
                  ),
              ),
            ).size
          }
          subtitle="Unique patients"
          icon={<FaUsers />}
        />
      </div>

      {/* =====================================================
          PRESCRIPTION PATIENTS WITHOUT PAYMENT
      ===================================================== */}

      <div className="prescription-payment-section">

        <div className="prescription-payment-header">
          <div>
            <h2>
              <FaFilePrescription />
              Prescription Patients
            </h2>

            <p>
              Patients with a prescription
              but no payment created yet.
            </p>
          </div>

          <span>
            {prescriptionPatients.length}
          </span>
        </div>

        {prescriptionLoading ? (
          <div className="payments-loading-text">
            Checking prescriptions...
          </div>
        ) : prescriptionPatients.length ===
          0 ? (
          <div className="no-prescription-payment">
            <FaCheckCircle />

            <h3>
              All prescription payments
              are created
            </h3>

            <p>
              There are no patients waiting
              for payment creation.
            </p>
          </div>
        ) : (
          <div className="prescription-patient-list">

            {prescriptionPatients.map(
              (item, index) => (
                <div
                  className="prescription-patient-card"
                  key={`${item.patientId}-${index}`}
                >
                  <div className="prescription-patient-info">

                    <img
                      src={
                        item.patientPhoto ||
                        DEFAULT_PATIENT_PHOTO
                      }
                      alt={
                        item.patientName
                      }
                      onError={
                        handleImageError
                      }
                    />

                    <div>
                      <h3>
                        {
                          item.patientName
                        }
                      </h3>

                      <p>
                        <strong>
                          Patient ID:
                        </strong>{" "}
                        {
                          item.patientId
                        }
                      </p>

                      <p>
                        <strong>
                          Prescription:
                        </strong>{" "}
                        {
                          item.prescriptionId ||
                          "N/A"
                        }
                      </p>

                      <p>
                        <strong>
                          Diagnosis:
                        </strong>{" "}
                        {
                          item.diagnosis ||
                          "N/A"
                        }
                      </p>
                    </div>
                  </div>

                  <div className="prescription-patient-action">

                    <span className="payment-not-created">
                      <FaCreditCard />
                      Payment Not Created
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleCreatePayment(
                          item.patientId,
                        )
                      }
                    >
                      <FaPlus />
                      Create Payment
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="doctor-payments__search">

        <input
          type="text"
          placeholder="Search patient, payment ID, appointment ID..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value,
            )
          }
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value,
            )
          }
        >
          <option value="All">
            All Payments
          </option>

          <option value="Paid">
            Paid
          </option>

          <option value="Pending">
            Pending
          </option>
        </select>

        <button
          type="button"
          onClick={() => {
            loadPayments();
            loadPrescriptionPatients();
          }}
        >
          Refresh
        </button>
      </div>

      {/* =====================================================
          PAYMENT TABLE
      ===================================================== */}

      {loading ? (
        <p className="payments-loading-text">
          Loading payments...
        </p>
      ) : (
        <DoctorPaymentsTable
          payments={
            filteredPayments
          }
        />
      )}
    </div>
  );
}

export default DoctorPayments;
