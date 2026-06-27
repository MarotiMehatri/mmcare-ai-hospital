import { useState } from "react";
import { searchNearbyServicesApi } from "../services/AI/nearbyServicesApi";

export default function useNearbyServices() {
  const [results, setResults] = useState([]);
  const [topRecommendation, setTopRecommendation] = useState(null);
  const [querySummary, setQuerySummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);

  const searchNearbyServices = async (payload) => {
    try {
      setLoading(true);
      setError("");

      const cacheKey = `nearby-services-${JSON.stringify(payload)}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setResults(parsed.results || []);
        setTopRecommendation(parsed.topRecommendation || null);
        setQuerySummary(parsed.querySummary || "");
        setLocationInfo(parsed.location || null);
        return;
      }

      const data = await searchNearbyServicesApi(payload);

      setResults(data.results || []);
      setTopRecommendation(data.topRecommendation || null);
      setQuerySummary(data.querySummary || "");
      setLocationInfo(data.location || null);

      sessionStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (err) {
      console.error("useNearbyServices Error:", err?.response?.data || err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch nearby services",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    topRecommendation,
    querySummary,
    loading,
    error,
    locationInfo,
    searchNearbyServices,
  };
}
