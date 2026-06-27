import React from "react";
import { FaTools, FaMagic } from "react-icons/fa";

import AIToolCard from "../cards/AIToolCard";
import { aiToolsData } from "./aiToolsData";

import "../../Styles/AI/AIToolGrid.css";

const AIToolsGrid = () => {
  return (
    <section className="ai-tools-section" id="ai-tools">
      <div className="ai-tools-bg-glow"></div>

      <div className="ai-tools-header">
        <span className="ai-tools-badge">
          <FaMagic />
          Smart Healthcare Modules
        </span>

        <div className="ai-tools-title-row">
          <div>
            <h2>AI Tools</h2>
            <p>
              Explore smart healthcare modules for reports, symptoms,
              appointments, reminders, and patient guidance.
            </p>
          </div>

          <div className="ai-tools-count">
            <FaTools />
            <strong>{aiToolsData.length}</strong>
            <span>Tools</span>
          </div>
        </div>
      </div>

      <div className="ai-tools-grid">
        {aiToolsData.map((tool, index) => (
          <div
            className="ai-tool-grid-item"
            key={tool.id}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <AIToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIToolsGrid;
