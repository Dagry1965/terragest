import type {
  ERPDomainEvent,
} from "../ERPDomainEvent";

type ERPEventHandler = (
  event: ERPDomainEvent
) => void;

class ERPEventBusClass {

  private handlers:
    ERPEventHandler[] = [];

  private events:
    ERPDomainEvent[] = [];

  emit(
    event: ERPDomainEvent
  ) {

    this.events.unshift(event);

    this.events =
      this.events.slice(0, 200);

    for (
      const handler
      of this.handlers
    ) {

      handler(event);
    }
  }

  subscribe(
    handler: ERPEventHandler
  ) {

    this.handlers.push(handler);

    return () => {

      this.handlers =
        this.handlers.filter(
          (item) =>
            item !== handler
        );
    };
  }

  getEvents() {

    return this.events;
  }
}

export const ERPEventBus =
  new ERPEventBusClass();