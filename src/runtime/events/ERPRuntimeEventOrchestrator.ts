import {
  erpEventBus,
  type ERPEvent,
} from "./ERPEventBus";

import {
  ERPAutomationTimelineStore,
  ERPNotificationCenter,
} from "../automation";

export class ERPRuntimeEventOrchestrator {

  initialize() {

    erpEventBus.subscribe(
      (
        event: ERPEvent
      ) => {

        ERPAutomationTimelineStore
          .addItem({

            id:
              crypto.randomUUID(),

            action:
              event.type,

            label:
              `Runtime event ${event.type}`,

            status:
              "processed",

            createdAt:
              new Date()
                .toISOString(),

            module:
              event.module,

            trigger:
              event.type,
          });

        ERPNotificationCenter
          .push({

            id:
              crypto.randomUUID(),

            title:
              "ERP Runtime Event",

            message:
              `${event.type} executed for ${event.module}`,

            type:
              "info",

            createdAt:
              new Date()
                .toISOString(),

            read: false,
          });
      }
    );
  }
}

export const erpRuntimeEventOrchestrator =
  new ERPRuntimeEventOrchestrator();