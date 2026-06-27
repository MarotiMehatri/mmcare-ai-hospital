import React from "react";

function AdminDepartmentsTable({ departments, onStatusChange, onDelete }) {
  return (
    <div className="admin-departments-table-wrapper">
      <table className="admin-departments-table">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department</th>
            <th>HOD</th>
            <th>Doctors</th>
            <th>Staff</th>
            <th>Floor</th>
            <th>Block</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {departments.length > 0 ? (
            departments.map((item) => (
              <tr key={item.id}>
                <td>{item.departmentId}</td>
                <td>{item.departmentName}</td>
                <td>{item.hodName}</td>
                <td>{item.totalDoctors}</td>
                <td>{item.totalStaff}</td>
                <td>{item.floor}</td>
                <td>{item.roomBlock}</td>
                <td>{item.contactNumber}</td>
                <td>
                  <span
                    className={`admin-department-status ${item.status?.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="admin-departments-actions">
                    <select
                      value={item.status}
                      onChange={(e) => onStatusChange(item.id, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    <button onClick={() => onDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="admin-no-departments">
                No departments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDepartmentsTable;
