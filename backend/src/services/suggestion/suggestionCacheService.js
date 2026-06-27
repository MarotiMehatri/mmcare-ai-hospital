const cacheStore = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const buildCacheKey = (patientContext) => {
  return JSON.stringify({
    patientId: patientContext.patientId,
    age: patientContext.age,
    gender: patientContext.gender,
    bloodGroup: patientContext.bloodGroup,
    allergies: patientContext.allergies,
    conditions: patientContext.conditions,
    chronicDiseases: patientContext.chronicDiseases,
    medications: patientContext.medications,
    recentSymptoms: patientContext.recentSymptoms,
    vitals: patientContext.vitals,
    lastVisit: patientContext.lastVisit,
  });
};

export const getCachedSuggestion = (patientContext) => {
  const key = buildCacheKey(patientContext);
  const entry = cacheStore.get(key);

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;

  if (isExpired) {
    cacheStore.delete(key);
    return null;
  }

  return entry.data;
};

export const setCachedSuggestion = (patientContext, data) => {
  const key = buildCacheKey(patientContext);

  cacheStore.set(key, {
    timestamp: Date.now(),
    data,
  });
};

export const clearCachedSuggestion = (patientContext) => {
  const key = buildCacheKey(patientContext);
  cacheStore.delete(key);
};
