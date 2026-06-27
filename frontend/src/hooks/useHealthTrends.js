import { useCallback, useEffect, useRef, useState } from "react";
import { getHealthTrendsByPatientId } from "../services/AI/healthTrendsApi";

export default function useHealthTrends(patientId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(patientId));
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const intervalRef = useRef(null);
  const abortRef = useRef(null);

  const fetchTrends = useCallback(
    async ({ silent = false } = {}) => {
      if (!patientId) {
        setError("Patient ID not found");
        setLoading(false);
        return;
      }

      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const result = await getHealthTrendsByPatientId(
          patientId,
          controller.signal,
        );
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          console.error("Health trends error:", err);
          setError("Failed to load health trends. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [patientId],
  );

  const refreshTrends = useCallback(() => {
    return fetchTrends({ silent: true });
  }, [fetchTrends]);

  useEffect(() => {
    fetchTrends();

    intervalRef.current = setInterval(() => {
      fetchTrends({ silent: true });
    }, 10000);

    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchTrends]);

  return {
    data,
    loading,
    refreshing,
    error,
    refreshTrends,
  };
}
