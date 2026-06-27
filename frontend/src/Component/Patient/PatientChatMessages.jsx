import React, { useEffect, useRef } from "react";
import "../../Styles/Patient/PatientChatMessages.css";

import {
  FaCheck,
  FaCheckDouble,
  FaFileMedical,
  FaUserMd,
  FaUser,
} from "react-icons/fa";

function PatientChatMessages({
  messages = [],
  loading = false,
  typing = false,
}) {
  const bottomRef = useRef(null);

  const safeMessages = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [safeMessages, typing]);

  const formatDate = (value) => {
    if (!value) return "Today";

    const date = new Date(value);

    if (isNaN(date.getTime())) return "Today";

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (value) => {
    if (!value) return "";

    const date = new Date(value);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isImageFile = (fileType = "", fileName = "") => {
    const type = String(fileType).toLowerCase();
    const name = String(fileName).toLowerCase();

    return (
      ["jpg", "jpeg", "png", "webp", "gif"].includes(type) ||
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".png") ||
      name.endsWith(".webp") ||
      name.endsWith(".gif")
    );
  };

  const getMessageText = (msg) => {
    return msg.text || msg.message || msg.content || "";
  };

  if (loading) {
    return <div className="patient-chat-loading">Loading Messages...</div>;
  }

  if (!safeMessages.length) {
    return (
      <div className="patient-chat-empty">
        <h3>No Messages Yet</h3>
        <p>Start chatting with your doctor.</p>
      </div>
    );
  }

  let lastDate = "";

  return (
    <div className="patient-chat-messages">
      {safeMessages.map((msg, index) => {
        const currentDate = formatDate(msg.timestamp || msg.createdAt);
        const showDate = currentDate !== lastDate;
        lastDate = currentDate;

        const isPatient = String(msg.sender).toLowerCase() === "patient";
        const fileURL = msg.fileURL || msg.fileUrl || msg.file;
        const imageURL = msg.imageURL || msg.imageUrl || msg.image;
        const audioURL = msg.audioURL || msg.audioUrl;
        const messageText = getMessageText(msg);

        return (
          <React.Fragment key={msg.id || index}>
            {showDate && (
              <div className="chat-date-separator">
                <span>{currentDate}</span>
              </div>
            )}

            <div
              className={`patient-chat-message ${
                isPatient ? "patient-sent" : "doctor-received"
              }`}
            >
              <div className="message-avatar">
                {isPatient ? <FaUser /> : <FaUserMd />}
              </div>

              <div className="patient-chat-bubble">
                {(msg.type === "text" || !msg.type) && messageText && (
                  <p>{messageText}</p>
                )}

                {msg.type === "voice" && audioURL && (
                  <div className="patient-chat-voice">
                    <audio controls src={audioURL}>
                      Your browser does not support audio.
                    </audio>
                    <small>{msg.duration || 0}s</small>
                  </div>
                )}

                {msg.type === "image" && imageURL && (
                  <div className="patient-chat-image">
                    <img src={imageURL} alt={msg.imageName || "Chat image"} />
                  </div>
                )}

                {(msg.type === "report" || msg.type === "file") && fileURL && (
                  <div className="patient-chat-file">
                    {isImageFile(msg.fileType, msg.fileName) ? (
                      <img
                        src={fileURL}
                        alt={msg.fileName || "Medical report"}
                        className="patient-chat-report-image"
                      />
                    ) : (
                      <>
                        <FaFileMedical />
                        <a href={fileURL} target="_blank" rel="noreferrer">
                          {msg.fileName || "Medical Report"}
                        </a>
                      </>
                    )}
                  </div>
                )}

                <div className="patient-chat-footer-info">
                  <span className="patient-chat-time">
                    {formatTime(msg.timestamp || msg.createdAt)}
                  </span>

                  {isPatient && (
                    <span className="patient-chat-status">
                      {msg.isRead ? <FaCheckDouble /> : <FaCheck />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {typing && (
        <div className="patient-chat-typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default PatientChatMessages;
