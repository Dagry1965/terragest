// src/platform/rules/types/PipelineRule.ts

import {
  BusinessRule
}
from "@/platform/rules/types/BusinessRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

export interface PipelineRule
  extends BusinessRule {

  domain: string;

  pipeline:
    PipelineType;
}