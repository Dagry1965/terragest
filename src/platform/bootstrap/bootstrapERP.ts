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

import { WorkflowScheduler }
from "@/platform/execution/WorkflowScheduler";

export function bootstrapERP() {
registerBusinessRules();
registerERPAutomations();
registerERPSagas();
registerTimelineListeners();
WorkflowScheduler.start();
  erpOrchestrator.initialize();
}