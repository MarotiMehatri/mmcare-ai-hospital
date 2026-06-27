import React from "react";
import { FaTrash } from "react-icons/fa";

function MemoryList({ memories, onDelete }) {
  if (!memories.length) {
    return <div className="memory-empty">No AI memory data found.</div>;
  }

  return (
    <div className="memory-list">
      {memories.map((item) => (
        <div className="memory-card" key={item.id}>
          <div>
            <span className={`memory-type ${item.type}`}>{item.type}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div className="memory-meta">
              <span>{item.patientName}</span>
              <span>{item.source}</span>
              <span>{item.createdAt}</span>
            </div>
          </div>

          <div className="memory-actions">
            {item.critical && <span className="critical-badge">Critical</span>}

            <button type="button" onClick={() => onDelete(item.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemoryList;
