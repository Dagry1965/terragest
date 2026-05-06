import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const StocksFeature:
  FeatureDefinition = {

  name:
    "stocks",

  label:
    "Stocks",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/stocks",

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
