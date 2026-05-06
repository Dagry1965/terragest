import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const ProduitsFeature:
  FeatureDefinition = {

  name:
    "produits",

  label:
    "Produits",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/produits",

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
