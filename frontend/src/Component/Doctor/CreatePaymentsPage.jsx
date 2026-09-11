
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaFilePrescription,
  FaFlask,
  FaPlus,
  FaTrash,
  FaUserInjured,
  FaPills,
  FaCalculator,
  FaUserMd,
  FaCalendarAlt,
  FaHashtag,
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaReceipt,
  FaStethoscope,
  FaNotesMedical,
  FaShieldAlt,
  FaSave,
  FaSearch,
} from "react-icons/fa";

import api from "../../api/axios";
import { createDoctorPayment } from "../../services/Doctor/DoctorPaymentsAPI";

import "../../Styles/Doctor/CreateDoctorPaymentsPage.css";

const DEFAULT_PATIENT_PHOTO =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

function CreatePaymentsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================================
     DOCTOR
     ========================================================= */

  const doctor = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("doctor")) || {};
    } catch {
      return {};
    }
  }, []);

  const doctorId =
    doctor?._id ||
    doctor?.id ||
    doctor?.doctorId ||
    doctor?.doctorID ||
    "";

  const doctorName =
    doctor?.fullName ||
    doctor?.FullName ||
    doctor?.name ||
    doctor?.doctorName ||
    "";

  /* =========================================================
     STATE
     ========================================================= */

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [existingPayments, setExistingPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedPrescription, setSelectedPrescription] =
    useState(null);

  const [patientSearch, setPatientSearch] = useState("");

  const [payment, setPayment] = useState({
    patientId: "",
    patientName: "",
    patientCode: "",
    patientPhoto: "",

    appointmentId: "",

    doctorId: "",
    doctorName: "",

    department: "",
    disease: "",

    consultationFee: 500,
    medicalBill: 0,
    testBill: 0,
    totalAmount: 500,

    paymentMethod: "Cash",
    paymentStatus: "Paid",
  });

  const [medicines, setMedicines] = useState([]);
  const [tests, setTests] = useState([]);

  /* =========================================================
     HELPERS
     ========================================================= */

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const getPatientId = (patient) => {
    if (!patient) return "";

    return (
      patient?._id ||
      patient?.id ||
      patient?.patientId ||
      patient?.patientID ||
      patient?.patientCode ||
      ""
    );
  };

  const getPatientCode = (patient) => {
    if (!patient) return "";

    return (
      patient?.patientId ||
      patient?.patientID ||
      patient?.patientCode ||
      patient?.id ||
      patient?._id ||
      ""
    );
  };

  const getPatientName = (patient) => {
    if (!patient) return "";

    return (
      patient?.FullName ||
      patient?.fullName ||
      patient?.name ||
      patient?.patientName ||
      ""
    );
  };

  const getPatientPhoto = (patient) => {
    if (!patient) return DEFAULT_PATIENT_PHOTO;

    return (
      patient?.profilePhoto ||
      patient?.patientPhoto ||
      patient?.profileImage ||
      patient?.patientImage ||
      patient?.photo ||
      patient?.image ||
      DEFAULT_PATIENT_PHOTO
    );
  };

  const extractList = (response) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.data)) {
      return response.data.data;
    }

    if (Array.isArray(response?.data?.patients)) {
      return response.data.patients;
    }

    if (Array.isArray(response?.data?.prescriptions)) {
      return response.data.prescriptions;
    }

    if (Array.isArray(response?.data?.appointments)) {
      return response.data.appointments;
    }

    if (Array.isArray(response?.data?.doctorPayments)) {
      return response.data.doctorPayments;
    }

    return [];
  };

  /* =========================================================
     MATCH PATIENT
     ========================================================= */

  const prescriptionMatchesPatient = (
    prescription,
    patientId,
  ) => {
    const ids = [
      prescription?.patientId,
      prescription?.patientID,
      prescription?.patientCode,

      prescription?.patient?._id,
      prescription?.patient?.id,
      prescription?.patient?.patientId,
      prescription?.patient?.patientID,
      prescription?.patient?.patientCode,
    ]
      .filter(Boolean)
      .map(String);

    return ids.includes(String(patientId));
  };

  const paymentMatchesPatient = (
    paymentItem,
    patientId,
  ) => {
    const ids = [
      paymentItem?.patientId,
      paymentItem?.patientID,
      paymentItem?.patientCode,

      paymentItem?.patient?._id,
      paymentItem?.patient?.id,
      paymentItem?.patient?.patientId,
      paymentItem?.patient?.patientID,
      paymentItem?.patient?.patientCode,
    ]
      .filter(Boolean)
      .map(String);

    return ids.includes(String(patientId));
  };

  /* =========================================================
     FIND LATEST PRESCRIPTION
     ========================================================= */

  const findLatestPrescription = (
    patientId,
    prescriptionList = prescriptions,
  ) => {
    const patientPrescriptions =
      prescriptionList.filter((item) =>
        prescriptionMatchesPatient(
          item,
          patientId,
        ),
      );

    if (!patientPrescriptions.length) {
      return null;
    }

    return [...patientPrescriptions].sort(
      (a, b) => {
        const dateA = new Date(
          a?.createdAt ||
          a?.updatedAt ||
          a?.date ||
          a?.visitDate ||
          0,
        ).getTime();

        const dateB = new Date(
          b?.createdAt ||
          b?.updatedAt ||
          b?.date ||
          b?.visitDate ||
          0,
        ).getTime();

        return dateB - dateA;
      },
    )[0];
  };

  /* =========================================================
     FIND LATEST APPOINTMENT
     ========================================================= */

  const findLatestAppointment = (
    patientId,
    appointmentList = appointments,
  ) => {
    const patientAppointments =
      appointmentList.filter((item) => {
        const ids = [
          item?.patientId,
          item?.patientID,
          item?.patientCode,

          item?.patient?._id,
          item?.patient?.id,
          item?.patient?.patientId,
          item?.patient?.patientID,
          item?.patient?.patientCode,
        ]
          .filter(Boolean)
          .map(String);

        return ids.includes(String(patientId));
      });

    if (!patientAppointments.length) {
      return null;
    }

    return [...patientAppointments].sort(
      (a, b) => {
        const dateA = new Date(
          a?.appointmentDate ||
          a?.visitDate ||
          a?.createdAt ||
          0,
        ).getTime();

        const dateB = new Date(
          b?.appointmentDate ||
          b?.visitDate ||
          b?.createdAt ||
          0,
        ).getTime();

        return dateB - dateA;
      },
    )[0];
  };

  /* =========================================================
     NORMALIZE MEDICINES
     ========================================================= */

  const normalizeMedicines = (prescription) => {
    if (!prescription) return [];

    const prescriptionMedicines =
      prescription?.medicines;

    if (!Array.isArray(prescriptionMedicines)) {
      return [];
    }

    return prescriptionMedicines.map(
      (medicine, index) => {
        const tabletName =
          medicine?.tabletName ||
          medicine?.medicineName ||
          medicine?.name ||
          medicine?.medicine ||
          medicine?.drugName ||
          "";

        const quantity = Number(
          medicine?.quantity ??
          medicine?.qty ??
          medicine?.count ??
          1,
        );

        const price = Number(
          medicine?.price ??
          medicine?.unitPrice ??
          medicine?.amount ??
          medicine?.cost ??
          0,
        );

        return {
          id:
            medicine?.id ||
            medicine?._id ||
            `${Date.now()}-medicine-${index}`,

          tabletName,

          quantity:
            quantity > 0 ? quantity : 1,

          price:
            price >= 0 ? price : 0,

          dosage:
            medicine?.dosage ||
            medicine?.dose ||
            "",

          frequency:
            medicine?.frequency ||
            "",

          duration:
            medicine?.duration ||
            "",
        };
      },
    );
  };

  /* =========================================================
     NORMALIZE TESTS
     ========================================================= */

  const normalizeTests = (prescription) => {
    if (!prescription) return [];

    const rawTests =
      prescription?.testsRecommended ||
      prescription?.tests ||
      prescription?.recommendedTests ||
      prescription?.investigations ||
      prescription?.labTests ||
      prescription?.testRecommendations ||
      prescription?.testNames ||
      [];

    if (Array.isArray(rawTests)) {
      return rawTests
        .map((test, index) => {
          if (typeof test === "string") {
            return {
              id: `${Date.now()}-test-${index}`,
              testName: test.trim(),
              price: 0,
            };
          }

          return {
            id:
              test?.id ||
              test?._id ||
              `${Date.now()}-test-${index}`,

            testName:
              test?.testName ||
              test?.name ||
              test?.test ||
              test?.investigation ||
              "",

            price: Number(
              test?.price ??
              test?.amount ??
              test?.cost ??
              0,
            ),
          };
        })
        .filter((test) => test.testName);
    }

    if (typeof rawTests === "string") {
      return rawTests
        .split(",")
        .map((item, index) => ({
          id: `${Date.now()}-test-${index}`,
          testName: item.trim(),
          price: 0,
        }))
        .filter((item) => item.testName);
    }

    return [];
  };

  /* =========================================================
     LOAD DATA
     ========================================================= */

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        patientRes,
        appointmentRes,
        prescriptionRes,
        paymentRes,
      ] = await Promise.all([
        api.get("/patients"),
        api.get("/appointments"),
        api.get("/prescriptions"),
        api.get("/doctorPayments"),
      ]);

      const patientList =
        extractList(patientRes);

      const appointmentList =
        extractList(appointmentRes);

      const prescriptionList =
        extractList(prescriptionRes);

      const paymentList =
        extractList(paymentRes);


      setPatients(patientList);
      setAppointments(appointmentList);
      setPrescriptions(prescriptionList);
      setExistingPayments(paymentList);

      /* =====================================================
         OPEN WITH PATIENT FROM QUERY STRING
         ===================================================== */

      const params = new URLSearchParams(
        location.search,
      );

      const queryPatientId =
        params.get("patientId") ||
        params.get("patientID") ||
        params.get("id");

      if (queryPatientId) {
        const patient = patientList.find(
          (item) =>
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
                String(queryPatientId),
              ),
        );

        if (patient) {
          selectPatient(patient, {
            appointmentList,
            prescriptionList,
          });
        }
      }
    } catch (error) {
      console.error(
        "Error loading payment data:",
        error,
      );

      console.error(
        "Server response:",
        error?.response?.data,
      );

      setPatients([]);
      setAppointments([]);
      setPrescriptions([]);
      setExistingPayments([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     SELECT PATIENT
     ========================================================= */

  const selectPatient = (
    patient,
    data = {
      appointmentList: appointments,
      prescriptionList: prescriptions,
    },
  ) => {
    if (!patient) return;

    const patientId =
      getPatientId(patient);

    const patientName =
      getPatientName(patient);

    const patientPhoto =
      getPatientPhoto(patient);

    const latestPrescription =
      findLatestPrescription(
        patientId,
        data.prescriptionList,
      );

    const latestAppointment =
      findLatestAppointment(
        patientId,
        data.appointmentList,
      );

    const prescriptionMedicines =
      normalizeMedicines(
        latestPrescription,
      );

    const prescriptionTests =
      normalizeTests(
        latestPrescription,
      );

    const prescriptionAppointmentId =
      latestPrescription?.appointmentId ||
      latestPrescription?.appointmentID ||
      latestPrescription?.appointment?._id ||
      latestPrescription?.appointment?.id ||
      "";

    const appointmentId =
      prescriptionAppointmentId ||
      latestAppointment?.appointmentId ||
      latestAppointment?.appointmentID ||
      latestAppointment?.id ||
      latestAppointment?._id ||
      "";

    const prescriptionDepartment =
      latestPrescription?.department ||
      latestAppointment?.department ||
      patient?.department ||
      "";

    const prescriptionDisease =
      latestPrescription?.disease ||
      latestPrescription?.diagnosis ||
      latestAppointment?.disease ||
      latestAppointment?.diagnosis ||
      "";

    console.log(
      "Selected Patient:",
      patient,
    );

    console.log(
      "Latest Prescription:",
      latestPrescription,
    );

    console.log(
      "Latest Appointment:",
      latestAppointment,
    );

    setSelectedPrescription(
      latestPrescription || null,
    );

    setMedicines(
      prescriptionMedicines,
    );

    setTests(
      prescriptionTests,
    );

    setPayment((previous) => ({
      ...previous,

      patientId: String(
        patientId || "",
      ),

      patientName,

      patientCode:
        getPatientCode(patient),

      patientPhoto,

      doctorId: String(
        doctorId || "",
      ),

      doctorName,

      appointmentId: String(
        appointmentId || "",
      ),

      department:
        prescriptionDepartment,

      disease:
        prescriptionDisease,
    }));
  };

  /* =========================================================
     PATIENT CHANGE
     ========================================================= */

  const handlePatientChange = (e) => {
    const selectedId = String(
      e.target.value,
    );

    const patient = patients.find(
      (item) =>
        [
          item?._id,
          item?.id,
          item?.patientId,
          item?.patientID,
          item?.patientCode,
        ]
          .filter(Boolean)
          .map(String)
          .includes(selectedId),
    );

    if (!patient) {
      setSelectedPrescription(null);
      setMedicines([]);
      setTests([]);

      setPayment((previous) => ({
        ...previous,

        patientId: "",
        patientName: "",
        patientCode: "",
        patientPhoto: "",
        appointmentId: "",
        department: "",
        disease: "",
      }));

      return;
    }

    selectPatient(patient);
  };

  /* =========================================================
     MEDICINE CHANGE
     ========================================================= */

  const handleMedicineChange = (
    index,
    e,
  ) => {
    const {
      name,
      value,
    } = e.target;

    setMedicines((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],

        [name]:
          name === "quantity" ||
            name === "price"
            ? Number(value)
            : value,
      };

      return updated;
    });
  };

  /* =========================================================
     ADD MEDICINE
     ========================================================= */

  const addMedicine = () => {
    setMedicines((previous) => [
      ...previous,

      {
        id: `${Date.now()}-medicine`,
        tabletName: "",
        quantity: 1,
        price: 0,
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  /* =========================================================
     REMOVE MEDICINE
     ========================================================= */

  const removeMedicine = (index) => {
    setMedicines((previous) =>
      previous.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  };

  /* =========================================================
     TEST CHANGE
     ========================================================= */

  const handleTestChange = (
    index,
    e,
  ) => {
    const {
      name,
      value,
    } = e.target;

    setTests((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],

        [name]:
          name === "price"
            ? Number(value)
            : value,
      };

      return updated;
    });
  };

  /* =========================================================
     ADD TEST
     ========================================================= */

  const addTest = () => {
    setTests((previous) => [
      ...previous,

      {
        id: `${Date.now()}-test`,
        testName: "",
        price: 0,
      },
    ]);
  };

  /* =========================================================
     REMOVE TEST
     ========================================================= */

  const removeTest = (index) => {
    setTests((previous) =>
      previous.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  };

  /* =========================================================
     GENERAL PAYMENT CHANGE
     ========================================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setPayment((previous) => ({
      ...previous,

      [name]:
        name === "consultationFee"
          ? Number(value)
          : value,
    }));
  };

  /* =========================================================
     MEDICINE BILL
     ========================================================= */

  const medicalBill = useMemo(() => {
    return medicines.reduce(
      (sum, medicine) => {
        return (
          sum +
          Number(
            medicine?.quantity || 0,
          ) *
          Number(
            medicine?.price || 0,
          )
        );
      },
      0,
    );
  }, [medicines]);

  /* =========================================================
     TEST BILL
     ========================================================= */

  const testBill = useMemo(() => {
    return tests.reduce(
      (sum, test) => {
        return (
          sum +
          Number(
            test?.price || 0,
          )
        );
      },
      0,
    );
  }, [tests]);

  /* =========================================================
     TOTAL
     ========================================================= */

  const totalAmount = useMemo(() => {
    return (
      Number(
        payment.consultationFee || 0,
      ) +
      Number(medicalBill || 0) +
      Number(testBill || 0)
    );
  }, [
    payment.consultationFee,
    medicalBill,
    testBill,
  ]);

  /* =========================================================
     UPDATE CALCULATED VALUES
     ========================================================= */

  useEffect(() => {
    setPayment((previous) => ({
      ...previous,

      medicalBill,

      testBill,

      totalAmount,
    }));
  }, [
    medicalBill,
    testBill,
    totalAmount,
  ]);

  /* =========================================================
     FILTER PATIENTS
     ========================================================= */

  const filteredPatients = useMemo(() => {
    const search =
      patientSearch
        .trim()
        .toLowerCase();

    if (!search) {
      return patients;
    }

    return patients.filter(
      (patient) => {
        const id = String(
          getPatientId(patient),
        ).toLowerCase();

        const name = String(
          getPatientName(patient),
        ).toLowerCase();

        const code = String(
          getPatientCode(patient),
        ).toLowerCase();

        return (
          id.includes(search) ||
          name.includes(search) ||
          code.includes(search)
        );
      },
    );
  }, [
    patients,
    patientSearch,
  ]);

  /* =========================================================
     PAYMENT STATUS FOR SELECTED PATIENT
     ========================================================= */

  const selectedPatientHasPayment =
    useMemo(() => {
      if (!payment.patientId) {
        return false;
      }

      return existingPayments.some(
        (item) =>
          paymentMatchesPatient(
            item,
            payment.patientId,
          ),
      );
    }, [
      existingPayments,
      payment.patientId,
    ]);

  /* =========================================================
     PRESCRIPTION COUNTS
     ========================================================= */

  const medicineCount =
    medicines.length;

  const testCount =
    tests.length;

  /* =========================================================
     SUBMIT PAYMENT
     ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!payment.patientId) {
      alert(
        "Please select a patient.",
      );
      return;
    }

    if (!payment.patientName) {
      alert(
        "Patient name is required.",
      );
      return;
    }

    if (!doctorId) {
      alert(
        "Doctor ID is missing. Please login again.",
      );
      return;
    }

    /* =====================================================
       PREVENT DUPLICATE PAYMENT
       ===================================================== */

    if (selectedPatientHasPayment) {
      const shouldContinue =
        window.confirm(
          "A payment record already exists for this patient. Do you want to create another payment?",
        );

      if (!shouldContinue) {
        return;
      }
    }

    /* =====================================================
       VALIDATE MEDICINES
       ===================================================== */

    const validMedicines =
      medicines.filter(
        (medicine) =>
          String(
            medicine?.tabletName ||
            "",
          ).trim(),
      );

    const validTests =
      tests.filter(
        (test) =>
          String(
            test?.testName || "",
          ).trim(),
      );

    try {
      setSaving(true);

      const prescriptionId =
        selectedPrescription?.prescriptionId ||
        selectedPrescription?.id ||
        selectedPrescription?._id ||
        "";

      const newPayment = {
        paymentId: `PAY-${Date.now()}`,

        paymentDate:
          new Date()
            .toISOString()
            .split("T")[0],

        doctorId: String(
          doctorId,
        ),

        doctorName,

        patientId: String(
          payment.patientId,
        ),

        patientName:
          payment.patientName,

        patientCode:
          payment.patientCode,

        patientPhoto:
          payment.patientPhoto,

        appointmentId:
          payment.appointmentId ||
          "",

        prescriptionId:
          prescriptionId || "",

        prescriptionIds:
          prescriptionId
            ? [String(prescriptionId)]
            : [],

        department:
          payment.department,

        disease:
          payment.disease,

        diagnosis:
          payment.disease,

        medicines:
          validMedicines.map(
            (medicine) => ({
              tabletName:
                medicine.tabletName,

              medicineName:
                medicine.tabletName,

              quantity: Number(
                medicine.quantity ||
                1,
              ),

              price: Number(
                medicine.price ||
                0,
              ),

              dosage:
                medicine.dosage ||
                "",

              frequency:
                medicine.frequency ||
                "",

              duration:
                medicine.duration ||
                "",
            }),
          ),

        tests:
          validTests.map(
            (test) => ({
              testName:
                test.testName,

              name:
                test.testName,

              quantity: 1,

              price: Number(
                test.price || 0,
              ),
            }),
          ),

        testsRecommended:
          validTests.map(
            (test) =>
              test.testName,
          ),

        consultationFee:
          Number(
            payment.consultationFee ||
            0,
          ),

        medicalBill:
          Number(
            medicalBill || 0,
          ),

        testBill:
          Number(
            testBill || 0,
          ),

        totalAmount:
          Number(
            totalAmount || 0,
          ),

        paymentMethod:
          payment.paymentMethod,

        paymentStatus:
          payment.paymentStatus,

        paidDate:
          payment.paymentStatus ===
            "Paid"
            ? new Date()
              .toISOString()
              .split("T")[0]
            : "",
      };

      console.log(
        "Creating Doctor Payment:",
        newPayment,
      );

      const response =
        await createDoctorPayment(
          newPayment,
        );

      console.log(
        "Payment Created:",
        response,
      );

      alert(
        "Payment Created Successfully.",
      );

      navigate(
        "/doctor/payments",
      );
    } catch (error) {
      console.error(
        "Failed to create payment:",
        error,
      );

      console.error(
        "Server response:",
        error?.response?.data,
      );

      alert(
        error?.response?.data?.message ||
        "Failed to create payment.",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     IMAGE ERROR
     ========================================================= */

  const handleImageError = (e) => {
    e.currentTarget.src =
      DEFAULT_PATIENT_PHOTO;
  };

  /* =========================================================
     LOADING
     ========================================================= */

  if (loading) {
    return (
      <div className="create-payment-page">
        <div className="create-payment-loading">
          <div className="create-payment-spinner" />

          <h3>
            Loading payment workspace
          </h3>

          <p>
            Loading patients,
            prescriptions and payment
            records...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="create-payment-page">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="create-payment-header">

        <div className="create-payment-header-left">

          <button
            type="button"
            className="back-payment-btn"
            onClick={() =>
              navigate(
                "/doctor/payments",
              )
            }
          >
            <FaArrowLeft />
            <span>
              Back to Payments
            </span>
          </button>

          <div className="create-payment-title">

            <div className="create-payment-title-icon">
              <FaReceipt />
            </div>

            <div>
              <span className="page-eyebrow">
                DOCTOR BILLING
              </span>

              <h1>
                Create Payment
              </h1>

              <p>
                Generate a patient payment
                from the latest prescription.
              </p>
            </div>

          </div>

        </div>

        <div className="create-payment-security">
          <FaShieldAlt />

          <div>
            <strong>
              Secure Billing
            </strong>

            <span>
              MongoDB synced
            </span>
          </div>
        </div>

      </header>

      <form
        className="create-payment-form"
        onSubmit={handleSubmit}
      >

        {/* ===================================================
            PATIENT INFORMATION
        =================================================== */}

        <section className="payment-section patient-section">

          <div className="payment-section-header">

            <div className="section-heading">

              <div className="section-icon blue">
                <FaUserInjured />
              </div>

              <div>
                <h2>
                  Patient Information
                </h2>

                <p>
                  Select a patient to load
                  prescription and appointment
                  details.
                </p>
              </div>

            </div>

            <span className="section-step">
              01
            </span>

          </div>

          <div className="patient-selector-area">

            <div className="patient-search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search patient by name or ID..."
                value={patientSearch}
                onChange={(e) =>
                  setPatientSearch(
                    e.target.value,
                  )
                }
              />

            </div>

            <div className="patient-select-wrapper">

              <label>
                Select Patient
                <span>*</span>
              </label>

              <select
                value={
                  payment.patientId
                }
                onChange={
                  handlePatientChange
                }
                required
              >
                <option value="">
                  Select patient
                </option>

                {filteredPatients.map(
                  (
                    patient,
                    index,
                  ) => {
                    const id =
                      getPatientId(
                        patient,
                      );

                    const name =
                      getPatientName(
                        patient,
                      );

                    if (!id) {
                      return null;
                    }

                    return (
                      <option
                        key={`${id}-${index}`}
                        value={String(id)}
                      >
                        {name ||
                          "Unknown Patient"}{" "}
                        — {id}
                      </option>
                    );
                  },
                )}
              </select>
            </div>

          </div>

          <div className="patient-profile-card">

            <div className="patient-avatar-wrapper">

              <img
                src={
                  payment.patientPhoto ||
                  DEFAULT_PATIENT_PHOTO
                }
                alt={
                  payment.patientName ||
                  "Patient"
                }
                onError={
                  handleImageError
                }
              />

              {payment.patientId && (
                <span className="patient-online-dot" />
              )}

            </div>

            <div className="patient-profile-main">

              <span>
                PATIENT
              </span>

              <h3>
                {payment.patientName ||
                  "No patient selected"}
              </h3>

              <div className="patient-profile-meta">

                <span>
                  <FaHashtag />

                  {payment.patientCode ||
                    payment.patientId ||
                    "N/A"}
                </span>

                <span>
                  <FaUserInjured />

                  {payment.patientId
                    ? "Patient selected"
                    : "Waiting for selection"}
                </span>

              </div>

            </div>

            <div className="patient-status-card">

              {payment.patientId ? (
                <>
                  <FaCheckCircle />

                  <div>
                    <strong>
                      Ready
                    </strong>

                    <span>
                      Patient verified
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <FaClock />

                  <div>
                    <strong>
                      Pending
                    </strong>

                    <span>
                      Select patient
                    </span>
                  </div>
                </>
              )}

            </div>

          </div>

          <div className="payment-grid patient-details-grid">

            <div className="payment-field">
              <label>
                Patient ID
              </label>

              <div className="input-with-icon">
                <FaHashtag />

                <input
                  value={
                    payment.patientId
                  }
                  readOnly
                  placeholder="Patient ID"
                />
              </div>
            </div>

            <div className="payment-field">
              <label>
                Patient Name
              </label>

              <div className="input-with-icon">
                <FaUserInjured />

                <input
                  value={
                    payment.patientName
                  }
                  readOnly
                  placeholder="Patient name"
                />
              </div>
            </div>

            <div className="payment-field">
              <label>
                Patient Code
              </label>

              <div className="input-with-icon">
                <FaHashtag />

                <input
                  value={
                    payment.patientCode
                  }
                  readOnly
                  placeholder="Patient code"
                />
              </div>
            </div>

          </div>

        </section>

        {/* ===================================================
            DOCTOR INFORMATION
        =================================================== */}

        <section className="payment-section">

          <div className="payment-section-header">

            <div className="section-heading">

              <div className="section-icon purple">
                <FaUserMd />
              </div>

              <div>
                <h2>
                  Doctor & Visit Information
                </h2>

                <p>
                  Details associated with this
                  billing record.
                </p>
              </div>

            </div>

            <span className="section-step">
              02
            </span>

          </div>

          <div className="payment-grid">

            <div className="payment-field">
              <label>
                Doctor ID
              </label>

              <div className="input-with-icon">
                <FaUserMd />

                <input
                  value={doctorId}
                  readOnly
                />
              </div>
            </div>

            <div className="payment-field">
              <label>
                Doctor Name
              </label>

              <div className="input-with-icon">
                <FaUserMd />

                <input
                  value={doctorName}
                  readOnly
                />
              </div>
            </div>

            <div className="payment-field">
              <label>
                Appointment ID
              </label>

              <div className="input-with-icon">
                <FaCalendarAlt />

                <input
                  value={
                    payment.appointmentId
                  }
                  readOnly
                  placeholder="Appointment ID"
                />
              </div>
            </div>

            <div className="payment-field">
              <label>
                Department
              </label>

              <div className="input-with-icon">
                <FaStethoscope />

                <input
                  value={
                    payment.department
                  }
                  readOnly
                  placeholder="Department"
                />
              </div>
            </div>

            <div className="payment-field full-width">
              <label>
                Disease / Diagnosis
              </label>

              <div className="input-with-icon">
                <FaNotesMedical />

                <input
                  value={
                    payment.disease
                  }
                  readOnly
                  placeholder="Diagnosis"
                />
              </div>
            </div>

          </div>

        </section>

        {/* ===================================================
            PRESCRIPTION
        =================================================== */}

        <section className="payment-section">

          <div className="payment-section-header">

            <div className="section-heading">

              <div className="section-icon green">
                <FaFilePrescription />
              </div>

              <div>
                <h2>
                  Prescription
                </h2>

                <p>
                  Latest prescription associated
                  with the selected patient.
                </p>
              </div>

            </div>

            <span className="section-step">
              03
            </span>

          </div>

          {selectedPrescription ? (
            <div className="prescription-summary">

              <div className="prescription-info-card">

                <div className="prescription-info-icon">
                  <FaFilePrescription />
                </div>

                <div>
                  <span>
                    PRESCRIPTION ID
                  </span>

                  <strong>
                    {selectedPrescription?.prescriptionId ||
                      selectedPrescription?.id ||
                      selectedPrescription?._id ||
                      "N/A"}
                  </strong>
                </div>

              </div>

              <div className="prescription-info-card">

                <div className="prescription-info-icon">
                  <FaNotesMedical />
                </div>

                <div>
                  <span>
                    DIAGNOSIS
                  </span>

                  <strong>
                    {selectedPrescription?.diagnosis ||
                      selectedPrescription?.disease ||
                      payment.disease ||
                      "N/A"}
                  </strong>
                </div>

              </div>

              <div className="prescription-info-card">

                <div className="prescription-info-icon">
                  <FaCalendarAlt />
                </div>

                <div>
                  <span>
                    DATE
                  </span>

                  <strong>
                    {selectedPrescription?.visitDate ||
                      selectedPrescription?.date ||
                      (
                        selectedPrescription?.createdAt
                          ? new Date(
                            selectedPrescription.createdAt,
                          ).toLocaleDateString(
                            "en-IN",
                          )
                          : "N/A"
                      )}
                  </strong>
                </div>

              </div>

              <div className="prescription-info-card">

                <div className="prescription-info-icon">
                  <FaCheckCircle />
                </div>

                <div>
                  <span>
                    STATUS
                  </span>

                  <strong>
                    {selectedPrescription?.status ||
                      "Active"}
                  </strong>
                </div>

              </div>

            </div>
          ) : (
            <div className="no-prescription">

              <div className="empty-icon">
                <FaFilePrescription />
              </div>

              <div>
                <h3>
                  No prescription found
                </h3>

                <p>
                  There is no prescription
                  associated with the selected
                  patient.
                </p>
              </div>

            </div>
          )}

        </section>

        {/* ===================================================
            MEDICINES
        =================================================== */}

        <section className="payment-section">

          <div className="payment-section-header">

            <div className="section-heading">

              <div className="section-icon blue">
                <FaPills />
              </div>

              <div>
                <h2>
                  Prescription Medicines
                </h2>

                <p>
                  Review medicines and enter
                  their billing price.
                </p>
              </div>

            </div>

            <div className="section-counter">
              {medicineCount}{" "}
              {medicineCount === 1
                ? "Medicine"
                : "Medicines"}
            </div>

          </div>

          {medicines.length === 0 ? (
            <div className="empty-line">
              <FaPills />

              <span>
                No medicines found in the
                prescription.
              </span>
            </div>
          ) : (
            <div className="items-list">

              <div className="items-header medicine-header">
                <span>
                  Medicine
                </span>

                <span>
                  Quantity
                </span>

                <span>
                  Unit Price
                </span>

                <span>
                  Amount
                </span>

                <span />
              </div>

              {medicines.map(
                (
                  medicine,
                  index,
                ) => {
                  const amount =
                    Number(
                      medicine?.quantity ||
                      0,
                    ) *
                    Number(
                      medicine?.price ||
                      0,
                    );

                  return (
                    <div
                      key={
                        medicine.id ||
                        index
                      }
                      className="billing-item medicine-item"
                    >

                      <div className="medicine-name-field">

                        <div className="item-number">
                          {index + 1}
                        </div>

                        <input
                          type="text"
                          name="tabletName"
                          placeholder="Medicine / Tablet Name"
                          value={
                            medicine.tabletName
                          }
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              e,
                            )
                          }
                        />

                      </div>

                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        placeholder="Qty"
                        value={
                          medicine.quantity
                        }
                        onChange={(e) =>
                          handleMedicineChange(
                            index,
                            e,
                          )
                        }
                      />

                      <div className="price-input">

                        <span>
                          ₹
                        </span>

                        <input
                          type="number"
                          name="price"
                          min="0"
                          placeholder="0"
                          value={
                            medicine.price
                          }
                          onChange={(e) =>
                            handleMedicineChange(
                              index,
                              e,
                            )
                          }
                        />

                      </div>

                      <strong className="item-amount">
                        {formatMoney(
                          amount,
                        )}
                      </strong>

                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() =>
                          removeMedicine(
                            index,
                          )
                        }
                        title="Remove medicine"
                      >
                        <FaTrash />
                      </button>

                    </div>
                  );
                },
              )}

            </div>
          )}

          <div className="section-action-row">

            <button
              type="button"
              className="secondary-add-btn"
              onClick={addMedicine}
            >
              <FaPlus />
              Add Medicine
            </button>

            <div className="bill-line modern-bill-line">
              <span>
                Medicine Bill
              </span>

              <strong>
                {formatMoney(
                  medicalBill,
                )}
              </strong>
            </div>

          </div>

        </section>

        {/* ===================================================
            TESTS
        =================================================== */}

        <section className="payment-section">

          <div className="payment-section-header">

            <div className="section-heading">

              <div className="section-icon cyan">
                <FaFlask />
              </div>

              <div>
                <h2>
                  Prescription Tests
                </h2>

                <p>
                  Add laboratory and diagnostic
                  tests to the patient bill.
                </p>
              </div>

            </div>

            <div className="section-counter">
              {testCount}{" "}
              {testCount === 1
                ? "Test"
                : "Tests"}
            </div>

          </div>

          {tests.length === 0 ? (
            <div className="empty-line">
              <FaFlask />

              <span>
                No tests found in the
                prescription.
              </span>
            </div>
          ) : (
            <div className="items-list">

              <div className="items-header test-header">
                <span>
                  Test Name
                </span>

                <span>
                  Price
                </span>

                <span>
                  Amount
                </span>

                <span />
              </div>

              {tests.map(
                (
                  test,
                  index,
                ) => (
                  <div
                    key={
                      test.id ||
                      index
                    }
                    className="billing-item test-item"
                  >

                    <div className="medicine-name-field">

                      <div className="item-number cyan-number">
                        {index + 1}
                      </div>

                      <input
                        type="text"
                        name="testName"
                        placeholder="Test Name"
                        value={
                          test.testName
                        }
                        onChange={(e) =>
                          handleTestChange(
                            index,
                            e,
                          )
                        }
                      />

                    </div>

                    <div className="price-input">

                      <span>
                        ₹
                      </span>

                      <input
                        type="number"
                        name="price"
                        min="0"
                        placeholder="0"
                        value={
                          test.price
                        }
                        onChange={(e) =>
                          handleTestChange(
                            index,
                            e,
                          )
                        }
                      />

                    </div>

                    <strong className="item-amount">
                      {formatMoney(
                        test.price,
                      )}
                    </strong>

                    <button
                      type="button"
                      className="remove-item-btn"
                      onClick={() =>
                        removeTest(
                          index,
                        )
                      }
                      title="Remove test"
                    >
                      <FaTrash />
                    </button>

                  </div>
                ),
              )}

            </div>
          )}

          <div className="section-action-row">

            <button
              type="button"
              className="secondary-add-btn cyan-btn"
              onClick={addTest}
            >
              <FaPlus />
              Add Test
            </button>

            <div className="bill-line modern-bill-line">
              <span>
                Test Bill
              </span>

              <strong>
                {formatMoney(
                  testBill,
                )}
              </strong>
            </div>

          </div>

        </section>

        {/* ===================================================
            PAYMENT CALCULATION
        =================================================== */}

        <section className="payment-section calculation-section">

          <div className="payment-section-header">

            <div className="section-heading">

              <div className="section-icon orange">
                <FaCalculator />
              </div>

              <div>
                <h2>
                  Payment Calculation
                </h2>

                <p>
                  Review charges and select the
                  payment method.
                </p>
              </div>

            </div>

            <span className="section-step">
              04
            </span>

          </div>

          <div className="payment-grid">

            <div className="payment-field">
              <label>
                Consultation Fee
              </label>

              <div className="input-with-icon editable-input">
                <FaMoneyBillWave />

                <span className="currency-symbol">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  name="consultationFee"
                  value={
                    payment.consultationFee
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>
            </div>

            <div className="payment-field">
              <label>
                Medical Bill
              </label>

              <div className="input-with-icon calculated-input">
                <FaPills />

                <input
                  value={medicalBill}
                  readOnly
                />

                <span>
                  INR
                </span>
              </div>
            </div>

            <div className="payment-field">
              <label>
                Test Bill
              </label>

              <div className="input-with-icon calculated-input">
                <FaFlask />

                <input
                  value={testBill}
                  readOnly
                />

                <span>
                  INR
                </span>
              </div>
            </div>

            <div className="payment-field">
              <label>
                Total Amount
              </label>

              <div className="input-with-icon total-input">
                <FaReceipt />

                <input
                  value={totalAmount}
                  readOnly
                />

                <span>
                  INR
                </span>
              </div>
            </div>

            <div className="payment-field">
              <label>
                Payment Method
              </label>

              <div className="select-with-icon">
                <FaCreditCard />

                <select
                  name="paymentMethod"
                  value={
                    payment.paymentMethod
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Cash">
                    Cash
                  </option>

                  <option value="Card">
                    Card
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Online">
                    Online
                  </option>
                </select>
              </div>
            </div>

            <div className="payment-field">
              <label>
                Payment Status
              </label>

              <div className="select-with-icon">
                {payment.paymentStatus ===
                  "Paid" ? (
                  <FaCheckCircle />
                ) : (
                  <FaClock />
                )}

                <select
                  name="paymentStatus"
                  value={
                    payment.paymentStatus
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>
                </select>
              </div>
            </div>

          </div>

          <div className="payment-breakdown">

            <div>
              <span>
                Consultation
              </span>

              <strong>
                {formatMoney(
                  payment.consultationFee,
                )}
              </strong>
            </div>

            <div>
              <span>
                Medicines
              </span>

              <strong>
                {formatMoney(
                  medicalBill,
                )}
              </strong>
            </div>

            <div>
              <span>
                Tests
              </span>

              <strong>
                {formatMoney(
                  testBill,
                )}
              </strong>
            </div>

            <div className="breakdown-total">
              <span>
                Grand Total
              </span>

              <strong>
                {formatMoney(
                  totalAmount,
                )}
              </strong>
            </div>

          </div>

          <div className="payment-total-box">

            <div className="payment-total-content">

              <div className="payment-total-icon">
                <FaMoneyBillWave />
              </div>

              <div>
                <span>
                  FINAL PAYMENT AMOUNT
                </span>

                <strong>
                  {formatMoney(
                    totalAmount,
                  )}
                </strong>
              </div>

            </div>

            <div className="payment-total-status">
              <FaCheckCircle />

              {payment.paymentStatus}
            </div>

          </div>

        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div className="create-payment-actions">

          <div className="action-note">

            <FaShieldAlt />

            <span>
              Payment information will be
              securely saved to the hospital
              billing database.
            </span>

          </div>

          <div className="action-buttons">

            <button
              type="button"
              className="cancel-payment-btn"
              onClick={() =>
                navigate(
                  "/doctor/payments",
                )
              }
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-payment-btn"
              disabled={
                saving ||
                !payment.patientId ||
                !payment.patientName
              }
            >
              {saving ? (
                <>
                  <span className="button-spinner" />
                  Creating Payment...
                </>
              ) : (
                <>
                  <FaSave />
                  Create Payment
                </>
              )}
            </button>

          </div>

        </div>

      </form>
    </div>
  );
}

export default CreatePaymentsPage;