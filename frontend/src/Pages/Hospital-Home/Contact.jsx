import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaAmbulance,
  FaClock,
} from "react-icons/fa";
import "../../Styles/Hospital Home/Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <span>Contact Us</span>
        <h1>We Are Always Here To Help You</h1>
        <p>
          Contact MMCare-AI Hospital for appointments, emergency support,
          medical assistance and healthcare information.
        </p>
      </section>

      <section className="contact-info-grid">
        <div className="contact-info-card">
          <FaMapMarkerAlt />
          <h3>Address</h3>
          <p>Pune, Maharashtra, India</p>
        </div>

        <div className="contact-info-card">
          <FaPhoneAlt />
          <h3>Phone</h3>
          <p>+91 9307249853</p>
        </div>

        <div className="contact-info-card">
          <FaEnvelope />
          <h3>Email</h3>
          <p>support@mmcareai.com</p>
        </div>

        <div className="contact-info-card">
          <FaAmbulance />
          <h3>Emergency</h3>
          <p>24×7 Emergency Support</p>
        </div>
      </section>

      <section className="contact-main">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="working-hours">
          <FaClock />
          <h2>Working Hours</h2>

          <div>
            <span>Monday - Friday</span>
            <b>9:00 AM - 8:00 PM</b>
          </div>

          <div>
            <span>Saturday</span>
            <b>9:00 AM - 6:00 PM</b>
          </div>

          <div>
            <span>Sunday</span>
            <b>Emergency Only</b>
          </div>

          <div className="emergency-box">
            <h3>Need Immediate Help?</h3>
            <p>Call our emergency team anytime.</p>
            <a href="tel:+919307249853">Call Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
