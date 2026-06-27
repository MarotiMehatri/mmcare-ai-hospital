import React from "react";
import { FaSearchLocation } from "react-icons/fa";

function EmptyNearbyState() {
  return (
    <div className="empty-nearby-state">
      <FaSearchLocation className="empty-icon" />
      <h3>No Nearby Services Found</h3>
      <p>Try changing search text, service type, city, or filters.</p>
    </div>
  );
}

export default EmptyNearbyState;
