import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaComments, FaArrowRight, FaCircle } from "react-icons/fa";
import { getRecentChatsForDoctor } from "../../services/Doctor/DoctorChatAPI";
import "../../Styles/Doctor/DoctorChatPreview.css";

function DoctorChatPreview({ doctorId }) {
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        if (!doctorId) return;
        setLoading(true);
        const res = await getRecentChatsForDoctor(doctorId);
        setRecentChats(res.data || []);
      } catch (error) {
        console.error("Failed to load recent chats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [doctorId]);

  return (
    <div className="doctor-chat-preview">
      <div className="doctor-chat-preview__head">
        <div className="doctor-chat-preview__title-wrap">
          <div className="doctor-chat-preview__icon">
            <FaComments />
          </div>
          <div>
            <h3>Doctor Chat</h3>
            <p>Latest 3 patient conversations</p>
          </div>
        </div>

        <Link
          to="/doctor/chat"
          className="doctor-chat-preview__view-btn"
        >
          Chats <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="doctor-chat-preview__empty">Loading chats...</div>
      ) : recentChats.length === 0 ? (
        <div className="doctor-chat-preview__empty">No chats found</div>
      ) : (
        <div className="doctor-chat-preview__list">
          {recentChats.map((patient) => (
            <Link
              to="/doctor/doctor-chat"
              className="doctor-chat-preview__item"
              key={patient.id}
            >
              <div className="doctor-chat-preview__avatar-wrap">
                <img
                  src={patient.photo || "/patients/default.png"}
                  alt={patient.fullName}
                  className="doctor-chat-preview__avatar"
                />
                <span
                  className={`doctor-chat-preview__online ${
                    patient.isOnline ? "online" : "offline"
                  }`}
                >
                  <FaCircle />
                </span>
              </div>

              <div className="doctor-chat-preview__content">
                <h4>{patient.fullName}</h4>
                <p>{patient.latestMessage}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoctorChatPreview;
