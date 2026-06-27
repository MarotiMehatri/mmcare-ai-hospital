import React from "react";
import { FaQuoteLeft, FaStar, FaUserCircle } from "react-icons/fa";
import "../../Styles/Hospital Home/Testmonials.css";

const testimonials = [
  {
    name: "Rahul Patil",
    role: "Cardiology Patient",
    rating: 5,
    text: "Excellent treatment and friendly staff. The appointment process was smooth and very fast.",
  },
  {
    name: "Priya Sharma",
    role: "Neurology Patient",
    rating: 5,
    text: "The doctors explained everything clearly. The hospital dashboard made reports easy to access.",
  },
  {
    name: "Akash Verma",
    role: "Orthopedic Patient",
    rating: 4,
    text: "Modern equipment, clean environment and professional care. Very good hospital experience.",
  },
  {
    name: "Sneha Kulkarni",
    role: "AI Health User",
    rating: 5,
    text: "The AI-based diagnosis support is very fast and helpful for understanding symptoms.",
  },
];

const Testmonials = () => {
  return (
    <section className="hospital-testimonials">
      <div className="hospital-testimonials__header">
        <span>Patient Stories</span>
        <h2>What Our Patients Say</h2>
        <p>
          Real experiences from patients who trust MMCare-AI for smart, secure
          and compassionate healthcare.
        </p>
      </div>

      <div className="hospital-testimonials__grid">
        {testimonials.map((item, index) => (
          <div className="hospital-testimonial-card" key={index}>
            <div className="hospital-testimonial-card__quote">
              <FaQuoteLeft />
            </div>

            <div className="hospital-testimonial-card__stars">
              {Array.from({ length: item.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="hospital-testimonial-card__text">{item.text}</p>

            <div className="hospital-testimonial-card__user">
              <div className="hospital-testimonial-card__avatar">
                <FaUserCircle />
              </div>

              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testmonials;
