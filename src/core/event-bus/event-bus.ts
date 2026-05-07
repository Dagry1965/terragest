import {
  incrementMetric,
} from "@/core/metrics/metrics-engine";

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

  incrementMetric(
    "runtimeEvents"
  );

  const handlers =
    subscribers[event.name] || [];

  for (const handler of handlers) {
    await handler(event);
  }
}

