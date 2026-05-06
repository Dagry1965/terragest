import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const InterventionsFeature:
  FeatureDefinition = {

  name:
    "interventions",

  label:
    "Interventions",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/interventions",

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
