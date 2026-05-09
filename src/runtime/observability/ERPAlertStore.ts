import type {
  ERPBaseRuntimeRecord,
} from "../shared/ERPRuntimeTypes";

export interface ERPAlertItem
  extends ERPBaseRuntimeRecord {}

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