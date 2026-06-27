import React, { useState, useEffect, useMemo } from "react";
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../../services/Admin/adminPatientApi";

import "../../Styles/Admin/AdminPatientsPages.css";

import PatientStatsCards from "../../Component/cards/PatientStatsCards";
import PatientFilters from "../../Component/Admin/PatientFilters";
import PatientTable from "../../Component/tables/PatientTable";
import PatientFormModal from "../../Component/Admin/PatientFormModal";
import PatientDetailsModal from "../../Component/Admin/PatientDetailsModal";

function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const res = await getAllPatients();

      const patientList = Array.isArray(res.data)
        ? res.data
        : res.data.patients || res.data.data || [];

      setPatients(patientList);
    } catch (error) {
      console.error("Failed to load patients:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    return (Array.isArray(patients) ? patients : []).filter((patient) => {
      const matchesSearch =
        patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mobile?.includes(searchTerm);

      const matchesGender =
        genderFilter === "All" || patient.gender === genderFilter;

      const matchesStatus =
        statusFilter === "All" || patient.status === statusFilter;

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [patients, searchTerm, genderFilter, statusFilter]);

  const generatePatientID = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `PAT${randomNum}`;
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setEditMode(false);
    setShowFormModal(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setEditMode(true);
    setShowFormModal(true);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };

  const handleDeletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?",
    );
    if (!confirmDelete) return;

    try {
      await deletePatient(id);
      loadPatients();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSubmitPatient = async (formData) => {
    try {
      if (editMode && selectedPatient?.id) {
        await updatePatient(selectedPatient.id, formData);
      } else {
        await createPatient({
          ...formData,
          patientID: generatePatientID(),
          createdAt: new Date().toISOString(),
        });
      }
      setShowFormModal(false);
      loadPatients();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };
  return (
    <div className="admin-patients-page">
      <div className="admin-patients-hero">
        <div className="admin-patients-header">
          <div className="admin-patients-header-content">
            <h2 className="admin-patient-title">Patient Management</h2>
            <p className="admin-patients-subtitle">
              Manage all hospital patients, records, profile details, and
              status.
            </p>
          </div>

          <button className="admin-patients-add-btn" onClick={handleAddPatient}>
            + Add Patient
          </button>
        </div>

        <div className="admin-patients-stats-wrapper">
          <PatientStatsCards
            patients={Array.isArray(patients) ? patients : []}
          />
        </div>
      </div>

      <div className="admin-patient-filter-wrapper">
        <PatientFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      <div className="admin-patient-table-wrapper">
        <PatientTable
          patients={filteredPatients}
          loading={loading}
          onView={handleViewPatient}
          onEdit={handleEditPatient}
          onDelete={handleDeletePatient}
        />
      </div>

      {showFormModal && (
        <PatientFormModal
          patient={selectedPatient}
          editMode={editMode}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleSubmitPatient}
        />
      )}

      {showDetailsModal && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
}

export default AdminPatientsPage;
