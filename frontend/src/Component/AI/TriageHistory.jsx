import React from "react";
import SeverityBadge from "./triage/SeverityBadge";

function TriageHistory({ history, loading }) {
  return (
    <div className="triage-history-card">
      <div className="section-title">
        <h3>Triage History</h3>
      </div>

      {loading ? (
        <p>Loading history...</p>
      ) : history?.length === 0 ? (
        <p>No previous triage records found.</p>
      ) : (
        <div className="triage-history-table-wrap">
          <table className="triage-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Severity</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{item?.input?.symptoms || "-"}</td>
                  <td>
                    <SeverityBadge level={item?.result?.severity} />
                  </td>
                  <td>{item?.result?.department || "-"}</td>
                  <td>{item?.result?.recommendedAction || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TriageHistory;
