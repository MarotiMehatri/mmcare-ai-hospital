import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaRobot, FaCheckCircle } from "react-icons/fa";

import "../../Styles/AI/AIToolCard.css";

const AIToolCard = ({ tool }) => {
  const navigate = useNavigate();
  const Icon = tool.icon;

  return (
    <article className={`ai-tool-card ai-tool-card-${tool.type}`}>
      <div className="ai-tool-card-glow"></div>

      <div className="ai-tool-card-top">
        <span className="ai-tool-badge">
          <FaRobot />
          {tool.badge || "AI Tool"}
        </span>

        <div className="ai-tool-icon-box">{Icon && <Icon />}</div>
      </div>

      <div className="ai-tool-card-body">
        <h3 className="ai-tool-title">{tool.title}</h3>
        <p className="ai-tool-description">{tool.description}</p>
      </div>

      <div className="ai-tool-feature-row">
        <span>
          <FaCheckCircle />
          Smart
        </span>
        <span>
          <FaCheckCircle />
          Fast
        </span>
        <span>
          <FaCheckCircle />
          Secure
        </span>
      </div>

      <button
        type="button"
        className="ai-tool-action-btn"
        onClick={() => navigate(tool.path)}
      >
        Open Tool
        <FaArrowRight />
      </button>
    </article>
  );
};

export default AIToolCard;
