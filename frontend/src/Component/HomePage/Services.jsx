import React from "react";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaProcedures,
  FaXRay,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";
import "../../Styles/Hospital Home/Services.css";

const services = [
  {
    title: "Cardiology",
    icon: <FaHeartbeat />,
    text: "Advanced heart care, ECG, diagnosis and treatment.",
  },
  {
    title: "Neurology",
    icon: <FaBrain />,
    text: "Expert care for brain, nerves and neurological disorders.",
  },
  {
    title: "Orthopedics",
    icon: <FaBone />,
    text: "Bone, joint, fracture and sports injury treatment.",
  },
  {
    title: "Pediatrics",
    icon: <FaBaby />,
    text: "Complete child healthcare with friendly specialists.",
  },
  {
    title: "ICU",
    icon: <FaProcedures />,
    text: "24/7 critical care with advanced monitoring support.",
  },
  {
    title: "Radiology",
    icon: <FaXRay />,
    text: "Digital scans, X-ray and diagnostic imaging services.",
  },
  {
    title: "AI Health Assistant",
    icon: <FaRobot />,
    text: "Smart AI support for symptoms, reports and health tips.",
  },
];

const Services = () => {
  return (
    <section className="hospital-services">
      <div className="hospital-services__header">
        <span>Our Departments</span>
        <h2>Smart Care Across Every Specialty</h2>
        <p>
          Explore advanced hospital departments supported by expert doctors,
          modern technology and AI-powered healthcare assistance.
        </p>
      </div>

      <div className="hospital-services__grid">
        {services.map((service, index) => (
          <div key={index} className="hospital-service-card">
            <div className="hospital-service-card__icon">{service.icon}</div>

            <h3>{service.title}</h3>

            <p>{service.text}</p>

            <button type="button">
              Learn More <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
