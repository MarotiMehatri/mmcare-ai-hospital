import React, { useState } from "react";
import NearbySearchBar from "../../Component/AI/NearbySearchBar";
import ServiceTypeTabs from "../../Component/tables/ServiceTypeTabs";
import NearbyFilters from "../../Component/AI/NearbyFilters";
import NearbyServiceList from "../../Component/AI/NearbyServiceList";
import NearbyMapPreview from "../../Component/AI/NearbyMapPreview";
import EmergencyBanner from "../../Component/AI/nearby-services/EmergencyBanner";
import EmptyNearbyState from "../../Component/AI/EmptyNearbyState";
import useNearbyServices from "../../hooks/useNearbyServices";
import "../../Styles/AI/nearby-services.css";

function AINearbyServicesPage() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [serviceType, setServiceType] = useState("hospital");
  const [radius, setRadius] = useState(5);
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({
    openNow: false,
    emergencyOnly: false,
    is24x7: false,
    specialist: "",
  });

  const {
    results,
    topRecommendation,
    querySummary,
    loading,
    error,
    locationInfo,
    searchNearbyServices,
  } = useNearbyServices();

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(userLocation);
      },
      () => {
        alert("Unable to fetch location.");
      },
    );
  };

  const handleSearch = async () => {
    const payload = {
      query,
      city,
      serviceType,
      radius,
      location,
      filters,
    };

    await searchNearbyServices(payload);
  };

  return (
    <div className="ai-nearby-page">
      <div className="ai-nearby-header">
        <h1>AI Nearby Services</h1>
        <p>
          Find hospitals, clinics, labs, pharmacies, ambulance, and specialists
          near you.
        </p>
      </div>

      <EmergencyBanner query={query} />

      <div className="ai-nearby-search-section">
        <NearbySearchBar
          query={query}
          setQuery={setQuery}
          city={city}
          setCity={setCity}
          onUseLocation={handleUseLocation}
          onSearch={handleSearch}
          loading={loading}
        />

        <ServiceTypeTabs
          serviceType={serviceType}
          setServiceType={setServiceType}
        />

        <NearbyFilters
          filters={filters}
          setFilters={setFilters}
          radius={radius}
          setRadius={setRadius}
        />
      </div>

      {topRecommendation && (
        <div className="top-recommendation-card">
          <h3>Top AI Recommendation</h3>
          <p>
            <strong>{topRecommendation.name}</strong>
          </p>
          <p>{topRecommendation.reason}</p>
        </div>
      )}

      {querySummary && (
        <div className="query-summary-card">
          <h4>Search Summary</h4>
          <p>{querySummary}</p>
        </div>
      )}

      {error && <div className="nearby-error-box">{error}</div>}

      <div className="ai-nearby-content-grid">
        <div className="ai-nearby-results-panel">
          {loading ? (
            <div className="nearby-loading">Loading nearby services...</div>
          ) : results.length > 0 ? (
            <NearbyServiceList results={results} />
          ) : (
            <EmptyNearbyState />
          )}
        </div>

        <div className="ai-nearby-side-panel">
          <NearbyMapPreview locationInfo={locationInfo} />
        </div>
      </div>
    </div>
  );
}

export default AINearbyServicesPage;
