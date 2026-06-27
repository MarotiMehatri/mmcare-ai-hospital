import React, { useState } from "react";
import { getAIAnalysis } from "../services/AI/aiIntegrationApi";

const useAIIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeData = async (formData) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await getAIAnalysis(formData);

      if (response?.success) {
        setResult(response.data);
      } else {
        setError(response?.message || "Failed to get AI result");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    result,
    error,
    analyzeData,
  };
};

export default useAIIntegration;
