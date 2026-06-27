import React, { useState, useEffect, useMemo } from "react";
import { getAppointmentsByPatientId } from "../../services/Patient/AppointmentAPI";
import PatientAppointmentsFilter from "../../Component/Patient/PatientAppointmentsFilter";
import PatientAppointmentsTable from "../../Component/tables/PatientAppointmentsTable";
import "../../Styles/Patient/PatientAppointments.css";

function PatientAppointmentsPage() {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        if (!patient?.id) return;
        setLoading(true);
        const data = await getAppointmentsByPatientId(patient.id);
        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [patient?.id]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.appointmentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.disease?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);
  return (
    <div className="patient-appointments-page">
      <div className="patient-appointments-page__head">
        <h2>My Appointments</h2>
        <p>
          Review all your doctor appointments, visit type, data, time, and
          booking status
        </p>
      </div>

      <PatientAppointmentsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {loading ? (
        <div className="patient-appointments-page__loading">
          Loading appointments...
        </div>
      ) : (
        <PatientAppointmentsTable appointments={filteredAppointments} />
      )}
    </div>
  );
}

export default PatientAppointmentsPage;
