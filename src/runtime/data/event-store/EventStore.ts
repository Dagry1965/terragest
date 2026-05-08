export class EventStore {

  private events:
    unknown[] = [];

  append(
    event: unknown
  ) {

    this.events.push(event);

    console.log(
      "[EventStore]",
      event
    );
  }

  getAll() {

    return this.events;
  }
}
