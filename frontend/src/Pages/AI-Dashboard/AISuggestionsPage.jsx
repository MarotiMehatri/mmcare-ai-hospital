import React, { useEffect, useMemo, useState } from "react";
import "../../Styles/AI/AiSuggestionsPage.css";

import {
  generateAISuggestions,
  getAISuggestionsHistory,
} from "../../services/AI/aiSuggestionsApi";

import {
  getCachedSuggestions,
  setCachedSuggestions,
  clearCachedSuggestions,
} from "../../utils/suggestionCache";

import { buildSuggestionPayload } from "../../utils/suggestionPayloadBuilder";
import {
  filterSuggestionsByCategory,
  getSuggestionCategories,
} from "../../utils/suggestionHelpers";

import SuggestionsHeader from "../../Component/AI/SuggestionsHeader";
import SuggestionsSummaryCard from "../../Component/cards/SuggestionsSummaryCard";
import SuggestionCategoryTabs from "../../Component/AI/SuggestionCategoryTabs";
import SuggestionCard from "../../Component/cards/SuggestionCard";
import SuggestionsRiskAlerts from "../../Component/AI/SuggestionsRiskAlerts";
import SuggestionsDoctorBox from "../../Component/AI/SuggestionsDoctorBox";
import SuggestionsMetaBar from "../../Component/AI/SuggestionsMetaBar";
import SuggestionLoader from "../../Component/AI/SuggestionLoader";
import SuggestionErrorState from "../../Component/AI/SuggestionErrorState";
import SuggestionEmptyState from "../../Component/AI/SuggestionEmptyState";

function AISuggestionsPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [suggestionData, setSuggestionData] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const patient = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || null;
    } catch (error) {
      console.error(error);

      return null;
    }
  }, []);

  const loadHistory = async (patientId) => {
    try {
      const historyRes = await getAISuggestionsHistory(patientId);
      setHistory(historyRes?.data || []);
    } catch (error) {
      console.error("History load failed", error);
    }
  };

  const loadSuggestions = async ({ forceRefresh = false } = {}) => {
    if (!patient?.id) {
      setError("Patient data not found in localStorage.");
      setLoading(false);
      return;
    }

    try {
      setError("");

      if (forceRefresh) {
        setRefreshing(true);
        clearCachedSuggestions(patient.id);
      } else {
        setLoading(true);
      }

      if (!forceRefresh) {
        const cached = getCachedSuggestions(patient.id);
        if (cached) {
          setSuggestionData(cached);
          setLoading(false);
          loadHistory(patient.id);
          return;
        }
      }

      const payload = buildSuggestionPayload(patient);
      const response = await generateAISuggestions(payload);

      const finalData = response?.data || null;

      setSuggestionData(finalData);
      setCachedSuggestions(patient.id, finalData);

      await loadHistory(patient.id);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to generate AI suggestions.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const categories = useMemo(() => {
    return getSuggestionCategories(suggestionData?.suggestions || []);
  }, [suggestionData]);

  const filteredSuggestions = useMemo(() => {
    return filterSuggestionsByCategory(
      suggestionData?.suggestions || [],
      activeCategory,
    );
  }, [suggestionData, activeCategory]);

  if (loading) {
    return <SuggestionLoader />;
  }

  if (error) {
    return <SuggestionErrorState message={error} onRetry={loadSuggestions} />;
  }

  if (!suggestionData) {
    return (
      <SuggestionEmptyState
        onRefresh={() => loadSuggestions({ forceRefresh: true })}
      />
    );
  }
  return (
    <div className="ai-suggestions-page">
      <SuggestionsHeader
        patientName={patient?.fullName}
        onRefresh={() => loadSuggestions({ forceRefresh: true })}
        refreshing={refreshing}
      />

      <SuggestionsMetaBar
        generatedAt={suggestionData?.generatedAt}
        totalSuggestions={suggestionData?.suggestions?.length}
      />

      <SuggestionsSummaryCard
        patient={patient}
        summary={suggestionData?.summary}
        priority={suggestionData?.priority}
      />

      <SuggestionCategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <div className="ai-suggestion-grid">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id || suggestion.title}
              suggestion={suggestion}
            />
          ))
        ) : (
          <div className="ai-no-category-match">
            No suggestions found for this category.
          </div>
        )}
      </div>

      <div className="ai-bottom-grid">
        <SuggestionsRiskAlerts riskAlerts={suggestionData?.riskAlerts || []} />

        <SuggestionsDoctorBox
          recommendedDepartment={suggestionData?.recommendedDepartment}
          recommendedDoctorType={suggestionData?.recommendedDoctorType}
        />
      </div>

      <div className="ai-history-panel">
        <h3>Suggestion History</h3>
        {history.length === 0 ? (
          <p className="empty-inline-text">No previous history available.</p>
        ) : (
          <div className="ai-history-list">
            {history.slice(0, 5).map((item) => (
              <div className="ai-history-item" key={item.id}>
                <p>
                  <strong>Summary:</strong> {item.summary}
                </p>
                <span>{new Date(item.generatedAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AISuggestionsPage;
