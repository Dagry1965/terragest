import type {
  ERPBaseRuntimeRecord,
} from "../shared/ERPRuntimeTypes";

export interface ERPTraceItem
  extends ERPBaseRuntimeRecord {
  traceId?: string;
  duration?: number;
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

  static clear() {
    this.items = [];
  }
}

export const erpTraceStore =
  new ERPTraceStore();