import type {
  ERPEventRuntimeEvent,
} from "./ERPEventRuntimeTypes";

const events: ERPEventRuntimeEvent[] = [];

export class ERPEventRuntimeStore {
  static push(event: ERPEventRuntimeEvent) {
    events.unshift(event);
    return event;
  }

  static all() {
    return events;
  }

  static forModule(moduleKey: string) {
    return events.filter(
      (event) =>
        event.sourceModule === moduleKey ||
        event.targetModules.includes(moduleKey)
    );
  }

  static clear() {
    events.length = 0;
  }
}