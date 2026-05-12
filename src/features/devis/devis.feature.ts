import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const DevisFeature:
  FeatureDefinition = {

  name:
    "devis",

  label:
    "Devis",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/devis",

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