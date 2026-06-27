import React, { useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaRedo,
  FaRobot,
  FaUserMd,
} from "react-icons/fa";

import {
  getAppointmentRecommendation,
  getDoctorSlots,
  bookAppointment,
} from "../../services/AI/aiAppointmentApi";

import AIAppointmentHero from "../../Component/AI/AIAppointmentHero";
import SymptomForm from "../../Component/AI/SymptomForm";
import AIRecommendationCard from "../../Component/cards/AIRecommendationCard";
import DoctorList from "../../Component/AI/DoctorList";
import SlotPicker from "../../Component/AI/SlotPicker";
import BookingSummary from "../../Component/AI/BookingSummary";
import EmergencyBanner from "../../Component/AI/EmergencyBanner";
import EmptyDoctorState from "../../Component/AI/EmptyDoctorState";
import LoadingState from "../../Component/AI/LoadingState";

import "../../Styles/AI/AIAppointmentPage.css";

function AIAppointmentPage() {
  const patientData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || {};
    } catch {
      return {};
    }
  }, []);

  const userData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const initialFormData = {
    patientId: patientData.patientID || patientData.id || "PAT001",
    symptoms: "",
    duration: "",
    severity: "medium",
    age: patientData.age || "",
    gender: patientData.gender || "",
    preferredDate: "",
    preferredTime: "",
    visitType: "offline",
    city: patientData.city || "Pune",
    medicalHistory: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState("");

  const currentStep = bookingResult
    ? 4
    : selectedSlot
      ? 3
      : recommendation
        ? 2
        : 1;

  const resetBookingSection = () => {
    setSelectedDoctor(null);
    setSlots([]);
    setSelectedSlot("");
    setBookingResult(null);
  };

  const handleResetAll = () => {
    setFormData(initialFormData);
    setRecommendation(null);
    setDoctors([]);
    resetBookingSection();
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.symptoms.trim()) return "Please enter symptoms.";
    if (!formData.age) return "Please enter age.";
    if (Number(formData.age) <= 0) return "Please enter a valid age.";
    if (!formData.gender) return "Please select gender.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setRecommendation(null);
      setDoctors([]);
      resetBookingSection();

      const payload = {
        ...formData,
        age: Number(formData.age),
        medicalHistory: formData.medicalHistory
          ? formData.medicalHistory
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
      };

      const data = await getAppointmentRecommendation(payload);

      setRecommendation(data?.aiRecommendation || null);
      setDoctors(data?.doctors || []);
    } catch (err) {
      console.error("AI Recommendation Error:", err);
      setError(
        err?.response?.data?.message || "Failed to get AI recommendation.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDoctor = async (doctor) => {
    try {
      setError("");
      setSelectedDoctor(doctor);
      setSelectedSlot("");
      setBookingResult(null);
      setSlots([]);

      const data = await getDoctorSlots(doctor.id);
      setSlots(data?.slots || []);
    } catch (err) {
      console.error("Doctor slots error:", err);
      setError("Failed to load doctor slots.");
    }
  };

  const handleConfirmBooking = async () => {
    if (!recommendation) return setError("Please get AI recommendation first.");
    if (!selectedDoctor) return setError("Please select a doctor.");
    if (!selectedSlot) return setError("Please select a slot.");

    try {
      setBookingLoading(true);
      setError("");

      const payload = {
        patientId: formData.patientId,
        patientName: patientData.fullName || userData.fullName || "Patient",
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.fullName,
        department: recommendation.department,
        date: formData.preferredDate || new Date().toISOString().split("T")[0],
        time: selectedSlot,
        visitType: recommendation.visitType || formData.visitType,
        symptoms: formData.symptoms,
        urgency: recommendation.urgency,
        fee: selectedDoctor.consultationFee || 0,
      };

      const data = await bookAppointment(payload);
      setBookingResult(data);
    } catch (err) {
      console.error("Booking Error:", err);
      setError(err?.response?.data?.message || "Failed to book appointment.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="ai-appointment-page">
      <AIAppointmentHero />

      <div className="ai-appointment-toolbar">
        <div>
          <span className="ai-toolbar-badge">
            <FaRobot /> AI Smart Booking
          </span>
          <h2>Find the right doctor faster</h2>
          <p>
            Enter symptoms, get AI department suggestion, choose doctor slot,
            and confirm appointment.
          </p>
        </div>

        <button
          type="button"
          className="ai-reset-all-btn"
          onClick={handleResetAll}
        >
          <FaRedo /> Reset
        </button>
      </div>

      <div className="ai-progress-card">
        {["Symptoms", "Recommendation", "Doctor & Slot", "Booking"].map(
          (step, index) => (
            <div
              key={step}
              className={`ai-progress-step ${
                currentStep >= index + 1 ? "active" : ""
              }`}
            >
              <span>
                {currentStep > index + 1 ? <FaCheckCircle /> : index + 1}
              </span>
              <p>{step}</p>
            </div>
          ),
        )}
      </div>

      {error && (
        <div className="ai-error-box">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      {recommendation?.emergency && <EmergencyBanner />}

      <div className="ai-appointment-layout">
        <div className="ai-left-column">
          <SymptomForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          {loading && (
            <LoadingState text="Analyzing symptoms and finding the best department." />
          )}

          {!loading && recommendation && (
            <AIRecommendationCard recommendation={recommendation} />
          )}
        </div>

        <div className="ai-right-column">
          <div className="ai-side-header">
            <FaUserMd />
            <div>
              <h3>Doctor Selection</h3>
              <p>AI suggested doctors and available slots appear here.</p>
            </div>
          </div>

          {!loading && doctors.length > 0 && (
            <DoctorList
              doctors={doctors}
              selectedDoctor={selectedDoctor}
              onSelectDoctor={handleSelectDoctor}
            />
          )}

          {!loading && recommendation && doctors.length === 0 && (
            <EmptyDoctorState />
          )}

          <SlotPicker
            slots={slots}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
          />

          <BookingSummary
            selectedDoctor={selectedDoctor}
            selectedSlot={selectedSlot}
            recommendation={recommendation}
            formData={formData}
            onConfirmBooking={handleConfirmBooking}
            bookingLoading={bookingLoading}
            bookingResult={bookingResult}
          />
        </div>
      </div>
    </div>
  );
}

export default AIAppointmentPage;
