export type ERPWorkflowTimelineItem = {
  id: string;
  workflowKey: string;
  module: string;
  label: string;
  state: string;
  timestamp: string;
};

class ERPWorkflowTimelineStoreClass {
  private items: ERPWorkflowTimelineItem[] = [];

  add(item: ERPWorkflowTimelineItem) {
    this.items.unshift(item);
    this.items = this.items.slice(0, 200);
  }

  all() {
    return this.items;
  }
}

export const ERPWorkflowTimelineStore =
  new ERPWorkflowTimelineStoreClass();