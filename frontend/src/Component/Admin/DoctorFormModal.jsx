import React, { useState } from "react";
import "../../Styles/Admin/DoctorFormModal.css";

function DoctorFormModal({ doctor, editMode, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: doctor?.FullName || "",
    gender: doctor?.gender || "",
    dob: doctor?.dob || "",
    email: doctor?.email || "",
    phone: doctor?.phone || "",
    department: doctor?.department || "",
    specialization: doctor?.specialization || "",
    qualification: doctor?.qualification || "",
    experience: doctor?.experience || "",
    licenseNumber: doctor?.licenseNumber || "",
    hospitalName: doctor?.hospitalName || "MMCare Hospital",
    address: doctor?.address || "",
    availableDays: doctor?.availableDays?.join(", ") || "",
    morningSlot: doctor?.timeSlots?.morning || "",
    eveningSlot: doctor?.timeSlots?.evening || "",
    consultationFee: doctor?.consultationFee || "",
    status: doctor?.status || "Active",
    profilePhoto: doctor?.profilePhoto || "",
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
    <div className="doctor-modal-overlay">
      <div className="doctor-form-modal">
        <div className="doctor-form-header">
          <h3>{editMode ? "Edit Doctor" : "Add New Doctor"}</h3>
          <button onClick={onClose}>X</button>
        </div>

        <form className="doctor-form-grid" onSubmit={handleSubmit}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
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
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />

          <input
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
          />

          <input
            name="experience"
            type="number"
            placeholder="Experience (years)"
            value={formData.experience}
            onChange={handleChange}
          />

          <input
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleChange}
          />

          <input
            name="hospitalName"
            placeholder="Hospital Name"
            value={formData.hospitalName}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            name="availableDays"
            placeholder="Available Days (comma separated)"
            value={formData.availableDays}
            onChange={handleChange}
          />

          <input
            name="morningSlot"
            placeholder="Morning Slot"
            value={formData.morningSlot}
            onChange={handleChange}
          />

          <input
            name="eveningSlot"
            placeholder="Evening Slot"
            value={formData.eveningSlot}
            onChange={handleChange}
          />

          <input
            name="consultationFee"
            type="number"
            placeholder="Consultation Fee"
            value={formData.consultationFee}
            onChange={handleChange}
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <input
            name="profilePhoto"
            placeholder="Profile Photo Path"
            value={formData.profilePhoto}
            onChange={handleChange}
          />

          <div className="doctor-form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              {editMode ? "Update Doctor" : "Save Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorFormModal;
