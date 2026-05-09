import {
  runtimeEventStore,
} from "./RuntimeEventStore";

export interface RuntimeEvent {

  name: string;

  payload?: unknown;

  emittedBy?: string;

  createdAt: string;
}

type RuntimeEventHandler =
  (event: RuntimeEvent) => void;

export class RuntimeEventBus {

  private handlers =
    new Map<
      string,
      RuntimeEventHandler[]
    >();

  emit(
    event: RuntimeEvent
  ) {

    runtimeEventStore.append(
      event
    );

    const handlers =
      this.handlers.get(
        event.name
      ) ?? [];

    for (const handler of handlers) {

      handler(event);
    }
  }

  on(
    eventName: string,
    handler: RuntimeEventHandler
  ) {

    const handlers =
      this.handlers.get(
        eventName
      ) ?? [];

    handlers.push(handler);

    this.handlers.set(
      eventName,
      handlers
    );
  }

  getRegisteredEvents() {

    return Array.from(
      this.handlers.keys()
    );
  }
}

export const runtimeEventBus =
  new RuntimeEventBus();