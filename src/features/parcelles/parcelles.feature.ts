import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const ParcellesFeature:
  FeatureDefinition = {

  name:
    "parcelles",

  label:
    "Parcelles",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/parcelles",

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