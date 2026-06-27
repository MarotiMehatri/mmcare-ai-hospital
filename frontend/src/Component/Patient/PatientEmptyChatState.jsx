import React from "react";
import { FaComments } from "react-icons/fa";
import "../../Styles/Patient/PatientEmptyChatState.css";

const PatientEmptyChatState = () => {
  return (
    <div className="empty-chat-state">
      <div className="empty-chat-container">
        <div className="empty-chat-icon">
          <FaComments />
        </div>

        <h3 className="empty-chat-title">Start Your Consultation</h3>

        <p className="empty-chat-subtitle">
          Select a doctor from the left panel to begin a secure chat session and
          discuss your health concerns.
        </p>

        <p className="empty-chat-note">
          Your conversation is private and stored securely in the hospital
          system.
        </p>

        <button className="empty-chat-button">Select Doctor</button>
      </div>
    </div>
  );
};

export default PatientEmptyChatState;
