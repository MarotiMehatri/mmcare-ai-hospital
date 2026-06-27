import React, { useEffect, useMemo, useState } from "react";
import {
  getAppointmentsByDoctorId,
  updateAppointmentStatus,
} from "../../services/Doctor/DoctorAppointmentAPI";
import DoctorAppointmentsFilter from "../../Component/Doctor/DoctorAppointmentsFilter";
import DoctorAppointmentsTable from "../../Component/tables/DoctorAppointmentsTable";
import "../../Styles/Doctor/DoctorAppointments.css";

function DoctorAppointmentsPage() {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        if (!doctor?.id) return;
        setLoading(true);
        const res = await getAppointmentsByDoctorId(doctor.id);
        setAppointments(res.data || []);
      } catch (error) {
        console.error("Failed to load doctor appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [doctor?.id]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointmentId ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.disease?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.appointmentId?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  return (
    <div className="doctor-appointments-page">
      <div className="doctor-appointments-page__head">
        <h2>Doctor Appointments</h2>
        <p>
          Manage all assigned patient appointments, update statuses, and track
          consultation flow.
        </p>
      </div>

      <DoctorAppointmentsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <div className="doctor-appointments-page__loading">
          Loading appointments...
        </div>
      ) : (
        <DoctorAppointmentsTable
          appointments={filteredAppointments}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

export default DoctorAppointmentsPage;
