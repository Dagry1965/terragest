const hits = new Map<string, number[]>();

export class RuntimeRateLimiter {
  static allow(key: string, limit = 30, windowMs = 60_000): boolean {
    const now = Date.now();
    const entries = hits.get(key) ?? [];

    const fresh = entries.filter((timestamp) => now - timestamp < windowMs);

    if (fresh.length >= limit) {
      hits.set(key, fresh);
      return false;
    }

    fresh.push(now);
    hits.set(key, fresh);

    return true;
  }
}