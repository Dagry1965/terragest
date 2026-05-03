import { DomainEvent } from "./types";

export class EventBus {

  publish(event: DomainEvent) {

    console.log(
      "[EVENT]",
      event.type
    );
  }
}
