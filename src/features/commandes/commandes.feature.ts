import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const CommandesFeature:
  FeatureDefinition = {

  name:
    "commandes",

  label:
    "Commandes",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/commandes",

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