import React, { useEffect, useMemo, useState } from "react";

import {
  getAllPatients,
  getMessagesByDoctorAndPatient,
  sendMessage,
} from "../../services/Doctor/DoctorChatAPI";

import DoctorChatSidebar from "../../Component/Doctor/DoctorChatSidebar";
import DoctorChatHeader from "../../Component/Doctor/DoctorChatHeader";
import DoctorChatMessages from "../../Component/Doctor/DoctorChatMessages";
import DoctorChatInput from "../../Component/Doctor/DoctorChatInput";

import "../../Styles/Doctor/DoctorChatPage.css";

function DoctorChatPage() {
  const doctor = JSON.parse(localStorage.getItem("doctor")) || {};

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  //const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [loadingPatients] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  /* ======================================== LOAD ALL PATIENTS ======================================== */

  useEffect(() => {
    loadPatients();
  }, []);
  // const loadPatients = async () => {
  //   try {
  //     //setLoadingPatients(true);
  //     const [patientsRes, statusRes] = await Promise.all([
  //       getAllPatients(),
  //       getPatientOnlineStatus(),
  //     ]);
  //     //console.log("Patients API Response:", patientsRes?.data);
  //     //console.log("Status API Response:", statusRes?.data);
  //     const patientList = patientsRes?.data || [];
  //     const statusList = statusRes?.data || [];
  //     const mergedPatients = patientList.map((patient) => {
  //       const patientStatus = statusList.find(
  //         (status) => Number(status.patientId) === Number(patient.id),
  //       );
  //       return {
  //         ...patient,
  //         isOnline: patientStatus?.isOnline || false,
  //         lastSeen: patientStatus?.lastSeen || "",
  //       };
  //     });

  //     //console.log("Merged Patients:", mergedPatients);
  //     setPatients(mergedPatients);
  //     if (mergedPatients.length > 0) {
  //       setSelectedPatient(mergedPatients[0]);
  //     } else {
  //       setSelectedPatient(null);
  //     }
  //   } catch (error) {
  //     console.error("Failed To Load Patients:", error);
  //   }
  //   // finally {
  //   //   setLoadingPatients(false);
  //   // }
  // };

  const loadPatients = async () => {
    try {
      const patientsRes = await getAllPatients();

      const patientList = patientsRes?.data || [];

      const mergedPatients = patientList.map((patient) => ({
        ...patient,
        isOnline: patient.isOnline || false,
        lastSeen: patient.lastSeen || "",
      }));

      setPatients(mergedPatients);

      if (mergedPatients.length > 0) {
        setSelectedPatient(mergedPatients[0]);
      } else {
        setSelectedPatient(null);
      }
    } catch (error) {
      console.error("Failed To Load Patients:", error);
    }
  };

  /* ======================================== LOAD CHAT MESSAGES ======================================== */

  useEffect(() => {
    if (!doctor?.id || !selectedPatient?.id) return;
    loadMessages();
  }, [doctor?.id, selectedPatient?.id]);

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      // console.log("Doctor ID:", doctor.id);
      // console.log("Selected Patient ID:", selectedPatient.id);
      const response = await getMessagesByDoctorAndPatient(
        doctor.id,
        selectedPatient.id,
      );
      //console.log("Messages Response:", response?.data);
      const allMessage = response?.data || [];

      const filteredMessages = allMessage.filter(
        (message) =>
          String(message.doctorId) === String(doctor.id) &&
          Number(message.patientId) === Number(selectedPatient.id),
      );
      setMessages(filteredMessages);
    } catch (error) {
      console.error("Failed To Load Messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  /* ======================================== FILTER PATIENTS ======================================== */

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) =>
      (patient.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [patients, searchTerm]);

  /* ======================================== SELECT PATIENT ======================================== */

  const handleSelectPatient = (patient) => {
    //console.log("Selected Patient:", patient);
    setSelectedPatient(patient);
    setMessages([]);
  };

  /* ======================================== SEND MESSAGE ======================================== */

  const handleSendMessage = async (messageData) => {
    try {
      if (!doctor?.id || !selectedPatient?.id) {
        return;
      }
      const newMessage = {
        ...messageData,
        doctorId: String(doctor.id),
        patientId: Number(selectedPatient.id),
        sender: "doctor",
        text: messageData.text.trim(),
        timestamp: new Date().toISOString(),
        isRead: false,
        status: "sent",
      };

      console.log("Sending Message:", newMessage);

      const response = await sendMessage(newMessage);

      console.log("Saved Message:", response.data);

      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed To Send Message:", error);
    }
  };

  const handleSendImage = async (imageMessage) => {
    try {
      if (!doctor?.id || !selectedPatient?.id) return;

      const newMessage = {
        ...imageMessage,
        doctorId: String(doctor.id),
        patientId: Number(selectedPatient.id),
        sender: "doctor",
        type: "image",
        timestamp: new Date().toISOString(),
      };

      const response = await sendMessage(newMessage);

      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Image Send Error:", error);
    }
  };

  const handleSendFile = async (fileMessage) => {
    try {
      if (!doctor?.id || !selectedPatient?.id) return;

      const newMessage = {
        ...fileMessage,
        doctorId: String(doctor.id),
        patientId: Number(selectedPatient.id),
        sender: "doctor",
        type: "file",
        timestamp: new Date().toISOString(),
      };

      const response = await sendMessage(newMessage);

      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("File Send Error:", error);
    }
  };

  return (
    <div className="doctor-chat-page">
      {/* ======================================== SIDEBAR ======================================== */}
      <div className="doctor-chat-page__sidebar">
        {" "}
        {loadingPatients ? (
          <div className="doctor-chat-loading">Loading Patients...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="doctor-chat-empty-box">
            <h3>No Patients Found</h3>
            <p>No patients are available for chat.</p>
          </div>
        ) : (
          <DoctorChatSidebar
            patients={filteredPatients}
            selectedPatient={selectedPatient}
            onSelectPatient={handleSelectPatient}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>{" "}
      {/* ======================================== MAIN CHAT AREA ======================================== */}{" "}
      <div className="doctor-chat-page__main">
        {" "}
        {selectedPatient ? (
          <>
            {/* HEADER */}
            <DoctorChatHeader patient={selectedPatient} />

            {/* MESSAGES */}
            {loadingMessages ? (
              <div className="doctor-chat-loading">Loading Messages...</div>
            ) : messages.length === 0 ? (
              <div className="doctor-chat-empty-box">
                <h3>No Messages Yet</h3>
                <p>Start conversation with this patient.</p>
              </div>
            ) : (
              <DoctorChatMessages
                messages={messages}
                patient={selectedPatient}
                doctor={doctor}
              />
            )}

            {/* INPUT */}
            <DoctorChatInput
              onSend={handleSendMessage}
              onSendImage={handleSendImage}
              onSendFile={handleSendFile}
            />
          </>
        ) : (
          <div className="doctor-chat-empty">
            {" "}
            <h2>No Patient Selected</h2>{" "}
            <p>Please select a patient to start chatting.</p>{" "}
          </div>
        )}
      </div>
      {/* ======================================== LOADING ======================================== */}{" "}
      {/* {loadingPatients && (
        <div className="doctor-chat-loading">Loading Patients...</div>
      )}{" "} */}
    </div>
  );
}
export default DoctorChatPage;
