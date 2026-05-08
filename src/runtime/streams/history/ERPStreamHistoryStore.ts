import type {
  ERPStreamEvent,
} from "../events/ERPStreamEvent";

class ERPStreamHistoryStoreClass {

  private events:
    ERPStreamEvent[] = [];

  publish(
    event: ERPStreamEvent
  ) {

    this.events.unshift(event);

    this.events =
      this.events.slice(0, 500);
  }

  all() {

    return this.events;
  }

  byModule(
    module: string
  ) {

    return this.events.filter(
      (event) =>
        event.module === module
    );
  }

  critical() {

    return this.events.filter(
      (event) =>
        event.level === "critical"
    );
  }
}

export const ERPStreamHistoryStore =
  new ERPStreamHistoryStoreClass();