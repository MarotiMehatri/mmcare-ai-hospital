import React from "react";
import { FaSearch, FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";

function NearbySearchBar({
  query,
  setQuery,
  city,
  setCity,
  onUseLocation,
  onSearch,
  loading,
}) {
  return (
    <div className="nearby-search-bar">
      <div className="nearby-search-input-group">
        <FaSearch className="nearby-input-icon" />
        <input
          type="text"
          placeholder="Search nearby hospital, lab, pharmacy, specialist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="nearby-search-input-group">
        <FaMapMarkerAlt className="nearby-input-icon" />
        <input
          type="text"
          placeholder="Enter city or area"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="nearby-location-btn"
        onClick={onUseLocation}
      >
        <FaCrosshairs /> Use My Location
      </button>

      <button
        type="button"
        className="nearby-search-btn"
        onClick={onSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default NearbySearchBar;
