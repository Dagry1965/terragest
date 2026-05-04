// src/platform/rules/runtime/RulePipelineRuntime.ts

import {
  RuleExecutionContext
}
from "@/platform/rules/core/RuleExecutionContext";

import {
  PipelineRule
}
from "@/platform/rules/types/PipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

import { RuleMonitoring }
from "@/platform/rules/monitoring/RuleMonitoring";

import { RuleAudit }
from "@/platform/rules/audit/RuleAudit";

import { RuleSecurityPolicy }
from "@/platform/rules/security/RuleSecurityPolicy";

class RulePipelineRuntimeManager {

  private rules:
    PipelineRule[] = [];

  register(
    rule: PipelineRule
  ) {

    console.log(
      "[PIPELINE RULE REGISTERED]",
      rule.name
    );

    this.rules.push(rule);

    this.rules.sort(
      (a, b) =>
        (b.priority || 0)
        - (a.priority || 0)
    );
  }

  async execute(

    pipeline: PipelineType,

    context: RuleExecutionContext
  ) {

    const rules =
      this.rules.filter(
        rule =>

          rule.pipeline === pipeline
          &&

          rule.domain === context.domain
    );

    console.log(
      "[PIPELINE RUNTIME]",
      context.domain,
      pipeline,
      rules.length
    );

    for (const rule of rules) {

      const allowed =
        RuleSecurityPolicy
          .canExecute(
            context
          );

      if (!allowed) {

        continue;
      }

      try {

        RuleMonitoring.started(
          rule.name
        );

        RuleAudit.log(
          "rule.started",
          rule.name
        );

        await rule.execute(
          context
        );

        RuleMonitoring.completed(
          rule.name
        );

      } catch (error) {

        RuleMonitoring.failed(
          rule.name,
          error
        );

        RuleAudit.log(
          "rule.failed",
          rule.name
        );
      }
    }
  }
}

export const RulePipelineRuntime =
  new RulePipelineRuntimeManager();
