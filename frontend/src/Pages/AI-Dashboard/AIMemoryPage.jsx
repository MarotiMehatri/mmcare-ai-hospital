import React, { useEffect, useMemo, useState } from "react";

import MemoryHeader from "../../Component/AI/MemoryHeader";
import MemoryStats from "../../Component/AI/MemoryStats";
import MemoryFilters from "../../Component/AI/MemoryFilters";
import MemoryTimeline from "../../Component/AI/MemoryTimeline";
import MemoryLoading from "../../Component/AI/MemoryLoading";
import MemoryEmpty from "../../Component/AI/MemoryEmpty";

import {
  getAllAIMemory,
  getPatientMemory,
  getPatientMemorySummary,
} from "../../services/AI/aiMemoryApi";

import "../../Styles/AI/aiMemory.css";

function AIMemoryPage() {
  const patient = useMemo(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("patient") || "null") ||
        JSON.parse(localStorage.getItem("Patient") || "null") ||
        JSON.parse(localStorage.getItem("user") || "null") ||
        JSON.parse(localStorage.getItem("User") || "null") ||
        null
      );
    } catch {
      return null;
    }
  }, []);

  const patientId =
    patient?.id || patient?.patientId || patient?.patientID || "";

  const [memories, setMemories] = useState([]);
  const [summary, setSummary] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const calculateSummary = (data) => ({
    totalRecords: data.length,
    symptomCount: data.filter((item) => item.type === "symptom").length,
    medicationCount: data.filter((item) => item.type === "medication").length,
    criticalCount: data.filter((item) => item.critical === true).length,
  });

  useEffect(() => {
    const fetchMemoryData = async () => {
      try {
        setLoading(true);
        setError("");

        let memoryData = [];

        if (patientId) {
          const memoryRes = await getPatientMemory(patientId);
          memoryData = Array.isArray(memoryRes?.data) ? memoryRes.data : [];

          const summaryRes = await getPatientMemorySummary(patientId);
          setSummary(summaryRes?.data || calculateSummary(memoryData));
        } else {
          const allRes = await getAllAIMemory();
          memoryData = Array.isArray(allRes?.data) ? allRes.data : [];
          setSummary(calculateSummary(memoryData));
        }

        setMemories(memoryData);
      } catch (err) {
        console.error(err);
        setError("Failed to load AI memory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMemoryData();
  }, [patientId]);

  const filteredMemories = useMemo(() => {
    if (activeFilter === "all") return memories;

    return memories.filter(
      (item) => String(item.type).toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [memories, activeFilter]);

  return (
    <div className="ai-memory-page">
      <MemoryHeader
        patientName={
          patient?.fullName ||
          patient?.FullName ||
          patient?.name ||
          patient?.patientName ||
          "All Patients"
        }
      />

      <MemoryStats summary={summary} />

      <MemoryFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {loading ? (
        <MemoryLoading />
      ) : error ? (
        <div className="memory-error-box">{error}</div>
      ) : filteredMemories.length === 0 ? (
        <MemoryEmpty />
      ) : (
        <MemoryTimeline memories={filteredMemories} />
      )}
    </div>
  );
}

export default AIMemoryPage;
