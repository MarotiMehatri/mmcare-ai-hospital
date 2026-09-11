
import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaBell,
    FaLock,
    FaShieldAlt,
    FaPalette,
    FaSignOutAlt,
    FaSave,
    FaEye,
    FaEyeSlash,
    FaChevronRight,
    FaCheckCircle,
    FaEnvelope,
    FaPhone,
    FaIdCard,
    FaMoon,
    FaSun,
    FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "../../Styles/Patient/PatientSettings.css";

function PatientSettings() {
    const navigate = useNavigate();

    // =========================================================
    // USER / PATIENT
    // =========================================================

    const [user, setUser] = useState(null);
    const [patient, setPatient] = useState(null);

    // =========================================================
    // ACTIVE SECTION
    // =========================================================

    const [activeSection, setActiveSection] = useState("profile");

    // =========================================================
    // FORM STATES
    // =========================================================

    const [profileForm, setProfileForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        bloodGroup: "",
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // =========================================================
    // PASSWORD VISIBILITY
    // =========================================================

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    // =========================================================
    // SETTINGS
    // =========================================================

    const [settings, setSettings] = useState({
        emailNotifications: true,
        appointmentReminders: true,
        medicationReminders: true,
        doctorMessages: true,
        healthUpdates: true,
        promotionalEmails: false,
        profileVisibility: true,
        twoFactorAuthentication: false,
        darkMode: false,
    });

    // =========================================================
    // UI STATES
    // =========================================================

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [error, setError] = useState("");

    // =========================================================
    // LOAD DATA
    // =========================================================

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            const storedPatient = localStorage.getItem("patient");
            const storedSettings = localStorage.getItem(
                "patientSettings"
            );

            let parsedUser = null;
            let parsedPatient = null;

            if (storedUser) {
                parsedUser = JSON.parse(storedUser);
            }

            if (storedPatient) {
                parsedPatient = JSON.parse(storedPatient);
            }

            setUser(parsedUser);
            setPatient(parsedPatient);

            // -------------------------------------------------------
            // PROFILE DATA
            // -------------------------------------------------------

            setProfileForm({
                fullName:
                    parsedPatient?.fullName ||
                    parsedPatient?.name ||
                    parsedUser?.fullName ||
                    parsedUser?.name ||
                    "",

                email:
                    parsedPatient?.email ||
                    parsedUser?.email ||
                    "",

                mobile:
                    parsedPatient?.mobile ||
                    parsedPatient?.phone ||
                    parsedUser?.mobile ||
                    parsedUser?.phone ||
                    "",

                gender:
                    parsedPatient?.gender ||
                    parsedUser?.gender ||
                    "",

                dob:
                    parsedPatient?.dob ||
                    parsedUser?.dob ||
                    "",

                bloodGroup:
                    parsedPatient?.bloodGroup ||
                    parsedUser?.bloodGroup ||
                    "",
            });

            // -------------------------------------------------------
            // SETTINGS
            // -------------------------------------------------------

            if (storedSettings) {
                try {
                    const parsedSettings = JSON.parse(
                        storedSettings
                    );

                    setSettings((previous) => ({
                        ...previous,
                        ...parsedSettings,
                    }));
                } catch (settingsError) {
                    console.error(
                        "Failed to parse patient settings:",
                        settingsError
                    );
                }
            }
        } catch (error) {
            console.error(
                "PatientSettings: Failed to load settings:",
                error
            );

            setError(
                "Unable to load your settings."
            );
        }
    }, []);

    // =========================================================
    // PROFILE INPUT
    // =========================================================

    const handleProfileChange = (event) => {
        const { name, value } = event.target;

        setProfileForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setSaved(false);
    };

    // =========================================================
    // PASSWORD INPUT
    // =========================================================

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;

        setPasswordForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setPasswordMessage("");
    };

    // =========================================================
    // SETTINGS TOGGLE
    // =========================================================

    const handleSettingChange = (name) => {
        setSettings((previous) => ({
            ...previous,
            [name]: !previous[name],
        }));

        setSaved(false);
    };

    // =========================================================
    // SAVE PROFILE
    // =========================================================

    const handleSaveProfile = () => {
        setSaving(true);
        setError("");
        setSaved(false);

        try {
            const updatedPatient = {
                ...(patient || {}),
                ...profileForm,
            };

            const updatedUser = {
                ...(user || {}),
                fullName: profileForm.fullName,
                email: profileForm.email,
                mobile: profileForm.mobile,
            };

            localStorage.setItem(
                "patient",
                JSON.stringify(updatedPatient)
            );

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setPatient(updatedPatient);
            setUser(updatedUser);

            setTimeout(() => {
                setSaving(false);
                setSaved(true);
            }, 500);
        } catch (saveError) {
            console.error(
                "PatientSettings: Failed to save profile:",
                saveError
            );

            setSaving(false);

            setError(
                "Unable to save profile information."
            );
        }
    };

    // =========================================================
    // SAVE PREFERENCES
    // =========================================================

    const handleSavePreferences = () => {
        setSaving(true);
        setError("");
        setSaved(false);

        try {
            localStorage.setItem(
                "patientSettings",
                JSON.stringify(settings)
            );

            setTimeout(() => {
                setSaving(false);
                setSaved(true);
            }, 500);
        } catch (saveError) {
            console.error(
                "PatientSettings: Failed to save preferences:",
                saveError
            );

            setSaving(false);

            setError(
                "Unable to save your preferences."
            );
        }
    };

    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    const handleChangePassword = (event) => {
        event.preventDefault();

        setPasswordMessage("");
        setError("");

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = passwordForm;

        if (!currentPassword) {
            setError(
                "Please enter your current password."
            );
            return;
        }

        if (!newPassword) {
            setError(
                "Please enter a new password."
            );
            return;
        }

        if (newPassword.length < 8) {
            setError(
                "New password must contain at least 8 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(
                "New password and confirm password do not match."
            );
            return;
        }

        /*
         * IMPORTANT:
         * This is only the frontend UI validation.
         *
         * In production, password changes MUST be handled
         * by your backend API.
         *
         * Example:
         *
         * await changePatientPassword({
         *   currentPassword,
         *   newPassword
         * });
         */

        setPasswordMessage(
            "Password validation completed. Connect this form to your password API."
        );

        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {
        const authKeys = [
            "token",
            "accessToken",
            "refreshToken",
            "user",
            "userId",
            "userMongoId",
            "patient",
            "patientId",
            "patientMongoId",
        ];

        authKeys.forEach((key) => {
            localStorage.removeItem(key);
        });

        navigate("/login", {
            replace: true,
        });
    };

    // =========================================================
    // NAVIGATION
    // =========================================================

    const settingsMenu = [
        {
            id: "profile",
            label: "Profile",
            description: "Manage your personal information",
            icon: <FaUser />,
        },
        {
            id: "notifications",
            label: "Notifications",
            description: "Manage alerts and reminders",
            icon: <FaBell />,
        },
        {
            id: "security",
            label: "Security",
            description: "Password and account security",
            icon: <FaShieldAlt />,
        },
        {
            id: "privacy",
            label: "Privacy",
            description: "Manage your privacy preferences",
            icon: <FaLock />,
        },
        {
            id: "appearance",
            label: "Appearance",
            description: "Customize your dashboard",
            icon: <FaPalette />,
        },
    ];

    // =========================================================
    // RENDER PROFILE
    // =========================================================

    const renderProfile = () => {
        return (
            <div className="patient-settings-section">

                <div className="patient-settings-section-header">
                    <div>
                        <h2>Profile Information</h2>
                        <p>
                            Manage your personal information and contact details.
                        </p>
                    </div>
                </div>

                <div className="patient-settings-profile-card">

                    <div className="patient-settings-avatar">
                        {profileForm.fullName
                            ? profileForm.fullName
                                .charAt(0)
                                .toUpperCase()
                            : "P"}
                    </div>

                    <div className="patient-settings-profile-info">
                        <h3>
                            {profileForm.fullName || "Patient"}
                        </h3>

                        <p>
                            {profileForm.email ||
                                "No email address"}
                        </p>

                        <span>
                            Patient Account
                        </span>
                    </div>

                </div>

                <div className="patient-settings-form-grid">

                    <div className="patient-settings-field">
                        <label>Full Name</label>

                        <div className="patient-settings-input-wrapper">
                            <FaUser />

                            <input
                                type="text"
                                name="fullName"
                                value={profileForm.fullName}
                                onChange={handleProfileChange}
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    <div className="patient-settings-field">
                        <label>Email Address</label>

                        <div className="patient-settings-input-wrapper">
                            <FaEnvelope />

                            <input
                                type="email"
                                name="email"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="patient-settings-field">
                        <label>Mobile Number</label>

                        <div className="patient-settings-input-wrapper">
                            <FaPhone />

                            <input
                                type="tel"
                                name="mobile"
                                value={profileForm.mobile}
                                onChange={handleProfileChange}
                                placeholder="Enter your mobile number"
                            />
                        </div>
                    </div>

                    <div className="patient-settings-field">
                        <label>Gender</label>

                        <select
                            name="gender"
                            value={profileForm.gender}
                            onChange={handleProfileChange}
                        >
                            <option value="">
                                Select gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    <div className="patient-settings-field">
                        <label>Date of Birth</label>

                        <input
                            type="date"
                            name="dob"
                            value={profileForm.dob}
                            onChange={handleProfileChange}
                        />
                    </div>

                    <div className="patient-settings-field">
                        <label>Blood Group</label>

                        <select
                            name="bloodGroup"
                            value={profileForm.bloodGroup}
                            onChange={handleProfileChange}
                        >
                            <option value="">
                                Select blood group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                </div>

                <div className="patient-settings-actions">
                    <button
                        type="button"
                        className="patient-settings-save-btn"
                        onClick={handleSaveProfile}
                        disabled={saving}
                    >
                        <FaSave />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                    {saved && (
                        <span className="patient-settings-success">
                            <FaCheckCircle />
                            Changes saved successfully
                        </span>
                    )}
                </div>

            </div>
        );
    };

    // =========================================================
    // RENDER NOTIFICATIONS
    // =========================================================

    const renderNotifications = () => {
        return (
            <div className="patient-settings-section">

                <div className="patient-settings-section-header">
                    <div>
                        <h2>Notification Preferences</h2>
                        <p>
                            Choose which notifications you want to receive.
                        </p>
                    </div>
                </div>

                <div className="patient-settings-options">

                    <SettingToggle
                        title="Email Notifications"
                        description="Receive important updates through email."
                        enabled={settings.emailNotifications}
                        onChange={() =>
                            handleSettingChange(
                                "emailNotifications"
                            )
                        }
                    />

                    <SettingToggle
                        title="Appointment Reminders"
                        description="Get reminders before your appointments."
                        enabled={settings.appointmentReminders}
                        onChange={() =>
                            handleSettingChange(
                                "appointmentReminders"
                            )
                        }
                    />

                    <SettingToggle
                        title="Medication Reminders"
                        description="Receive reminders for your medications."
                        enabled={settings.medicationReminders}
                        onChange={() =>
                            handleSettingChange(
                                "medicationReminders"
                            )
                        }
                    />

                    <SettingToggle
                        title="Doctor Messages"
                        description="Get notified when a doctor sends you a message."
                        enabled={settings.doctorMessages}
                        onChange={() =>
                            handleSettingChange(
                                "doctorMessages"
                            )
                        }
                    />

                    <SettingToggle
                        title="Health Updates"
                        description="Receive important health-related updates."
                        enabled={settings.healthUpdates}
                        onChange={() =>
                            handleSettingChange(
                                "healthUpdates"
                            )
                        }
                    />

                    <SettingToggle
                        title="Promotional Emails"
                        description="Receive healthcare offers and promotional information."
                        enabled={settings.promotionalEmails}
                        onChange={() =>
                            handleSettingChange(
                                "promotionalEmails"
                            )
                        }
                    />

                </div>

                <div className="patient-settings-actions">

                    <button
                        type="button"
                        className="patient-settings-save-btn"
                        onClick={handleSavePreferences}
                        disabled={saving}
                    >
                        <FaSave />

                        {saving
                            ? "Saving..."
                            : "Save Preferences"}
                    </button>

                    {saved && (
                        <span className="patient-settings-success">
                            <FaCheckCircle />
                            Preferences saved
                        </span>
                    )}

                </div>

            </div>
        );
    };

    // =========================================================
    // RENDER SECURITY
    // =========================================================

    const renderSecurity = () => {
        return (
            <div className="patient-settings-section">

                <div className="patient-settings-section-header">
                    <div>
                        <h2>Security</h2>
                        <p>
                            Keep your healthcare account secure.
                        </p>
                    </div>
                </div>

                <div className="patient-settings-security-card">

                    <div className="patient-settings-security-icon">
                        <FaShieldAlt />
                    </div>

                    <div>
                        <h3>Account Security</h3>

                        <p>
                            Use a strong password and keep your login
                            information private.
                        </p>
                    </div>

                </div>

                <form
                    className="patient-settings-password-form"
                    onSubmit={handleChangePassword}
                >

                    <h3>Change Password</h3>

                    <div className="patient-settings-field">

                        <label>
                            Current Password
                        </label>

                        <div className="patient-settings-password-wrapper">

                            <FaLock />

                            <input
                                type={
                                    showCurrentPassword
                                        ? "text"
                                        : "password"
                                }
                                name="currentPassword"
                                value={
                                    passwordForm.currentPassword
                                }
                                onChange={handlePasswordChange}
                                placeholder="Enter current password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCurrentPassword(
                                        (previous) => !previous
                                    )
                                }
                            >
                                {showCurrentPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>
                    </div>

                    <div className="patient-settings-field">

                        <label>
                            New Password
                        </label>

                        <div className="patient-settings-password-wrapper">

                            <FaLock />

                            <input
                                type={
                                    showNewPassword
                                        ? "text"
                                        : "password"
                                }
                                name="newPassword"
                                value={
                                    passwordForm.newPassword
                                }
                                onChange={handlePasswordChange}
                                placeholder="Enter new password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword(
                                        (previous) => !previous
                                    )
                                }
                            >
                                {showNewPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                    </div>

                    <div className="patient-settings-field">

                        <label>
                            Confirm New Password
                        </label>

                        <div className="patient-settings-password-wrapper">

                            <FaLock />

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                value={
                                    passwordForm.confirmPassword
                                }
                                onChange={handlePasswordChange}
                                placeholder="Confirm new password"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (previous) => !previous
                                    )
                                }
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                    </div>

                    {passwordMessage && (
                        <div className="patient-settings-success-box">
                            <FaCheckCircle />
                            {passwordMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="patient-settings-save-btn"
                    >
                        <FaLock />
                        Update Password
                    </button>

                </form>

                <div className="patient-settings-danger-zone">

                    <div>
                        <h3>Logout from this account</h3>

                        <p>
                            Sign out of your current patient account.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="patient-settings-logout-btn"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            </div>
        );
    };

    // =========================================================
    // RENDER PRIVACY
    // =========================================================

    const renderPrivacy = () => {
        return (
            <div className="patient-settings-section">

                <div className="patient-settings-section-header">
                    <div>
                        <h2>Privacy</h2>

                        <p>
                            Control how your healthcare information is
                            handled inside the application.
                        </p>
                    </div>
                </div>

                <div className="patient-settings-options">

                    <SettingToggle
                        title="Profile Visibility"
                        description="Allow authorized healthcare staff to view your basic profile."
                        enabled={settings.profileVisibility}
                        onChange={() =>
                            handleSettingChange(
                                "profileVisibility"
                            )
                        }
                    />

                    <SettingToggle
                        title="Two-Factor Authentication"
                        description="Add an additional security layer to your account."
                        enabled={settings.twoFactorAuthentication}
                        onChange={() =>
                            handleSettingChange(
                                "twoFactorAuthentication"
                            )
                        }
                    />

                </div>

                <div className="patient-settings-info-box">

                    <FaShieldAlt />

                    <div>
                        <h3>Healthcare Data Protection</h3>

                        <p>
                            Your medical records and healthcare information
                            should only be accessible to authorized users
                            according to your application's access controls.
                        </p>
                    </div>

                </div>

                <div className="patient-settings-actions">

                    <button
                        type="button"
                        className="patient-settings-save-btn"
                        onClick={handleSavePreferences}
                        disabled={saving}
                    >
                        <FaSave />

                        {saving
                            ? "Saving..."
                            : "Save Privacy Settings"}
                    </button>

                </div>

            </div>
        );
    };

    // =========================================================
    // RENDER APPEARANCE
    // =========================================================

    const renderAppearance = () => {
        return (
            <div className="patient-settings-section">

                <div className="patient-settings-section-header">
                    <div>
                        <h2>Appearance</h2>

                        <p>
                            Customize how your patient dashboard looks.
                        </p>
                    </div>
                </div>

                <div className="patient-settings-theme-card">

                    <div className="patient-settings-theme-option">
                        <div className="patient-settings-theme-icon">
                            <FaSun />
                        </div>

                        <div>
                            <h3>Light Mode</h3>
                            <p>
                                Use the standard hospital dashboard theme.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={`patient-settings-theme-switch ${!settings.darkMode
                            ? "active"
                            : ""
                            }`}
                        onClick={() =>
                            setSettings((previous) => ({
                                ...previous,
                                darkMode: false,
                            }))
                        }
                    >
                        {!settings.darkMode
                            ? "Selected"
                            : "Select"}
                    </button>

                </div>

                <div className="patient-settings-theme-card">

                    <div className="patient-settings-theme-option">
                        <div className="patient-settings-theme-icon">
                            <FaMoon />
                        </div>

                        <div>
                            <h3>Dark Mode</h3>

                            <p>
                                Use a darker interface for reduced brightness.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={`patient-settings-theme-switch ${settings.darkMode
                            ? "active"
                            : ""
                            }`}
                        onClick={() =>
                            setSettings((previous) => ({
                                ...previous,
                                darkMode: true,
                            }))
                        }
                    >
                        {settings.darkMode
                            ? "Selected"
                            : "Select"}
                    </button>

                </div>

                <div className="patient-settings-actions">

                    <button
                        type="button"
                        className="patient-settings-save-btn"
                        onClick={handleSavePreferences}
                        disabled={saving}
                    >
                        <FaSave />

                        {saving
                            ? "Saving..."
                            : "Save Appearance"}
                    </button>

                </div>

            </div>
        );
    };

    // =========================================================
    // RENDER CONTENT
    // =========================================================

    const renderContent = () => {
        switch (activeSection) {
            case "notifications":
                return renderNotifications();

            case "security":
                return renderSecurity();

            case "privacy":
                return renderPrivacy();

            case "appearance":
                return renderAppearance();

            case "profile":
            default:
                return renderProfile();
        }
    };

    // =========================================================
    // MAIN JSX
    // =========================================================

    return (
        <section className="patient-settings-page">

            <div className="patient-settings-container">

                {/* ===================================================
            PAGE HEADER
        ==================================================== */}

                <div className="patient-settings-page-header">

                    <div className="patient-settings-header-left">
                        {/* Back to Patient Home */}
                        <button
                            type="button"
                            className="patient-settings-back-btn"
                            onClick={() => navigate("/patient")}
                            aria-label="Back to Patient Home"
                        >
                            <FaArrowLeft />
                            <span>Back to Patient Home</span>
                        </button>

                    </div>
                    <div>
                        <span className="patient-settings-eyebrow">
                            Patient Account
                        </span>

                        <h1>Settings</h1>

                        <p>
                            Manage your profile, notifications,
                            privacy, and security preferences.
                        </p>
                    </div>

                    <div className="patient-settings-header-user">

                        <div className="patient-settings-header-avatar">
                            {profileForm.fullName
                                ? profileForm.fullName
                                    .charAt(0)
                                    .toUpperCase()
                                : "P"}
                        </div>

                        <div>
                            <strong>
                                {profileForm.fullName ||
                                    "Patient"}
                            </strong>

                            <span>
                                {profileForm.email ||
                                    "Patient Account"}
                            </span>
                        </div>

                    </div>

                </div>

                {/* ===================================================
            ERROR
        ==================================================== */}

                {error && (
                    <div className="patient-settings-error">
                        {error}
                    </div>
                )}

                {/* ===================================================
            SETTINGS LAYOUT
        ==================================================== */}

                <div className="patient-settings-layout">

                    {/* =================================================
              SIDEBAR
          ================================================== */}

                    <aside className="patient-settings-sidebar">

                        <div className="patient-settings-sidebar-title">
                            Account Settings
                        </div>

                        <nav>
                            {settingsMenu.map((item) => (
                                <button
                                    type="button"
                                    key={item.id}
                                    className={`patient-settings-nav-item ${activeSection === item.id
                                        ? "active"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setActiveSection(item.id)
                                    }
                                >
                                    <span className="patient-settings-nav-icon">
                                        {item.icon}
                                    </span>

                                    <span className="patient-settings-nav-content">

                                        <strong>
                                            {item.label}
                                        </strong>

                                        <small>
                                            {item.description}
                                        </small>

                                    </span>

                                    <FaChevronRight className="patient-settings-nav-arrow" />
                                </button>
                            ))}
                        </nav>

                        <div className="patient-settings-sidebar-account">

                            <FaIdCard />

                            <div>
                                <strong>
                                    Patient ID
                                </strong>

                                <span>
                                    {patient?.id ||
                                        patient?._id ||
                                        localStorage.getItem(
                                            "patientId"
                                        ) ||
                                        "Not available"}
                                </span>
                            </div>

                        </div>

                    </aside>

                    {/* =================================================
              CONTENT
          ================================================== */}

                    <main className="patient-settings-content">
                        {renderContent()}
                    </main>

                </div>

            </div>

        </section>
    );
}

// =============================================================
// SETTING TOGGLE COMPONENT
// =============================================================

function SettingToggle({
    title,
    description,
    enabled,
    onChange,
}) {
    return (
        <div className="patient-settings-option">

            <div className="patient-settings-option-info">

                <h3>
                    {title}
                </h3>

                <p>
                    {description}
                </p>

            </div>

            <button
                type="button"
                className={`patient-settings-toggle ${enabled ? "active" : ""
                    }`}
                onClick={onChange}
                aria-pressed={enabled}
            >
                <span></span>
            </button>

        </div>
    );
}

export default PatientSettings;
