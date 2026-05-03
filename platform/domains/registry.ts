import { DomainDefinition } from "./types";

export const domainRegistry:
  DomainDefinition[] = [

    {
      key: "stocks",

      label: "Stocks",

      enabled: true,

      realtime: true,

      offline: true,

      analytics: true,
    },

    {
      key: "paiements",

      label: "Paiements",

      enabled: true,

      realtime: true,

      analytics: true,
    },

    {
      key: "exploitations",

      label: "Exploitations",

      enabled: true,

      offline: true,
    },

    {
      key: "monitoring",

      label: "Monitoring",

      enabled: true,

      realtime: true,

      analytics: true,

      monitoring: true,
    },

    {
      key: "workflow",

      label: "Workflow",

      enabled: true,
    },


    {
      key: "observability",

      label: "Observability",

      enabled: true,

      realtime: true,
      offline: true,
      analytics: true,
      monitoring: true,
    },

];

