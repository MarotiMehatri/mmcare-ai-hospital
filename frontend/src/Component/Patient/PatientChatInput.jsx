import React, { useRef, useState } from "react";
import {
  FaFileMedical,
  FaImage,
  FaPaperPlane,
  FaSmile,
  FaTimes,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import PatientVoiceRecorder from "./PatientVoiceRecorder";
import "../../Styles/Patient/PatientChatInput.css";

const PatientChatInput = ({ onSend, setTyping, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimerRef = useRef(null);

  const handleTyping = (value) => {
    setMessage(value);

    if (setTyping) {
      setTyping(true);
      clearTimeout(typingTimerRef.current);

      typingTimerRef.current = setTimeout(() => {
        setTyping(false);
      }, 1000);
    }
  };

  const handleEmoji = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() || disabled) return;

    onSend?.({
      sender: "patient",
      type: "text",
      text: message.trim(),
      timestamp: new Date().toISOString(),
    });

    setMessage("");
    setShowEmoji(false);
    setTyping?.(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || disabled) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      onSend?.({
        sender: "patient",
        type: "image",
        imageName: file.name,
        imageURL: reader.result,
        timestamp: new Date().toISOString(),
      });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || disabled) return;

    const extension = file.name.split(".").pop().toLowerCase();
    const reader = new FileReader();

    reader.onloadend = () => {
      onSend?.({
        sender: "patient",
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

  const handleVoiceMessage = (voiceData) => {
    if (!voiceData || disabled) return;

    onSend?.({
      sender: "patient",
      type: "voice",
      audioURL: voiceData.audioURL,
      duration: voiceData.duration,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="patient-input-root">
      {showEmoji && (
        <div className="patient-input-emoji">
          <EmojiPicker onEmojiClick={handleEmoji} width="100%" height={330} />
        </div>
      )}

      <form className="patient-input-form" onSubmit={handleSubmit}>
        <div className="patient-input-left-actions">
          <button
            type="button"
            className="patient-input-small-btn"
            onClick={() => setShowEmoji((prev) => !prev)}
            disabled={disabled}
          >
            {showEmoji ? <FaTimes /> : <FaSmile />}
          </button>

          <button
            type="button"
            className="patient-input-small-btn"
            onClick={() => imageInputRef.current?.click()}
            disabled={disabled}
          >
            <FaImage />
          </button>

          <button
            type="button"
            className="patient-input-small-btn"
            onClick={() => fileInputRef.current?.click()}
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
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
          hidden
          onChange={handleFileUpload}
        />

        <div className="patient-input-message-box">
          <input
            type="text"
            className="patient-input-message"
            placeholder="Type your message to doctor..."
            value={message}
            disabled={disabled}
            onChange={(e) => handleTyping(e.target.value)}
          />

          <button
            type="submit"
            className="patient-input-send-btn"
            disabled={disabled || !message.trim()}
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>

      <div className="patient-input-voice">
        <PatientVoiceRecorder onSendVoice={handleVoiceMessage} />
      </div>
    </div>
  );
};

export default PatientChatInput;
