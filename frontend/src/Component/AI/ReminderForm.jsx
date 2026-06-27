import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMagic,
  FaPills,
  FaRobot,
  FaSave,
  FaTimes,
  FaUserMd,
} from "react-icons/fa";
import "../../Styles/AI/ReminderForm.css";

const initialState = {
  medicineName: "",
  dosage: "",
  frequency: "Once Daily",
  times: [""],
  mealTiming: "After Food",
  startDate: "",
  endDate: "",
  instructions: "",
  prescribedBy: "",
  refillCount: 10,
  lowStockThreshold: 3,
  status: "active",
};

function ReminderForm({
  onCreate,
  onUpdate,
  editingReminder,
  onCancelEdit,
  onParseAI,
}) {
  const [formData, setFormData] = useState(initialState);
  const [aiText, setAiText] = useState("");
  const [parsing, setParsing] = useState(false);

  useEffect(() => {
    if (editingReminder) {
      setFormData({
        medicineName: editingReminder.medicineName || "",
        dosage: editingReminder.dosage || "",
        frequency: editingReminder.frequency || "Once Daily",
        times: editingReminder.times?.length ? editingReminder.times : [""],
        mealTiming: editingReminder.mealTiming || "After Food",
        startDate: editingReminder.startDate || "",
        endDate: editingReminder.endDate || "",
        instructions: editingReminder.instructions || "",
        prescribedBy: editingReminder.prescribedBy || "",
        refillCount: editingReminder.refillCount || 10,
        lowStockThreshold: editingReminder.lowStockThreshold || 3,
        status: editingReminder.status || "active",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingReminder]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "refillCount" || name === "lowStockThreshold"
          ? Number(value)
          : value,
    }));
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...formData.times];
    updatedTimes[index] = value;

    setFormData((prev) => ({
      ...prev,
      times: updatedTimes,
    }));
  };

  const addTimeField = () => {
    setFormData((prev) => ({
      ...prev,
      times: [...prev.times, ""],
    }));
  };

  const removeTimeField = (index) => {
    const updatedTimes = formData.times.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      times: updatedTimes.length ? updatedTimes : [""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanData = {
      ...formData,
      times: formData.times.filter((time) => time.trim() !== ""),
    };

    if (!cleanData.times.length) {
      alert("Please add at least one medicine time");
      return;
    }

    if (editingReminder) {
      onUpdate(editingReminder.id, cleanData);
    } else {
      onCreate(cleanData);
    }

    setFormData(initialState);
    setAiText("");
  };

  const handleAIParse = async () => {
    if (!aiText.trim()) {
      alert("Please enter prescription text");
      return;
    }

    try {
      setParsing(true);
      const parsed = await onParseAI(aiText);

      if (parsed) {
        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() + (parsed.durationDays || 5));

        setFormData((prev) => ({
          ...prev,
          medicineName: parsed.medicineName || "",
          dosage: parsed.dosage || "",
          frequency: parsed.frequency || "Once Daily",
          times: parsed.times?.length ? parsed.times : [""],
          mealTiming: parsed.mealTiming || "After Food",
          instructions: parsed.instructions || "",
          startDate: today.toISOString().split("T")[0],
          endDate: end.toISOString().split("T")[0],
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="medicine-card reminder-form-card">
      <div className="reminder-form-header">
        <div className="reminder-form-icon">
          <FaPills />
        </div>

        <div>
          <span>{editingReminder ? "Update Medicine" : "New Medicine"}</span>
          <h3>{editingReminder ? "Edit Reminder" : "Add Medicine Reminder"}</h3>
          <p>Use manual entry or AI prescription text to create reminder.</p>
        </div>
      </div>

      <div className="ai-parse-box">
        <div className="ai-parse-title">
          <FaRobot />
          <div>
            <h4>AI Prescription Parser</h4>
            <p>
              Paste prescription text and let AI auto-fill medicine details.
            </p>
          </div>
        </div>

        <textarea
          rows="4"
          placeholder="Example: Take Dolo 650 after breakfast and dinner for 3 days"
          value={aiText}
          onChange={(e) => setAiText(e.target.value)}
        />

        <button
          type="button"
          className="medicine-btn ai-btn"
          onClick={handleAIParse}
          disabled={parsing}
        >
          <FaRobot /> {parsing ? "Parsing..." : "Parse with AI"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="medicine-form-grid">
          <div className="medicine-field">
            <label>
              <FaPills /> Medicine Name
            </label>
            <input
              type="text"
              name="medicineName"
              value={formData.medicineName}
              onChange={handleChange}
              placeholder="Paracetamol 500mg"
              required
            />
          </div>

          <div className="medicine-field">
            <label>Dosage</label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="1 tablet"
              required
            />
          </div>

          <div className="medicine-field">
            <label>Frequency</label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              <option>Once Daily</option>
              <option>Twice Daily</option>
              <option>Three Times Daily</option>
              <option>SOS</option>
            </select>
          </div>

          <div className="medicine-field">
            <label>Meal Timing</label>
            <select
              name="mealTiming"
              value={formData.mealTiming}
              onChange={handleChange}
            >
              <option>Before Food</option>
              <option>After Food</option>
              <option>Any Time</option>
            </select>
          </div>

          <div className="medicine-field">
            <label>
              <FaCalendarAlt /> Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="medicine-field">
            <label>
              <FaCalendarAlt /> End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="medicine-field">
            <label>
              <FaUserMd /> Prescribed By
            </label>
            <input
              type="text"
              name="prescribedBy"
              value={formData.prescribedBy}
              onChange={handleChange}
              placeholder="Dr. Sharma"
            />
          </div>

          <div className="medicine-field">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

          <div className="medicine-field">
            <label>Refill Count</label>
            <input
              type="number"
              name="refillCount"
              value={formData.refillCount}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="medicine-field">
            <label>Low Stock Threshold</label>
            <input
              type="number"
              name="lowStockThreshold"
              value={formData.lowStockThreshold}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="medicine-time-box">
          <div className="medicine-time-header">
            <label>
              <FaClock /> Reminder Times
            </label>

            <button
              type="button"
              className="medicine-btn outline-btn"
              onClick={addTimeField}
            >
              <FaMagic /> Add Time
            </button>
          </div>

          <div className="medicine-time-list">
            {formData.times.map((time, index) => (
              <div key={index} className="medicine-time-row">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                />

                <button
                  type="button"
                  className="medicine-btn danger-btn"
                  onClick={() => removeTimeField(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="medicine-field full-width">
          <label>Instructions</label>
          <textarea
            rows="3"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Take after breakfast and dinner"
          />
        </div>

        <div className="medicine-form-actions">
          <button type="submit" className="medicine-btn primary-btn">
            <FaSave /> {editingReminder ? "Update Reminder" : "Save Reminder"}
          </button>

          {editingReminder && (
            <button
              type="button"
              className="medicine-btn secondary-btn"
              onClick={onCancelEdit}
            >
              <FaTimes /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReminderForm;
