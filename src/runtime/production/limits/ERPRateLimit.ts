export type ERPRateLimit = {
  key: string;
  scope: "tenant" | "user" | "module" | "global";
  limit: number;
  window: "minute" | "hour" | "day";
};