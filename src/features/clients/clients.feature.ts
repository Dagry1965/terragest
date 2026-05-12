import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const ClientsFeature:
  FeatureDefinition = {

  name:
    "clients",

  label:
    "Clients",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/clients",

  capabilities: [
    "crud",
    "runtime",
    "workflow",
    "rules",
    "automation",
    "observability",
    "realtime",
    "analytics"
  ],

  dependencies: [],
};