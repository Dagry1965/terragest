// src/domains/stock/rules/PreventNegativeStockRule.ts

import {
  PipelineRule
}
from "@/platform/rules/types/PipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

export const PreventNegativeStockRule:
  PipelineRule = {

  name:
    "prevent-negative-stock",

  domain:
    "stock",

  action:
    "create",

  pipeline:
    PipelineType.BEFORE_CREATE,

  priority:
    100,

  async execute(
    context
  ) {

    console.log(
      "[RULE] prevent negative stock",
      context.payload
    );
  }
};
