import React, { useEffect, useMemo, useState } from "react";
import { getHealthSummaryByPatientId } from "../../services/Patient/healthSummaryAPI";
import HealthSummaryFilter from "../../Component/Patient/HealthSummaryFilter";
import HealthSummaryTable from "../../Component/tables/HealthSummaryTable";
import "../../Styles/Patient/HealthSummary.css";

function PatientHealthSummaryPage() {
  const patient = JSON.parse(localStorage.getItem("patient"));

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const loadRecords = async () => {
      try {
        if (!patient?.id) {
          setRecords([]);
          return;
        }

        setLoading(true);

        const res = await getHealthSummaryByPatientId(patient.id);
        setRecords(res.data || []);
      } catch (error) {
        console.error("Failed to load health summary:", error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [patient?.id]);

  const stats = useMemo(() => {
    return {
      total: records.length,
      healthy: records.filter((r) => r.status === "Healthy").length,
      observation: records.filter((r) => r.status === "Under Observation")
        .length,
      critical: records.filter((r) => r.status === "Critical").length,
    };
  }, [records]);

  const filteredRecords = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return records.filter((item) => {
      const matchesSearch =
        String(item.recordId || "")
          .toLowerCase()
          .includes(search) ||
        String(item.date || "")
          .toLowerCase()
          .includes(search) ||
        String(item.doctorName || "")
          .toLowerCase()
          .includes(search) ||
        String(item.department || "")
          .toLowerCase()
          .includes(search) ||
        String(item.diagnosis || "")
          .toLowerCase()
          .includes(search) ||
        String(item.notes || "")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchTerm, statusFilter]);

  return (
    <div className="patient-health-summary-page">
      <div className="patient-health-summary-page__head">
        <span className="patient-health-summary-page__tag">Patient Panel</span>

        <h2>My Health Summary</h2>

        <p>
          Review vitals, diagnosis, medicines, doctor notes, and overall health
          status from your prescription records.
        </p>
      </div>

      <div className="health-summary-stats">
        <div className="health-summary-card health-summary-card--total">
          <div className="health-summary-card__title">Total Records</div>
          <div className="health-summary-card__value">{stats.total}</div>
        </div>

        <div className="health-summary-card health-summary-card--healthy">
          <div className="health-summary-card__title">Healthy</div>
          <div className="health-summary-card__value">{stats.healthy}</div>
        </div>

        <div className="health-summary-card health-summary-card--observation">
          <div className="health-summary-card__title">Under Observation</div>
          <div className="health-summary-card__value">{stats.observation}</div>
        </div>

        <div className="health-summary-card health-summary-card--critical">
          <div className="health-summary-card__title">Critical</div>
          <div className="health-summary-card__value">{stats.critical}</div>
        </div>
      </div>

      <HealthSummaryFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <div className="patient-health-summary-page__loading">
          Loading health summary...
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="patient-health-summary-page__empty">
          No health summary found.
        </div>
      ) : (
        <HealthSummaryTable records={filteredRecords} />
      )}
    </div>
  );
}

export default PatientHealthSummaryPage;
