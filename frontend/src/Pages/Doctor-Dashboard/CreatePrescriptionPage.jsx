// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaCapsules,
//   FaHeartbeat,
//   FaNotesMedical,
//   FaPlus,
//   FaSave,
//   FaTrash,
//   FaUserInjured,
//   FaUserMd,
// } from "react-icons/fa";

// import { createPrescription } from "../../services/Doctor/PresscriptionApi";
// import api from "../../api/axios";

// import "../../Styles/Doctor/CreatePrescriptionPage.css";

// function CreatePrescriptionPage() {
//   const navigate = useNavigate();

//   const doctor = useMemo(() => {
//     try {
//       return (
//         JSON.parse(localStorage.getItem("doctor")) || {
//           id: "DOC-1001",
//           fullName: "Dr. Raj Sharma",
//           specialization: "Cardiology",
//           department: "Cardiology",
//         }
//       );
//     } catch {
//       return {
//         id: "DOC-1001",
//         fullName: "Dr. Raj Sharma",
//         specialization: "Cardiology",
//         department: "Cardiology",
//       };
//     }
//   }, []);

//   const [patients, setPatients] = useState([]);
//   const [appointments, setAppointments] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     visitDate: "",
//     visitTime: "",
//     consultationType: "OPD",
//     bp: "",
//     pulseRate: "",
//     temperature: "",
//     height: "",
//     weight: "",
//     bmi: "",
//     oxygenLevel: "",
//     chiefComplaint: "",
//     diagnosis: "",
//     secondaryDiagnosis: "",
//     symptomsText: "",
//     testsText: "",
//     drugAllergies: "",
//     foodAllergies: "",
//     dietAdvice: "",
//     exerciseAdvice: "",
//     lifestyleAdvice: "",
//     advice: "",
//     followUpDate: "",
//     followUpNotes: "",
//     status: "completed",
//   });

//   const [medicines, setMedicines] = useState([
//     {
//       name: "",
//       dosage: "",
//       frequency: "",
//       duration: "",
//       timing: "",
//       instructions: "",
//     },
//   ]);

//   const getArrayData = (res, key) => {
//     if (Array.isArray(res?.data)) return res.data;
//     if (Array.isArray(res?.data?.data)) return res.data.data;
//     if (Array.isArray(res?.data?.[key])) return res.data[key];
//     return [];
//   };

//   useEffect(() => {
//     loadPatients();
//   }, []);

//   useEffect(() => {
//     const heightInMeter = Number(formData.height) / 100;
//     const weight = Number(formData.weight);

//     if (heightInMeter > 0 && weight > 0) {
//       const bmi = (weight / (heightInMeter * heightInMeter)).toFixed(1);
//       setFormData((prev) => ({ ...prev, bmi }));
//     } else {
//       setFormData((prev) => ({ ...prev, bmi: "" }));
//     }
//   }, [formData.height, formData.weight]);

//   const loadPatients = async () => {
//     try {
//       setPageLoading(true);

//       const [patientsRes, appointmentsRes] = await Promise.all([
//         api.get("/patients"),
//         api.get("/appointments"),
//       ]);

//       setPatients(getArrayData(patientsRes, "patients"));
//       setAppointments(getArrayData(appointmentsRes, "appointments"));
//     } catch (error) {
//       console.error("Failed to load patients:", error);
//       setPatients([]);
//       setAppointments([]);
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   const handlePatientSelect = (e) => {
//     const selectedValue = String(e.target.value);

//     const patient = patients.find(
//       (item) => {
//         return [
//           item.id,
//           item._id,
//           item.patientId,
//           item.patientID,
//           item.patientCode,
//         ]
//           .filter(Boolean).map(String).includes(selectedValue);
//       }
//     );
//     console.log("Selected patient value:", selectedValue);
//     console.log("Selected patient : ", patient);

//     setSelectedPatient(patient || null);

//     if (!patient) {
//       console.error("Patient not found for value:", selectedValue);
//       return;
//     }

//     const patientIds = [
//       patient.id,
//       patient._id,
//       patient.patientId,
//       patient.patientID,
//       patient.patientCode,
//     ]
//       .filter(Boolean).map(String)

//     const patientAppointments = appointments.filter(
//       (item) => {
//         return [
//           item.patientId,
//           item.patientID,
//           item.patientCode,
//         ]
//           .filter(Boolean).map(String).some(id => patientIds.includes(id));
//       }
//     );

//     const latestAppointment =
//       patientAppointments.length > 0
//         ? [...patientAppointments].sort(
//           (a, b) =>
//             new Date(b.appointmentDate || b.createdAt || 0) -
//             new Date(a.appointmentDate || a.createdAt || 0),
//         )[0]
//         : null;

//     setFormData((prev) => ({
//       ...prev,
//       doctorName: latestAppointment?.doctorName || doctor?.fullName || doctor?.FullName || "",
//       department: latestAppointment?.department || doctor?.department || "",
//       diagnosis: latestAppointment?.disease || latestAppointment?.diagnosis || "",
//       chiefComplaint: latestAppointment?.notes || latestAppointment?.chiefComplaint || "",
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMedicineChange = (index, field, value) => {
//     const updated = [...medicines];
//     updated[index][field] = value;
//     setMedicines(updated);
//   };

//   const addMedicine = () => {
//     setMedicines((prev) => [
//       ...prev,
//       {
//         name: "",
//         dosage: "",
//         frequency: "",
//         duration: "",
//         timing: "",
//         instructions: "",
//       },
//     ]);
//   };

//   const removeMedicine = (index) => {
//     setMedicines((prev) => prev.filter((_, i) => i !== index));
//   };

//   const splitText = (value) =>
//     String(value || "")
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);

//   // const validateForm = () => {
//   //   if (!selectedPatient) {
//   //     alert("Please select patient.");
//   //     return false;
//   //   }

//     if (!formData.visitDate) {
//       alert("Please select visit date.");
//       return false;
//     }

//     if (!formData.diagnosis.trim()) {
//       alert("Please enter diagnosis.");
//       return false;
//     }

//     const validMedicines = medicines.filter(
//       (med) =>
//         med.name.trim() &&
//         med.dosage.trim() &&
//         med.frequency.trim() &&
//         med.duration.trim(),
//     );

//     if (validMedicines.length === 0) {
//       alert("Please add at least one valid medicine.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedPatient) {
//       alert("Please select a patient.");
//       return;
//     }

//     // Resolve MongoDB/application patient ID
//     const patientId =
//       selectedPatient._id ||
//       selectedPatient.id ||
//       selectedPatient.patientId ||
//       selectedPatient.patientID ||
//       selectedPatient.patientCode;

//     // Resolve doctor ID
//     const doctorId =
//       doctor?._id ||
//       doctor?.id ||
//       doctor?.doctorId ||
//       doctor?.doctorID ||
//       null;

//     if (!patientId) {
//       console.error(
//         "Selected patient does not have a valid ID:",
//         selectedPatient,
//       );

//       alert("Selected patient ID is missing.");
//       return;
//     }

//     if (!doctorId) {
//       console.error(
//         "Doctor does not have a valid ID:",
//         doctor,
//       );

//       alert("Doctor ID is missing.");
//       return;
//     }

//     const payload = {
//       // Prescription IDs
//       prescriptionId: `RX-${Date.now()}`,

//       // Patient
//       patientId: String(patientId),

//       patientCode:
//         selectedPatient.patientID ||
//         selectedPatient.patientCode ||
//         selectedPatient.patientId ||
//         selectedPatient.id ||
//         String(patientId),

//       patientName:
//         selectedPatient.fullName ||
//         selectedPatient.name ||
//         "",

//       age: selectedPatient.age,
//       gender: selectedPatient.gender,
//       bloodGroup: selectedPatient.bloodGroup,
//       mobile: selectedPatient.mobile,
//       address: selectedPatient.address,

//       // Doctor
//       doctorId: String(doctorId),

//       doctorName:
//         doctor?.fullName ||
//         doctor?.FullName ||
//         doctor?.name ||
//         "",

//       specialization:
//         doctor?.specialization ||
//         doctor?.speciality ||
//         "",

//       department:
//         doctor?.department ||
//         "",

//       // Diagnosis
//       disease: formData.diagnosis || "",
//       diagnosis: formData.diagnosis || "",
//       secondaryDiagnosis:
//         formData.secondaryDiagnosis || "",

//       // Visit
//       visitDate: formData.visitDate,
//       visitTime: formData.visitTime,
//       consultationType:
//         formData.consultationType,

//       // Vitals
//       bp: formData.bp,
//       pulseRate: formData.pulseRate,
//       temperature: formData.temperature,
//       height: formData.height,
//       weight: formData.weight,
//       bmi: formData.bmi,
//       oxygenLevel: formData.oxygenLevel,

//       // Clinical information
//       chiefComplaint:
//         formData.chiefComplaint || "",

//       symptoms: splitText(
//         formData.symptomsText,
//       ),

//       // Medicines
//       medicines: Array.isArray(medicines)
//         ? medicines
//         : [],

//       // Tests
//       testsRecommended: splitText(
//         formData.testsText,
//       ),

//       // Allergies
//       allergies: {
//         drug: formData.drugAllergies || "",
//         food: formData.foodAllergies || "",
//       },

//       // Advice
//       dietAdvice:
//         formData.dietAdvice || "",

//       exerciseAdvice:
//         formData.exerciseAdvice || "",

//       lifestyleAdvice:
//         formData.lifestyleAdvice || "",

//       doctorAdvice:
//         formData.advice || "",

//       // Follow-up
//       followUpDate:
//         formData.followUpDate || "",

//       followUpNotes:
//         formData.followUpNotes || "",

//       // Status
//       status:
//         formData.status || "Active",

//       // Created date
//       createdAt: new Date().toISOString(),

//       // Optional patient/doctor snapshots
//       patient: selectedPatient,
//       doctor: doctor || null,
//     };

//     console.log(
//       "====================================",
//     );
//     console.log(
//       "CREATING PRESCRIPTION",
//     );
//     console.log(
//       "====================================",
//     );
//     console.log(
//       "Selected patient:",
//       selectedPatient,
//     );
//     console.log(
//       "Resolved patientId:",
//       patientId,
//     );
//     console.log(
//       "Resolved doctorId:",
//       doctorId,
//     );
//     console.log(
//       "Prescription payload:",
//       payload,
//     );

//     try {
//       setLoading(true);

//       const response =
//         await createPrescription(payload);

//       console.log(
//         "Prescription created:",
//         response,
//       );

//       alert(
//         "Prescription Created Successfully",
//       );

//       navigate("/doctor/prescriptions");
//     } catch (error) {
//       console.error(
//         "Failed to create prescription:",
//         error,
//       );

//       console.error(
//         "Server response:",
//         error.response?.data,
//       );

//       alert(
//         error.response?.data?.message ||
//         "Failed to create prescription.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (pageLoading) {
//     return (
//       <div className="create-prescription-page">
//         <div className="prescription-loader">Loading prescription page...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="create-prescription-page">
//       <div className="create-prescription-hero">
//         <button
//           className="back-btn"
//           type="button"
//           onClick={() => navigate("/doctor/prescriptions")}
//         >
//           <FaArrowLeft /> Back
//         </button>

//         <div>
//           <span className="hero-badge">Doctor Prescription Panel</span>
//           <h2>Create Prescription</h2>
//           <p>
//             Select patient, add diagnosis, medicines, advice and AI memory
//             notes.
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="create-prescription-form">
//         <section className="prescription-card">
//           <div className="card-title">
//             <FaUserInjured />
//             <div>
//               <h3>Select Patient</h3>
//               <p>Choose patient and auto-fill latest appointment details.</p>
//             </div>
//           </div>

//           <select onChange={handlePatientSelect} required>
//             <option value="">Select Patient</option>

//             {(Array.isArray(patients) ? patients : []).map((patient) => {
//               const patientValue = patient.id || patient._id || patient.patientId || patient.patientID || patient.patientCode;

//               return (
//                 <option value={patientValue}>
//                   {patient.patientID || patient.patientCode || patient.patientId || patient.id || patient._id} -{" "}
//                   {patient.fullName || patient.name || "Unknown Patient"}
//                 </option>
//               )
//             })}
//           </select>

//           {selectedPatient && (
//             <div className="selected-patient-info">
//               <h4>{selectedPatient.fullName || selectedPatient.name}</h4>
//               <p>ID: {selectedPatient.patientID || selectedPatient.id}</p>
//               <p>Age: {selectedPatient.age || "N/A"}</p>
//               <p>Gender: {selectedPatient.gender || "N/A"}</p>
//               <p>Blood Group: {selectedPatient.bloodGroup || "N/A"}</p>
//             </div>
//           )}
//         </section>

//         <section className="prescription-card">
//           <div className="card-title">
//             <FaUserMd />
//             <div>
//               <h3>Doctor Information</h3>
//               <p>Doctor details are filled from login data.</p>
//             </div>
//           </div>

//           <div className="form-grid">
//             <input value={doctor?.id || ""} placeholder="Doctor ID" readOnly />
//             <input
//               value={doctor?.fullName || doctor?.FullName || ""}
//               placeholder="Doctor Name"
//               readOnly
//             />
//             <input
//               value={doctor?.specialization || ""}
//               placeholder="Specialization"
//               readOnly
//             />
//             <input
//               value={doctor?.department || ""}
//               placeholder="Department"
//               readOnly
//             />
//           </div>
//         </section>

//         <section className="prescription-card">
//           <div className="card-title">
//             <FaHeartbeat />
//             <div>
//               <h3>Diagnosis & Vitals</h3>
//               <p>Add visit details, diagnosis and patient vitals.</p>
//             </div>
//           </div>

//           <div className="form-grid">
//             <input
//               type="date"
//               name="visitDate"
//               value={formData.visitDate}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="time"
//               name="visitTime"
//               value={formData.visitTime}
//               onChange={handleChange}
//             />

//             <select
//               name="consultationType"
//               value={formData.consultationType}
//               onChange={handleChange}
//             >
//               <option value="OPD">OPD</option>
//               <option value="IPD">IPD</option>
//               <option value="Emergency">Emergency</option>
//               <option value="Telemedicine">Telemedicine</option>
//             </select>

//             <input
//               type="text"
//               name="diagnosis"
//               placeholder="Diagnosis"
//               value={formData.diagnosis}
//               onChange={handleChange}
//               required
//             />

//             <input
//               type="text"
//               name="secondaryDiagnosis"
//               placeholder="Secondary Diagnosis"
//               value={formData.secondaryDiagnosis}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="bp"
//               placeholder="Blood Pressure"
//               value={formData.bp}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="pulseRate"
//               placeholder="Pulse Rate"
//               value={formData.pulseRate}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="oxygenLevel"
//               placeholder="Oxygen Level"
//               value={formData.oxygenLevel}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="temperature"
//               placeholder="Temperature"
//               value={formData.temperature}
//               onChange={handleChange}
//             />

//             <input
//               type="number"
//               name="height"
//               placeholder="Height in cm"
//               value={formData.height}
//               onChange={handleChange}
//             />

//             <input
//               type="number"
//               name="weight"
//               placeholder="Weight in kg"
//               value={formData.weight}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="bmi"
//               placeholder="BMI"
//               value={formData.bmi}
//               readOnly
//             />
//           </div>

//           <textarea
//             name="chiefComplaint"
//             value={formData.chiefComplaint}
//             onChange={handleChange}
//             placeholder="Chief Complaint"
//           />

//           <textarea
//             name="symptomsText"
//             placeholder="Symptoms comma separated: fever, cough, headache"
//             value={formData.symptomsText}
//             onChange={handleChange}
//           />

//           <textarea
//             name="testsText"
//             placeholder="Tests recommended comma separated: CBC, ECG, X-Ray"
//             value={formData.testsText}
//             onChange={handleChange}
//           />
//         </section>

//         <section className="prescription-card">
//           <div className="card-title">
//             <FaCapsules />
//             <div>
//               <h3>Medicines</h3>
//               <p>Add medicine dosage, frequency, duration and timing.</p>
//             </div>
//           </div>

//           {medicines.map((med, index) => (
//             <div key={index} className="medicine-box">
//               <div className="medicine-head">
//                 <h4>Medicine #{index + 1}</h4>

//                 {medicines.length > 1 && (
//                   <button
//                     type="button"
//                     className="remove-medicine-btn"
//                     onClick={() => removeMedicine(index)}
//                   >
//                     <FaTrash /> Remove
//                   </button>
//                 )}
//               </div>

//               <div className="form-grid">
//                 <input
//                   type="text"
//                   placeholder="Medicine Name"
//                   value={med.name}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "name", e.target.value)
//                   }
//                   required
//                 />

//                 <input
//                   type="text"
//                   placeholder="Dosage"
//                   value={med.dosage}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "dosage", e.target.value)
//                   }
//                   required
//                 />

//                 <input
//                   type="text"
//                   placeholder="Frequency"
//                   value={med.frequency}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "frequency", e.target.value)
//                   }
//                   required
//                 />

//                 <input
//                   type="text"
//                   placeholder="Duration"
//                   value={med.duration}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "duration", e.target.value)
//                   }
//                   required
//                 />

//                 <input
//                   type="text"
//                   placeholder="Timing"
//                   value={med.timing}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "timing", e.target.value)
//                   }
//                 />

//                 <input
//                   type="text"
//                   placeholder="Instructions"
//                   value={med.instructions}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "instructions", e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             className="add-medicine-btn"
//             onClick={addMedicine}
//           >
//             <FaPlus /> Add Medicine
//           </button>
//         </section>

//         <section className="prescription-card">
//           <div className="card-title">
//             <FaNotesMedical />
//             <div>
//               <h3>Advice & Follow Up</h3>
//               <p>Add allergies, lifestyle advice and follow-up notes.</p>
//             </div>
//           </div>

//           <div className="form-grid">
//             <input
//               type="text"
//               name="drugAllergies"
//               placeholder="Drug Allergies"
//               value={formData.drugAllergies}
//               onChange={handleChange}
//             />

//             <input
//               type="text"
//               name="foodAllergies"
//               placeholder="Food Allergies"
//               value={formData.foodAllergies}
//               onChange={handleChange}
//             />

//             <input
//               type="date"
//               name="followUpDate"
//               value={formData.followUpDate}
//               onChange={handleChange}
//             />

//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//             >
//               <option value="pending">Pending</option>
//               <option value="completed">Completed</option>
//               <option value="sent">Sent</option>
//             </select>
//           </div>

//           <textarea
//             name="dietAdvice"
//             placeholder="Diet Advice"
//             value={formData.dietAdvice}
//             onChange={handleChange}
//           />

//           <textarea
//             name="exerciseAdvice"
//             placeholder="Exercise Advice"
//             value={formData.exerciseAdvice}
//             onChange={handleChange}
//           />

//           <textarea
//             name="lifestyleAdvice"
//             placeholder="Lifestyle Advice"
//             value={formData.lifestyleAdvice}
//             onChange={handleChange}
//           />

//           <textarea
//             name="advice"
//             placeholder="Doctor Advice"
//             value={formData.advice}
//             onChange={handleChange}
//           />

//           <textarea
//             name="followUpNotes"
//             placeholder="Follow-up Notes"
//             value={formData.followUpNotes}
//             onChange={handleChange}
//           />
//         </section>

//         <div className="prescription-submit-area">
//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? (
//               "Saving..."
//             ) : (
//               <>
//                 <FaSave /> Save Prescription
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CreatePrescriptionPage;



import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCapsules,
  FaHeartbeat,
  FaNotesMedical,
  FaPlus,
  FaSave,
  FaTrash,
  FaUserInjured,
  FaUserMd,
} from "react-icons/fa";

import { createPrescription } from "../../services/Doctor/PresscriptionApi";
import api from "../../api/axios";

import "../../Styles/Doctor/CreatePrescriptionPage.css";

function CreatePrescriptionPage() {
  const navigate = useNavigate();

  /*
   * ============================================================
   * DOCTOR INFORMATION
   * ============================================================
   */
  const doctor = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("doctor")) || {
          id: "DOC-1001",
          fullName: "Dr. Anjali Sharma",
          specialization: "Interventional Cardiologist",
          department: "Cardiology",
        }
      );
    } catch {
      return {
        id: "DOC-1001",
        fullName: "Dr. Anjali Sharma",
        specialization: "Interventional Cardiologist",
        department: "Cardiology",
      };
    }
  }, []);

  /*
   * ============================================================
   * STATE
   * ============================================================
   */
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    visitDate: "",
    visitTime: "",
    consultationType: "OPD",

    bp: "",
    pulseRate: "",
    temperature: "",
    height: "",
    weight: "",
    bmi: "",
    oxygenLevel: "",

    chiefComplaint: "",
    diagnosis: "",
    secondaryDiagnosis: "",

    symptomsText: "",
    testsText: "",

    drugAllergies: "",
    foodAllergies: "",

    dietAdvice: "",
    exerciseAdvice: "",
    lifestyleAdvice: "",
    advice: "",

    followUpDate: "",
    followUpNotes: "",

    status: "completed",
  });

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      timing: "",
      instructions: "",
    },
  ]);

  /*
   * ============================================================
   * RESPONSE ARRAY HELPER
   * ============================================================
   */
  const getArrayData = (res, key) => {
    if (Array.isArray(res?.data)) {
      return res.data;
    }

    if (Array.isArray(res?.data?.data)) {
      return res.data.data;
    }

    if (Array.isArray(res?.data?.[key])) {
      return res.data[key];
    }

    return [];
  };

  /*
   * ============================================================
   * LOAD PATIENTS + APPOINTMENTS
   * ============================================================
   */
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setPageLoading(true);

      const [patientsRes, appointmentsRes] =
        await Promise.all([
          api.get("/patients"),
          api.get("/appointments"),
        ]);

      const patientData = getArrayData(
        patientsRes,
        "patients",
      );

      const appointmentData = getArrayData(
        appointmentsRes,
        "appointments",
      );

      console.log(
        "Loaded patients:",
        patientData,
      );

      console.log(
        "Loaded appointments:",
        appointmentData,
      );

      setPatients(patientData);
      setAppointments(appointmentData);
    } catch (error) {
      console.error(
        "Failed to load patients:",
        error,
      );

      setPatients([]);
      setAppointments([]);
    } finally {
      setPageLoading(false);
    }
  };

  /*
   * ============================================================
   * AUTO CALCULATE BMI
   * ============================================================
   */
  useEffect(() => {
    const heightInMeter =
      Number(formData.height) / 100;

    const weight = Number(formData.weight);

    if (
      heightInMeter > 0 &&
      weight > 0
    ) {
      const bmi = (
        weight /
        (heightInMeter * heightInMeter)
      ).toFixed(1);

      setFormData((prev) => ({
        ...prev,
        bmi,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        bmi: "",
      }));
    }
  }, [
    formData.height,
    formData.weight,
  ]);

  /*
   * ============================================================
   * GET PATIENT IDENTIFIER
   * ============================================================
   */
  const getPatientId = (patient) => {
    if (!patient) {
      return null;
    }

    return (
      patient._id ||
      patient.id ||
      patient.patientId ||
      patient.patientID ||
      patient.patientCode ||
      null
    );
  };

  /*
   * ============================================================
   * GET DOCTOR IDENTIFIER
   * ============================================================
   */
  const getDoctorId = () => {
    return (
      doctor?._id ||
      doctor?.id ||
      doctor?.doctorId ||
      doctor?.doctorID ||
      null
    );
  };

  /*
   * ============================================================
   * PATIENT SELECTION
   * ============================================================
   */
  const handlePatientSelect = (e) => {
    const selectedValue =
      String(e.target.value);

    console.log(
      "Selected patient value:",
      selectedValue,
    );

    const patient = patients.find(
      (item) => {
        const identifiers = [
          item?._id,
          item?.id,
          item?.patientId,
          item?.patientID,
          item?.patientCode,
        ]
          .filter(Boolean)
          .map(String);

        return identifiers.includes(
          selectedValue,
        );
      },
    );

    console.log(
      "Selected patient:",
      patient,
    );

    setSelectedPatient(
      patient || null,
    );

    if (!patient) {
      console.error(
        "Patient not found for value:",
        selectedValue,
      );

      return;
    }

    const patientId =
      getPatientId(patient);

    console.log(
      "Resolved patient ID:",
      patientId,
    );

    /*
     * Find all appointments belonging
     * to this patient.
     */
    const patientIds = [
      patient?._id,
      patient?.id,
      patient?.patientId,
      patient?.patientID,
      patient?.patientCode,
    ]
      .filter(Boolean)
      .map(String);

    const patientAppointments =
      appointments.filter(
        (item) => {
          const appointmentPatientIds = [
            item?.patientId,
            item?.patientID,
            item?.patientCode,
            item?.patient?._id,
            item?.patient?.id,
            item?.patient?.patientId,
            item?.patient?.patientID,
          ]
            .filter(Boolean)
            .map(String);

          return appointmentPatientIds.some(
            (id) =>
              patientIds.includes(id),
          );
        },
      );

    console.log(
      "Patient appointments:",
      patientAppointments,
    );

    /*
     * Get latest appointment.
     */
    const latestAppointment =
      patientAppointments.length > 0
        ? [...patientAppointments].sort(
          (a, b) =>
            new Date(
              b.appointmentDate ||
              b.visitDate ||
              b.createdAt ||
              0,
            ) -
            new Date(
              a.appointmentDate ||
              a.visitDate ||
              a.createdAt ||
              0,
            ),
        )[0]
        : null;

    console.log(
      "Latest appointment:",
      latestAppointment,
    );

    /*
     * Auto-fill prescription information.
     */
    setFormData((prev) => ({
      ...prev,

      patientId: String(
        patientId || "",
      ),

      appointmentId:
        latestAppointment?.appointmentId ||
        latestAppointment?.appointmentID ||
        latestAppointment?.id ||
        latestAppointment?._id ||
        "",

      doctorName:
        latestAppointment?.doctorName ||
        doctor?.fullName ||
        doctor?.FullName ||
        doctor?.name ||
        "",

      department:
        latestAppointment?.department ||
        doctor?.department ||
        "",

      diagnosis:
        latestAppointment?.disease ||
        latestAppointment?.diagnosis ||
        "",

      chiefComplaint:
        latestAppointment?.notes ||
        latestAppointment?.chiefComplaint ||
        "",
    }));
  };

  /*
   * ============================================================
   * FORM CHANGE
   * ============================================================
   */
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * ============================================================
   * MEDICINE CHANGE
   * ============================================================
   */
  const handleMedicineChange = (
    index,
    field,
    value,
  ) => {
    setMedicines((prev) =>
      prev.map((medicine, i) =>
        i === index
          ? {
            ...medicine,
            [field]: value,
          }
          : medicine,
      ),
    );
  };

  /*
   * ============================================================
   * ADD MEDICINE
   * ============================================================
   */
  const addMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        timing: "",
        instructions: "",
      },
    ]);
  };

  /*
   * ============================================================
   * REMOVE MEDICINE
   * ============================================================
   */
  const removeMedicine = (index) => {
    setMedicines((prev) =>
      prev.filter(
        (_, i) => i !== index,
      ),
    );
  };

  /*
   * ============================================================
   * TEXT TO ARRAY
   * ============================================================
   */
  const splitText = (value) =>
    String(value || "")
      .split(",")
      .map((item) =>
        item.trim(),
      )
      .filter(Boolean);

  /*
   * ============================================================
   * FORM VALIDATION
   * ============================================================
   */
  const validateForm = () => {
    if (!selectedPatient) {
      alert(
        "Please select a patient.",
      );

      return false;
    }

    if (!formData.visitDate) {
      alert(
        "Please select visit date.",
      );

      return false;
    }

    if (
      !formData.diagnosis.trim()
    ) {
      alert(
        "Please enter diagnosis.",
      );

      return false;
    }

    const validMedicines =
      medicines.filter(
        (med) =>
          med.name.trim() &&
          med.dosage.trim() &&
          med.frequency.trim() &&
          med.duration.trim(),
      );

    if (
      validMedicines.length === 0
    ) {
      alert(
        "Please add at least one valid medicine.",
      );

      return false;
    }

    return true;
  };

  /*
   * ============================================================
   * SUBMIT PRESCRIPTION
   * ============================================================
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    /*
     * Resolve MongoDB patient ID.
     */
    const patientId =
      getPatientId(
        selectedPatient,
      );

    /*
     * Resolve doctor ID.
     */
    const doctorId =
      getDoctorId();

    /*
     * Resolve appointment ID.
     */
    const appointmentId =
      formData.appointmentId ||
      null;

    console.log(
      "====================================",
    );

    console.log(
      "CREATING PRESCRIPTION",
    );

    console.log(
      "====================================",
    );

    console.log(
      "Selected patient:",
      selectedPatient,
    );

    console.log(
      "Resolved patientId:",
      patientId,
    );

    console.log(
      "Resolved doctorId:",
      doctorId,
    );

    console.log(
      "Appointment ID:",
      appointmentId,
    );

    /*
     * Safety validation.
     */
    if (!patientId) {
      console.error(
        "Selected patient does not have a valid ID:",
        selectedPatient,
      );

      alert(
        "Selected patient ID is missing.",
      );

      return;
    }

    if (!doctorId) {
      console.error(
        "Doctor does not have a valid ID:",
        doctor,
      );

      alert(
        "Doctor ID is missing.",
      );

      return;
    }

    /*
     * Build final prescription payload.
     */
    const payload = {
      /*
       * Prescription ID
       */
      prescriptionId:
        `RX-${Date.now()}`,

      /*
       * Patient
       */
      patientId:
        String(patientId),

      patientCode:
        selectedPatient?.patientID ||
        selectedPatient?.patientCode ||
        selectedPatient?.patientId ||
        selectedPatient?.id ||
        String(patientId),

      patientName:
        selectedPatient?.fullName ||
        selectedPatient?.name ||
        "",

      age:
        selectedPatient?.age,

      gender:
        selectedPatient?.gender,

      bloodGroup:
        selectedPatient?.bloodGroup,

      mobile:
        selectedPatient?.mobile ||
        selectedPatient?.phone,

      address:
        selectedPatient?.address,

      /*
       * Doctor
       */
      doctorId:
        String(doctorId),

      doctorName:
        doctor?.fullName ||
        doctor?.FullName ||
        doctor?.name ||
        "",

      specialization:
        doctor?.specialization ||
        doctor?.speciality ||
        "",

      department:
        doctor?.department ||
        "",

      /*
       * Appointment
       */
      appointmentId:
        appointmentId
          ? String(appointmentId)
          : null,

      /*
       * Diagnosis
       */
      disease:
        formData.diagnosis ||
        "",

      diagnosis:
        formData.diagnosis ||
        "",

      secondaryDiagnosis:
        formData.secondaryDiagnosis ||
        "",

      /*
       * Visit
       */
      visitDate:
        formData.visitDate,

      visitTime:
        formData.visitTime,

      consultationType:
        formData.consultationType,

      /*
       * Vitals
       */
      bp:
        formData.bp,

      pulseRate:
        formData.pulseRate,

      temperature:
        formData.temperature,

      height:
        formData.height,

      weight:
        formData.weight,

      bmi:
        formData.bmi,

      oxygenLevel:
        formData.oxygenLevel,

      /*
       * Clinical information
       */
      chiefComplaint:
        formData.chiefComplaint ||
        "",

      symptoms:
        splitText(
          formData.symptomsText,
        ),

      /*
       * Medicines
       */
      medicines:
        Array.isArray(medicines)
          ? medicines.filter(
            (med) =>
              med.name?.trim() ||
              med.dosage?.trim() ||
              med.frequency?.trim(),
          )
          : [],

      /*
       * Tests
       */
      testsRecommended:
        splitText(
          formData.testsText,
        ),

      /*
       * Allergies
       */
      allergies: {
        drug:
          formData.drugAllergies ||
          "",

        food:
          formData.foodAllergies ||
          "",
      },

      /*
       * Advice
       */
      dietAdvice:
        formData.dietAdvice ||
        "",

      exerciseAdvice:
        formData.exerciseAdvice ||
        "",

      lifestyleAdvice:
        formData.lifestyleAdvice ||
        "",

      doctorAdvice:
        formData.advice ||
        "",

      /*
       * Follow-up
       */
      followUpDate:
        formData.followUpDate ||
        "",

      followUpNotes:
        formData.followUpNotes ||
        "",

      /*
       * Status
       */
      status:
        formData.status ||
        "completed",

      /*
       * Created date
       */
      createdAt:
        new Date().toISOString(),

      /*
       * Patient/doctor snapshots
       */
      patient:
        selectedPatient,

      doctor:
        doctor || null,
    };

    console.log(
      "FINAL PRESCRIPTION PAYLOAD:",
      payload,
    );

    /*
     * ========================================================
     * API REQUEST
     * ========================================================
     */
    try {
      setLoading(true);

      const response =
        await createPrescription(
          payload,
        );

      console.log(
        "Prescription created successfully:",
        response,
      );

      alert(
        "Prescription Created Successfully",
      );

      navigate(
        "/doctor/prescriptions",
      );
    } catch (error) {
      console.error(
        "Failed to create prescription:",
        error,
      );

      console.error(
        "Server response:",
        error?.response?.data,
      );

      alert(
        error?.response?.data?.message ||
        "Failed to create prescription.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ============================================================
   * PAGE LOADING
   * ============================================================
   */
  if (pageLoading) {
    return (
      <div className="create-prescription-page">
        <div className="prescription-loader">
          Loading prescription page...
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * PAGE UI
   * ============================================================
   */
  return (
    <div className="create-prescription-page">

      {/* ======================================================
          HERO
      ======================================================= */}
      <div className="create-prescription-hero">

        <button
          className="back-btn"
          type="button"
          onClick={() =>
            navigate(
              "/doctor/prescriptions",
            )
          }
        >
          <FaArrowLeft /> Back
        </button>

        <div>
          <span className="hero-badge">
            Doctor Prescription Panel
          </span>

          <h2>
            Create Prescription
          </h2>

          <p>
            Select patient, add diagnosis,
            medicines, advice and AI memory
            notes.
          </p>
        </div>
      </div>

      {/* ======================================================
          FORM
      ======================================================= */}
      <form
        onSubmit={handleSubmit}
        className="create-prescription-form"
      >

        {/* ====================================================
            PATIENT
        ===================================================== */}
        <section className="prescription-card">

          <div className="card-title">
            <FaUserInjured />

            <div>
              <h3>
                Select Patient
              </h3>

              <p>
                Choose patient and auto-fill
                latest appointment details.
              </p>
            </div>
          </div>

          <select
            value={
              selectedPatient
                ? String(
                  getPatientId(
                    selectedPatient,
                  ),
                )
                : ""
            }
            onChange={
              handlePatientSelect
            }
            required
          >
            <option value="">
              Select Patient
            </option>

            {(
              Array.isArray(patients)
                ? patients
                : []
            ).map((patient) => {

              const patientValue =
                getPatientId(
                  patient,
                );

              const patientDisplayId =
                patient?.patientID ||
                patient?.patientCode ||
                patient?.patientId ||
                patient?.id ||
                patient?._id ||
                "N/A";

              const patientName =
                patient?.fullName ||
                patient?.name ||
                "Unknown Patient";

              return (
                <option
                  key={String(
                    patientValue,
                  )}
                  value={String(
                    patientValue,
                  )}
                >
                  {patientDisplayId} -{" "}
                  {patientName}
                </option>
              );
            })}
          </select>

          {selectedPatient && (
            <div className="selected-patient-info">

              <h4>
                {selectedPatient.fullName ||
                  selectedPatient.name ||
                  "Unknown Patient"}
              </h4>

              <p>
                ID:{" "}
                {selectedPatient.patientID ||
                  selectedPatient.patientCode ||
                  selectedPatient.patientId ||
                  selectedPatient.id ||
                  selectedPatient._id ||
                  "N/A"}
              </p>

              <p>
                Age:{" "}
                {selectedPatient.age ||
                  "N/A"}
              </p>

              <p>
                Gender:{" "}
                {selectedPatient.gender ||
                  "N/A"}
              </p>

              <p>
                Blood Group:{" "}
                {selectedPatient.bloodGroup ||
                  "N/A"}
              </p>

            </div>
          )}
        </section>

        {/* ====================================================
            DOCTOR
        ===================================================== */}
        <section className="prescription-card">

          <div className="card-title">
            <FaUserMd />

            <div>
              <h3>
                Doctor Information
              </h3>

              <p>
                Doctor details are filled from
                login data.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <input
              value={
                doctor?._id ||
                doctor?.id ||
                doctor?.doctorId ||
                ""
              }
              placeholder="Doctor ID"
              readOnly
            />

            <input
              value={
                doctor?.fullName ||
                doctor?.FullName ||
                doctor?.name ||
                ""
              }
              placeholder="Doctor Name"
              readOnly
            />

            <input
              value={
                doctor?.specialization ||
                doctor?.speciality ||
                ""
              }
              placeholder="Specialization"
              readOnly
            />

            <input
              value={
                doctor?.department ||
                ""
              }
              placeholder="Department"
              readOnly
            />

          </div>
        </section>

        {/* ====================================================
            DIAGNOSIS + VITALS
        ===================================================== */}
        <section className="prescription-card">

          <div className="card-title">
            <FaHeartbeat />

            <div>
              <h3>
                Diagnosis & Vitals
              </h3>

              <p>
                Add visit details, diagnosis
                and patient vitals.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <input
              type="date"
              name="visitDate"
              value={
                formData.visitDate
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="time"
              name="visitTime"
              value={
                formData.visitTime
              }
              onChange={
                handleChange
              }
            />

            <select
              name="consultationType"
              value={
                formData.consultationType
              }
              onChange={
                handleChange
              }
            >
              <option value="OPD">
                OPD
              </option>

              <option value="IPD">
                IPD
              </option>

              <option value="Emergency">
                Emergency
              </option>

              <option value="Telemedicine">
                Telemedicine
              </option>
            </select>

            <input
              type="text"
              name="diagnosis"
              placeholder="Diagnosis"
              value={
                formData.diagnosis
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="text"
              name="secondaryDiagnosis"
              placeholder="Secondary Diagnosis"
              value={
                formData.secondaryDiagnosis
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="bp"
              placeholder="Blood Pressure"
              value={
                formData.bp
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="pulseRate"
              placeholder="Pulse Rate"
              value={
                formData.pulseRate
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="oxygenLevel"
              placeholder="Oxygen Level"
              value={
                formData.oxygenLevel
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="temperature"
              placeholder="Temperature"
              value={
                formData.temperature
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="height"
              placeholder="Height in cm"
              value={
                formData.height
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight in kg"
              value={
                formData.weight
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="bmi"
              placeholder="BMI"
              value={
                formData.bmi
              }
              readOnly
            />

          </div>

          <textarea
            name="chiefComplaint"
            value={
              formData.chiefComplaint
            }
            onChange={
              handleChange
            }
            placeholder="Chief Complaint"
          />

          <textarea
            name="symptomsText"
            placeholder="Symptoms comma separated: fever, cough, headache"
            value={
              formData.symptomsText
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="testsText"
            placeholder="Tests recommended comma separated: CBC, ECG, X-Ray"
            value={
              formData.testsText
            }
            onChange={
              handleChange
            }
          />

        </section>

        {/* ====================================================
            MEDICINES
        ===================================================== */}
        <section className="prescription-card">

          <div className="card-title">
            <FaCapsules />

            <div>
              <h3>
                Medicines
              </h3>

              <p>
                Add medicine dosage,
                frequency, duration and timing.
              </p>
            </div>
          </div>

          {medicines.map(
            (med, index) => (
              <div
                key={`medicine-${index}`}
                className="medicine-box"
              >

                <div className="medicine-head">

                  <h4>
                    Medicine #{index + 1}
                  </h4>

                  {medicines.length > 1 && (
                    <button
                      type="button"
                      className="remove-medicine-btn"
                      onClick={() =>
                        removeMedicine(
                          index,
                        )
                      }
                    >
                      <FaTrash /> Remove
                    </button>
                  )}

                </div>

                <div className="form-grid">

                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={
                      med.name
                    }
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Dosage"
                    value={
                      med.dosage
                    }
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "dosage",
                        e.target.value,
                      )
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Frequency"
                    value={
                      med.frequency
                    }
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "frequency",
                        e.target.value,
                      )
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Duration"
                    value={
                      med.duration
                    }
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "duration",
                        e.target.value,
                      )
                    }
                    required
                  />

                  <input
                    type="text"
                    placeholder="Timing"
                    value={
                      med.timing
                    }
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "timing",
                        e.target.value,
                      )
                    }
                  />

                  <input
                    type="text"
                    placeholder="Instructions"
                    value={
                      med.instructions
                    }
                    onChange={(e) =>
                      handleMedicineChange(
                        index,
                        "instructions",
                        e.target.value,
                      )
                    }
                  />

                </div>
              </div>
            ),
          )}

          <button
            type="button"
            className="add-medicine-btn"
            onClick={
              addMedicine
            }
          >
            <FaPlus /> Add Medicine
          </button>

        </section>

        {/* ====================================================
            ADVICE + FOLLOW UP
        ===================================================== */}
        <section className="prescription-card">

          <div className="card-title">
            <FaNotesMedical />

            <div>
              <h3>
                Advice & Follow Up
              </h3>

              <p>
                Add allergies, lifestyle advice
                and follow-up notes.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <input
              type="text"
              name="drugAllergies"
              placeholder="Drug Allergies"
              value={
                formData.drugAllergies
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="foodAllergies"
              placeholder="Food Allergies"
              value={
                formData.foodAllergies
              }
              onChange={
                handleChange
              }
            />

            <input
              type="date"
              name="followUpDate"
              value={
                formData.followUpDate
              }
              onChange={
                handleChange
              }
            />

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
            >
              <option value="pending">
                Pending
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="sent">
                Sent
              </option>
            </select>

          </div>

          <textarea
            name="dietAdvice"
            placeholder="Diet Advice"
            value={
              formData.dietAdvice
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="exerciseAdvice"
            placeholder="Exercise Advice"
            value={
              formData.exerciseAdvice
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="lifestyleAdvice"
            placeholder="Lifestyle Advice"
            value={
              formData.lifestyleAdvice
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="advice"
            placeholder="Doctor Advice"
            value={
              formData.advice
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="followUpNotes"
            placeholder="Follow-up Notes"
            value={
              formData.followUpNotes
            }
            onChange={
              handleChange
            }
          />

        </section>

        {/* ====================================================
            SUBMIT
        ===================================================== */}
        <div className="prescription-submit-area">

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <FaSave /> Save Prescription
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
}

export default CreatePrescriptionPage;
