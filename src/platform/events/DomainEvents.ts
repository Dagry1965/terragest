// src/platform/events/DomainEvents.ts

import { EventStore }
from "@/platform/observability/EventStore";

import { MetricsRegistry }
from "@/platform/observability/MetricsRegistry";

import { WebhookDispatcher }
from "@/platform/integrations/WebhookDispatcher";

import { BusinessRulesEngine }
from "@/platform/rules/engine/BusinessRulesEngine";

type EventHandler =
  (payload: unknown) => void;

class DomainEventsManager {

  private handlers:
    Record<string, EventHandler[]>
    = {};

  subscribe(
    event: string,
    handler: EventHandler
  ) {

    if (!this.handlers[event]) {

      this.handlers[event] = [];
    }

    this.handlers[event]
      .push(handler);
  }

  async dispatch(
    event: string,
    payload?: unknown
  ) {

    console.log(
      `[EVENT] ${event}`,
      payload
    );

    EventStore.append({

      event,

      payload,

      timestamp: new Date()
    });

    MetricsRegistry.increment(
      event
    );

    await WebhookDispatcher.dispatch(
      event,
      payload
    );

 await BusinessRulesEngine.execute({

  domain: "global",

  action: event,

  payload
});

    const handlers =
      this.handlers[event] || [];

    for (const handler of handlers) {

      await handler(payload);
    }
  }
}

export const DomainEvents =
  new DomainEventsManager();