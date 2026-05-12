import {
  startWorkerLoop,
} from "@/core/worker-loop/worker-loop";

import {
  initializeERPAutomationEngine,
} from "@/runtime/automation/engine/ERPAutomationEngine";

import {
  TerragestDomainRuntimeBridge,
} from "@/runtime/domain/TerragestDomainRuntimeBridge";

let runtimeStarted =
  false;

export async function bootstrapERP() {
  if (runtimeStarted) {
    return;
  }

  runtimeStarted = true;

  console.log(
    "ERP RUNTIME BOOTSTRAP STARTED"
  );

  initializeERPAutomationEngine();

  await TerragestDomainRuntimeBridge.boot();

  await startWorkerLoop();

  console.log(
    "ERP RUNTIME ACTIVE"
  );
}