// src/domains/paiement/rules/PaiementValidationRule.ts

import { createPipelineRule }
from "@/platform/factories/createPipelineRule";

import { PipelineType }
from "@/platform/rules/pipelines/PipelineType";

export const PaiementValidationRule =
  createPipelineRule({

    name:
      "paiement-validation",

    domain:
      "paiement",

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
        "[RULE] paiement validation",
        context.payload
      );
    }
  });