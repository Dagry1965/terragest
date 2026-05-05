import { EventBus } from "@/features/workflow-engine/services/EventBus";

export const ProcessOrchestrator = {

  initialize() {

    EventBus.on(
      "STOCK_LOW",
      async (
        payload: any
      ) => {

        console.log(
          "Trigger purchase workflow",
          payload
        );
      }
    );

    EventBus.on(
      "IOT_ALERT",
      async (
        payload: any
      ) => {

        console.log(
          "Trigger maintenance workflow",
          payload
        );
      }
    );
  },
};
