import React, { useMemo } from "react";

import ChatHeader from "../../Component/AI/chatHeader";
import SuggestedQuestions from "../../Component/AI/SuggestedQuestions";
import ChatMessages from "../../Component/AI/ChatMessage";
import ChatTyping from "../../Component/AI/ChatTypeing";
import ChatInput from "../../Component/AI/ChatInput";
import useAIChat from "../../hooks/useAIChat";

import "../../Styles/AI/AIChat.css";

const AIChatPage = () => {
  const { messages, loading, sendMessage } = useAIChat();

  const patientData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("patient")) || {};
    } catch {
      return {};
    }
  }, []);

  const patientName =
    patientData?.FullName ||
    patientData?.fullName ||
    patientData?.name ||
    patientData?.patientName ||
    "Patient";

  const handleSend = (text) => {
    if (!text?.trim()) return;
    sendMessage(text.trim(), patientData);
  };

  return (
    <section className="ai-chat-page" id="ai-chat">
      <div className="ai-chat-bg ai-chat-bg-one"></div>
      <div className="ai-chat-bg ai-chat-bg-two"></div>

      <div className="ai-chat-topbar">
        <div>
          <span className="ai-chat-live-badge">AI Online</span>
          <h3>Hello, {patientName}</h3>
          <p>
            Ask your health assistant anything about care, reports, or
            appointments.
          </p>
        </div>

        <div className="ai-chat-status-pill">
          <span></span>
          Ready
        </div>
      </div>

      <div className="ai-chat-header-wrap">
        <ChatHeader />
      </div>

      <div className="ai-chat-suggestions-wrap">
        <SuggestedQuestions onSelect={handleSend} />
      </div>

      <div className="ai-chat-panel">
        <ChatMessages messages={Array.isArray(messages) ? messages : []} />
        {loading && <ChatTyping />}
      </div>

      <div className="ai-chat-input-wrap">
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </section>
  );
};

export default AIChatPage;
