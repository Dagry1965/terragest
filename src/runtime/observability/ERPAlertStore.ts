export interface ERPAlertItem {
  id: string;
  module?: string;
  title: string;
  description?: string;
  message?: string;
  level?: "info" | "warning" | "critical";
  status?: "success" | "warning" | "error" | "pending";
  createdAt?: string;
  timestamp?: string;
}

export class ERPAlertStore {
  private static items: ERPAlertItem[] = [];

  static all() {
    return this.items;
  }

  static alerts() {
    return this.items;
  }

  static add(item: ERPAlertItem) {
    this.items.push(item);
  }
}