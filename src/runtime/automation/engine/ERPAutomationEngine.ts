import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import type {
  ERPDomainEvent,
} from "@/runtime/events/ERPDomainEvent";

import {
  ERPAutomationRegistry,
} from "./ERPAutomationRegistry";

import {
  ERPAutomationTimelineStore,
} from "../timeline/ERPAutomationTimelineStore";

import {
  ERPNotificationCenter,
} from "../notifications/ERPNotificationCenter";

import {
  ERPAlertStore,
} from "@/runtime/observability";

import {
  ERPRuntimeHooks,
} from "../hooks/ERPRuntimeHooks";

let initialized = false;

function processEvent(
  event: ERPDomainEvent
) {

  const matchingRules =
    ERPAutomationRegistry.filter(
      (rule) =>
        rule.module === event.module &&
        rule.trigger === event.type
    );

  for (
    const rule
    of matchingRules
  ) {

    ERPAutomationTimelineStore.add({

      id:
        `${rule.id}_${Date.now()}`,

      module:
        event.module,

      trigger:
        event.type,

      action:
        rule.action,

      status:
        "success",

      timestamp:
        new Date().toISOString(),

      description:
        rule.description,
    });

    if (
      rule.action === "NOTIFY"
    ) {

      ERPNotificationCenter.push({

        id:
          `notif_${Date.now()}`,

        title:
          "Automation notification",

        message:
          `${event.module} -> ${event.type}`,

        timestamp:
          new Date().toISOString(),
      });
    }

    if (
      rule.action === "ALERT"
    ) {

      ERPAlertStore.add({

        id:
          `alert_${Date.now()}`,

        module:
          event.module,

        title:
          "Automation alert",

        description:
          `${event.type} detected`,

        level:
          "warning",

        timestamp:
          new Date().toISOString(),
      });
    }
  }

  ERPRuntimeHooks.trigger(
    event
  );
}

export function initializeERPAutomationEngine() {

  if (initialized) {
    return;
  }

  initialized = true;

  ERPEventBus.subscribe(
    processEvent
  );
}