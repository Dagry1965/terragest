// src/platform/bootstrap/bootstrapERP.ts

import { erpOrchestrator }
from "@/platform/orchestration/ERPOrchestrator";
import { registerBusinessRules }
from "@/platform/rules/registerBusinessRules";

export function bootstrapERP() {
registerBusinessRules();
  erpOrchestrator.initialize();
}