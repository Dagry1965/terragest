import { DomainEvent } from "../types";

export class EventBus {

  publish(event: DomainEvent) {

    console.log(
      "[EVENT PUBLISHED]",
      event.type
    );
  }

  subscribe(eventType: string) {

    console.log(
      "[EVENT SUBSCRIBED]",
      eventType
    );
  }
}
