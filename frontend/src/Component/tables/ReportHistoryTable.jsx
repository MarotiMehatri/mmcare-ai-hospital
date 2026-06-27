import React from "react";
import { FaHistory } from "react-icons/fa";
import "../../Styles/AI/ReportHistoryTable.css";

function ReportHistoryTable({ history = [] }) {
  return (
    <div className="report-history-card">
      <h3>
        <FaHistory /> Report History
      </h3>

      {history.length === 0 ? (
        <p className="empty-history">No analyzed reports yet.</p>
      ) : (
        <div className="history-table">
          <div className="history-head history-row">
            <span>File Name</span>
            <span>Type</span>
            <span>Urgency</span>
            <span>Date</span>
          </div>

          {history.map((item) => (
            <div className="history-row" key={item.id}>
              <span>{item.originalFileName}</span>
              <span>{item.reportType}</span>
              <span>{item.urgencyLevel}</span>
              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportHistoryTable;
