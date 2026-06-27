import React, { useEffect, useMemo, useRef } from "react";
import { FaRobot, FaComments, FaHeartbeat } from "react-icons/fa";

import ChatMessageBubble from "./ChatMessageBubble";
import "../../Styles/AI/ChatMessages.css";

const ChatMessages = ({ messages = [] }) => {
  const endRef = useRef(null);

  const safeMessages = useMemo(() => {
    return Array.isArray(messages) ? messages : [];
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [safeMessages]);

  return (
    <div className="chat-messages">
      <div className="chat-messages-bg chat-messages-bg-one"></div>
      <div className="chat-messages-bg chat-messages-bg-two"></div>

      {safeMessages.length === 0 ? (
        <div className="chat-empty-state">
          <div className="chat-empty-icon">
            <FaRobot />
          </div>

          <span className="chat-empty-badge">
            <FaHeartbeat />
            AI Health Assistant Ready
          </span>

          <h3>No messages yet</h3>

          <p>
            Ask your health question to start chatting with the AI assistant.
            You can ask about symptoms, appointments, reports, precautions, or
            hospital guidance.
          </p>

          <div className="chat-empty-suggestions">
            <span>
              <FaComments />
              Symptom help
            </span>
            <span>
              <FaComments />
              Report guidance
            </span>
            <span>
              <FaComments />
              Appointment support
            </span>
          </div>
        </div>
      ) : (
        <div className="chat-message-list">
          {safeMessages.map((message, index) => (
            <div
              key={message.id || index}
              className="chat-message-row"
              style={{ animationDelay: `${Math.min(index * 0.03, 0.2)}s` }}
            >
              <ChatMessageBubble message={message} />
            </div>
          ))}
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;
