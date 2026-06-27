import React from "react";

import Skeleton from "react-loading-skeleton";

function DashboardCardSkeleton() {
  return (
    <div className="dashboard-card-sheleton">
      <Skeleton height={40} width={40} circle />

      <div style={{ marginTop: "15px" }}>
        <Skeleton height={20} width={120} />
      </div>

      <div style={{ marginTop: "10px" }}>
        <Skeleton height={30} width={80} />
      </div>
    </div>
  );
}

export default DashboardCardSkeleton;
