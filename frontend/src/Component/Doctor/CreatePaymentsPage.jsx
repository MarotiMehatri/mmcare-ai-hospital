import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { createDoctorPayment } from "../../services/Doctor/DoctorPaymentsAPI";
import "../../Styles/Doctor/CreateDoctorPaymentsPage.css";
function CreatePaymentsPage() {
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [payment, setPayment] = useState({
    patientId: "",
    patientName: "",
    appointmentId: "",
    department: "",
    disease: "",
    consultationFee: 500,
    medicalBill: 0,
    totalAmount: 0,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
  });

  const [medicines, setMedicines] = useState([
    {
      tabletName: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        tabletName: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;

    const updatedMedicines = [...medicines];

    updatedMedicines[index][name] =
      name === "quantity" || name === "price" ? Number(value) : value;

    setMedicines(updatedMedicines);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const patientRes = await api.get("/patients");
      const appointmentRes = await api.get("/appointments");
      const prescriptionRes = await api.get("/prescriptions");

      //console.log(patientRes.data);
      //console.log(appointmentRes.data);
      //console.log(prescriptionRes.data);

      setPatients(
        Array.isArray(patientRes.data)
          ? patientRes.data
          : patientRes.data.patients || patientRes.data.data || [],
      );

      setAppointments(
        Array.isArray(appointmentRes.data)
          ? appointmentRes.data
          : appointmentRes.data.appointments || appointmentRes.data.data || [],
      );

      setPrescriptions(
        Array.isArray(prescriptionRes.data)
          ? prescriptionRes.data
          : prescriptionRes.data.prescriptions ||
              prescriptionRes.data.data ||
              [],
      );
    } catch (error) {
      console.error("Error loading data:", error);
      setPatients([]);
      setAppointments([]);
      setPrescriptions([]);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const medicineTotal = medicines.reduce(
      (sum, med) => sum + Number(med.quantity) * Number(med.price),
      0,
    );

    setPayment((prev) => ({
      ...prev,
      medicalBill: medicineTotal,
      totalAmount: Number(prev.consultationFee) + medicineTotal,
    }));
  }, [medicines, payment.consultationFee]);

  const handlePatientChange = (e) => {
    const selectedId = e.target.value;

    const patient = patients.find((p) => String(p.id) === selectedId);

    const appointment = appointments
      .filter((a) => String(a.patientId) === selectedId)
      .sort((a, b) => b.id - a.id)[0];

    const prescription = prescriptions
      .filter((p) => String(p.patientId) === selectedId)
      .sort((a, b) => b.id - a.id)[0];

    //console.log("Patient Found:", patient);
    //console.log("Latest Appointment:", appointment);
    //console.log("Latest Prescription:", prescription);

    setPayment((prev) => ({
      ...prev,
      patientId: selectedId,
      patientName: patient?.fullName || "",
      appointmentId: appointment?.appointmentId || "",
      department: prescription?.department || "",
      disease: prescription?.disease || "",
    }));
  };

  const totalAmount = payment.totalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPayment = {
      paymentId: `PAY${Date.now()}`,
      paymentDate: new Date().toISOString().split("T")[0],

      doctorId: doctor?.id,
      doctorName: doctor?.name || doctor?.fullName,

      patientId: payment.patientId,
      patientName: payment.patientName,
      appointmentId: payment.appointmentId,

      department: payment.department,
      disease: payment.disease,

      medicines,

      consultationFee: payment.consultationFee,
      medicalBill: payment.medicalBill,
      totalAmount,

      paymentMethod: payment.paymentMethod,
      paymentStatus: payment.paymentStatus,
    };

    try {
      await createDoctorPayment(newPayment);
      alert("Payment Created Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create payment");
    }
  };

  const removeMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);

    setMedicines(updatedMedicines);
  };
  return (
    <div className="create-payment-page">
      <h2>Create Doctor Payment</h2>

      <form onSubmit={handleSubmit}>
        <div className="payment-grid">
          <div>
            <label>Patient ID</label>
            <select
              name="patientId"
              value={payment.patientId}
              onChange={handlePatientChange}
            >
              <option value="">Select Patient</option>

              {Array.isArray(patients) &&
                patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.id} -{" "}
                    {patient.fullName || patient.patientName || patient.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Patient Name</label>
            <input value={payment.patientName} readOnly />
          </div>

          <div>
            <label>Doctor ID</label>
            <input value={doctor?.id} readOnly />
          </div>

          <div>
            <label>Doctor Name</label>
            <input
              value={doctor?.FullName || doctor?.name || doctor?.fullName || ""}
              readOnly
            />
          </div>

          <div>
            <label>Appointment ID</label>
            <input value={payment.appointmentId} readOnly />
          </div>

          <div>
            <label>Department</label>
            <input value={payment.department} readOnly />
          </div>

          <div>
            <label>Disease</label>
            <input value={payment.disease} readOnly />
          </div>

          <div>
            <label>Consultation Fee</label>
            <input
              type="number"
              name="consultationFee"
              value={payment.consultationFee}
              onChange={(e) =>
                setPayment({
                  ...payment,
                  consultationFee: Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label>Medical Bill</label>
            <input value={payment.medicalBill} readOnly />
          </div>

          <div>
            <label>Total Amount</label>
            <input value={totalAmount} readOnly />
          </div>

          <div>
            <label>Patient Method</label>
            <select
              name="paymentMethod"
              value={payment.paymentMethod}
              onChange={handleChange}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="medicine-section">
            <h3>Medicines</h3>

            {medicines.map((medicine, index) => (
              <div key={index} className="medicine-row">
                <input
                  type="text"
                  name="tabletName"
                  placeholder="Tablet Name"
                  value={medicine.tabletName}
                  onChange={(e) => handleMedicineChange(index, e)}
                />

                {/* <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={medicine.quantity}
                  onChange={(e) => handleMedicineChange(index, e)}
                /> */}

                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={medicine.price}
                  onChange={(e) => handleMedicineChange(index, e)}
                />

                <button
                  type="button"
                  className="remove-dedicine-btn"
                  onClick={() => removeMedicine(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-medicine-btn"
              onClick={addMedicine}
            >
              + Add Medicine
            </button>
          </div>

          <div>
            <label>Payment Status</label>
            <select
              name="paymentStatus"
              value={payment.paymentStatus}
              onChange={handleChange}
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <button type="submit">Create Payment</button>
      </form>
    </div>
  );
}

export default CreatePaymentsPage;
