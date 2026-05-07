import {
  registerRule,
} from "@/core/rules/rules-engine";

import {
  pushRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

registerRule({
  id: "materiel-critical-breakdown",

  module: "materiels",

  name:
    "Détection panne critique matériel",

  enabled: true,

  evaluate(data) {
    return (
      data?.etat === "panne"
    );
  },

  async execute(data) {
    console.log(
      "RULE ACTION : maintenance critique"
    );

    pushRuntimeEntry({
      module: "materiels",
      action: "rule",
      type: "workflow",
      status: "warning",
      entityId: data?.id,
      message:
        "Workflow maintenance critique déclenché",
    });
  },
});

registerRule({
  id: "low-stock-alert",

  module: "stocks",

  name:
    "Détection stock faible",

  enabled: true,

  evaluate(data) {
    return (
      typeof data?.quantite === "number" &&
      data.quantite < 10
    );
  },

  async execute(data) {
    console.log(
      "RULE ACTION : stock faible"
    );

    pushRuntimeEntry({
      module: "stocks",
      action: "rule",
      type: "supervision",
      status: "warning",
      entityId: data?.id,
      message:
        "Alerte stock faible détectée",
    });
  },
});

registerRule({
  id: "contract-expiration",

  module: "contrats",

  name:
    "Contrat proche expiration",

  enabled: true,

  evaluate(data) {
    return Boolean(
      data?.expirationProche
    );
  },

  async execute(data) {
    console.log(
      "RULE ACTION : contrat expiration"
    );

    pushRuntimeEntry({
      module: "contrats",
      action: "rule",
      type: "event",
      status: "warning",
      entityId: data?.id,
      message:
        "Contrat proche expiration",
    });
  },
});
