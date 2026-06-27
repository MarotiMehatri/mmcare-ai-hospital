import React from "react";

function DiseaseSelect({ diseases, disease, onChange }) {
  return (
    <select value={disease} onClick={onChange}>
      <option value="">Select Disease</option>
      {diseases.map((d, index) => {
        <option key={index} value={d}>
          {d}
        </option>;
      })}
    </select>
  );
}

export default DiseaseSelect;
