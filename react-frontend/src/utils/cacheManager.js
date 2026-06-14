// Simple in-memory cache with TTL (Time To Live)
class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttlMs = 5 * 60 * 1000) {
    // Default 5 minutes TTL
    const expiresAt = Date.now() + ttlMs;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  clear() {
    this.cache.clear();
  }

  delete(key) {
    this.cache.delete(key);
  }
}

export default new CacheManager();
