// import React from "react";

import AIHeroSection from "../../Component/AI/AIHeroSection";
import AIQuickStats from "../../Component/AI/AIQuickStats";
import AIChatPage from "./AIChatPage";
import AIToolsGrid from "../../Component/AI/AIToolGrid";
import AIInsightsPanel from "../../Component/AI/AIInsightsPanel";
import AIHealthSummaryPage from "../../Pages/AI-Dashboard/AIHealthSummaryPage";

import "../../Styles/AI/AIHealthAssistantPage.css";
import AIChatPreview from "../../Component/AI/AIChatPreview";
import HealthSummaryPreview from "../../Component/cards/AIHealthSummary/HealthSummaryPreview";

function AIHealthAssistantPage() {
  return (
    <main className="ai-health-page">
      <div className="ai-health-bg-glow ai-health-bg-glow-one"></div>
      <div className="ai-health-bg-glow ai-health-bg-glow-two"></div>

      <div className="ai-health-container">
        <section className="ai-health-section ai-health-hero-section">
          <AIHeroSection />
        </section>

        <section className="ai-health-section ai-health-stats-section">
          <AIQuickStats />
        </section>

        <section className="ai-health-section ai-health-summary-section">
          <div className="ai-health-section-heading">
            <span className="ai-health-section-badge">AI Health Overview</span>
            <h2>Smart Health Summary</h2>
            <p>
              View patient health insights, recent activity, and AI-based
              medical suggestions in one place.
            </p>
          </div>

          <div className="ai-health-summary-card">
            <HealthSummaryPreview />
          </div>
        </section>

        <section className="ai-health-section ai-health-chat-section">
          <AIChatPreview />
        </section>

        <section className="ai-health-section ai-health-tools-section">
          <AIToolsGrid />
        </section>

        <section className="ai-health-section ai-health-insights-section">
          <AIInsightsPanel />
        </section>
      </div>
    </main>
  );
}

export default AIHealthAssistantPage;
