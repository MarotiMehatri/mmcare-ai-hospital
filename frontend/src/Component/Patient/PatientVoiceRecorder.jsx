import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaStop, FaTrash, FaPaperPlane } from "react-icons/fa";

function PatientVoiceRecorder({ onSendVoice }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  /* =========================================
      START RECORDING
  ========================================= */

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
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

      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Microphone Error:", error);
    }
  };

  /* =========================================
      STOP RECORDING
  ========================================= */

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    clearInterval(timerRef.current);

    setIsRecording(false);
  };

  /* =========================================
      DELETE RECORDING
  ========================================= */

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioURL("");
    setRecordingTime(0);
  };

  /* =========================================
      SEND RECORDING
  ========================================= */

  const sendRecording = () => {
    if (!audioBlob) return;

    onSendVoice({
      audio: audioBlob,
      audioURL,
      type: "voice",
      duration: recordingTime,
    });

    deleteRecording();
  };

  /* =========================================
      CLEANUP
  ========================================= */

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="voice-recorder">
      {/* RECORD BUTTON */}

      {!isRecording && !audioURL && (
        <button
          type="button"
          className="voice-btn start"
          onClick={startRecording}
        >
          <FaMicrophone />
        </button>
      )}

      {/* RECORDING STATE */}

      {isRecording && (
        <div className="voice-recording-box">
          <div className="voice-recording-animation"></div>

          <span className="voice-time">
            00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}
          </span>

          <button
            type="button"
            className="voice-btn stop"
            onClick={stopRecording}
          >
            <FaStop />
          </button>
        </div>
      )}

      {/* AUDIO PREVIEW */}

      {!isRecording && audioURL && (
        <div className="voice-preview-box">
          <audio controls src={audioURL}></audio>

          <div className="voice-preview-actions">
            <button
              type="button"
              className="voice-btn delete"
              onClick={deleteRecording}
            >
              <FaTrash />
            </button>

            <button
              type="button"
              className="voice-btn send"
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

export default PatientVoiceRecorder;
