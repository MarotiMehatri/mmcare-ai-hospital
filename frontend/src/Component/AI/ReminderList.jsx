import React, { useMemo, useState } from "react";
import {
  FaCapsules,
  FaFilter,
  FaSearch,
  FaSortAmountDown,
} from "react-icons/fa";

import ReminderCard from "../cards/ReminderCard";
import "../../Styles/AI/ReminderList.css";

function ReminderList({ reminders = [], onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReminders = useMemo(() => {
    return reminders.filter((reminder) => {
      const matchesSearch =
        reminder.medicineName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        reminder.dosage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.prescribedBy?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || reminder.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [reminders, searchTerm, statusFilter]);

  return (
    <div className="medicine-card reminder-list-card">
      <div className="reminder-list-header">
        <div className="reminder-list-title">
          <div className="reminder-list-icon">
            <FaCapsules />
          </div>

          <div>
            <span>Medicine Tracker</span>
            <h3>All Medicine Reminders</h3>
            <p>{filteredReminders.length} reminder found</p>
          </div>
        </div>
      </div>

      <div className="reminder-list-toolbar">
        <div className="reminder-search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search medicine, dosage, doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="reminder-filter-box">
          <FaFilter />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {filteredReminders.length === 0 ? (
        <div className="reminder-empty-state">
          <FaSortAmountDown />
          <h4>No medicine reminders found</h4>
          <p>
            Add a new reminder or change your search/filter to view medicines.
          </p>
        </div>
      ) : (
        <div className="reminder-list">
          {filteredReminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReminderList;
