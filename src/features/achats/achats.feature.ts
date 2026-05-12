import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const AchatsFeature:
  FeatureDefinition = {

  name:
    "achats",

  label:
    "Achats",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/achats",

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