import React from "react";

function TriageResult({ result, loading, error }) {
  if (loading) return <TriageSkeleton />;

  if (error) {
    return (
      <div className="triage-result-card error-card">
        <h3>Unable to analyze</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="triage-result-card empty-card">
        <h3>No Result Yet</h3>
        <p>Subnit patient symptoms to generate triage guidance.</p>
      </div>
    );
  }
  return (
    <div className="triage-result-card">
      <div className="result-head">
        <div>
          <h2>Triage Result</h2>
          <p>AI-assisted urgency guidance</p>
        </div>
        <SeverityBadge level={result.severity} />
      </div>

      <div className="result-grid">
        <div className="result-item">
          <FaShieldAlt />
          <div>
            <h4>Possible Issue</h4>
            <p>{result.possibleIssue || "Not available"}</p>
          </div>
        </div>

        <div className="result-item">
          <FaHospital />
          <div>
            <h4>Department</h4>
            <p>{result.department || "Not available"}</p>
          </div>
        </div>

        <div className="result-item">
          <FaUserMd />
          <div>
            <h4>Specialization</h4>
            <p>{result.specialization || "Not available"}</p>
          </div>
        </div>

        <div className="result-item">
          <FaCalendarCheck />
          <div>
            <h4>Recommended Action</h4>
            <p>{result.recommendedAction || "Not available"}</p>
          </div>
        </div>

        <div className="result-item">
          <FaCalendarCheck />
          <div>
            <h4>Visit Type</h4>
            <p>{result.visitType || "Not available"}</p>
          </div>
        </div>

        <div className="result-item">
          <FaCalendarCheck />
          <div>
            <h4>Timeframe</h4>
            <p>{result.timeframe || "Not available"}</p>
          </div>
        </div>
      </div>

      <div className="result-list-box">
        <h4>Home Advice</h4>
        <ul>
          {(result.homeAdvice || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="result-list-box red-flags">
        <h4>Red Flags</h4>
        <ul>
          {(result.redFlags || []).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {result.emergency && (
        <div className="emergency-alert-box">
          <FaAmbulance />
          <span>
            Emergency warning detected. Immediate medical attention is advised.
          </span>
        </div>
      )}

      <div className="result-footer-cta">
        <button type="button">Book Appointment</button>
        <button type="button" className="secondary-btn">
          Contact Emergency
        </button>
      </div>
    </div>
  );
}

export default TriageResult;
