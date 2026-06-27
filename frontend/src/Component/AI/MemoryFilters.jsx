import React from "react";

const FILTERS = [
  "all",
  "symptom",
  "condition",
  "allergy",
  "medication",
  "preference",
  "ai-summary",
];

function MemoryFilters({ activeFilter, setActiveFilter }) {
  return (
    <div className="memory-filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`memory-filter-btn ${
            activeFilter === filter ? "active" : ""
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default MemoryFilters;
