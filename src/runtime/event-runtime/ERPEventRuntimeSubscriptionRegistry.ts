import { erpEventRuntimeSubscriptions } from "./ERPEventRuntimeSubscriptions";

export class ERPEventRuntimeSubscriptionRegistry {
  static all() {
    return erpEventRuntimeSubscriptions;
  }

  static forEvent(eventName: string) {
    return erpEventRuntimeSubscriptions.filter(
      (subscription) => subscription.eventName === eventName
    );
  }

  static forModule(moduleKey: string) {
    return erpEventRuntimeSubscriptions.filter(
      (subscription) => subscription.moduleKey === moduleKey
    );
  }
}