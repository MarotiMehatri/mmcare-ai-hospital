import React from "react";

function MemoryCard({ item }) {
  return (
    <div className="memory-card">
      <div className="memory-card-top">
        <div>
          <h3 className="memory-card-title">{item.title}</h3>
          <p className="memory-card-type">{item.type}</p>
        </div>

        <span className={`memory-priority-badge ${item.priority || "low"}`}>
          {item.priority || "low"}
        </span>
      </div>

      <p className="memory-card-summary">{item.summary}</p>

      {item.tags?.length > 0 && (
        <div className="memory-tag-list">
          {item.tags.map((tag, index) => (
            <span className="memory-tag" key={index}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="memory-card-footer">
        <span>{item.source || "system"}</span>
        <span>
          {item.createdAt
            ? new Date(item.createdAt).toLocaleString()
            : "No date"}
        </span>
      </div>
    </div>
  );
}

export default MemoryCard;
