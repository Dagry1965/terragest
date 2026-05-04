import { DomainEvent } from "../types";

type EventHandler =
  (event: DomainEvent) => void;

export class EventBus {

  private handlers:
    Record<string, EventHandler[]> = {};

  subscribe(
    eventType: string,
    handler: EventHandler
  ) {

    if (!this.handlers[eventType]) {

      this.handlers[eventType] = [];
    }

    this.handlers[eventType].push(handler);

    console.log(
      "[EVENT SUBSCRIBED]",
      eventType
    );
  }

  publish(event: DomainEvent) {

    console.log(
      "[EVENT PUBLISHED]",
      event.type
    );

    const eventHandlers =
      this.handlers[event.type] || [];

    for (const handler of eventHandlers) {

      handler(event);
    }
  }
}