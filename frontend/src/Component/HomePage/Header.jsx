import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaPhoneAlt, FaUserCircle, FaHeartbeat } from "react-icons/fa";
import "../../Styles/Hospital Home/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  const goToLogin = () => {
    navigate("/login");
    closeMenu();
  };

  return (
    <header className={`hospital-header ${open ? "menu-open" : ""}`}>
      <div className="hospital-header__logo" onClick={() => navigate("/")}>
        <div className="hospital-header__logo-icon">
          <FaHeartbeat />
        </div>

        <div>
          <h2>
            MMCare<span>AI</span>
          </h2>
          <p>Smart Hospital</p>
        </div>
      </div>

      <div className="hospital-header__menu-toggle" onClick={toggleMenu}>
        {open ? <FiX /> : <FiMenu />}
      </div>

      <nav className={`hospital-header__nav ${open ? "active" : ""}`}>
        <ul>
          <li onClick={closeMenu}>Home</li>
          <li onClick={closeMenu}>About</li>
          <li onClick={closeMenu}>Doctors</li>
          <li onClick={closeMenu}>Departments</li>
          <li onClick={closeMenu}>Appointment</li>
          <li onClick={closeMenu}>Contact</li>
        </ul>

        <button className="hospital-header__login-mobile" onClick={goToLogin}>
          <FaUserCircle />
          Login
        </button>
      </nav>

      <div className="hospital-header__right">
        <div className="hospital-header__emergency">
          <FaPhoneAlt />
          <span>+91 9307249853</span>
        </div>

        <button className="hospital-header__login" onClick={goToLogin}>
          <FaUserCircle />
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
