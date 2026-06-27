import { nearbyServicesData } from "../../data/nearbyServicesData.js";
import { calculateDistanceKm } from "../../utils/nearby-service/distanceHelper.js";

export function getNearbyServicesFromLocalData(payload) {
  const { city, serviceType, radius, location, filters, query } = payload;

  let results = [...nearbyServicesData];

  if (city) {
    results = results.filter(
      (item) => item.city.toLowerCase() === city.toLowerCase(),
    );
  }

  if (serviceType) {
    results = results.filter((item) => item.type === serviceType);
  }

  if (filters.openNow) {
    results = results.filter((item) => item.openNow);
  }

  if (filters.is24x7) {
    results = results.filter((item) => item.is24x7);
  }

  if (filters.emergencyOnly) {
    results = results.filter(
      (item) =>
        item.hasAmbulance ||
        item.specialties.includes("emergency") ||
        item.type === "ambulance",
    );
  }

  if (filters.specialist) {
    results = results.filter((item) =>
      item.specialties.some((s) =>
        s.toLowerCase().includes(filters.specialist.toLowerCase()),
      ),
    );
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.type.toLowerCase().includes(lowerQuery) ||
        item.address.toLowerCase().includes(lowerQuery) ||
        item.specialties.some((s) => s.toLowerCase().includes(lowerQuery)),
    );
  }

  if (location?.lat && location?.lng) {
    results = results
      .map((item) => ({
        ...item,
        distanceKm: calculateDistanceKm(
          location.lat,
          location.lng,
          item.lat,
          item.lng,
        ),
      }))
      .filter((item) => item.distanceKm <= radius)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  } else {
    results = results.map((item) => ({
      ...item,
      distanceKm: null,
    }));
  }

  return results;
}
