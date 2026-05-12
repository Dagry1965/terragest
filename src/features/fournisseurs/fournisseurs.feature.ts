import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const FournisseursFeature:
  FeatureDefinition = {

  name:
    "fournisseurs",

  label:
    "Fournisseurs",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/fournisseurs",

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