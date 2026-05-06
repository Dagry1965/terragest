import type {
  FeatureDefinition
}
from "@/platform/registry/FeatureDefinition";

export const
__MODULE_PASCAL__Feature:
  FeatureDefinition = {

  name:
    "__MODULE__",

  label:
    "__MODULE_PASCAL__",

  enabled:
    true,

  version:
    "1.0.0",

  route:
    "/__MODULE__",

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