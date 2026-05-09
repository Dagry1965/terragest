export interface RuntimeStreamEvent {

  stream: string;

  event: string;

  payload?: unknown;

  createdAt: string;
}

export class RuntimeStreamRegistry {

  private streams =
    new Map<
      string,
      RuntimeStreamEvent[]
    >();

  publish(
    stream: string,
    event: RuntimeStreamEvent
  ) {

    const events =
      this.streams.get(stream)
      ?? [];

    events.push(event);

    this.streams.set(
      stream,
      events
    );
  }

  getStream(
    stream: string
  ) {

    return this.streams.get(stream)
      ?? [];
  }

  getStreams() {

    return Array.from(
      this.streams.entries()
    );
  }
}

export const runtimeStreamRegistry =
  new RuntimeStreamRegistry();