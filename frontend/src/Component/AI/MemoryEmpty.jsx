import React from "react";
import { FaBrain } from "react-icons/fa";

function MemoryEmpty() {
  return (
    <div className="memory-empty">
      <FaBrain className="memory-empty-icon" />
      <h3>No memory records found</h3>
      <p>Your AI memory data will appear here after interactions are saved.</p>
    </div>
  );
}

export default MemoryEmpty;
