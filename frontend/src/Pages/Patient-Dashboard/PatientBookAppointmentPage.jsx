import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import api from "../../api/axios";

import BookAppointmentForm from "../../Component/Patient/BookAppointmentForm";
import BookAppointmentDoctorCard from "../../Component/cards/BookAppointmentDoctorCard";
import BookAppointmentSuccessCard from "../../Component/cards/BookAppointmentSuccessCard";

import "../../Styles/Patient/PatientBookAppointmentPage.css";
import { createAIMemory } from "../../services/AI/aiMemoryApi";

function PatientBookAppointmentPage() {
  const patient = JSON.parse(localStorage.getItem("patient")) || {};

  const loginUser =
    JSON.parse(localStorage.getItem("User")) ||
    JSON.parse(localStorage.getItem("patient")) ||
    JSON.parse(localStorage.getItem("loggedInUser")) ||
    {};

  const patientName =
    loginUser.FullName ||
    loginUser.fullName ||
    loginUser.name ||
    loginUser.patientName ||
    loginUser.username ||
    "";

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [successAppointment, setSuccessAppointment] = useState(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [loading, setLoading] = useState(false);
  const [doctorLoading, setDoctorLoading] = useState(true);

  const [form, setForm] = useState({
    patientName: patientName,
    disease: "",
    appointmentDate: "",
    appointmentTime: "",
    visitType: "",
    notes: "",
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setDoctorLoading(true);

      const res = await api.get("/doctors");

      const doctorList = res.data?.doctors || res.data?.data || res.data || [];

      setDoctors(Array.isArray(doctorList) ? doctorList : []);
    } catch (error) {
      console.error("Failed to load doctors:", error);
      setDoctors([]);
    } finally {
      setDoctorLoading(false);
    }
  };

  const departments = useMemo(() => {
    const list = doctors
      .map((doctor) => doctor.department || doctor.specialization)
      .filter(Boolean);

    return ["All", ...new Set(list)];
  }, [doctors]);

  const filteredDoctors = doctors.filter((doctor) => {
    const doctorName =
      doctor.FullName || doctor.name || doctor.doctorName || "";

    const doctorDepartment = doctor.department || doctor.specialization || "";

    const matchSearch =
      doctorName.toLowerCase().includes(search.toLowerCase()) ||
      doctorDepartment.toLowerCase().includes(search.toLowerCase());

    const matchDepartment =
      department === "All" || doctorDepartment === department;

    return matchSearch && matchDepartment;
  });

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);

    setForm((prev) => ({
      ...prev,
      appointmentTime: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert("Please select doctor first");
      return;
    }

    if (
      !form.disease ||
      !form.appointmentDate ||
      !form.appointmentTime ||
      !form.visitType
    ) {
      alert("Please fill all required fields");
      return;
    }

    const doctorName =
      selectedDoctor.FullName ||
      selectedDoctor.name ||
      selectedDoctor.doctorName ||
      "";

    const appointmentId = `APT-${Date.now().toString().slice(-6)}`;

    const appointmentData = {
      id: appointmentId,
      appointmentId: appointmentId,
      patientId: loginUser?.id || loginUser?.patientId || "",
      patientName: patientName || form.patientName,
      doctorId: selectedDoctor.id,
      doctorName,
      department: selectedDoctor.department || "",
      specialization: selectedDoctor.specialization || "",
      disease: form.disease,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      visitType: form.visitType,
      notes: form.notes,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);

      const res = await api.post("/appointments", appointmentData);
      try {
        await createAIMemory({
          patientId: appointmentData.patientId,
          patientName: appointmentData.patientName,
          source: "Appointment",
          memoryType: "Health Concern",
          title: appointmentData.disease,
          summary: `${appointmentData.patientName} booked appointment for ${appointmentData.disease}.`,
          importance: "Medium",
        });
      } catch (memoryError) {
        console.warn("AI memory save failed:", memoryError);
      }
      setSuccessAppointment(res.data?.data || appointmentData);

      setForm({
        patientName: patient?.name || patient?.patientName || "",
        disease: "",
        appointmentDate: "",
        appointmentTime: "",
        visitType: "",
        notes: "",
      });

      setSelectedDoctor(null);
    } catch (error) {
      console.error("Appointment booking failed:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Appointment booking failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-book-page">
      <div className="patient-book-hero">
        <div>
          <p className="patient-book-label">Book Appointment</p>
          <h1>Choose Doctor & Book Your Appointment</h1>
          <p>
            Select your doctor, choose date and time, then confirm your
            appointment request.
          </p>
        </div>

        <div className="patient-book-hero-icon">
          <FaCalendarAlt />
        </div>
      </div>

      <div className="patient-book-layout">
        <div className="patient-book-left">
          <div className="patient-book-filters">
            <div className="patient-book-search">
              <FaSearch />
              <input
                type="text"
                placeholder="Search doctor or department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              {departments.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {doctorLoading ? (
            <div className="patient-book-state">Loading doctors...</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="patient-book-state">No doctors found</div>
          ) : (
            <div className="book-doctor-grid">
              {filteredDoctors.map((doctor) => (
                <BookAppointmentDoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  selectedDoctor={selectedDoctor}
                  onSelect={handleSelectDoctor}
                />
              ))}
            </div>
          )}
        </div>

        <div className="patient-book-right">
          <div className="book-form-card">
            <h2>Appointment Details</h2>

            {!selectedDoctor && (
              <p className="select-doctor-message">
                Please select a doctor to continue booking.
              </p>
            )}

            <BookAppointmentForm
              form={form}
              selectedDoctor={selectedDoctor}
              onChange={handleChange}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <BookAppointmentSuccessCard
        appointment={successAppointment}
        onClose={() => setSuccessAppointment(null)}
      />
    </div>
  );
}

export default PatientBookAppointmentPage;
