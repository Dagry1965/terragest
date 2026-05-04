// src/platform/observability/EventStore.ts

export interface ERPEvent {

  event: string;

  payload?: unknown;

  timestamp: Date;
}

class EventStoreManager {

  private events: ERPEvent[] = [];

  append(event: ERPEvent) {

    this.events.push(event);

    console.log(
      "[EVENT STORED]",
      event.event
    );
  }

  getEvents() {

    return this.events;
  }

  getEventsByType(type: string) {

    return this.events.filter(
      event => event.event === type
    );
  }
}

export const EventStore =
  new EventStoreManager();