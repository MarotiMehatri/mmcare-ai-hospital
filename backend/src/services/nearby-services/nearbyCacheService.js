const cacheStore = new Map();

export function getCache(key) {
  const entry = cacheStore.get(key);

  if (!entry) return null;

  const isExpired = Date.now() > entry.expiresAt;

  if (isExpired) {
    cacheStore.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache(key, data, ttlMs = 2 * 60 * 1000) {
  cacheStore.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

export function buildCacheKey(payload) {
  return JSON.stringify(payload);
}
