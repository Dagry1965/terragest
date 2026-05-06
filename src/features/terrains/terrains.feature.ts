import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const TerrainsFeature:
  FeatureDefinition = {

  name:
    "terrains",

  label:
    "Terrains",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/terrains",

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
