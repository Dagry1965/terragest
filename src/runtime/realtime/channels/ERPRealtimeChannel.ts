export type ERPRealtimeChannelType =
  | "events"
  | "workflows"
  | "automation"
  | "queue"
  | "alerts"
  | "system"
  | "tenant";

export type ERPRealtimeMessage = {
  id: string;
  channel: ERPRealtimeChannelType;
  module?: string;
  title: string;
  description?: string;
  timestamp: string;
  payload?: Record<string, unknown>;
};