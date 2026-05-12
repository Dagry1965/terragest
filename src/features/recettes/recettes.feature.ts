import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const RecettesFeature:
  FeatureDefinition = {

  name:
    "recettes",

  label:
    "Recettes",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/recettes",

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