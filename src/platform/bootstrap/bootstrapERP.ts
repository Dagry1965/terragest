// src/platform/bootstrap/bootstrapERP.ts

import { erpOrchestrator }
from "@/platform/orchestration/ERPOrchestrator";
import { registerBusinessRules }
from "@/platform/rules/registerBusinessRules";

import { registerTimelineListeners }
from "@/platform/timeline/registerTimelineListeners";

import { registerERPAutomations }
from "@/platform/automation/registerAutomations";

import { registerERPSagas }
from "@/platform/sagas/registerSagas";

export function bootstrapERP() {
registerBusinessRules();
registerERPAutomations();
registerERPSagas();
registerTimelineListeners();
  erpOrchestrator.initialize();
}