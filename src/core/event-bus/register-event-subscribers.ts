import {
  enqueueJob,
} from "@/core/jobs/job-queue";

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

      enqueueJob({
        name:
          "maintenance-critical-job",

        module: "materiels",

        priority:
          "critical",

        payload:
          event.payload,
      });

      enqueueJob({
        name:
          "notification-maintenance-job",

        module: "materiels",

        priority:
          "normal",

        payload:
          event.payload,
      });

      enqueueJob({
        name:
          "analytics-maintenance-job",

        module: "materiels",

        priority:
          "low",

        payload:
          event.payload,
      });

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

      enqueueJob({
        name:
          "notification-stock-job",

        module: "stocks",

        priority:
          "normal",

        payload:
          event.payload,
      });

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

      enqueueJob({
        name:
          "notification-contract-job",

        module: "contrats",

        priority:
          "normal",

        payload:
          event.payload,
      });

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

