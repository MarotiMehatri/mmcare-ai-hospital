import React, { useEffect, useMemo, useState } from "react";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../services/Admin/adminDoctorApi";

import DoctorStatsCards from "../../Component/cards/DoctorStatsCards";
import DoctorFilters from "../../Component/Admin/DoctorFilters";
import DoctorTable from "../../Component/tables/DoctorTable";
import DoctorFormModal from "../../Component/Admin/DoctorFormModal";
import DoctorDetailsModal from "../../Component/Admin/DoctorDetailsModal";

import "../../Styles/Admin/AdminDoctorsPage.css";

function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await getAllDoctors();

      const doctorList = Array.isArray(res.data)
        ? res.data
        : res.data.doctors || res.data.data || [];

      setDoctors(doctorList);
    } catch (error) {
      console.error("Failed to load doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return (Array.isArray(doctors) ? doctors : []).filter((doctor) => {
      const matchesSearch =
        doctor.FullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone?.includes(searchTerm);

      const matchesDepartment =
        departmentFilter === "All" || doctor.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" || doctor.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [doctors, searchTerm, departmentFilter, statusFilter]);

  const generateDoctorId = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `DOC${randomNum}`;
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setEditMode(false);
    setShowFormModal(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setEditMode(true);
    setShowFormModal(true);
  };

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailsModal(true);
  };

  const handleDeleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?",
    );
    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);
      loadDoctors();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmitDoctor = async (formData) => {
    try {
      const formattedData = {
        ...formData,
        experience: Number(formData.experience),
        consultationFee: Number(formData.consultationFee),
        availableDays: formData.availableDays
          .split(",")
          .map((day) => day.trim())
          .filter(Boolean),
        timeSlots: {
          morning: formData.morningSlot,
          evening: formData.eveningSlot,
        },
      };

      delete formattedData.morningSlot;
      delete formattedData.eveningSlot;

      if (editMode && selectedDoctor?.id) {
        await updateDoctor(selectedDoctor.id, {
          ...selectedDoctor,
          ...formattedData,
        });
      } else {
        await createDoctor({
          ...formattedData,
          doctorId: generateDoctorId(),
          createdAt: new Date().toISOString(),
        });
      }

      setShowFormModal(false);
      loadDoctors();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const departments = [
    "All",
    ...new Set(
      (Array.isArray(doctors) ? doctors : [])
        .map((doctor) => doctor.department)
        .filter(Boolean),
    ),
  ];

  return (
    <div className="admin-doctors-page">
      {/* HERO SECTION */}
      <div className="admin-doctors-hero">
        <div className="admin-doctors-header">
          <div className="admin-doctors-header-content">
            <h2 className="admin-doctors-title">Doctor Management</h2>
            <p className="admin-doctors-subtitle">
              Manage doctor profiles, department assignments, availability, and
              status.
            </p>
          </div>

          <button className="admin-doctors-add-btn" onClick={handleAddDoctor}>
            + Add Doctor
          </button>
        </div>

        <div className="admin-doctors-stats-wrapper">
          <DoctorStatsCards doctors={doctors} />
        </div>
      </div>

      {/* FILTERS */}
      <div className="admin-doctors-filter-wrapper">
        <DoctorFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          departments={departments}
        />
      </div>

      {/* TABLE */}
      <div className="admin-doctors-table-wrapper">
        <DoctorTable
          doctors={filteredDoctors}
          loading={loading}
          onView={handleViewDoctor}
          onEdit={handleEditDoctor}
          onDelete={handleDeleteDoctor}
        />
      </div>

      {showFormModal && (
        <DoctorFormModal
          doctor={selectedDoctor}
          editMode={editMode}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleSubmitDoctor}
        />
      )}

      {showDetailsModal && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}

export default AdminDoctorsPage;
