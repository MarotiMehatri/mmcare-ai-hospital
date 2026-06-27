import React, { useEffect, useMemo, useState } from "react";
import {
  getAllDoctors,
  getMessagesByPatientAndDoctor,
  sendMessage,
} from "../../services/Patient/PatientChatApi";
import PatientChatDoctorList from "../../Component/Patient/PatientChatDoctorList";
import PatientChatHeader from "../../Component/Patient/PatientChatHeader";
import PatientChatMessages from "../../Component/Patient/PatientChatMessages";
import PatientChatInput from "../../Component/Patient/PatientChatInput";
import PatientEmptyChatState from "../../Component/Patient/PatientEmptyChatState";
import "../../Styles/Patient/PatientChatPage.css";

function PatientChatPages() {
  const patient =
    JSON.parse(localStorage.getItem("patient")) ||
    JSON.parse(localStorage.getItem("Patient"));

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [typing, setTyping] = useState(false);

  const patientId = useMemo(() => patient?.id, [patient]);

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    if (!patientId || !selectedDoctor?.id) {
      setMessages([]);
      return;
    }

    setMessages([]);
    setTyping(false);
    loadMessages(selectedDoctor.id);
  }, [patientId, selectedDoctor?.id]);

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);

      const doctorList = await getAllDoctors();
      const safeDoctors = Array.isArray(doctorList) ? doctorList : [];

      setDoctors(safeDoctors);

      if (safeDoctors.length > 0) {
        setSelectedDoctor(safeDoctors[0]);
      }
    } catch (error) {
      console.error("Failed to load doctors:", error);
      setDoctors([]);
      setSelectedDoctor(null);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const loadMessages = async (doctorId) => {
    try {
      setLoadingMessages(true);

      const data = await getMessagesByPatientAndDoctor(patientId, doctorId);

      console.log("Selected Doctor ID:", doctorId);
      console.log("Loaded Messages:", data);

      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setMessages([]);
    setTyping(false);
  };

  const handleSendMessage = async (messageData) => {
    try {
      if (!patient?.id || !selectedDoctor?.id) return;

      const finalMessage = {
        ...messageData,
        patientId: String(patient.id),
        doctorId: String(selectedDoctor.id),
        sender: "patient",
        timestamp: new Date().toISOString(),
        isRead: false,
        isDelivered: false,
      };

      const savedMessage = await sendMessage(finalMessage);

      setMessages((prev) => [...prev, savedMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="patient-chat-page">
      <div className="patient-chat-page-container">
        <div className="patient-chat-shell">
          <div className="patient-chat-wrapper">
            <aside className="patient-chat-sidebar">
              <div className="patient-chat-sidebar-inner">
                <div className="patient-chat-sidebar-header">
                  <div className="patient-chat-sidebar-header-content">
                    <h2 className="patient-chat-sidebar-title">Doctors Chat</h2>
                    <p className="patient-chat-sidebar-subtitle">
                      Consult and chat with available doctors
                    </p>
                  </div>
                </div>

                <div className="patient-chat-sidebar-body">
                  <div className="patient-chat-sidebar-list-wrap">
                    {loadingDoctors ? (
                      <div className="patient-chat-loading">
                        Loading doctors...
                      </div>
                    ) : doctors.length === 0 ? (
                      <div className="patient-chat-empty-box">
                        <h3>No Doctors Available</h3>
                        <p>No doctors are currently available for chat.</p>
                      </div>
                    ) : (
                      <PatientChatDoctorList
                        doctors={doctors}
                        selectedDoctor={selectedDoctor}
                        onSelectDoctor={handleSelectDoctor}
                        loading={loadingDoctors}
                      />
                    )}
                  </div>
                </div>
              </div>
            </aside>

            <section className="patient-chat-main">
              {!selectedDoctor ? (
                <div className="patient-chat-empty-wrap">
                  <PatientEmptyChatState />
                </div>
              ) : (
                <div className="patient-chat-main-inner">
                  <div className="patient-chat-header-wrap">
                    <PatientChatHeader doctor={selectedDoctor} />
                  </div>

                  <div className="patient-chat-body">
                    <div className="patient-chat-messages-wrap">
                      <PatientChatMessages
                        key={`${patientId}-${selectedDoctor?.id}`}
                        messages={messages}
                        loading={loadingMessages}
                        typing={typing}
                      />
                    </div>
                  </div>

                  <div className="patient-chat-footer">
                    <div className="patient-chat-input-wrap">
                      <PatientChatInput
                        onSend={handleSendMessage}
                        setTyping={setTyping}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientChatPages;
