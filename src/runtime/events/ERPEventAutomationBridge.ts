import {
  erpEventBus,
  type ERPEvent,
} from "./ERPEventBus";

import {
  erpAutomationEngine,
} from "../automation";

export class ERPEventAutomationBridge {

  initialize() {

    erpEventBus.subscribe(
      (
        event: ERPEvent
      ) => {

        erpAutomationEngine
          .execute(
            event.module,
            event.type,
            event.payload
          );
      }
    );
  }
}

export const erpEventAutomationBridge =
  new ERPEventAutomationBridge();