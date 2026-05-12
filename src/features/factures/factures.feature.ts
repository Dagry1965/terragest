import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const FacturesFeature:
  FeatureDefinition = {

  name:
    "factures",

  label:
    "Factures",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/factures",

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