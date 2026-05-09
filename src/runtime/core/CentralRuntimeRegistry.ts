import { runtimeEventStore } from "./RuntimeEventStore";

export function getRuntimeEvents() {
  return runtimeEventStore.getEvents();
}
