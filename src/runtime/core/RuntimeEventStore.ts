import type {
  RuntimeEvent,
} from "./RuntimeEventBus";

export class RuntimeEventStore {

  private events:
    RuntimeEvent[] = [];

  append(
    event: RuntimeEvent
  ) {

    this.events.push(event);
  }

  getEvents() {

    return this.events;
  }

  getEventsByName(
    name: string
  ) {

    return this.events.filter(
      event =>
        event.name === name
    );
  }

  clear() {

    this.events = [];
  }
}

export const runtimeEventStore =
  new RuntimeEventStore();