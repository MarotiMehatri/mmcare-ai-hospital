import React, { useState } from "react";
import "../../Styles/Admin/PatientFormModal.css";
function PatientFormModal({ patient, editMode, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: patient?.fullName || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
    dob: patient?.dob || "",
    bloodGroup: patient?.bloodGroup || "",
    email: patient?.email || "",
    mobile: patient?.mobile || "",
    address: patient?.address || "",
    city: patient?.city || "",
    state: patient?.state || "",
    pin: patient?.pin || "",
    emergencyName: patient?.emergencyName || "",
    emergencyContact: patient?.emergencyContact || "",
    status: patient?.status || "Active",
    lastVisit: patient?.lastVisit || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return (
    <div className="patient-modal-overlay">
      <div className="patient-form-modal">
        <div className="patient-form-header">
          <h3>{editMode ? "Edit Patient" : "Add New Patient"}</h3>
          <button onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="patient-form-grid">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <input
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            name="pin"
            placeholder="PIN Code"
            value={formData.pin}
            onChange={handleChange}
          />
          <input
            name="emergencyName"
            placeholder="Emergency Contact Name"
            value={formData.emergencyName}
            onChange={handleChange}
          />
          <input
            name="emergencyContact"
            placeholder="Emergency Contact Number"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
          <input
            type="date"
            name="lastVisit"
            value={formData.lastVisit}
            onChange={handleChange}
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="patient-form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              {editMode ? "Update Patient" : "Save Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientFormModal;
