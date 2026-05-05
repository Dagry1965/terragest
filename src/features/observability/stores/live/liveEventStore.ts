export type LiveRuntimeEvent = {

  type: string;

  timestamp: number;

  payload?: unknown;
};

class LiveEventStore {

  private events:
    LiveRuntimeEvent[] = [];

  push(
    event: LiveRuntimeEvent
  ) {

    this.events.unshift(event);

    console.log(
      "[LiveEvent]",
      event.type
    );
  }

  getAll() {

    return this.events;
  }
}

export const liveEventStore =
  new LiveEventStore();
