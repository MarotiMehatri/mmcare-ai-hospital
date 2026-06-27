import React from "react";
import "../../Styles/Doctor/DoctorPaymentCard.css";
function DoctorPaymentCard({ title, value, subtitle, growth, icon }) {
  return (
    <div className="doctor-payment-card">
      <div className="doctor-payment-card__header">
        <div className="doctor-payment-card__icon">{icon}</div>

        {growth && (
          <span className="doctor-payment-card__growth">{growth}</span>
        )}
      </div>

      <div className="doctor-payment-card__body">
        <p className="doctor-payment-card__title">{title}</p>

        <h2 className="doctor-payment-card__value">{value}</h2>

        <span className="doctor-payment-card__subtitle">{subtitle}</span>
      </div>

      <div className="doctor-payment-card__footer">
        <span>View Analytics →</span>
      </div>
    </div>
  );
}

export default DoctorPaymentCard;
