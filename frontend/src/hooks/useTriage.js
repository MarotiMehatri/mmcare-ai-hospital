import { useEffect, useState } from "react";
import {
  analyzeTriage,
  getSymptomMaster,
  getTriageHistory,
} from "../services/AI/triageApi";

export const useTriage = (patientId) => {
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [symptomLoading, setSymptomLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [symptomsMaster, setSymptomsMaster] = useState([]);
  const [error, setError] = useState("");

  const submitTriage = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const response = await analyzeTriage(formData);

      if (response?.success) {
        setResult(response.data);
        if (patientId) {
          fetchHistory(patientId);
        }
      } else {
        setError(response?.message || "Triage failed");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to analyze symptoms");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (id) => {
    if (!id) return;

    try {
      setHistoryLoading(true);
      const response = await getTriageHistory(id);
      if (response?.success) {
        setHistory(response.data || []);
      }
    } catch (err) {
      console.error("History fetch failed:", err.message);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchSymptomMaster = async () => {
    try {
      setSymptomLoading(true);
      const response = await getSymptomMaster();
      setSymptomsMaster(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Symptom master fetch failed:", err.message);
    } finally {
      setSymptomLoading(false);
    }
  };

  useEffect(() => {
    fetchSymptomMaster();
  }, []);

  useEffect(() => {
    if (patientId) {
      fetchHistory(patientId);
    }
  }, [patientId]);

  return {
    loading,
    historyLoading,
    symptomLoading,
    result,
    history,
    symptomsMaster,
    error,
    submitTriage,
    fetchHistory,
    setResult,
  };
};
