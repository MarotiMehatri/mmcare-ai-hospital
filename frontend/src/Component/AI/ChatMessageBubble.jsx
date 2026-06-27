import React from "react";
import {
  FaRobot,
  FaUser,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHospital,
  FaUserMd,
  FaArrowRight,
} from "react-icons/fa";

import "../../Styles/AI/ChatMessageBubble.css";

const ListBlock = ({ title, items = [], icon }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="ai-answer-block">
      <h4>
        {icon} {title}
      </h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <FaCheckCircle />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChatMessageBubble = ({ message }) => {
  const isUser = message.sender === "user";
  const data = message.data || {};

  if (isUser) {
    return (
      <div className="chat-bubble-row user">
        <div className="chat-bubble user-bubble">
          <p>{message.text}</p>
        </div>
        <div className="chat-avatar user-avatar">
          <FaUser />
        </div>
      </div>
    );
  }

  if (message.type === "text") {
    return (
      <div className="chat-bubble-row ai">
        <div className="chat-avatar ai-avatar">
          <FaRobot />
        </div>
        <div className="chat-bubble ai-bubble">
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-bubble-row ai">
      <div className="chat-avatar ai-avatar">
        <FaRobot />
      </div>

      <div className="ai-answer-card">
        <div className="ai-answer-header">
          <span>AI Health Guidance</span>
          <h3>{data.title || "Health Advice"}</h3>
          <p>{data.overview}</p>
        </div>

        <div className="ai-answer-grid">
          <ListBlock title="Possible Causes" items={data.possibleCauses} />
          <ListBlock title="Precautions" items={data.precautions} />
          <ListBlock title="Home Care" items={data.homeCare} />
          <ListBlock title="Next Steps" items={data.nextSteps} />
        </div>

        <div className="ai-doctor-box">
          <div>
            <FaHospital />
            <span>Recommended Department</span>
            <strong>{data.recommendedDepartment || "General Medicine"}</strong>
          </div>

          <div>
            <FaUserMd />
            <span>Specialist</span>
            <strong>{data.recommendedSpecialist || "General Physician"}</strong>
          </div>
        </div>

        <ListBlock
          title="When To Consult Doctor"
          items={data.whenToConsultDoctor}
        />

        {data.emergencySigns?.length > 0 && (
          <div className="ai-emergency-box">
            <h4>
              <FaExclamationTriangle /> Emergency Signs
            </h4>

            {data.emergencySigns.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}

        <div className="ai-disclaimer">
          {data.disclaimer ||
            "This is AI-generated guidance and not a final medical diagnosis."}
        </div>

        <div className="ai-followup-box">
          <h4>Ask more</h4>
          <button type="button">
            What medicine should I avoid? <FaArrowRight />
          </button>
          <button type="button">
            Which test should I take? <FaArrowRight />
          </button>
          <button type="button">
            When should I book appointment? <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
