import React from "react";
import {
  FaHeartbeat,
  FaThermometerHalf,
  FaWeight,
  FaLungs,
  FaNotesMedical,
} from "react-icons/fa";
import "../../Styles/Patient/HealthSummaryTable.css";
function HealthSummaryTable({ records }) {
  const getStatusClass = (status = "") => {
    return status.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="health-summary-table-wrapper">
      <table className="health-summary-table">
        <thead>
          <tr>
            <th>Record</th>
            <th>Date</th>
            <th>Doctor</th>
            <th>BP</th>
            <th>Heart</th>
            <th>Sugar</th>
            <th>Temp</th>
            <th>Oxygen</th>
            <th>Weight</th>
            <th>BMI</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {records.length > 0 ? (
            records.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.recordId || item.id}</strong>
                </td>

                <td>{item.date || "-"}</td>

                <td>
                  <span className="health-summary-table__doctor">
                    {item.doctorName || "Doctor"}
                  </span>
                </td>

                <td>{item.bloodPressure || "-"}</td>

                <td>
                  <FaHeartbeat /> {item.heartRate || "-"}
                </td>

                <td>{item.bloodSugar || "-"}</td>

                <td>
                  <FaThermometerHalf /> {item.temperature || "-"}
                </td>

                <td>
                  <FaLungs /> {item.oxygenLevel || "-"}
                </td>

                <td>
                  <FaWeight /> {item.weight || "-"}
                </td>

                <td>{item.bmi || "-"}</td>

                <td>
                  <span
                    className={`health-summary-table__status health-summary-table__status--${getStatusClass(
                      item.status,
                    )}`}
                  >
                    {item.status || "Normal"}
                  </span>
                </td>

                {/* <td className="health-summary-table__notes">
                  <FaNotesMedical />
                  <span>
                    {item.diagnosis || item.notes || "No notes available"}
                  </span>
                </td> */}
                <td>
                  <div className="health-summary-table__notes-scroll">
                    {item.notes || "No notes available"}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="health-summary-table__empty">
                No health summary found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HealthSummaryTable;
