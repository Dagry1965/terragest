export interface ERPAutomationTimelineItem {
  id: string;
  action: string;
  label?: string;
  status: string;
  createdAt: string;
  module?: string;
  trigger?: string;
}

export class ERPAutomationTimelineStore {
  private static items: ERPAutomationTimelineItem[] = [];

  static all() {
    return this.items;
  }

  static getItems() {
    return this.items;
  }

  static addItem(item: ERPAutomationTimelineItem) {
    this.items.push(item);
  }
}

export const erpAutomationTimelineStore =
  new ERPAutomationTimelineStore();