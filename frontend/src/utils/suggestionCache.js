const CACHE_TTL = 5 * 60 * 1000;

export const getSuggestionCacheKey = (patientId) => {
  return `ai-suggestions-${patientId}`;
};

export const getCachedSuggestions = (patientId) => {
  try {
    const key = getSuggestionCacheKey(patientId);
    const raw = sessionStorage.getItem(key);

    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const isExpired = Date.now() - parsed.timestamp > CACHE_TTL;

    if (isExpired) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setCachedSuggestions = (patientId, data) => {
  try {
    const key = getSuggestionCacheKey(patientId);
    sessionStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      }),
    );
  } catch (error) {
    console.error("Cache write failed:", error);
  }
};

export const clearCachedSuggestions = (patientId) => {
  try {
    const key = getSuggestionCacheKey(patientId);
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Cache clear failed:", error);
  }
};
