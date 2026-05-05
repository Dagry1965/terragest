import {
  EventBus,
} from "@/workflow/services/EventBus";

import {
  PRODUCT_CREATED,
  STOCK_ALERT,
} from "@/workflow/events/ProductEvents";

import {
  RulesEngine,
} from "@/workflow/rules/RulesEngine";

export const WorkflowAutomation = {

  onProductCreated(
    payload: any
  ) {

    EventBus.emit(
      PRODUCT_CREATED,
      payload
    );

    const result =
      RulesEngine.evaluateStock(
        payload.stock || 0
      );

    if (
      result.alert
    ) {

      EventBus.emit(
        STOCK_ALERT,
        payload
      );
    }
  },
};
