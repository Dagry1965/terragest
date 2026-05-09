export interface ERPTraceItem {
  id?: string;
  traceId?: string;
  module?: string;
  action?: string;
  actor?: string;
  status?: "success" | "warning" | "error" | "pending";
  title?: string;
  description?: string;
  message?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  timestamp?: string;
}

export class ERPTraceStore {
  private static items: ERPTraceItem[] = [];

  static all() {
    return this.items;
  }

  static traces() {
    return this.items;
  }

  static add(item: ERPTraceItem) {
    this.items.push(item);
  }
}