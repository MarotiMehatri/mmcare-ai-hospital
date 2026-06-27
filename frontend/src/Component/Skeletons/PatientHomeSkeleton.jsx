import React from "react";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

function PatientHomeSkeleton() {
  return (
    <section className="patinet-home-skeleton">
      {/* HERO SECTION */}
      <div className="patient-home-skeleton-hero">
        <div className="patient-home-skeleton-left">
          <Skeleton height={30} width={220} />

          <div style={{ marginTop: "20px" }}>
            <Skeleton height={60} width={500} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Skeleton count={2} />
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px",
            }}
          >
            <Skeleton height={45} width={180} borderRadius={12} />

            <Skeleton height={45} width={180} borderRadius={12} />
          </div>
        </div>

        <div className="patient-home-skeleton-right">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                }}
              >
                <Skeleton height={90} borderRadius={18} />
              </div>
            ))}
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="patient-home-skeleton-top">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={120} borderRadius={20} />
          ))}
      </div>

      {/* MAIN GRID */}
      <div className="patient-home-skeleton-grid">
        <div>
          <Skeleton height={300} borderRadius={20} />

          <div style={{ marginTop: "20px" }}>
            <Skeleton height={220} borderRadius={20} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Skeleton height={220} borderRadius={20} />
          </div>
        </div>

        <div>
          <Skeleton height={250} borderRadius={20} />

          <div style={{ marginTop: "20px" }}>
            <Skeleton height={180} borderRadius={20} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Skeleton height={220} borderRadius={20} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientHomeSkeleton;
