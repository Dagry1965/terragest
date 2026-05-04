// src/domains/paiement/rules/registerPaiementRules.ts

import { RulePipelineRuntime }
from "@/platform/rules/runtime/RulePipelineRuntime";

import { PaiementValidationRule }
from "@/domains/paiement/rules/PaiementValidationRule";

export function registerPaiementRules() {

  RulePipelineRuntime.register(

    PaiementValidationRule
  );
}