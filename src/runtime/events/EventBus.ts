type EventHandler = (
  payload?: unknown
) => void | Promise<void>;

export class EventBus {
  private listeners =
    new Map<string, EventHandler[]>();

  on(
    event: string,
    handler: EventHandler
  ) {
    const handlers =
      this.listeners.get(event) || [];

    handlers.push(handler);

    this.listeners.set(
      event,
      handlers
    );
  }

  async emit(
    event: string,
    payload?: unknown
  ) {
    const handlers =
      this.listeners.get(event) || [];

    for (const handler of handlers) {
      await handler(payload);
    }
  }
}