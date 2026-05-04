// src/platform/factories/createPipelineRule.ts

import {
  PipelineRule
}
from "@/platform/rules/types/PipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

interface CreatePipelineRuleOptions {

  name: string;

  domain: string;

  action: string;

  pipeline: PipelineType;

  priority?: number;

  execute(
    context: any
  ): Promise<void> | void;
}

export function createPipelineRule(
  options: CreatePipelineRuleOptions
): PipelineRule {

  return {

    name:
      options.name,

    domain:
      options.domain,

    action:
      options.action,

    pipeline:
      options.pipeline,

    priority:
      options.priority,

    execute:
      options.execute
  };
}
