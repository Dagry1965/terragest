import {
  ERPEvent,
} from "@/core/event-bus/event-bus";

export type StoredERPEvent = {
  id: string;

  event: ERPEvent;

  createdAt: string;

  transactionId?: string;

  user?: string;
};

const eventStore:
  StoredERPEvent[] = [];

export function persistEvent(
  event: ERPEvent,
  options?: {
    transactionId?: string;

    user?: string;
  }
) {
  const storedEvent:
    StoredERPEvent = {
      id:
        crypto.randomUUID(),

      event,

      createdAt:
        new Date().toISOString(),

      transactionId:
        options?.transactionId,

      user:
        options?.user,
    };

  eventStore.unshift(
    storedEvent
  );

  console.log(
    "ERP EVENT STORED",
    event.name
  );

  return storedEvent;
}

export function getStoredEvents() {
  return eventStore;
}

export function getEventsByType(
  type: string
) {
  return eventStore.filter(
    (storedEvent) =>
      storedEvent.event.name ===
      type
  );
}

export async function replayEvent(
  storedEvent: StoredERPEvent,
  replayHandler: (
    event: ERPEvent
  ) => Promise<void>
) {
  console.log(
    "ERP EVENT REPLAY",
    storedEvent.event.name
  );

  await replayHandler(
    storedEvent.event
  );
}
