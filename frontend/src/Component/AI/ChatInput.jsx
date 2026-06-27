import React, { useRef, useState } from "react";
import {
  FaPaperPlane,
  FaMicrophone,
  FaPlus,
  FaShieldAlt,
} from "react-icons/fa";

import "../../Styles/AI/ChatInput.css";

const ChatInput = ({ onSend, disabled = false }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || disabled) return;

    onSend?.(text.trim());
    setText("");
    resetHeight();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    autoResize(e.target);
  };

  const autoResize = (element) => {
    element.style.height = "48px";
    element.style.height = Math.min(element.scrollHeight, 140) + "px";
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-hint">
        <span>
          <FaShieldAlt />
          AI guidance is for support only. Contact a doctor for emergencies.
        </span>
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="chat-input-tool-btn"
          title="Add health context"
        >
          <FaPlus />
        </button>

        <div className="chat-input-field">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask your health question..."
            rows={1}
            disabled={disabled}
          />

          <small>{text.length}/500</small>
        </div>

        <button
          type="button"
          className="chat-input-voice-btn"
          title="Voice input"
        >
          <FaMicrophone />
        </button>

        <button
          type="submit"
          className="chat-input-send-btn"
          disabled={!text.trim() || disabled}
          title="Send message"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
