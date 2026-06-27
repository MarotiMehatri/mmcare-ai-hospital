import React from "react";
import "../../Styles/Patient/PatientChatHeader.css";

const PatientChatHeader = ({ doctor }) => {
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <img
          src={doctor?.profilePhoto || "/default-doctor.png"}
          alt={doctor?.FullName}
          className="chat-header-image"
        />
        <div>
          <h3>{doctor.FullName}</h3>
          <p>
            {doctor.department} • {doctor.specialization}
          </p>
        </div>
      </div>

      <div className="chat-header-right">
        <span className="chat-status online">Available Now</span>
      </div>
    </div>
  );
};

export default PatientChatHeader;
