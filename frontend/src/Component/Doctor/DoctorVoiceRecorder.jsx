import React, { useEffect, useRef, useState } from "react";

import { FaMicrophone, FaStop, FaTrash, FaPaperPlane } from "react-icons/fa";

import "../../Styles/Doctor/DoctorVoiceRecorder.css";

function DoctorVoiceRecorder({ onSendVoice }) {
  const [isRecording, setIsRecording] = useState(false);

  const [audioURL, setAudioURL] = useState("");

  const [audioBlob, setAudioBlob] = useState(null);

  const [recordingTime, setRecordingTime] = useState(0);

  const [error, setError] = useState("");

  const mediaRecorderRef = useRef(null);

  const audioChunksRef = useRef([]);

  const timerRef = useRef(null);

  const streamRef = useRef(null);

  /* =====================================
      START RECORDING
  ===================================== */

  const startRecording = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioURL(url);
      };

      mediaRecorder.start();

      setRecordingTime(0);
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone Error:", err);

      setError("Microphone permission denied.");
    }
  };

  /* =====================================
      STOP RECORDING
  ===================================== */

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    clearInterval(timerRef.current);

    setIsRecording(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  /* =====================================
      DELETE RECORDING
  ===================================== */

  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }

    setAudioBlob(null);
    setAudioURL("");
    setRecordingTime(0);
  };

  /* =====================================
      SEND RECORDING
  ===================================== */

  const sendRecording = () => {
    if (!audioBlob) return;

    if (onSendVoice) {
      onSendVoice({
        type: "voice",
        audio: audioBlob,
        audioURL,
        duration: recordingTime,
      });
    }

    deleteRecording();
  };

  /* =====================================
      FORMAT TIMER
  ===================================== */

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);

    const secs = totalSeconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  /* =====================================
      CLEANUP
  ===================================== */

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioURL]);

  return (
    <div className="doctor-voice-recorder">
      {/* ERROR */}

      {error && <div className="doctor-voice-error">{error}</div>}

      {/* START BUTTON */}

      {!isRecording && !audioURL && (
        <button
          type="button"
          className="doctor-voice-btn start"
          onClick={startRecording}
        >
          <FaMicrophone />
        </button>
      )}

      {/* RECORDING */}

      {isRecording && (
        <div className="doctor-recording-box">
          <div className="doctor-recording-animation">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="doctor-recording-time">
            {formatTime(recordingTime)}
          </div>

          <button
            type="button"
            className="doctor-voice-btn stop"
            onClick={stopRecording}
          >
            <FaStop />
          </button>
        </div>
      )}

      {/* PREVIEW */}

      {!isRecording && audioURL && (
        <div className="doctor-audio-preview">
          <audio controls src={audioURL} />

          <div className="doctor-audio-actions">
            <button
              type="button"
              className="doctor-voice-btn delete"
              onClick={deleteRecording}
            >
              <FaTrash />
            </button>

            <button
              type="button"
              className="doctor-voice-btn send"
              onClick={sendRecording}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorVoiceRecorder;
