import React, { useEffect, useState } from "react";
import {
  FiBell,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiGlobe,
  FiLock,
  FiMonitor,
  FiMoon,
  FiSave,
  FiShield,
  FiSmartphone,
  FiSun,
  FiToggleLeft,
  FiToggleRight,
  FiVolume2,
} from "react-icons/fi";

import "../../Styles/Admin/AdminSettingsPage.css";

const DEFAULT_SETTINGS = {
  emailNotifications: true,
  appointmentNotifications: true,
  reportNotifications: true,
  billingNotifications: true,
  systemNotifications: true,

  browserNotifications: true,
  soundNotifications: true,

  darkMode: false,
  compactMode: false,

  autoRefresh: true,
  autoRefreshInterval: "30",

  language: "English",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",

  sessionTimeout: "30",
};

function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeSection, setActiveSection] = useState("notifications");
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(
        "mmcare_admin_settings"
      );

      if (savedSettings) {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...JSON.parse(savedSettings),
        });
      }
    } catch (err) {
      console.error("Failed to load admin settings:", err);
      setError("Failed to load settings.");
    }
  }, []);

  const handleToggle = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));

    setSaveMessage("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaveMessage("");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      setSaveMessage("");

      localStorage.setItem(
        "mmcare_admin_settings",
        JSON.stringify(settings)
      );

      setSaveMessage("Settings saved successfully.");

      window.setTimeout(() => {
        setSaveMessage("");
      }, 3500);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError("Unable to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const shouldReset = window.confirm(
      "Are you sure you want to restore all admin settings to their defaults?"
    );

    if (!shouldReset) return;

    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      "mmcare_admin_settings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    setSaveMessage("Settings restored to default.");
    setError("");
  };

  const renderToggle = (name) => {
    const enabled = Boolean(settings[name]);

    return (
      <button
        type="button"
        className={`admin-settings-toggle ${
          enabled ? "is-active" : ""
        }`}
        onClick={() => handleToggle(name)}
        aria-label={`Toggle ${name}`}
        aria-pressed={enabled}
      >
        {enabled ? <FiToggleRight /> : <FiToggleLeft />}
      </button>
    );
  };

  const sections = [
    {
      id: "notifications",
      icon: FiBell,
      title: "Notifications",
      description: "Manage admin alerts",
    },
    {
      id: "appearance",
      icon: FiMonitor,
      title: "Appearance",
      description: "Customize dashboard",
    },
    {
      id: "general",
      icon: FiGlobe,
      title: "General",
      description: "Language and timezone",
    },
    {
      id: "security",
      icon: FiShield,
      title: "Security",
      description: "Session and access",
    },
  ];

  return (
    <div className="admin-settings-page">
      <div className="admin-settings-container">

        {/* Header */}
        <div className="admin-settings-header">
          <div>
            <span className="admin-settings-eyebrow">
              ADMINISTRATION
            </span>

            <h1>Settings</h1>

            <p>
              Configure your MMCare AI administrator dashboard,
              notifications and security preferences.
            </p>
          </div>

          <button
            type="button"
            className="admin-settings-save-top"
            onClick={handleSave}
            disabled={isSaving}
          >
            <FiSave />
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        {/* Messages */}
        {saveMessage && (
          <div className="admin-settings-success">
            <FiCheck />
            <span>{saveMessage}</span>
          </div>
        )}

        {error && (
          <div className="admin-settings-error">
            {error}
          </div>
        )}

        <div className="admin-settings-layout">

          {/* Sidebar */}
          <aside className="admin-settings-sidebar">

            <div className="admin-settings-sidebar-title">
              Settings
            </div>

            <nav>
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    className={`admin-settings-nav-item ${
                      active ? "active" : ""
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="admin-settings-nav-icon">
                      <Icon />
                    </span>

                    <span className="admin-settings-nav-text">
                      <strong>{section.title}</strong>
                      <small>{section.description}</small>
                    </span>

                    <FiChevronRight />
                  </button>
                );
              })}
            </nav>

          </aside>

          {/* Content */}
          <main className="admin-settings-content">

            {/* Notifications */}
            {activeSection === "notifications" && (
              <section className="admin-settings-section">

                <div className="admin-settings-section-header">
                  <div className="admin-settings-section-icon">
                    <FiBell />
                  </div>

                  <div>
                    <h2>Notifications</h2>
                    <p>
                      Choose which alerts you want to receive
                      as an administrator.
                    </p>
                  </div>
                </div>

                <div className="admin-settings-option-group">

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiBell />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Email Notifications</strong>
                      <span>
                        Receive important administration updates
                        by email.
                      </span>
                    </div>

                    {renderToggle("emailNotifications")}
                  </div>

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiClock />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Appointment Notifications</strong>
                      <span>
                        Get alerts when appointments are created,
                        changed or cancelled.
                      </span>
                    </div>

                    {renderToggle("appointmentNotifications")}
                  </div>

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiMonitor />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Medical Report Notifications</strong>
                      <span>
                        Receive notifications when reports are
                        uploaded or updated.
                      </span>
                    </div>

                    {renderToggle("reportNotifications")}
                  </div>

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiVolume2 />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Billing Notifications</strong>
                      <span>
                        Get updates about payments, invoices and
                        billing activities.
                      </span>
                    </div>

                    {renderToggle("billingNotifications")}
                  </div>

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiSmartphone />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>System Notifications</strong>
                      <span>
                        Receive important system and administration
                        alerts.
                      </span>
                    </div>

                    {renderToggle("systemNotifications")}
                  </div>

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiMonitor />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Browser Notifications</strong>
                      <span>
                        Show supported notifications directly in
                        your browser.
                      </span>
                    </div>

                    {renderToggle("browserNotifications")}
                  </div>

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiVolume2 />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Notification Sounds</strong>
                      <span>
                        Play a sound when important alerts arrive.
                      </span>
                    </div>

                    {renderToggle("soundNotifications")}
                  </div>

                </div>
              </section>
            )}

            {/* Appearance */}
            {activeSection === "appearance" && (
              <section className="admin-settings-section">

                <div className="admin-settings-section-header">
                  <div className="admin-settings-section-icon">
                    <FiMonitor />
                  </div>

                  <div>
                    <h2>Appearance</h2>
                    <p>
                      Customize the visual appearance of the
                      administrator dashboard.
                    </p>
                  </div>
                </div>

                <div className="admin-settings-theme-grid">

                  <button
                    type="button"
                    className={`admin-settings-theme-card ${
                      !settings.darkMode ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSettings((previous) => ({
                        ...previous,
                        darkMode: false,
                      }))
                    }
                  >
                    <div className="admin-settings-theme-preview light">
                      <FiSun />
                    </div>

                    <div>
                      <strong>Light Mode</strong>
                      <span>Clean and bright interface</span>
                    </div>

                    {!settings.darkMode && (
                      <FiCheck className="theme-check" />
                    )}
                  </button>

                  <button
                    type="button"
                    className={`admin-settings-theme-card ${
                      settings.darkMode ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSettings((previous) => ({
                        ...previous,
                        darkMode: true,
                      }))
                    }
                  >
                    <div className="admin-settings-theme-preview dark">
                      <FiMoon />
                    </div>

                    <div>
                      <strong>Dark Mode</strong>
                      <span>Comfortable low-light interface</span>
                    </div>

                    {settings.darkMode && (
                      <FiCheck className="theme-check" />
                    )}
                  </button>

                </div>

                <div className="admin-settings-option-group">

                  <div className="admin-settings-option">
                    <div className="admin-settings-option-icon">
                      <FiMonitor />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Compact Dashboard</strong>
                      <span>
                        Reduce spacing to display more information
                        on the screen.
                      </span>
                    </div>

                    {renderToggle("compactMode")}
                  </div>

                </div>
              </section>
            )}

            {/* General */}
            {activeSection === "general" && (
              <section className="admin-settings-section">

                <div className="admin-settings-section-header">
                  <div className="admin-settings-section-icon">
                    <FiGlobe />
                  </div>

                  <div>
                    <h2>General Settings</h2>
                    <p>
                      Configure language, timezone and dashboard
                      refresh preferences.
                    </p>
                  </div>
                </div>

                <div className="admin-settings-form">

                  <div className="admin-settings-field">
                    <label htmlFor="language">
                      Language
                    </label>

                    <select
                      id="language"
                      name="language"
                      value={settings.language}
                      onChange={handleChange}
                    >
                      <option value="English">English</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>

                  <div className="admin-settings-field">
                    <label htmlFor="timezone">
                      Timezone
                    </label>

                    <select
                      id="timezone"
                      name="timezone"
                      value={settings.timezone}
                      onChange={handleChange}
                    >
                      <option value="Asia/Kolkata">
                        India Standard Time (IST)
                      </option>
                      <option value="UTC">
                        Coordinated Universal Time (UTC)
                      </option>
                    </select>
                  </div>

                  <div className="admin-settings-field">
                    <label htmlFor="dateFormat">
                      Date Format
                    </label>

                    <select
                      id="dateFormat"
                      name="dateFormat"
                      value={settings.dateFormat}
                      onChange={handleChange}
                    >
                      <option value="DD/MM/YYYY">
                        DD/MM/YYYY
                      </option>
                      <option value="MM/DD/YYYY">
                        MM/DD/YYYY
                      </option>
                      <option value="YYYY-MM-DD">
                        YYYY-MM-DD
                      </option>
                    </select>
                  </div>

                  <div className="admin-settings-option admin-settings-inline-option">
                    <div className="admin-settings-option-icon">
                      <FiClock />
                    </div>

                    <div className="admin-settings-option-info">
                      <strong>Auto Refresh Dashboard</strong>
                      <span>
                        Automatically refresh dashboard data.
                      </span>
                    </div>

                    {renderToggle("autoRefresh")}
                  </div>

                  {settings.autoRefresh && (
                    <div className="admin-settings-field">
                      <label htmlFor="autoRefreshInterval">
                        Refresh Interval
                      </label>

                      <select
                        id="autoRefreshInterval"
                        name="autoRefreshInterval"
                        value={settings.autoRefreshInterval}
                        onChange={handleChange}
                      >
                        <option value="15">Every 15 seconds</option>
                        <option value="30">Every 30 seconds</option>
                        <option value="60">Every 1 minute</option>
                        <option value="300">Every 5 minutes</option>
                      </select>
                    </div>
                  )}

                </div>
              </section>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <section className="admin-settings-section">

                <div className="admin-settings-section-header">
                  <div className="admin-settings-section-icon">
                    <FiShield />
                  </div>

                  <div>
                    <h2>Security</h2>
                    <p>
                      Configure session security and administrator
                      access preferences.
                    </p>
                  </div>
                </div>

                <div className="admin-settings-security-card">

                  <div className="admin-settings-security-icon">
                    <FiLock />
                  </div>

                  <div>
                    <strong>Password Security</strong>
                    <p>
                      Your administrator credentials should be kept
                      private and updated regularly.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Connect this button to your admin password-change API."
                      );
                    }}
                  >
                    Change Password
                    <FiChevronRight />
                  </button>

                </div>

                <div className="admin-settings-form">

                  <div className="admin-settings-field">
                    <label htmlFor="sessionTimeout">
                      Session Timeout
                    </label>

                    <select
                      id="sessionTimeout"
                      name="sessionTimeout"
                      value={settings.sessionTimeout}
                      onChange={handleChange}
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                </div>

                <div className="admin-settings-security-notice">
                  <FiShield />

                  <div>
                    <strong>Security Recommendation</strong>
                    <p>
                      Never share administrator credentials. Use a
                      strong password and sign out from shared devices.
                    </p>
                  </div>
                </div>

              </section>
            )}

            {/* Bottom Actions */}
            <div className="admin-settings-bottom-actions">
              <button
                type="button"
                className="admin-settings-reset-btn"
                onClick={handleReset}
              >
                Restore Defaults
              </button>

              <button
                type="button"
                className="admin-settings-save-btn"
                onClick={handleSave}
                disabled={isSaving}
              >
                <FiSave />

                {isSaving
                  ? "Saving..."
                  : "Save Settings"}
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsPage;