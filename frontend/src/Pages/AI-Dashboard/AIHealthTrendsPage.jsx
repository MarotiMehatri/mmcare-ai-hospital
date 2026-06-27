import React from "react";
import { FaHeartbeat, FaSyncAlt, FaExclamationTriangle } from "react-icons/fa";

import useHealthTrends from "../../hooks/useHealthTrends";
import SummaryCards from "../../Component/cards/SummaryCards";
import TrendChart from "../../Component/AI/TrendChart";
import AlertsCard from "../../Component/cards/AlertsCard";
import RecommendationsCard from "../../Component/cards/RecommendationsCard";
import RawRecordsTable from "../../Component/tables/RawRecordsTable";

import "../../Styles/AI/health-trends.css";

function AIHealthTrendsPage() {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const patientId = patient?.id || 1;

  const { data, loading, refreshing, error, refreshTrends } =
    useHealthTrends(patientId);

  if (loading) {
    return (
      <div className="health-page-state">
        <div className="health-loader"></div>
        <p>Loading health trends...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="health-page-state error">
        <FaExclamationTriangle />
        <h3>Unable to load health trends</h3>
        <p>{error}</p>
        <button onClick={refreshTrends}>Try Again</button>
      </div>
    );
  }

  const analysis = data?.analysis || {};
  const rawData = data?.rawData || {};
  const vitalsHistory = rawData?.vitalsHistory || [];

  return (
    <div className="health-trends-page">
      <div className="health-hero">
        <div>
          <span className="health-badge">
            <FaHeartbeat /> AI Health Monitor
          </span>
          <h2>AI Health Trends</h2>
          <p>Live patient trends, alerts, and AI recommendations</p>
        </div>

        <button
          className={`refresh-btn ${refreshing ? "refreshing" : ""}`}
          onClick={refreshTrends}
          disabled={refreshing}
        >
          <FaSyncAlt />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <SummaryCards
        analysis={analysis}
        patient={data?.patient || {}}
        rawData={rawData}
      />

      <div className="health-grid-2">
        <TrendChart
          title="Blood Pressure Trend"
          data={vitalsHistory}
          dataKey="bpTop"
          secondaryKey="bpBottom"
          type="bp"
        />

        <TrendChart title="Sugar Trend" data={vitalsHistory} dataKey="sugar" />

        <TrendChart
          title="Heart Rate Trend"
          data={vitalsHistory}
          dataKey="heartRate"
        />

        <TrendChart
          title="Weight Trend"
          data={vitalsHistory}
          dataKey="weight"
        />
      </div>

      <div className="health-grid-2">
        <AlertsCard alerts={analysis?.alerts || []} />

        <RecommendationsCard
          summary={analysis?.summary}
          recommendations={analysis?.recommendations || []}
          followUp={analysis?.followUp || {}}
        />
      </div>

      <RawRecordsTable records={vitalsHistory} />
    </div>
  );
}

export default AIHealthTrendsPage;
