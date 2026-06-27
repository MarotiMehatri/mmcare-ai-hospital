import React, { useState, useEffect, useMemo } from "react";
import {
  getAllDepartments,
  updateDepartmentStatus,
  deleteDepartment,
} from "../../services/Admin/adminDepartmentsApi";
import AdminDepartmentsFilter from "../../Component/Admin/AdminDepartmentsFilter";
import AdminDepartmentsTable from "../../Component/tables/AdminDepartmentsTable";
import "../../Styles/Admin/AdminDepartmentsPage.css";

function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const res = await getAllDepartments();
      setDepartments(res.data || []);
    } catch (error) {
      console.error("Failed to load departments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDepartmentStatus(id, newStatus);
      setDepartments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to update department status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      setDepartments((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete department:", error);
    }
  };

  const filteredDepartments = useMemo(() => {
    return departments.filter((item) => {
      const matchesSearch =
        item.departmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.departmentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.roomBlock?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [departments, searchTerm, statusFilter]);

  return (
    <div className="admin-departments-page">
      <div className="admin-departments-header">
        <h2>All Departments</h2>
        <p>Manage all hospital departments from admin panel.</p>
      </div>

      <AdminDepartmentsFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <div className="admin-departments-loading">Loading departments...</div>
      ) : (
        <AdminDepartmentsTable
          departments={filteredDepartments}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default AdminDepartmentsPage;
