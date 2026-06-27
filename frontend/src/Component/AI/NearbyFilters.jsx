import React from "react";

function NearbyFilters({ filters, setFilters, radius, setRadius }) {
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSpecialistChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      specialist: e.target.value,
    }));
  };

  return (
    <div className="nearby-filters">
      <div className="nearby-filter-item">
        <label>Radius</label>
        <select
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
        >
          <option value={2}>2 KM</option>
          <option value={5}>5 KM</option>
          <option value={10}>10 KM</option>
          <option value={25}>25 KM</option>
        </select>
      </div>

      <div className="nearby-filter-checks">
        <label>
          <input
            type="checkbox"
            name="openNow"
            checked={filters.openNow}
            onChange={handleCheckbox}
          />
          Open Now
        </label>

        <label>
          <input
            type="checkbox"
            name="emergencyOnly"
            checked={filters.emergencyOnly}
            onChange={handleCheckbox}
          />
          Emergency Only
        </label>

        <label>
          <input
            type="checkbox"
            name="is24x7"
            checked={filters.is24x7}
            onChange={handleCheckbox}
          />
          24/7
        </label>
      </div>

      <div className="nearby-filter-item">
        <label>Specialist</label>
        <input
          type="text"
          placeholder="Cardiologist, Dentist..."
          value={filters.specialist}
          onChange={handleSpecialistChange}
        />
      </div>
    </div>
  );
}

export default NearbyFilters;
