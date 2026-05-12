import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const IncidentsFeature:
  FeatureDefinition = {

  name:
    "incidents",

  label:
    "Incidents",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/incidents",

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