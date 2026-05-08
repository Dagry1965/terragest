type StoredEvent = {

  id: string;

  type: string;

  stream: string;

  timestamp: number;

  payload?: unknown;
};

export class PersistentEventStore {

  private events:
    StoredEvent[] = [];

  append(
    event: StoredEvent
  ) {

    this.events.push(event);

    console.log(
      "[PersistentEventStore]",
      event.type
    );
  }

  load(
    stream: string
  ) {

    return this.events.filter(
      event =>
        event.stream === stream
    );
  }

  replay(
    stream: string
  ) {

    const events =
      this.load(stream);

    console.log(
      "[Replay]",
      stream,
      events.length
    );

    return events;
  }
}
