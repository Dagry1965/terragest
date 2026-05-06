export type RuntimeEvent = {
  id?: string;
  type: string;
  source: string;
  module: string;
  timestamp: number;
  payload?: unknown;
  metadata?: Record<string, unknown>;
};