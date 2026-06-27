import React from "react";
import "../../Styles/Patient/MedicalHistoryTable.css";

function MedicalHistoryTable({ history }) {
  return (
    <div className="medical-history-table-wrapper">
      <table className="medical-history-table">
        <thead>
          <tr>
            <th>Visit ID</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>Visit Date</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {history?.length > 0 ? (
            history.map((item) => (
              <tr key={item.id} className="medical-history-table__row">
                <td>
                  <span className="medical-history-table__visit-id">
                    {item.visitId}
                  </span>
                </td>

                <td>
                  <div className="medical-history-table__doctor">
                    {item.doctorName}
                  </div>
                </td>

                <td>
                  <span className="medical-history-table__department">
                    {item.department}
                  </span>
                </td>

                <td>
                  <div className="medical-history-table__diagnosis">
                    {item.diagnosis}
                  </div>
                </td>

                <td>
                  <div className="medical-history-table__treatment">
                    {item.treatment}
                  </div>
                </td>

                <td>
                  <span className="medical-history-table__date">
                    {item.visitDate}
                  </span>
                </td>

                <td>
                  <span
                    className={`medical-history-table__status ${item.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <div className="medical-history-table__notes">
                    {item.notes}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="medical-history-table__empty">
                No medical history found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalHistoryTable;
