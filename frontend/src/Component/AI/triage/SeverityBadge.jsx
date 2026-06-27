import React from "react";

function SeverityBadge({ level }) {
  const normalized = (level || "").toLowerCase();

  const className =
    normalized === "low"
      ? "severity-badge low"
      : normalized === "medium"
        ? "severity-badge medium"
        : normalized === "high"
          ? "serverity-badge high"
          : normalized === "emergency"
            ? "severity-badge emergency"
            : "severity-badge";
  return <span className={className}>{level || "Unkbown"}</span>;
}

export default SeverityBadge;
