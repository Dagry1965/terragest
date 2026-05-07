Write-Host "=== TERRAGEST_V2 - SETUP ERP EVENT STORE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/event-store" | Out-Null

@'
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
    event.type
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
      storedEvent.event.type ===
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
    storedEvent.event.type
  );

  await replayHandler(
    storedEvent.event
  );
}
'@ | Set-Content "src/core/event-store/event-store.ts"

Write-Host "=== ERP EVENT STORE créé avec succès ===" -ForegroundColor Green