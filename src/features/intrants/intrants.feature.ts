import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const IntrantsFeature:
  FeatureDefinition = {

  name:
    "intrants",

  label:
    "Intrants",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/intrants",

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