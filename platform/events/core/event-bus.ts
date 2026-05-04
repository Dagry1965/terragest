import { DomainEvent } from "../types";

import { traceExecution } from "../../execution/runtime/execution-trace";

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

    traceExecution(
      "EVENT_SUBSCRIPTION",
      eventType
    );

    console.log(
      "[EVENT SUBSCRIBED]",
      eventType
    );
  }

  publish(event: DomainEvent) {

    traceExecution(
      "EVENT",
      event.type
    );

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