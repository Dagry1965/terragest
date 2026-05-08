export type LiveRuntimeEvent = {
  type: string;
  timestamp: number;
  payload?: unknown;
};

type Listener = () => void;

class LiveEventStore {
  private events: LiveRuntimeEvent[] = [];

  private listeners = new Set<Listener>();

  push(event: LiveRuntimeEvent) {
    this.events = [
      event,
      ...this.events,
    ].slice(0, 50);

    console.log(
      "[LiveEvent]",
      event.type
    );

    this.notify();
  }

  replaceAll(events: LiveRuntimeEvent[]) {
    this.events = events;

    this.notify();
  }

  getAll() {
    return this.events;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(
      listener => listener()
    );
  }
}

export const liveEventStore =
  new LiveEventStore();