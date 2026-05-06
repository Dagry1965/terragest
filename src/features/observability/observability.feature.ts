import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const ObservabilityFeature:
  FeatureDefinition = {

  name:
    "observability",

  label:
    "Observability",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/observability",

  capabilities: [
    "crud",
    "runtime",
    "workflow",
    "rules",
    "automation",
    "observability",
    "realtime",
  ],

  dependencies: [],
};
