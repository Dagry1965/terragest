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

import { WorkerPool }
from "@/platform/workers/WorkerPool";

import { RuntimeRecoveryScheduler }
from "@/platform/persistence/RuntimeRecoveryScheduler";

import { RuntimePersistenceService }
from "@/platform/persistence/RuntimePersistenceService";

export function bootstrapERP() {

  RuntimePersistenceService
    .restoreLatestSnapshot();

  RuntimeRecoveryScheduler
    .start();

  registerBusinessRules();

  registerERPAutomations();

  registerERPSagas();

  registerTimelineListeners();

  WorkflowScheduler.start();

  WorkerPool.startWorkers(3);

  erpOrchestrator.initialize();
}