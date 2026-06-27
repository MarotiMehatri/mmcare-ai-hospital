import React from "react";
import MemoryCard from "../cards/MemoryCard";

function MemoryTimeline({ memories }) {
  return (
    <div className="memory-timeline">
      {memories.map((item) => (
        <MemoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MemoryTimeline;
