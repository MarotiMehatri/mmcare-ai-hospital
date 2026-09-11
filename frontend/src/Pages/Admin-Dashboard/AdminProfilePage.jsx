import React, { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiAward,
  FiCalendar,
  FiCamera,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiShield,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

import "../../Styles/Admin/AdminProfilePage.css";

const DEFAULT_PROFILE = {
  firstName: "Admin",
  lastName: "User",
  email: "",
  phone: "",
  role: "System Administrator",
  department: "Administration",
  location: "MMCare AI Hospital",
  bio: "Hospital management system administrator responsible for managing users, doctors, patients, appointments, reports, billing and system operations.",
  joinedDate: "2026-01-01",
  status: "Active",
  avatar: "",
};

function AdminProfilePage() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [draftProfile, setDraftProfile] = useState(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState("");

  const [stats] = useState({
    patients: 1248,
    doctors: 86,
    appointments: 3421,
    reports: 964,
  });

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("mmcare_admin_profile");

      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);

        const mergedProfile = {
          ...DEFAULT_PROFILE,
          ...parsedProfile,
        };

        setProfile(mergedProfile);
        setDraftProfile(mergedProfile);
        return;
      }

      const adminEmail =
        import.meta.env.VITE_ADMIN_EMAIL || "admin@mmcare.ai";

      const initialProfile = {
        ...DEFAULT_PROFILE,
        email: adminEmail,
      };

      setProfile(initialProfile);
      setDraftProfile(initialProfile);
    } catch (err) {
      console.error("Failed to load admin profile:", err);
      setError("Failed to load admin profile.");
    }
  }, []);

  const fullName = useMemo(() => {
    return `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Admin User";
  }, [profile.firstName, profile.lastName]);

  const initials = useMemo(() => {
    const first = profile.firstName?.charAt(0) || "A";
    const last = profile.lastName?.charAt(0) || "U";

    return `${first}${last}`.toUpperCase();
  }, [profile.firstName, profile.lastName]);

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDraftProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaveMessage("");
    setError("");
  };

  const handleEdit = () => {
    setDraftProfile(profile);
    setIsEditing(true);
    setSaveMessage("");
    setError("");
  };

  const handleCancel = () => {
    setDraftProfile(profile);
    setIsEditing(false);
    setSaveMessage("");
    setError("");
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Profile image must be smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setDraftProfile((previous) => ({
        ...previous,
        avatar: reader.result,
      }));

      setError("");
      setSaveMessage("");
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!draftProfile.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!draftProfile.lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (!draftProfile.email.trim()) {
      setError("Email address is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setSaveMessage("");

      const updatedProfile = {
        ...draftProfile,
        firstName: draftProfile.firstName.trim(),
        lastName: draftProfile.lastName.trim(),
        email: draftProfile.email.trim(),
        phone: draftProfile.phone.trim(),
        role: draftProfile.role.trim(),
        department: draftProfile.department.trim(),
        location: draftProfile.location.trim(),
        bio: draftProfile.bio.trim(),
      };

      localStorage.setItem(
        "mmcare_admin_profile",
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);
      setDraftProfile(updatedProfile);
      setIsEditing(false);
      setSaveMessage("Profile updated successfully.");
    } catch (err) {
      console.error("Failed to save admin profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-container">

        {/* Header */}
        <div className="admin-profile-page-header">
          <div>
            <span className="admin-profile-eyebrow">
              ADMINISTRATION
            </span>

            <h1>Admin Profile</h1>

            <p>
              Manage your administrator profile and account information.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              className="admin-profile-edit-btn"
              onClick={handleEdit}
            >
              <FiEdit3 />
              Edit Profile
            </button>
          )}
        </div>

        {/* Messages */}
        {saveMessage && (
          <div className="admin-profile-success">
            <FiCheckCircle />
            <span>{saveMessage}</span>
          </div>
        )}

        {error && (
          <div className="admin-profile-error">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Close error"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* Profile Hero */}
        <section className="admin-profile-hero">
          <div className="admin-profile-avatar-wrapper">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={fullName}
                className="admin-profile-avatar-image"
              />
            ) : (
              <div className="admin-profile-avatar">
                {initials}
              </div>
            )}

            {isEditing && (
              <label
                htmlFor="admin-profile-avatar-upload"
                className="admin-profile-camera"
                title="Change profile photo"
              >
                <FiCamera />

                <input
                  id="admin-profile-avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  hidden
                />
              </label>
            )}
          </div>

          <div className="admin-profile-hero-content">
            <div className="admin-profile-name-row">
              <h2>{fullName}</h2>

              <span className="admin-profile-active-badge">
                <span />
                Active
              </span>
            </div>

            <p className="admin-profile-role">
              {profile.role}
            </p>

            <div className="admin-profile-meta">
              <span>
                <FiMail />
                {profile.email || "No email"}
              </span>

              <span>
                <FiMapPin />
                {profile.location || "No location"}
              </span>

              <span>
                <FiCalendar />
                Joined {formatDate(profile.joinedDate)}
              </span>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="admin-profile-stat-grid">
          <div className="admin-profile-stat-card">
            <div className="admin-profile-stat-icon">
              <FiUsers />
            </div>

            <div>
              <strong>{stats.patients.toLocaleString()}</strong>
              <span>Total Patients</span>
            </div>
          </div>

          <div className="admin-profile-stat-card">
            <div className="admin-profile-stat-icon">
              <FiUser />
            </div>

            <div>
              <strong>{stats.doctors.toLocaleString()}</strong>
              <span>Doctors</span>
            </div>
          </div>

          <div className="admin-profile-stat-card">
            <div className="admin-profile-stat-icon">
              <FiCalendar />
            </div>

            <div>
              <strong>{stats.appointments.toLocaleString()}</strong>
              <span>Appointments</span>
            </div>
          </div>

          <div className="admin-profile-stat-card">
            <div className="admin-profile-stat-icon">
              <FiActivity />
            </div>

            <div>
              <strong>{stats.reports.toLocaleString()}</strong>
              <span>Medical Reports</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="admin-profile-content-grid">

          {/* Personal Information */}
          <section className="admin-profile-card">
            <div className="admin-profile-card-header">
              <div>
                <h3>Personal Information</h3>
                <p>Your administrator account information.</p>
              </div>

              <FiUser />
            </div>

            {isEditing ? (
              <form onSubmit={handleSave}>
                <div className="admin-profile-form-grid">

                  <div className="admin-profile-field">
                    <label htmlFor="firstName">
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      value={draftProfile.firstName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div className="admin-profile-field">
                    <label htmlFor="lastName">
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      value={draftProfile.lastName}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div className="admin-profile-field">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <div className="admin-profile-input-icon">
                      <FiMail />

                      <input
                        id="email"
                        name="email"
                        value={draftProfile.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  <div className="admin-profile-field">
                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <div className="admin-profile-input-icon">
                      <FiPhone />

                      <input
                        id="phone"
                        name="phone"
                        value={draftProfile.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="admin-profile-field">
                    <label htmlFor="role">
                      Role
                    </label>

                    <input
                      id="role"
                      name="role"
                      value={draftProfile.role}
                      onChange={handleChange}
                      type="text"
                      placeholder="System Administrator"
                    />
                  </div>

                  <div className="admin-profile-field">
                    <label htmlFor="department">
                      Department
                    </label>

                    <input
                      id="department"
                      name="department"
                      value={draftProfile.department}
                      onChange={handleChange}
                      type="text"
                      placeholder="Administration"
                    />
                  </div>

                  <div className="admin-profile-field admin-profile-field-full">
                    <label htmlFor="location">
                      Location
                    </label>

                    <div className="admin-profile-input-icon">
                      <FiMapPin />

                      <input
                        id="location"
                        name="location"
                        value={draftProfile.location}
                        onChange={handleChange}
                        type="text"
                        placeholder="Hospital location"
                      />
                    </div>
                  </div>

                  <div className="admin-profile-field admin-profile-field-full">
                    <label htmlFor="bio">
                      About
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      value={draftProfile.bio}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Write something about the administrator..."
                    />
                  </div>

                </div>

                <div className="admin-profile-form-actions">
                  <button
                    type="button"
                    className="admin-profile-cancel-btn"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    <FiX />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-profile-save-btn"
                    disabled={isSaving}
                  >
                    <FiSave />

                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="admin-profile-information-list">

                <div className="admin-profile-information-item">
                  <span>Full Name</span>
                  <strong>{fullName}</strong>
                </div>

                <div className="admin-profile-information-item">
                  <span>Email Address</span>
                  <strong>{profile.email || "Not provided"}</strong>
                </div>

                <div className="admin-profile-information-item">
                  <span>Phone Number</span>
                  <strong>{profile.phone || "Not provided"}</strong>
                </div>

                <div className="admin-profile-information-item">
                  <span>Role</span>
                  <strong>{profile.role}</strong>
                </div>

                <div className="admin-profile-information-item">
                  <span>Department</span>
                  <strong>{profile.department}</strong>
                </div>

                <div className="admin-profile-information-item">
                  <span>Location</span>
                  <strong>{profile.location}</strong>
                </div>

                <div className="admin-profile-information-item admin-profile-information-full">
                  <span>About</span>
                  <p>{profile.bio}</p>
                </div>

              </div>
            )}
          </section>

          {/* Account Security */}
          <section className="admin-profile-card admin-profile-security-card">
            <div className="admin-profile-card-header">
              <div>
                <h3>Account Security</h3>
                <p>Security status of your admin account.</p>
              </div>

              <FiShield />
            </div>

            <div className="admin-profile-security-list">

              <div className="admin-profile-security-item">
                <div className="admin-profile-security-icon">
                  <FiShield />
                </div>

                <div>
                  <strong>Password Protection</strong>
                  <span>Your account is password protected.</span>
                </div>

                <FiCheckCircle className="security-check" />
              </div>

              <div className="admin-profile-security-item">
                <div className="admin-profile-security-icon">
                  <FiActivity />
                </div>

                <div>
                  <strong>Account Status</strong>
                  <span>Your administrator account is active.</span>
                </div>

                <span className="security-status">
                  Active
                </span>
              </div>

              <div className="admin-profile-security-item">
                <div className="admin-profile-security-icon">
                  <FiClock />
                </div>

                <div>
                  <strong>Last Activity</strong>
                  <span>Administrator dashboard activity.</span>
                </div>

                <strong className="security-time">
                  Today
                </strong>
              </div>

            </div>

            <div className="admin-profile-security-footer">
              <p>
                For password, notification, appearance and session
                preferences, use the Settings page.
              </p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="admin-profile-footer">
          <FiAward />
          <span>
            MMCare AI Hospital Administration
          </span>
          <span>•</span>
          <span>Administrator Account</span>
        </div>

      </div>
    </div>
  );
}

export default AdminProfilePage;