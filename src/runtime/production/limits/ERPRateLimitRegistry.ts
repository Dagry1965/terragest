import type { ERPRateLimit } from "./ERPRateLimit";

export const ERPRateLimitRegistry: ERPRateLimit[] = [
  {
    key: "api-tenant-minute",
    scope: "tenant",
    limit: 1000,
    window: "minute",
  },
  {
    key: "workflow-tenant-hour",
    scope: "tenant",
    limit: 500,
    window: "hour",
  },
  {
    key: "automation-module-hour",
    scope: "module",
    limit: 300,
    window: "hour",
  },
  {
    key: "stream-global-minute",
    scope: "global",
    limit: 5000,
    window: "minute",
  },
];