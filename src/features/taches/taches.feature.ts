import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const TachesFeature:
  FeatureDefinition = {

  name:
    "taches",

  label:
    "Taches",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/taches",

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