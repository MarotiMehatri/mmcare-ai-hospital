import React, { useEffect, useState, useMemo } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../../services/Admin/adminAppointmentApi";
import AdminAppointmentsTable from "../../Component/tables/AdminAppointmentsTable";
import AdminAppointmentsFilter from "../../Component/Admin/AdminAppointmentsFilter";
import "../../Styles/Admin/AdminAppointmentsPage.css";
import { getAllDoctors } from "../../services/Admin/adminDoctorApi";
import { getAllBills } from "../../services/Admin/AdminBillingApi";

function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const getArray = (res, key) => {
    if (Array.isArray(res?.data)) return res.data;

    return res?.data?.[key] || res?.data?.data || [];
  };

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const [appointmentsRes, doctorsRes, paymentsRes] = await Promise.all([
        getAllAppointments(),
        getAllDoctors(),
        getAllBills,
      ]);

      const appointmentsData = getArray(appointmentsRes, "appointments");
      const doctorsData = getArray(doctorsRes, "doctors");
      const paymentsData = getArray(paymentsRes, "doctorPayments");

      const mergedAppointments = appointmentsData.map((appointment) => {
        const doctor = doctorsData.find(
          (doc) =>
            String(doc.id) === String(appointment.doctorId) ||
            String(doc.doctorId) === String(appointment.doctorId),
        );

        const payment = paymentsData.find(
          (pay) =>
            String(pay.appointmentId) === String(appointment.appointmentId) ||
            String(pay.appointmentId) === String(appointment.id),
        );

        return {
          ...appointment,
          doctorName:
            appointment.doctorName ||
            doctor?.FullName ||
            doctor?.fullName ||
            doctor?.name ||
            "Unknown Doctor",

          paymentStatus:
            payment?.paymentStatus || appointment.paymentStatus || "Pending",
        };
      });

      setAppointments(mergedAppointments);
    } catch (error) {
      console.error("Failed to load appointments:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.appointmentId?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);
  return (
    <div className="admin-appointments-page">
      <div className="admin-appointments-header">
        <h2>All Appointments</h2>
        <p>Manage all patient appointment bookings from admin panel.</p>
      </div>

      <AdminAppointmentsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <div className="admin-appointments-loading">
          Loading appointments...
        </div>
      ) : (
        <AdminAppointmentsTable
          appointments={filteredAppointments}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminAppointmentsPage;
