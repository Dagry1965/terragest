// src/platform/bootstrap/bootstrapERP.ts

import { erpOrchestrator }
from "@/platform/orchestration/ERPOrchestrator";
import { registerBusinessRules }
from "@/platform/rules/registerBusinessRules";

import { registerERPAutomations }
from "@/platform/automation/registerAutomations";

export function bootstrapERP() {
registerBusinessRules();
registerERPAutomations();
  erpOrchestrator.initialize();
}