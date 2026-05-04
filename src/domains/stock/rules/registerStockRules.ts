// src/domains/stock/rules/registerStockRules.ts

import { RulePipelineRuntime }
from "@/platform/rules/runtime/RulePipelineRuntime";

import { PreventNegativeStockRule }
from "@/domains/stock/rules/PreventNegativeStockRule";

export function registerStockRules() {

  RulePipelineRuntime.register(
    PreventNegativeStockRule
  );
}
