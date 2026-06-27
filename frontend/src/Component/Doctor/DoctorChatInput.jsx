import React, { useEffect, useRef, useState } from "react";
import {
  FaFileMedical,
  FaImage,
  FaPaperPlane,
  FaSmile,
  FaTimes,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import DoctorVoiceRecorder from "./DoctorVoiceRecorder";
import "../../Styles/Doctor/DoctorChatInput.css";

function DoctorChatInput({
  onSend,
  onSendFile,
  onSendImage,
  setTyping,
  disabled = false,
}) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const textareaRef = useRef(null);
  const emojiRef = useRef(null);
  const imageInputRef = useRef(null);
  const reportInputRef = useRef(null);
  const typingTimerRef = useRef(null);

  useEffect(() => {
    const closeEmoji = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", closeEmoji);
    return () => document.removeEventListener("mousedown", closeEmoji);
  }, []);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "38px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 110)}px`;
  };

  const handleChange = (e) => {
    setMessage(e.target.value);

    setTimeout(resizeTextarea, 0);

    if (setTyping) {
      setTyping(true);
      clearTimeout(typingTimerRef.current);

      typingTimerRef.current = setTimeout(() => {
        setTyping(false);
      }, 1000);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);

    setTimeout(() => {
      resizeTextarea();
      textareaRef.current?.focus();
    }, 0);
  };

  const resetInput = () => {
    setMessage("");
    setShowEmoji(false);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "38px";
      }
    }, 0);

    if (setTyping) setTyping(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = message.trim();
    if (!text || disabled) return;

    onSend?.({
      sender: "doctor",
      type: "text",
      text,
      timestamp: new Date().toISOString(),
    });

    resetInput();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onSendImage?.({
        sender: "doctor",
        type: "image",
        imageName: file.name,
        imageURL: reader.result,
        timestamp: new Date().toISOString(),
      });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleReportUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();

    const reader = new FileReader();

    reader.onloadend = () => {
      onSendFile?.({
        sender: "doctor",
        type: "report",
        fileName: file.name,
        fileURL: reader.result,
        fileType: extension,
        timestamp: new Date().toISOString(),
      });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleVoiceSend = (voiceData) => {
    onSend?.({
      sender: "doctor",
      type: "voice",
      audioURL: voiceData.audioURL,
      duration: voiceData.duration,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="doctor-input-root">
      {showEmoji && (
        <div className="doctor-input-emoji" ref={emojiRef}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width="100%"
            height={330}
          />
        </div>
      )}

      <form className="doctor-input-form" onSubmit={handleSubmit}>
        <div className="doctor-input-left-actions">
          <button
            type="button"
            className="doctor-input-small-btn"
            onClick={() => setShowEmoji((prev) => !prev)}
            disabled={disabled}
          >
            {showEmoji ? <FaTimes /> : <FaSmile />}
          </button>

          <button
            type="button"
            className="doctor-input-small-btn"
            onClick={() => imageInputRef.current?.click()}
            disabled={disabled}
          >
            <FaImage />
          </button>

          <button
            type="button"
            className="doctor-input-small-btn"
            onClick={() => reportInputRef.current?.click()}
            disabled={disabled}
          >
            <FaFileMedical />
          </button>
        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />

        <input
          ref={reportInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          hidden
          onChange={handleReportUpload}
        />

        <div className="doctor-input-message-box">
          <textarea
            ref={textareaRef}
            rows={1}
            className="doctor-input-textarea"
            placeholder="Type your medical message..."
            value={message}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <button
            type="submit"
            className="doctor-input-send-btn"
            disabled={disabled || !message.trim()}
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>

      <div className="doctor-input-voice">
        <DoctorVoiceRecorder onSendVoice={handleVoiceSend} />
      </div>
    </div>
  );
}

export default DoctorChatInput;
