

import { useEffect, useState } from "react";
import { sendAIChatMessage } from "../services/AI/aiChatApi";

const STORAGE_KEY = "AI_HEALTH_CHAT_HISTORY";

const createWelcomeMessage = () => ({
  id: Date.now(),
  sender: "ai",
  type: "text",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  text: "👋 Welcome! I'm your AI Health Assistant.\n\nI can help with symptoms, medications, hospital departments, medical reports, appointments, precautions, and general healthcare guidance.\n\nHow can I help you today?",
});

const useAIChat = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        return JSON.parse(saved);
      }

      return [createWelcomeMessage()];
    } catch {
      return [createWelcomeMessage()];
    }
  });

  const [loading, setLoading] = useState(false);

  const [typingText, setTypingText] = useState("");

  /* -------------------------
        SAVE CHAT
  ------------------------- */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  /* -------------------------
        SEND MESSAGE
  ------------------------- */

  const sendMessage = async (text, patientData = {}) => {
    if (!text.trim()) return;

    if (loading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      type: "text",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    setTypingText("Analyzing your symptoms...");

    try {
      const response = await sendAIChatMessage({
        patient: patientData,
        message: text,
      });

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        type: "structured",
        data: response.data,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const fallback = {
        id: Date.now() + 2,
        sender: "ai",
        type: "structured",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        data: {
          title: "AI Health Guidance",

          overview:
            "I'm currently unable to connect to the AI service. Please review the information below and consult a healthcare professional if your symptoms are severe.",

          possibleCauses: [
            "Temporary illness",
            "Common viral infection",
            "Underlying medical condition",
          ],

          precautions: [
            "Drink enough water",
            "Take adequate rest",
            "Monitor your symptoms",
            "Eat healthy food",
          ],

          homeCare: ["Stay hydrated", "Avoid heavy exercise", "Sleep well"],

          whenToConsultDoctor: [
            "Symptoms persist for more than 3 days",
            "High fever develops",
            "Pain becomes severe",
          ],

          emergencySigns: [
            "Difficulty breathing",
            "Chest pain",
            "Loss of consciousness",
            "Uncontrolled bleeding",
          ],

          recommendedDepartment: "General Medicine",

          recommendedSpecialist: "General Physician",

          nextSteps: [
            "Continue monitoring",
            "Book an appointment if symptoms worsen",
          ],

          disclaimer:
            "AI responses are informational only and do not replace professional medical diagnosis.",
        },
      };

      setMessages((prev) => [...prev, fallback]);
    } finally {
      setTypingText("");

      setLoading(false);
    }
  };

  /* -------------------------
        CLEAR CHAT
  ------------------------- */

  const clearChat = () => {
    const welcome = [createWelcomeMessage()];

    setMessages(welcome);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(welcome));
  };

  return {
    messages,
    loading,
    typingText,
    sendMessage,
    clearChat,
  };
};

export default useAIChat;
