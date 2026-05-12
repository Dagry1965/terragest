import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const RecoltesFeature:
  FeatureDefinition = {

  name:
    "recoltes",

  label:
    "Recoltes",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/recoltes",

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