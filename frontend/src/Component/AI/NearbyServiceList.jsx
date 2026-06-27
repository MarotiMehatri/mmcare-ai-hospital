import React from "react";
import NearbyServiceCard from "../cards/NearbyServiceCard";

function NearbyServiceList({ results }) {
  return (
    <div className="nearby-service-list">
      {results.map((item) => (
        <NearbyServiceCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default NearbyServiceList;
