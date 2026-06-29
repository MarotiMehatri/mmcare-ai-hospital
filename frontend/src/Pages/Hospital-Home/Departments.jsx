import React from "react";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaEye,
  FaTooth,
  FaAmbulance,
  FaUserMd,
} from "react-icons/fa";
import "../../Styles/Hospital Home/Departments.css";

const departments = [
  {
    icon: <FaHeartbeat />,
    name: "Cardiology",
    desc: "Heart care, ECG, blood pressure, hypertension and cardiac treatment.",
  },
  {
    icon: <FaBrain />,
    name: "Neurology",
    desc: "Brain, stroke, migraine, nervous system and neuro care.",
  },
  {
    icon: <FaBone />,
    name: "Orthopedics",
    desc: "Bone fracture, joint pain, sports injury and replacement care.",
  },
  {
    icon: <FaBaby />,
    name: "Pediatrics",
    desc: "Child healthcare, vaccination, growth and development monitoring.",
  },
  {
    icon: <FaEye />,
    name: "Ophthalmology",
    desc: "Eye checkup, cataract, vision care and eye treatment.",
  },
  {
    icon: <FaTooth />,
    name: "Dental",
    desc: "Root canal, dental implant, cleaning and oral healthcare.",
  },
  {
    icon: <FaUserMd />,
    name: "General Medicine",
    desc: "Common illness, fever, infection, diabetes and regular checkups.",
  },
  {
    icon: <FaAmbulance />,
    name: "Emergency",
    desc: "24×7 emergency support with quick medical assistance.",
  },
];

function Departments() {
  return (
    <div className="departments-page">
      <section className="departments-hero">
        <span>Our Departments</span>
        <h1>Specialized Healthcare Services</h1>
        <p>
          MMCare-AI Hospital provides advanced medical departments with expert
          doctors, digital reports, AI support and smart appointment booking.
        </p>
      </section>

      <section className="departments-grid">
        {departments.map((dept, index) => (
          <div className="department-card" key={index}>
            <div className="department-icon">{dept.icon}</div>
            <h3>{dept.name}</h3>
            <p>{dept.desc}</p>
            <button>Book Appointment</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Departments;
