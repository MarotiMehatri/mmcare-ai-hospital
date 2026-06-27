import React from "react";

const serviceTypes = [
  "hospital",
  "clinic",
  "pharmacy",
  "lab",
  "ambulance",
  "specialist",
];

function ServiceTypeTabs({ serviceType, setServiceType }) {
  return (
    <div className="service-type-tabs">
      {serviceTypes.map((type) => (
        <button
          key={type}
          className={`service-tab ${serviceType === type ? "active" : ""}`}
          onClick={() => setServiceType(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default ServiceTypeTabs;
