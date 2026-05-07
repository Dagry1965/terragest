Write-Host "=== TERRAGEST_V2 - SETUP ERP EVENT BUS ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/event-bus" | Out-Null

@'
export type ERPEvent = {
  name: string;

  module: string;

  payload?: any;

  timestamp: string;
};

export type ERPEventHandler =
  (event: ERPEvent) =>
    Promise<void>;

const subscribers:
  Record<
    string,
    ERPEventHandler[]
  > = {};

export function subscribeEvent(
  eventName: string,
  handler: ERPEventHandler
) {
  if (!subscribers[eventName]) {
    subscribers[eventName] = [];
  }

  subscribers[eventName].push(
    handler
  );
}

export async function publishEvent(
  event: ERPEvent
) {
  console.log(
    "ERP EVENT PUBLISHED",
    event
  );

  const handlers =
    subscribers[event.name] || [];

  for (const handler of handlers) {
    await handler(event);
  }
}
'@ | Set-Content "src/core/event-bus/event-bus.ts"

@'
import {
  subscribeEvent,
} from "@/core/event-bus/event-bus";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

subscribeEvent(
  "materiels.update",
  async (event) => {
    if (
      event.payload?.etat ===
      "panne"
    ) {
      console.log(
        "EVENT BUS : maintenance workflow"
      );

      pushRuntimeEntry({
        module: "materiels",
        action: "event-bus",
        type: "workflow",
        status: "warning",
        entityId:
          event.payload?.id,
        message:
          "Workflow maintenance déclenché via Event Bus",
      });
    }
  }
);

subscribeEvent(
  "stocks.create",
  async (event) => {
    if (
      typeof event.payload?.quantite ===
        "number" &&
      event.payload.quantite < 10
    ) {
      console.log(
        "EVENT BUS : stock alert"
      );

      pushRuntimeEntry({
        module: "stocks",
        action: "event-bus",
        type: "supervision",
        status: "warning",
        entityId:
          event.payload?.id,
        message:
          "Alerte stock faible via Event Bus",
      });
    }
  }
);

subscribeEvent(
  "contrats.update",
  async (event) => {
    if (
      event.payload?.expirationProche
    ) {
      console.log(
        "EVENT BUS : contrat expiration"
      );

      pushRuntimeEntry({
        module: "contrats",
        action: "event-bus",
        type: "event",
        status: "warning",
        entityId:
          event.payload?.id,
        message:
          "Contrat proche expiration détecté",
      });
    }
  }
);
'@ | Set-Content "src/core/event-bus/register-event-subscribers.ts"

Write-Host "=== ERP EVENT BUS créé avec succès ===" -ForegroundColor Green