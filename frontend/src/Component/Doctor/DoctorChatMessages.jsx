import React, { useEffect, useRef } from "react";
import {
  FaCheck,
  FaCheckDouble,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
} from "react-icons/fa";

import "../../Styles/Doctor/DoctorChatMessages.css";

function DoctorChatMessages({
  messages = [],
  loading,
  typing,
  patient,
  doctor,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileUrl = (url) => {
    if (!url || url.startsWith("blob:")) {
      return "";
    }

    return url;
  };

  if (loading) {
    return <div className="doctor-chat-loading">Loading Messages...</div>;
  }

  return (
    <div className="doctor-chat-messages">
      {messages.map((msg, index) => {
        const showDateSeparator =
          index === 0 ||
          formatDate(messages[index - 1].timestamp) !==
            formatDate(msg.timestamp);

        return (
          <React.Fragment key={msg.id}>
            {/* DATE SEPARATOR */}

            {showDateSeparator && (
              <div className="doctor-chat-date-separator">
                {formatDate(msg.timestamp)}
              </div>
            )}

            <div
              className={`doctor-chat-message ${msg.sender === "doctor" ? "sent" : "received"}`}
            >
              {msg.sender !== "doctor" && (
                <img
                  src={patient?.photo || "/default-patient.png"}
                  alt="Patient"
                  className="doctor-chat-msg-avatar"
                />
              )}
              <div className="doctor-chat-bubble">
                {/* TEXT MESSAGE */}
                {msg.type !== "voice" &&
                  msg.type !== "image" &&
                  msg.type !== "report" && <p>{msg.text}</p>}
                {/* VOICE MESSAGE */}

                {msg.type === "voice" && (
                  <div className="doctor-chat-voice">
                    {getFileUrl(msg.audioURL) ? (
                      <audio controls>
                        <source
                          src={getFileUrl(msg.audioURL)}
                          type="audio/webm"
                        />
                      </audio>
                    ) : (
                      <p>Voice file not available</p>
                    )}

                    <small>{msg.duration || 0}s</small>
                  </div>
                )}

                {/* IMAGE */}
                {msg.type === "image" && (
                  <div className="doctor-chat-image-box">
                    {getFileUrl(msg.imageURL) ? (
                      <img
                        src={getFileUrl(msg.imageURL)}
                        alt="Chat Upload"
                        onError={(e) => {
                          e.currentTarget.src = "/no-image.png";
                        }}
                      />
                    ) : (
                      <p>Image not available</p>
                    )}
                  </div>
                )}

                {/* REPORT FILE */}

                {msg.type === "report" && (
                  <div className="doctor-chat-report">
                    {msg.fileType === "pdf" && <FaFilePdf />}

                    {msg.fileType === "docx" && <FaFileWord />}
                    {msg.fileType === "image" && <FaFileImage />}

                    {getFileUrl(msg.fileURL) ? (
                      <a
                        href={getFileUrl(msg.fileURL)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {msg.fileName}
                      </a>
                    ) : (
                      <span>{msg.fileName || "File not available"}</span>
                    )}
                  </div>
                )}

                {/* FOOTER */}

                <div className="doctor-chat-footer">
                  <span className="doctor-chat-time">
                    {formatTime(msg.timestamp)}
                  </span>

                  {msg.sender === "doctor" && (
                    <span className="doctor-chat-status">
                      {!msg.isDelivered && <FaCheck />}

                      {msg.isDelivered && !msg.isRead && <FaCheckDouble />}

                      {msg.isRead && <FaCheckDouble className="seen" />}
                    </span>
                  )}
                </div>
              </div>
              {msg.send === "doctor" && (
                <img
                  src={doctor?.photo || "/default-doctor.png"}
                  alt="Doctor"
                  className="doctor-chat-msg-avatar"
                />
              )}
            </div>
          </React.Fragment>
        );
      })}

      {/* TYPING */}

      {typing && (
        <div className="doctor-chat-typing">Patient is Typing....</div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default DoctorChatMessages;
