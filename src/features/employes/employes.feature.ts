import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const EmployesFeature:
  FeatureDefinition = {

  name:
    "employes",

  label:
    "Employes",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/employes",

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