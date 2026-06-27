import React, { useEffect, useMemo, useState } from "react";
import {
  FaCapsules,
  FaExclamationTriangle,
  FaPlusCircle,
  FaRobot,
  FaSyncAlt,
} from "react-icons/fa";

import "../../Styles/AI/medicine-reminder.css";

import ReminderDashboardCards from "../../Component/cards/ReminderDashboardCards";
import ReminderForm from "../../Component/AI/ReminderForm";
import ReminderList from "../../Component/AI/ReminderList";
import TodaySchedule from "../../Component/AI/TodaySchedule";
import AdherenceStats from "../../Component/AI/AdherenceStats";
import RefillAlertCard from "../../Component/cards/RefillAlertCard";
import SmartSuggestionBox from "../../Component/AI/SmartSuggestionBox";

import {
  getPatientReminders,
  getTodaySchedule,
  getAdherenceStats,
  getRefillAlerts,
  getDashboardSummary,
  createReminder,
  updateReminder,
  deleteReminder,
  logReminderAction,
  aiParseMedicineText,
  aiAdherenceSummary,
} from "../../services/AI/medicineReminderApi";

function MedicineReminderPage() {
  const patient = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || {};
    } catch {
      return {};
    }
  }, []);

  const patientId = patient?.id || patient?.patientId || 101;

  const [reminders, setReminders] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [refillAlerts, setRefillAlerts] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [editingReminder, setEditingReminder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    taken: 0,
    skipped: 0,
    missed: 0,
    adherencePercent: 0,
  });

  const [summary, setSummary] = useState({
    totalMedicinesToday: 0,
    nextDose: null,
    missedDoses: 0,
    refillDue: 0,
  });

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError("");

      const [remindersRes, scheduleRes, statsRes, refillRes, summaryRes] =
        await Promise.all([
          getPatientReminders(patientId),
          getTodaySchedule(patientId),
          getAdherenceStats(patientId),
          getRefillAlerts(patientId),
          getDashboardSummary(patientId),
        ]);

      setReminders(remindersRes?.reminders || []);
      setSchedule(scheduleRes?.schedule || []);

      setStats(
        statsRes?.stats || {
          total: 0,
          taken: 0,
          skipped: 0,
          missed: 0,
          adherencePercent: 0,
        },
      );

      setRefillAlerts(refillRes?.refillAlerts || []);

      setSummary(
        summaryRes?.summary || {
          totalMedicinesToday: 0,
          nextDose: null,
          missedDoses: 0,
          refillDue: 0,
        },
      );
    } catch (error) {
      console.error("Error loading medicine reminder data:", error);
      setError("Failed to load medicine reminder data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleCreateReminder = async (formData) => {
    try {
      setError("");

      await createReminder({
        ...formData,
        patientId,
      });

      setEditingReminder(null);
      await loadAllData();
    } catch (error) {
      console.error("Create reminder error:", error);
      setError("Failed to create reminder.");
    }
  };

  const handleUpdateReminder = async (id, formData) => {
    try {
      setError("");

      await updateReminder(id, formData);

      setEditingReminder(null);
      await loadAllData();
    } catch (error) {
      console.error("Update reminder error:", error);
      setError("Failed to update reminder.");
    }
  };

  const handleDeleteReminder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reminder?",
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteReminder(id);
      await loadAllData();
    } catch (error) {
      console.error("Delete reminder error:", error);
      setError("Failed to delete reminder.");
    }
  };

  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddReminderClick = () => {
    setEditingReminder(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogAction = async (reminderId, time, action) => {
    try {
      setError("");

      await logReminderAction(reminderId, {
        patientId,
        time,
        action,
        notes: "",
      });

      await loadAllData();
    } catch (error) {
      console.error("Log action error:", error);
      setError("Failed to save medicine action.");
    }
  };

  const handleParseAI = async (text) => {
    try {
      setError("");

      const res = await aiParseMedicineText(text);
      return res?.parsed || null;
    } catch (error) {
      console.error("AI parse error:", error);
      setError("Failed to parse medicine text.");
      return null;
    }
  };

  const handleGenerateAISummary = async () => {
    try {
      setAiLoading(true);
      setError("");

      const res = await aiAdherenceSummary(patientId);
      setAiSummary(res?.summary || "");
    } catch (error) {
      console.error("AI summary error:", error);
      setError("Failed to generate AI summary.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="medicine-reminder-page">
      <section className="medicine-page-header">
        <div className="medicine-page-header-left">
          <div className="medicine-header-icon-box">
            <FaCapsules />
          </div>

          <div>
            <div className="medicine-header-badge">
              <FaRobot />
              AI Medicine Care
            </div>

            <h1>Medicine Reminder</h1>

            <p>
              Manage medicine schedules, track doses, monitor refill alerts, and
              get AI-powered adherence suggestions.
            </p>
          </div>
        </div>

        <div className="medicine-page-header-actions">
          <button
            type="button"
            className="medicine-action-btn secondary"
            onClick={loadAllData}
            disabled={loading}
          >
            <FaSyncAlt className={loading ? "spin-icon" : ""} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <button
            type="button"
            className="medicine-action-btn primary"
            onClick={handleAddReminderClick}
          >
            <FaPlusCircle /> Add Reminder
          </button>
        </div>
      </section>

      {error && (
        <div className="medicine-error-box">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      <ReminderDashboardCards summary={summary} loading={loading} />

      <div className="medicine-main-grid">
        <div className="medicine-left-column">
          <ReminderForm
            onCreate={handleCreateReminder}
            onUpdate={handleUpdateReminder}
            editingReminder={editingReminder}
            onCancelEdit={() => setEditingReminder(null)}
            onParseAI={handleParseAI}
          />

          <SmartSuggestionBox
            aiSummary={aiSummary}
            onGenerate={handleGenerateAISummary}
            stats={stats}
            loading={aiLoading}
          />
        </div>

        <div className="medicine-right-column">
          <TodaySchedule schedule={schedule} onLogAction={handleLogAction} />

          <RefillAlertCard refillAlerts={refillAlerts} />
        </div>
      </div>

      <div className="medicine-bottom-grid">
        <ReminderList
          reminders={reminders}
          onEdit={handleEditReminder}
          onDelete={handleDeleteReminder}
        />

        <AdherenceStats stats={stats} />
      </div>
    </div>
  );
}

export default MedicineReminderPage;
