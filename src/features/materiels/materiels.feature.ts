import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const MaterielsFeature:
  FeatureDefinition = {
  name: "materiels",
  label: "Matériels",
  enabled: true,
  version: "1.0.0",
  route: "/materiels",
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