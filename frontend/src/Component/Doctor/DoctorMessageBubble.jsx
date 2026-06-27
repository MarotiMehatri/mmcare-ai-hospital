import React from "react";

function DoctorMessageBubble({ message }) {
  return (
    <div
      className={`doctor-message-bubble ${
        message.sender === "doctor" ? "doctor" : "patient"
      }`}
    >
      <p>{message.text}</p>
      <span>
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}

export default DoctorMessageBubble;
