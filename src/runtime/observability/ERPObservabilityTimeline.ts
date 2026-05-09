import type {
  ERPRuntimeEntity,
} from "../shared/ERPRuntimeEntity";

export interface ERPObservabilityTimelineItem
  extends ERPRuntimeEntity {

  traceId?: string;

  duration?: number;
}

export class ERPObservabilityTimeline {

  private static items:
    ERPObservabilityTimelineItem[] = [];

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

  static add(
    item:
      ERPObservabilityTimelineItem
  ) {

    this.items.push(item);
  }

  static clear() {

    this.items = [];
  }
}