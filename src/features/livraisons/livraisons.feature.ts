import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const LivraisonsFeature:
  FeatureDefinition = {

  name:
    "livraisons",

  label:
    "Livraisons",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/livraisons",

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