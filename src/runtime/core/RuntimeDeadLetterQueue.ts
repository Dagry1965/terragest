export interface DeadLetterEvent {

  id: string;

  event: string;

  payload?: unknown;

  reason: string;

  failedAt: string;
}

export class RuntimeDeadLetterQueue {

  private events:
    DeadLetterEvent[] = [];

  push(
    event: DeadLetterEvent
  ) {

    this.events.push(event);
  }

  getEvents() {

    return this.events;
  }

  getCriticalEvents() {

    return this.events.filter(
      event =>
        event.reason.includes(
          "critical"
        )
    );
  }

  clear() {

    this.events = [];
  }
}

export const runtimeDeadLetterQueue =
  new RuntimeDeadLetterQueue();