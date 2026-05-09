import {
  erpEventBus,
  type ERPEvent,
} from "../events";

import {
  erpRuntimeAuditTrail,
} from "./ERPRuntimeAuditTrail";

export class ERPRuntimeAuditBridge {

  initialize() {

    erpEventBus.subscribe(
      (
        event: ERPEvent
      ) => {

        erpRuntimeAuditTrail
          .log({

            id:
              crypto.randomUUID(),

            module:
              event.module,

            action:
              event.type,

            createdAt:
              new Date()
                .toISOString(),

            payload:
              event.payload,
          });
      }
    );
  }
}

export const erpRuntimeAuditBridge =
  new ERPRuntimeAuditBridge();
