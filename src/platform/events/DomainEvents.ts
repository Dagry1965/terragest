// src/platform/events/DomainEvents.ts

type EventHandler = (payload: unknown) => void;

class DomainEventsManager {

  private handlers: Record<string, EventHandler[]> = {};

  subscribe(event: string, handler: EventHandler) {

    if (!this.handlers[event]) {

      this.handlers[event] = [];
    }

    this.handlers[event].push(handler);
  }

  dispatch(event: string, payload?: unknown) {

    console.log(`[EVENT] ${event}`, payload);

    const eventHandlers = this.handlers[event] || [];

    for (const handler of eventHandlers) {

      handler(payload);
    }
  }
}

export const DomainEvents = new DomainEventsManager();