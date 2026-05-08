interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export class RuntimeCache {
  static set<T>(key: string, value: T, ttlMs = 60_000) {
    cache.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });

    return value;
  }

  static get<T>(key: string): T | null {
    const entry = cache.get(key);

    if (!entry) {
      return null;
    }

    if (entry.expiresAt < Date.now()) {
      cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  static remember<T>(key: string, factory: () => T, ttlMs = 60_000): T {
    const existing = RuntimeCache.get<T>(key);

    if (existing) {
      return existing;
    }

    return RuntimeCache.set(key, factory(), ttlMs);
  }

  static clear() {
    cache.clear();
  }
}