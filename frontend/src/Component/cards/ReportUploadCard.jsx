import React from "react";
import { FaCloudUploadAlt, FaFileUpload } from "react-icons/fa";
import "../../Styles/AI/ReportUploadCard.css";

function ReportUploadCard({
  selectedFile,
  setSelectedFile,
  reportType,
  setReportType,
  notes,
  setNotes,
  handleAnalyze,
  loading,
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="report-upload-card">
      <div className="card-header">
        <h3>
          <FaCloudUploadAlt /> Upload Report
        </h3>
        <p>Select a PDF or image of your medical report</p>
      </div>

      <div className="upload-field">
        <label>Choose Report File</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </div>

      <div className="upload-field">
        <label>Report Type</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">Select Report Type</option>
          <option value="CBC">CBC</option>
          <option value="Blood Test">Blood Test</option>
          <option value="Diabetes Report">Diabetes Report</option>
          <option value="Thyroid Report">Thyroid Report</option>
          <option value="Liver Function Test">Liver Function Test</option>
          <option value="Kidney Function Test">Kidney Function Test</option>
          <option value="Lipid Profile">Lipid Profile</option>
          <option value="Scan Report">Scan Report</option>
          <option value="Prescription">Prescription</option>
          <option value="Discharge Summary">Discharge Summary</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="upload-field">
        <label>Optional Notes</label>
        <textarea
          rows="4"
          placeholder="Add symptoms, context, or reason for analysis..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={loading || !selectedFile || !reportType}
      >
        <FaFileUpload />
        {loading ? "Analyzing..." : "Analyze Report"}
      </button>
    </div>
  );
}

export default ReportUploadCard;
