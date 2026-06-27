import React from "react";
import {
  FaHeartbeat,
  FaTint,
  FaWeight,
  FaLungs,
  FaCalendarAlt,
} from "react-icons/fa";
import "../../Styles/AI/RawRecordsTable.css";

function RawRecordsTable({ records = [] }) {
  return (
    <div className="records-card">
      <div className="records-card__header">
        <div>
          <h3>Recent Health Records</h3>
          <p>Your latest health measurements and trends</p>
        </div>

        <span className="records-count">{records.length} Records</span>
      </div>

      {records.length === 0 ? (
        <div className="records-empty">
          <FaHeartbeat />
          <h4>No Health Records</h4>
          <p>No health data available yet.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="trend-table">
            <thead>
              <tr>
                <th>
                  <FaCalendarAlt /> Date
                </th>
                <th>BP</th>
                <th>Sugar</th>
                <th>
                  <FaHeartbeat /> Heart Rate
                </th>
                <th>
                  <FaWeight /> Weight
                </th>
                <th>
                  <FaLungs /> SpO₂
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>

                  <td>
                    <span className="metric metric-bp">
                      {item.bloodPressure}
                    </span>
                  </td>

                  <td>
                    <span className="metric metric-sugar">{item.sugar}</span>
                  </td>

                  <td>
                    <span className="metric metric-heart">
                      {item.heartRate} bpm
                    </span>
                  </td>

                  <td>
                    <span className="metric metric-weight">
                      {item.weight} kg
                    </span>
                  </td>

                  <td>
                    <span className="metric metric-spo2">{item.spo2}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RawRecordsTable;
