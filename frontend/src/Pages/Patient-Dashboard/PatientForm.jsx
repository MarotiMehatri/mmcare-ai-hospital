import React, { useEffect, useState } from "react";
import { FaSave, FaUserCircle, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/Patient/profileForm.css";
import {
  createPatient,
  getPatientByUserId,
  updatePatient,
} from "../../services/Patient/PatientAPI";

function PatientForm() {
  const navigate = useNavigate();

  const generatePatientID = () =>
    "PAT" + Math.floor(100000 + Math.random() * 900000);

  const [patient, setPatient] = useState({
    id: null,
    patientID: generatePatientID(),
    userId: "",
    fullName: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    photo: "",
    age: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    emergencyName: "",
    emergencyContact: "",
    status: "Active",
  });

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        setUserData(storedUser);

        const existing = await getPatientByUserId(storedUser.id);

        if (existing) {
          setPatient(existing);
          localStorage.setItem("patient", JSON.stringify(existing));
        } else {
          setPatient((prev) => ({
            ...prev,
            userId: storedUser.id,
            fullName: storedUser.fullName,
            email: storedUser.email,
            dob: storedUser.dob,
            bloodGroup: storedUser.bloodGroup,
            gender: storedUser.gender,
          }));
        }
      } catch (error) {
        console.error("Failed to load patient data:", error);
      }
    };
    loadData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload only image file");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        const maxWidth = 350;
        const maxHeight = 350;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.5);

        setPatient((prev) => ({
          ...prev,
          photo: compressedImage,
        }));
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!userData?.id) {
        alert("User data missing. Please login again.");
        navigate("/login");
        return;
      }

      const patientData = {
        ...patient,
        userId: userData.id,
        fullName: userData.fullName || patient.fullName,
        email: userData.email || patient.email,
        dob: userData.dob || patient.dob,
        bloodGroup: userData.bloodGroup || patient.bloodGroup,
        gender: userData.gender || patient.gender,
        status: "Active",
      };

      let res;

      if (patient.id) {
        res = await updatePatient(patient.id, patientData);
        alert("Profile updated successfully");
      } else {
        res = await createPatient(patientData);
        alert("Profile created successfully");
      }

      const savedPatient = res?.data?.data || res?.data || res;

      localStorage.setItem("patient", JSON.stringify(savedPatient));
      navigate("/patient");
    } catch (err) {
      console.error("Patient form submit error:", err);
      console.error("Response:", err?.response?.data);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while saving patient profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form-page">
      <div className="profile-form-container">
        <div className="profile-form-card">
          <div className="profile-form-header">
            <div>
              <h2 className="profile-form-title">Patient Profile Form</h2>
              <p className="profile-form-subtitle">
                Complete your patient profile to access appointments, billing,
                reports, and hospital services.
              </p>
            </div>
          </div>

          <div className="profile-image-section">
            <div className="profile-image-wrapper">
              {patient.photo ? (
                <img
                  src={patient.photo}
                  alt="profile"
                  className="patient-image"
                />
              ) : (
                <FaUserCircle className="patient-default-icon" />
              )}
            </div>

            <label className="profile-upload-btn">
              <FaUpload />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                hidden
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="patient-form">
            <div className="patient-form-section">
              <div className="section-heading">
                <h3>User Details</h3>
                <span>Read only information</span>
              </div>

              <div className="patient-form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input value={userData.fullName || ""} readOnly />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input value={userData.email || ""} readOnly />
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>
                  <input value={userData.dob || ""} readOnly />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <input value={userData.gender || ""} readOnly />
                </div>

                <div className="form-group">
                  <label>Blood Group</label>
                  <input value={userData.bloodGroup || ""} readOnly />
                </div>

                <div className="form-group">
                  <label>Patient ID</label>
                  <input value={patient.patientID || ""} readOnly />
                </div>
              </div>
            </div>

            <div className="patient-form-section">
              <div className="section-heading">
                <h3>Personal & Contact Details</h3>
                <span>Editable information</span>
              </div>

              <div className="patient-form-grid">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    name="age"
                    value={patient.age || ""}
                    onChange={handleChange}
                    placeholder="Enter age"
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    name="mobile"
                    value={patient.mobile || ""}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    name="address"
                    value={patient.address || ""}
                    onChange={handleChange}
                    placeholder="Enter full address"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    name="city"
                    value={patient.city || ""}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    name="state"
                    value={patient.state || ""}
                    onChange={handleChange}
                    placeholder="Enter state"
                  />
                </div>

                <div className="form-group">
                  <label>PIN Code</label>
                  <input
                    name="pin"
                    value={patient.pin || ""}
                    onChange={handleChange}
                    placeholder="Enter PIN code"
                  />
                </div>

                <div className="form-group">
                  <label>Emergency Contact Name</label>
                  <input
                    name="emergencyName"
                    value={patient.emergencyName || ""}
                    onChange={handleChange}
                    placeholder="Enter emergency contact name"
                  />
                </div>

                <div className="form-group">
                  <label>Emergency Contact Number</label>
                  <input
                    name="emergencyContact"
                    value={patient.emergencyContact || ""}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                  />
                </div>
              </div>
            </div>

            <button className="patient-save-btn" disabled={loading}>
              <FaSave />
              {loading ? "Saving..." : "Save Patient Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientForm;
