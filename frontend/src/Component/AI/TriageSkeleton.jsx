import React from "react";

function TriageSkeleton() {
  return (
    <div className="triage-skeleton-card">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-list">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
}

export default TriageSkeleton;
