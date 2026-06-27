export function validateNearbySearchInput(body) {
  const {
    query = "",
    city = "",
    serviceType = "hospital",
    radius = 5,
    location = null,
    filters = {},
  } = body || {};

  return {
    query: String(query).trim(),
    city: String(city).trim(),
    serviceType: String(serviceType).trim().toLowerCase(),
    radius: Number(radius) || 5,
    location:
      location && typeof location === "object"
        ? {
            lat: Number(location.lat),
            lng: Number(location.lng),
          }
        : null,
    filters: {
      openNow: Boolean(filters.openNow),
      emergencyOnly: Boolean(filters.emergencyOnly),
      is24x7: Boolean(filters.is24x7),
      specialist: String(filters.specialist || "")
        .trim()
        .toLowerCase(),
    },
  };
}
