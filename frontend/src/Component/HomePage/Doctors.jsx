import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaStar, FaUserMd, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Styles/Hospital Home/Doctors.css";

import doc1 from "../../assets/AI Doctors/doctor1.png";
import doc2 from "../../assets/AI Doctors/doctor2.png";
import doc3 from "../../assets/AI Doctors/doctor3.png";
import doc4 from "../../assets/AI Doctors/doctor4.png";
import doc5 from "../../assets/AI Doctors/doctor5.png";
import doc6 from "../../assets/AI Doctors/doctor6.png";
import doc7 from "../../assets/AI Doctors/doctor9.png";
import doc8 from "../../assets/AI Doctors/doctor8.png";
import doc9 from "../../assets/AI Doctors/doctor9.png";
import doc10 from "../../assets/AI Doctors/doctor10.png";
import doc11 from "../../assets/AI Doctors/doctor11.png";

const doctors = [
  {
    id: 1,
    image: doc1,
    name: "Dr. Ashutosh Shukla",
    department: "General Medicine",
    experience: "12 Years",
    rating: "4.8",
  },
  {
    id: 2,
    image: doc2,
    name: "Dr. Suresh H. Advani",
    department: "Medical Oncology",
    experience: "12 Years",
    rating: "4.9",
  },
  {
    id: 3,
    image: doc3,
    name: "Dr. Ambrish Mithal",
    department: "Internal Medicine",
    experience: "12 Years",
    rating: "4.7",
  },
  {
    id: 4,
    image: doc4,
    name: "Dr. Ashok Seth",
    department: "Interventional Cardiology",
    experience: "12 Years",
    rating: "4.9",
  },
  {
    id: 5,
    image: doc5,
    name: "Dr. Prasanna Kumar Reddy",
    department: "Gastroenterology",
    experience: "12 Years",
    rating: "4.8",
  },
  {
    id: 6,
    image: doc6,
    name: "Dr. Praveen Gupta",
    department: "Neurology",
    experience: "12 Years",
    rating: "4.8",
  },
  {
    id: 7,
    image: doc7,
    name: "Dr. Ameet Dravid",
    department: "Dermatology",
    experience: "12 Years",
    rating: "4.6",
  },
  {
    id: 8,
    image: doc8,
    name: "Dr. Sandeep Budhiraja",
    department: "Pulmonology",
    experience: "12 Years",
    rating: "4.7",
  },
  {
    id: 9,
    image: doc9,
    name: "Dr. Salil S. Bendre",
    department: "Pulmonology",
    experience: "12 Years",
    rating: "4.8",
  },
  {
    id: 10,
    image: doc10,
    name: "Dr. Atul Somani",
    department: "Infectious Diseases",
    experience: "12 Years",
    rating: "4.7",
  },
  {
    id: 11,
    image: doc11,
    name: "Dr. Charu Goel Sachdeva",
    department: "Pediatrics",
    experience: "12 Years",
    rating: "4.9",
  },
];

function Doctors() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = 340;

    if (direction === "right") {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });

      setTimeout(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, 450);
    } else {
      if (slider.scrollLeft <= 0) {
        slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="home-doctors-section">
      <div className="home-doctors-header">
        <span className="home-doctors-badge">
          <FaUserMd /> Trusted Specialists
        </span>

        <h2>Meet Our Expert Doctors</h2>

        <p>
          Consult experienced doctors across multiple departments with smart
          appointment booking and AI-supported care.
        </p>
      </div>

      <div className="home-doctors-slider-wrap">
        <button
          className="home-doctors-scroll-btn left"
          onClick={() => scrollSlider("left")}
        >
          <FaAngleLeft />
        </button>

        <div className="home-doctors-slider" ref={sliderRef}>
          {doctors.map((doctor) => (
            <div className="home-doctor-card" key={doctor.id}>
              <div className="home-doctor-image-box">
                <div className="home-doctor-glow"></div>

                <img src={doctor.image} alt={doctor.name} />

                <span className="home-doctor-rating">
                  <FaStar /> {doctor.rating}
                </span>
              </div>

              <div className="home-doctor-info">
                <h3>{doctor.name}</h3>
                <p className="home-doctor-department">{doctor.department}</p>

                <div className="home-doctor-meta">
                  <span>{doctor.experience}</span>
                  <span>Available Today</span>
                </div>

                <div className="home-doctor-actions">
                  <button
                    className="profile-btn"
                    onClick={() => navigate(`/doctor-profile/${doctor.id}`)}
                  >
                    View Profile
                  </button>

                  <button
                    className="book-btn"
                    onClick={() => navigate("/login")}
                  >
                    <FaCalendarCheck />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="home-doctors-scroll-btn right"
          onClick={() => scrollSlider("right")}
        >
          <FaAngleRight />
        </button>
      </div>
    </section>
  );
}

export default Doctors;
