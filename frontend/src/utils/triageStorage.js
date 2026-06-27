const CACHE_PREFIX = "mmcare_triage_";

export const saveCache = (key, data, ttlMinutes = 10) => {
  try {
    const payload = {
      data,
      expiry: Date.now() + ttlMinutes * 60 * 1000,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  } catch (error) {
    console.error("Cache save failed:", error);
  }
};

export const getCache = (key) => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (Date.now() > parsed.expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("Cache read failed:", error);
    return null;
  }
};

export const removeCache = (key) => {
  localStorage.removeItem(CACHE_PREFIX + key);
};
