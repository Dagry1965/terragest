import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const DepensesFeature:
  FeatureDefinition = {

  name:
    "depenses",

  label:
    "Depenses",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/depenses",

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