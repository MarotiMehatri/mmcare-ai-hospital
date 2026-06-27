import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

function NearbyMapPreview({ locationInfo }) {
  return (
    <div className="nearby-map-preview">
      <h3>
        <FaMapMarkedAlt /> Map Preview
      </h3>
      <p>
        {locationInfo?.city
          ? `Current area: ${locationInfo.city}`
          : "Location preview will appear here"}
      </p>
      <div className="map-placeholder">Map Integration Coming Soon</div>
    </div>
  );
}

export default NearbyMapPreview;
