export interface ERPObservabilityTimelineItem {
  id: string;
  traceId?: string;
  title: string;
  message?: string;
  description?: string;
  module?: string;
  action?: string;
  actor?: string;
  status?: "success" | "warning" | "error" | "pending";
  level?: "info" | "warning" | "critical";
  type?: "info" | "success" | "warning" | "error";
  createdAt: string;
}

export class ERPObservabilityTimeline {
  private static items: ERPObservabilityTimelineItem[] = [];

  static all() {
    return this.items;
  }

  static alerts() {
    return this.items;
  }

  static events() {
    return this.items;
  }

  static traces() {
    return this.items;
  }

  static add(item: ERPObservabilityTimelineItem) {
    this.items.push(item);
  }
}