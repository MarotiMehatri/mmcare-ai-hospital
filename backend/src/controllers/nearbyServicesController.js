import { validateNearbySearchInput } from "../utils/nearby-service/nearbyValidator.js";
import { getNearbyServicesFromLocalData } from "../services/nearby-services/nearbyDataService.js";
import { rankNearbyServicesWithGemini } from "../services/nearby-services/geminiNearbyService.js";
import { mergeAIResultsWithProviders } from "../utils/nearby-service/nearbyResponseFormatter.js";
import {
  buildCacheKey,
  getCache,
  setCache,
} from "../services/nearby-services/nearbyCacheService.js";

export async function searchNearbyServices(req, res) {
  try {
    console.log("Request Body:", req.body);

    const payload = validateNearbySearchInput(req.body);
    console.log("Validated Payload:", payload);

    const cacheKey = buildCacheKey(payload);
    console.log("Cache Key:", cacheKey);

    const cached = getCache(cacheKey);
    console.log("Cached Data:", cached);

    if (cached) {
      return res.status(200).json({
        success: true,
        ...cached,
        cached: true,
      });
    }

    const providers = getNearbyServicesFromLocalData(payload);
    console.log("Providers:", providers);

    const aiData = await rankNearbyServicesWithGemini(payload, providers);
    console.log("AI Data:", aiData);

    const formatted = mergeAIResultsWithProviders(aiData, providers);
    console.log("Formatted Data:", formatted);

    const responseData = {
      location: {
        city: payload.city || "Unknown",
        lat: payload.location?.lat || null,
        lng: payload.location?.lng || null,
      },
      querySummary: formatted.querySummary,
      topRecommendation: formatted.topRecommendation,
      results: formatted.results,
    };

    setCache(cacheKey, responseData);

    res.set("Cache-Control", "private, max-age=120");

    return res.status(200).json({
      success: true,
      ...responseData,
      cached: false,
    });
  } catch (error) {
    console.error("Nearby Services Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
