import React, { useEffect, useState } from "react";
import ReportHeader from "../../Component/AI/ReportHeader";
import ReportUploadCard from "../../Component/cards/ReportUploadCard";
import ReportPreviewCard from "../../Component/cards/ReportPreviewCard";
import ReportSummaryCard from "../../Component/cards/ReportSummaryCard";
import AbnormalValuesCard from "../../Component/cards/AbnormalValuesCard";
import SuggestedActionsCard from "../../Component/cards/SuggestedActionsCard";
import CriticalAlertsCard from "../../Component/cards/CriticalAlertsCard";
import ReportHistoryTable from "../../Component/tables/ReportHistoryTable";
import ReportAnalyzerLoader from "../../Component/AI/ReportAnalyzerLoader";
import {
  analyzeReport,
  getPatientReportHistory,
} from "../../services/AI/reportAnalyzerApi";
import "../../Styles/AI/reportAnalyzerPage.css";

function ReportAnalyzerPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportType, setReportType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const patient = JSON.parse(localStorage.getItem("patient")) || null;
  const patientId = patient?.id;

  const fetchHistory = async () => {
    try {
      if (!patientId) return;
      const res = await getPatientReportHistory(patientId);
      setHistory(res.data || []);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAnalyze = async () => {
    try {
      setError("");
      setLoading(true);
      setResult(null);

      if (!selectedFile) {
        setError("Please select a report file.");
        setLoading(false);
        return;
      }

      if (!reportType) {
        setError("Please select report type.");
        setLoading(false);
        return;
      }

      if (!patientId) {
        setError("Patient not found in localStorage.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("reportFile", selectedFile);
      formData.append("patientId", patientId);
      formData.append("reportType", reportType);
      formData.append("notes", notes);

      const response = await analyzeReport(formData);

      if (response.success) {
        setResult(response.data);
        fetchHistory();
      } else {
        setError(response.message || "Analysis failed.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Something went wrong while analyzing report.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-analyzer-page">
      <ReportHeader />

      {error && <div className="report-error-box">{error}</div>}

      <div className="report-analyzer-grid">
        <div className="report-left-panel">
          <ReportUploadCard
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            reportType={reportType}
            setReportType={setReportType}
            notes={notes}
            setNotes={setNotes}
            handleAnalyze={handleAnalyze}
            loading={loading}
          />

          <ReportPreviewCard selectedFile={selectedFile} />

          <ReportHistoryTable history={history} />
        </div>

        <div className="report-right-panel">
          {loading ? (
            <ReportAnalyzerLoader />
          ) : (
            <>
              <CriticalAlertsCard
                criticalAlerts={result?.criticalAlerts || []}
              />
              <ReportSummaryCard result={result} />
              <AbnormalValuesCard
                abnormalValues={result?.abnormalValues || []}
              />
              <SuggestedActionsCard
                nextSteps={result?.nextSteps || []}
                possibleConditions={result?.possibleConditions || []}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportAnalyzerPage;
