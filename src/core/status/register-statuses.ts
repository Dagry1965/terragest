import {
  registerStatuses,
} from "@/core/status/status-engine";

registerStatuses({
  module: "materiels",

  statuses: [
    {
      value: "operationnel",
      label: "Opérationnel",
      color: "green",

      transitions: [
        "maintenance",
        "panne",
      ],
    },

    {
      value: "maintenance",
      label: "Maintenance",
      color: "yellow",

      transitions: [
        "operationnel",
        "panne",
      ],
    },

    {
      value: "panne",
      label: "En panne",
      color: "red",

      transitions: [
        "maintenance",
      ],
    },
  ],
});

registerStatuses({
  module: "contrats",

  statuses: [
    {
      value: "actif",
      label: "Actif",
      color: "green",

      transitions: [
        "suspendu",
        "expire",
      ],
    },

    {
      value: "suspendu",
      label: "Suspendu",
      color: "yellow",

      transitions: [
        "actif",
        "expire",
      ],
    },

    {
      value: "expire",
      label: "Expiré",
      color: "red",

      transitions: [],
    },
  ],
});

registerStatuses({
  module: "workflows",

  statuses: [
    {
      value: "pending",
      label: "Pending",
      color: "gray",

      transitions: [
        "running",
        "failed",
      ],
    },

    {
      value: "running",
      label: "Running",
      color: "blue",

      transitions: [
        "completed",
        "failed",
      ],
    },

    {
      value: "completed",
      label: "Completed",
      color: "green",

      transitions: [],
    },

    {
      value: "failed",
      label: "Failed",
      color: "red",

      transitions: [
        "running",
      ],
    },
  ],
});
