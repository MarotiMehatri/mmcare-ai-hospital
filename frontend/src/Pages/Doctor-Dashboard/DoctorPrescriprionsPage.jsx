import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaTrash,
  FaEdit,
  FaFilePrescription,
  FaUserInjured,
  FaNotesMedical,
} from "react-icons/fa";

import {
  getPrescriptionsByDoctor,
  deletePrescription,
} from "../../services/Doctor/PresscriptionApi";

import "../../Styles/Doctor/DoctorPrescriptionsPage1.css";

function DoctorPrescriptionsPage() {
  const navigate = useNavigate();

  const doctor = JSON.parse(localStorage.getItem("doctor")) || {
    id: "DOC-1001",
  };

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);

      const data = await getPrescriptionsByDoctor(doctor.id);

      setPrescriptions(data || []);
    } catch (error) {
      console.error("Error loading prescriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((item) => {
      const search = searchTerm.toLowerCase();

      const matchSearch =
        item?.patientName?.toLowerCase().includes(search) ||
        item?.diagnosis?.toLowerCase().includes(search) ||
        item?.prescriptionId?.toLowerCase().includes(search);

      const matchStatus =
        statusFilter === "all"
          ? true
          : item?.status?.toLowerCase() === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [prescriptions, searchTerm, statusFilter]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?",
    );

    if (!confirmDelete) return;

    try {
      await deletePrescription(id);

      setPrescriptions((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="doctor-prescriptions-page">
      {/* Header */}
      <div className="doctor-prescriptions-header">
        <div>
          <h1>Doctor Prescriptions</h1>
          <p>
            Manage all prescriptions, medicines, and patient medical history.
          </p>
        </div>

        <button
          className="create-prescription-btn"
          onClick={() => navigate("/doctor/create-prescriptions")}
        >
          <FaPlus />
          Create Prescription
        </button>
      </div>

      {/* Stats */}
      <div className="doctor-prescription-stats">
        <div className="doctor-stat-card">
          <FaFilePrescription />
          <div>
            <span>Total Prescriptions</span>
            <h3>{prescriptions.length}</h3>
          </div>
        </div>

        <div className="doctor-stat-card">
          <FaUserInjured />
          <div>
            <span>Completed</span>
            <h3>
              {
                prescriptions.filter((item) => item.status === "completed")
                  .length
              }
            </h3>
          </div>
        </div>

        <div className="doctor-stat-card">
          <FaNotesMedical />
          <div>
            <span>Pending</span>
            <h3>
              {prescriptions.filter((item) => item.status === "pending").length}
            </h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="doctor-prescription-filters">
        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search by patient, diagnosis or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="sent">Sent</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="doctor-prescription-loading">
          Loading prescriptions...
        </div>
      )}

      {/* Empty */}
      {!loading && filteredPrescriptions.length === 0 && (
        <div className="doctor-prescription-empty">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="empty"
          />

          <h3>No Prescriptions Found</h3>

          <p>Prescriptions created for patients will appear here.</p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredPrescriptions.length > 0 && (
        <div className="doctor-prescription-table-wrapper">
          <table className="doctor-prescription-table">
            <thead>
              <tr>
                <th>Prescription ID</th>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Visit Date</th>
                <th>Status</th>
                <th>Medicines</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPrescriptions.map((item) => (
                <tr key={item.id}>
                  <td>{item.prescriptionId}</td>

                  <td>
                    <div className="patient-info-cell">
                      <img
                        src={
                          item.patientPhoto ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="patient"
                      />

                      <div>
                        <h4>{item.patientName}</h4>
                        <span>
                          {item.patientGender} | {item.patientAge} Years
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>{item.diagnosis}</td>

                  <td>{item.visitDate}</td>

                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status}
                    </span>
                  </td>

                  <td>{item.medicines?.length || 0}</td>

                  <td>
                    <div className="table-action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/doctor/prescriptions/edit/${item.id}`)
                        }
                      >
                        <FaEdit />
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DoctorPrescriptionsPage;
