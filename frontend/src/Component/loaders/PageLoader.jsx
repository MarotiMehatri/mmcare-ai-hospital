import React from "react";
import Skeleton from "react-loading-skeleton";
function PageLoader() {
  return (
    <div style={{ padding: "30px" }}>
      <Skeleton height={300} />

      <div style={{ marginTop: "20px" }}>
        <Skeleton count={5} />
      </div>
    </div>
  );
}

export default PageLoader;
