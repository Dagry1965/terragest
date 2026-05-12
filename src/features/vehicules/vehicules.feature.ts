import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const VehiculesFeature:
  FeatureDefinition = {

  name:
    "vehicules",

  label:
    "Vehicules",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/vehicules",

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